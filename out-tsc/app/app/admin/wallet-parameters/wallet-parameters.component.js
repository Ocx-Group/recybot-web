import { __decorate } from "tslib";
import { forkJoin } from 'rxjs';
import { Component } from '@angular/core';
import { formatDate } from '@angular/common';
import { WalletPeriod } from '@app/core/models/wallet-period-model/wallet-period.model';
import { WalletRetentionConfig } from '@app/core/models/wallet-retention-config-model/wallet-retention-config.model';
import { WalletWithdrawalsConfiguration } from '@app/core/models/wallet-withdrawals-configuration-model/wallet-withdrawals-configuration.model';
import { AdditionalParametersConfiguration } from '@app/core/models/additional-parameters-configuration-model/additional-parameters-configuration.model';
let WalletParametersComponent = class WalletParametersComponent {
    constructor(formBuilder, walletPeriodService, walletRetentionConfigService, ngbDateParserFormatter, toastr, configurationService) {
        this.formBuilder = formBuilder;
        this.walletPeriodService = walletPeriodService;
        this.walletRetentionConfigService = walletRetentionConfigService;
        this.ngbDateParserFormatter = ngbDateParserFormatter;
        this.toastr = toastr;
        this.configurationService = configurationService;
        this.active = 1;
        this.walletPeriod = new WalletPeriod();
        this.WalletRetentionConfig = new WalletRetentionConfig();
    }
    ngOnInit() {
        this.loadValidation();
        this.loadWalletPeriod();
        this.loadWalletRetentionConf();
        this.loadWalletWithdrawalsConfiguration();
        this.loadAdditionalParametersConfiguration();
    }
    showSuccess(message) {
        this.toastr.success(message, 'Success!');
    }
    showError(message) {
        this.toastr.error(message, 'Error!');
    }
    get datePickers() {
        return this.myForm.get('datePickers');
    }
    get ranges() {
        return this.myForm.get('ranges');
    }
    loadValidation() {
        this.myForm = this.formBuilder.group({
            datePickers: this.formBuilder.array([]),
            ranges: this.formBuilder.array([]),
            minimum_amount: [],
            maximum_amount: [],
            commission_amount: [],
            activate_invoice_cancellation: [false]
        });
        this.additionalParameters = this.formBuilder.group({
            minutes_validity_code: [],
            activate_confirmation_mails: [],
            concept_wallet_withdrawal: []
        });
    }
    loadAdditionalParametersConfiguration() {
        this.configurationService.getAdditionalParametersWalletConfiguration().subscribe({
            next: (resp) => {
                this.additionalParameters.setValue({
                    minutes_validity_code: resp.minutes_validity_code,
                    activate_confirmation_mails: resp.activate_confirmation_mails,
                    concept_wallet_withdrawal: resp.concept_wallet_withdrawal
                });
            },
            error: (err) => {
                this.showError('Error!');
            },
        });
    }
    loadWalletWithdrawalsConfiguration() {
        this.configurationService.getWithdrawalsWalletConfiguration().subscribe({
            next: (resp) => {
                this.myForm.patchValue({
                    minimum_amount: resp.minimum_amount,
                    maximum_amount: resp.maximum_amount,
                    commission_amount: resp.commission_amount,
                    activate_invoice_cancellation: resp.activate_invoice_cancellation
                });
            },
            error: (err) => {
                this.showError('Error!');
            },
        });
    }
    loadWalletPeriod() {
        this.walletPeriodService.getAllWalletsPeriods().subscribe({
            next: (resp) => {
                if (resp != null) {
                    const datePickersArray = this.myForm.get('datePickers');
                    datePickersArray.clear();
                    resp.forEach((pickerValue) => {
                        const parsedDate = this.ngbDateParserFormatter.parse(pickerValue.date);
                        const pickerGroup = this.formBuilder.group({
                            picker: parsedDate,
                            id: pickerValue.id,
                        });
                        datePickersArray.push(pickerGroup);
                    });
                }
            },
            error: (error) => {
                this.showError('Error!');
            },
        });
    }
    loadWalletRetentionConf() {
        this.walletRetentionConfigService.getAllWalletsRetentionConfig().subscribe({
            next: (resp) => {
                if (resp != null) {
                    const rangesArray = this.myForm.get('ranges');
                    rangesArray.clear();
                    resp.forEach((rangeValue) => {
                        const rangeGroup = this.formBuilder.group({
                            to_date: rangeValue.withdrawalTo,
                            from_date: rangeValue.withdrawalFrom,
                            percentage_retention: rangeValue.percentage,
                            id: rangeValue.id,
                        });
                        rangesArray.push(rangeGroup);
                    });
                }
            },
            error: (error) => {
                this.showError('Error!');
            },
        });
    }
    addPicker() {
        const datePickersFormGroup = this.formBuilder.group({
            picker: [],
            id: [],
        });
        this.datePickers.push(datePickersFormGroup);
    }
    addRangeRetention() {
        const rangesFormGroup = this.formBuilder.group({
            to_date: [],
            from_date: [],
            percentage_retention: [],
            id: [],
        });
        this.ranges.push(rangesFormGroup);
    }
    save() {
        if (!this.myForm.valid) {
            return;
        }
        const walletWithdrawalsConfig = this.buildWalletWalletWithdrawalsConfig();
        const walletPeriodRequests = this.datePickers.controls.map(this.buildWalletPeriodRequest);
        const walletRetentionConfig = this.ranges.controls.map((control) => this.buildWalletRetentionConfig(control));
        forkJoin([
            this.walletPeriodService.createWalletPeriod(walletPeriodRequests),
            this.walletRetentionConfigService.createWalletRetentionConfig(walletRetentionConfig),
            this.configurationService.createWithdrawalsWalletConfiguration(walletWithdrawalsConfig)
        ]).subscribe({
            next: ([walletPeriodResponse, walletRetentionResponse]) => {
                this.showSuccess('The wallet period and wallet retention were updated successfully!');
                this.loadWalletPeriod();
                this.loadWalletRetentionConf();
            },
            error: (error) => {
                this.showError('Error!');
            },
        });
    }
    saveAdditionalParameters() {
        const additionalParametersConfig = this.buildAdditionalParametersConfig();
        this.configurationService.createAdditionalParametersWalletConfiguration(additionalParametersConfig).subscribe({
            next: (value) => {
                this.showSuccess('The wallet parameters was updated successfully!');
                this.loadAdditionalParametersConfiguration();
            },
            error: (err) => {
                this.showError('Error!');
            },
        });
    }
    removeDatepicker(index) {
        this.datePickers.removeAt(index);
        if (index != null) {
            this.walletPeriodService.delete(index).subscribe({
                next: (resp) => {
                    if (resp.success) {
                        this.showSuccess('The wallet period was deleted successfully!');
                        this.loadWalletPeriod();
                    }
                },
                error: (error) => {
                    this.showError('Error!');
                },
            });
        }
    }
    removeRange(index) {
        this.ranges.removeAt(index);
        if (index != null) {
            this.walletRetentionConfigService.delete(index).subscribe({
                next: (resp) => {
                    this.showSuccess('The wallet retention was deleted successfully!');
                    this.loadWalletRetentionConf();
                },
                error: (err) => {
                    this.showError('Error!');
                },
            });
        }
    }
    buildWalletWalletWithdrawalsConfig() {
        const walletWithdrawalsConfig = new WalletWithdrawalsConfiguration();
        walletWithdrawalsConfig.minimum_amount = this.myForm.value.minimum_amount;
        walletWithdrawalsConfig.commission_amount = this.myForm.value.commission_amount;
        walletWithdrawalsConfig.maximum_amount = this.myForm.value.maximum_amount;
        walletWithdrawalsConfig.activate_invoice_cancellation = this.myForm.value.activate_invoice_cancellation;
        return walletWithdrawalsConfig;
    }
    buildWalletPeriodRequest(control) {
        const pickerValue = control.get('picker').value;
        const dateString = `${pickerValue.year}-${pickerValue.month}-${pickerValue.day}`;
        const formattedDate = formatDate(dateString, 'yyyy-MM-dd', 'en-US');
        const dateObject = new Date(formattedDate);
        const walletPeriodRequest = new WalletPeriod();
        walletPeriodRequest.id = Number(control.value.id);
        if (Number.isNaN(walletPeriodRequest.id) ||
            walletPeriodRequest.id == null) {
            walletPeriodRequest.id = 0;
        }
        walletPeriodRequest.date = dateObject;
        return walletPeriodRequest;
    }
    buildWalletRetentionConfig(control) {
        const toDateValue = control.get('to_date').value;
        const fromDateValue = control.get('from_date').value;
        const percentageRetentionValue = control.get('percentage_retention').value;
        const walletRetentionConfig = new WalletRetentionConfig();
        walletRetentionConfig.withdrawalTo = toDateValue;
        walletRetentionConfig.withdrawalFrom = fromDateValue;
        walletRetentionConfig.percentage = percentageRetentionValue;
        walletRetentionConfig.id = Number(control.value.id);
        if (Number.isNaN(walletRetentionConfig.id) ||
            walletRetentionConfig.id == null) {
            walletRetentionConfig.id = 0;
        }
        return walletRetentionConfig;
    }
    buildAdditionalParametersConfig() {
        const additionalParametersConfiguration = new AdditionalParametersConfiguration();
        additionalParametersConfiguration.activate_confirmation_mails = this.additionalParameters.value.activate_confirmation_mails;
        additionalParametersConfiguration.concept_wallet_withdrawal = this.additionalParameters.value.concept_wallet_withdrawal;
        additionalParametersConfiguration.minutes_validity_code = this.additionalParameters.value.minutes_validity_code;
        return additionalParametersConfiguration;
    }
};
WalletParametersComponent = __decorate([
    Component({
        selector: 'app-wallet-parameters',
        templateUrl: './wallet-parameters.component.html',
    })
], WalletParametersComponent);
export { WalletParametersComponent };
//# sourceMappingURL=wallet-parameters.component.js.map