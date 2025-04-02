import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { CompensationPlansConfiguration } from '@app/core/models/compensation-plans-configuration-model/compensation-plans-configuration.model';
let CompensationPlansComponent = class CompensationPlansComponent {
    constructor(configurationService, formBuilder, toastr) {
        this.configurationService = configurationService;
        this.formBuilder = formBuilder;
        this.toastr = toastr;
        this.submitted = false;
        this.compesationPlansConfiguration = new CompensationPlansConfiguration();
    }
    ngOnInit() {
        this.loadValidation();
        this.loadCompesationPlansConfiguration();
    }
    loadValidation() {
        this.compesationPlansForm = this.formBuilder.group({
            automatic_activation: [''],
            automatic_qualification: [''],
            automatic_incentive_calculation: [''],
            automatic_commission_calculation: ['']
        });
    }
    showSuccess(message) {
        this.toastr.success(message, 'Success!');
    }
    loadCompesationPlansConfiguration() {
        this.configurationService.getCompensationPlansConfiguration().subscribe((resp) => {
            if (resp != null) {
                this.compesationPlansForm.setValue({
                    automatic_activation: resp.automatic_activation,
                    automatic_qualification: resp.automatic_qualification,
                    automatic_incentive_calculation: resp.automatic_incentive_calculation,
                    automatic_commission_calculation: resp.automatic_commission_calculation
                });
            }
        });
    }
    onSaveConfiguration() {
        this.submitted = true;
        if (this.compesationPlansForm.invalid) {
            return;
        }
        this.compesationPlansConfiguration.automatic_activation = this.compesationPlansForm.value.automatic_activation;
        this.compesationPlansConfiguration.automatic_qualification = this.compesationPlansForm.value.automatic_qualification;
        this.compesationPlansConfiguration.automatic_incentive_calculation = this.compesationPlansForm.value.automatic_incentive_calculation;
        this.compesationPlansConfiguration.automatic_commission_calculation = this.compesationPlansForm.value.automatic_commission_calculation;
        this.configurationService.createCompensationPlansConfiguration(this.compesationPlansConfiguration).subscribe((resp) => {
            if (resp.success) {
                this.showSuccess('The configuration was update successfully!');
                this.loadCompesationPlansConfiguration();
            }
        });
    }
};
CompensationPlansComponent = __decorate([
    Component({
        selector: 'app-compensation-plans',
        templateUrl: './compensation-plans.component.html',
    })
], CompensationPlansComponent);
export { CompensationPlansComponent };
//# sourceMappingURL=compensation-plans.component.js.map