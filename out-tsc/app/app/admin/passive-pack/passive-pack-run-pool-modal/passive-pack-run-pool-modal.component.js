import { __decorate } from "tslib";
import { PassivePack } from './../../../core/models/passive-pack-model/passive-pack.model';
import { Component, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { Circle } from 'progressbar.js';
import { Validators } from '@angular/forms';
import { Subject } from 'rxjs';
let PassivePackRunPoolModalComponent = class PassivePackRunPoolModalComponent {
    constructor(toastr, formBuilder, datePipe, processGradingService, router, modalService) {
        this.toastr = toastr;
        this.formBuilder = formBuilder;
        this.datePipe = datePipe;
        this.processGradingService = processGradingService;
        this.router = router;
        this.modalService = modalService;
        this.submitted = false;
        this.percentageValue = 0;
        this.cases = [1, 2, 3];
        this.configurationIsLoaded = false;
        this.passivePack = new PassivePack();
        this.destroy$ = new Subject();
        this.configurationId = 0;
        this.existConfigurationComplete = false;
        this.validateDates = () => {
            if (this.passivePackForm) {
                const startDate = this.passivePackForm.get('start_date').value;
                const finalDate = this.passivePackForm.get('final_date').value;
                if (startDate && finalDate) {
                    const start = new Date(startDate);
                    const end = new Date(finalDate);
                    if (end <= start) {
                        this.passivePackForm.get('final_date').setErrors({ invalidFinalDate: true });
                        this.passivePackForm.get('start_date').setErrors({ invalidStartDate: true });
                    }
                    else {
                        this.passivePackForm.get('final_date').setErrors(null);
                        this.passivePackForm.get('start_date').setErrors(null);
                    }
                }
            }
        };
    }
    ngOnInit() {
        this.loadEcoPoolConfiguration();
        this.loadValidations();
        this.setLevelCounter();
        this.today = new Date();
        this.setInitialDate();
        this.startDateSubscription = this.passivePackForm.get('start_date').valueChanges.subscribe(() => {
            this.validateDates();
        });
        this.finalDateSubscription = this.passivePackForm.get('final_date').valueChanges.subscribe(() => {
            this.validateDates();
        });
    }
    ngOnDestroy() {
        this.startDateSubscription.unsubscribe();
        this.finalDateSubscription.unsubscribe();
        this.processGradingService.stopFetchingProgress();
        if (this.processSubscription) {
            this.processSubscription.unsubscribe();
        }
        if (this.progressSubscription) {
            this.progressSubscription.unsubscribe();
        }
    }
    setLevelCounter() {
        if (this.passivePackForm.value.levels.length === 0) {
            this.levelCounter = 1;
        }
        else {
            this.levelCounter = this.passivePackForm.value.levels.length + 1;
        }
        return this.levelCounter;
    }
    showSuccess(message) {
        this.toastr.success(message);
    }
    showError(message) {
        this.toastr.error(message);
    }
    get passive_pack_controls() {
        return this.passivePackForm.controls;
    }
    get levels() {
        return this.passivePackForm.get('levels');
    }
    closeModals() {
        this.modalService.dismissAll();
    }
    loadValidations() {
        this.passivePackForm = this.formBuilder.group({
            id: [0],
            company_percentage: ['', Validators.required],
            passive_percentage_paid: ['', Validators.required],
            earnings_limit: ['', Validators.required],
            start_date: [null, [Validators.required]],
            final_date: [null, [Validators.required]],
            case: ['', Validators.required],
            company_percentage_levels: ['', Validators.required],
            period_date: [{ disabled: true }],
            levels: this.formBuilder.array([]),
        });
    }
    setValues() {
        this.passivePack.id = this.passivePackForm.value.id;
        this.passivePack.maxGainLimit = this.passivePackForm.value.earnings_limit;
        this.passivePack.ecoPoolPercentage = this.passivePackForm.value.passive_percentage_paid;
        this.passivePack.dateInit = this.passivePackForm.value.start_date;
        this.passivePack.dateEnd = this.passivePackForm.value.final_date;
        this.passivePack.case = this.passivePackForm.value.case.toInt();
        this.passivePack.companyPercentage = this.passivePackForm.value.company_percentage;
        this.passivePack.companyPercentageLevels = this.passivePackForm.value.company_percentage_levels;
        const levelsArray = this.passivePackForm.get('levels');
        this.passivePack.levels = levelsArray.controls.map((control) => {
            const level = {
                id: control.value.id,
                level: control.value.level,
                percentage: control.value.percentage_level
            };
            return level;
        });
        return this.passivePack;
    }
    setInitialDate() {
        const currentDate = new Date();
        const formattedDate = this.datePipe.transform(currentDate, 'yyyy-MM-dd');
        this.passivePackForm.patchValue({
            period_date: formattedDate,
        });
    }
    confirmExecutePoolProcess() {
        Swal.fire({
            title: 'Atención',
            icon: 'warning',
            text: 'Está a punto de ejecutar el proceso de pagos del Pool Adquisición. ¿Está seguro que desea continuar?',
            showCancelButton: true,
            cancelButtonColor: 'red',
            cancelButtonText: 'No, en otro momento',
            confirmButtonText: 'Si, estoy seguro',
        }).then((result) => {
            if (result.value) {
                this.runPoolPaid();
            }
        });
    }
    deleteSingleRow(value) {
        Swal.fire({
            title: '¿Estás seguro?',
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Si',
        }).then((result) => {
            if (result.value) {
                this.deleteRecord(value);
            }
        });
    }
    deleteRecord(index) {
        this.levels.removeAt(index);
    }
    deleteRecordSuccess(count) {
        this.toastr.success(count + ' Records Deleted Successfully', '');
    }
    addForm() {
        const levelsFormGroup = this.formBuilder.group({
            level: [this.setLevelCounter()],
            percentage_level: [''],
        });
        this.levels.push(levelsFormGroup);
        this.levelCounter++;
    }
    runPoolPaid() {
        this.processSubscription = this.processGradingService.execEcoPoolProcess().subscribe({
            next: (value) => {
                if (value.success) {
                    this.showProgress();
                }
            },
            error: (err) => {
                this.showError('Error');
            },
        });
    }
    showProgress() {
        this.toast = this.createToast();
        this.processGradingService.startFetchingProgress(this.configurationId);
        this.progressSubscription = this.processGradingService.progress$.subscribe(progress => {
            this.updateProgressBar(progress / 100);
            if (this.percentageValue === 100) {
                Swal.close();
                this.closeModals();
                this.processGradingService.stopFetchingProgress();
                this.router.navigate(['/admin/results-ecopool']);
            }
        });
    }
    createToast() {
        return Swal.fire({
            title: 'Progreso',
            html: '<div id="container"></div>',
            didOpen: () => {
                this.bar = this.createProgressBar();
                this.bar.animate(0);
            }
        });
    }
    createProgressBar() {
        return new Circle(document.getElementById('container'), {
            strokeWidth: 6,
            backgroundColor: 'transparent',
            color: '#FFEA82',
            trailColor: '#eee',
            trailWidth: 1,
            svgStyle: { width: '35%', height: '35%' },
            text: {
                style: {
                    color: '#999',
                },
                autoStyleContainer: false
            },
            from: { color: '#FFEA82' },
            to: { color: '#ED6A5A' },
            step: (state, circle) => {
                circle.setText(Math.round(circle.value() * 100) + ' %');
            }
        });
    }
    updateProgressBar(progress) {
        if (this.bar) {
            this.bar.animate(progress);
        }
    }
    onProcessComplete() {
        this.showSuccess('Proceso realizado correctamente');
    }
    onSaveConfiguration() {
        this.submitted = true;
        if (this.passivePackForm.invalid) {
            return;
        }
        const configuration = this.setValues();
        this.processGradingService.createEcoPoolConfiguration(configuration).subscribe({
            next: (value) => {
                this.showSuccess('La configuración se guardó correctamente.');
            },
            error: (err) => {
                this.showError('Error');
            },
        });
    }
    loadEcoPoolConfiguration() {
        this.processGradingService.getEcoPoolConfiguration().subscribe({
            next: (resp) => {
                if (resp) {
                    this.setEcoPoolConfiguration(resp);
                    this.configurationIsLoaded = true;
                }
            }, error: (err) => {
                if (err instanceof EvalError) {
                    this.showError('Error');
                }
            },
        });
    }
    setEcoPoolConfiguration(ecoPoolConfiguration) {
        this.setInitialDate();
        this.configurationId = ecoPoolConfiguration.id;
        const startDate = this.datePipe.transform(ecoPoolConfiguration.dateInit, 'yyyy-MM-dd');
        const finalDate = this.datePipe.transform(ecoPoolConfiguration.dateEnd, 'yyyy-MM-dd');
        this.existConfigurationComplete = true;
        this.passivePackForm.patchValue({
            id: ecoPoolConfiguration.id,
            company_percentage: ecoPoolConfiguration.companyPercentage,
            passive_percentage_paid: ecoPoolConfiguration.ecoPoolPercentage,
            earnings_limit: ecoPoolConfiguration.maxGainLimit,
            start_date: startDate,
            final_date: finalDate,
            case: ecoPoolConfiguration.case,
            company_percentage_levels: ecoPoolConfiguration.companyPercentageLevels,
            levels: [],
        });
        const levelsArray = this.passivePackForm.get('levels');
        levelsArray.clear();
        if (Array.isArray(ecoPoolConfiguration.levels)) {
            ecoPoolConfiguration.levels.forEach(level => {
                const levelFormGroup = this.formBuilder.group({
                    id: [level.id],
                    level: [level.level],
                    percentage_level: [level.percentage],
                    createdAt: [level.createdAt],
                    updatedAt: [level.updatedAt],
                    ecoPoolConfiguration: [level.ecoPoolConfiguration]
                });
                levelsArray.push(levelFormGroup);
            });
        }
    }
};
__decorate([
    ViewChild('runPassivePackModal')
], PassivePackRunPoolModalComponent.prototype, "runPassivePackModal", void 0);
PassivePackRunPoolModalComponent = __decorate([
    Component({
        selector: 'app-passive-pack-run-pool-modal',
        templateUrl: './passive-pack-run-pool-modal.component.html',
    })
], PassivePackRunPoolModalComponent);
export { PassivePackRunPoolModalComponent };
//# sourceMappingURL=passive-pack-run-pool-modal.component.js.map