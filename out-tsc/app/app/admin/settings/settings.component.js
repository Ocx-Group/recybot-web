import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { GeneralConfiguration } from '@app/core/models/general-configuration/general-configuration.model';
let SettingsComponent = class SettingsComponent {
    constructor(fb, configurationService, toastrService) {
        this.fb = fb;
        this.configurationService = configurationService;
        this.toastrService = toastrService;
        this.active = 1;
    }
    ngOnInit() {
        this.generalConfigurationForm = this.fb.group({
            paymentModelCutoffDate: ['', Validators.required],
            isUnderMaintenance: [false]
        });
        this.loadGeneralConfiguration();
    }
    loadGeneralConfiguration() {
        this.configurationService.getGeneralConfiguration().subscribe({
            next: (value) => {
                if (value.success) {
                    const config = value.data;
                    this.generalConfigurationForm.patchValue({
                        paymentModelCutoffDate: this.formatDateForInput(new Date(config.paymentModelCutoffDate)),
                        isUnderMaintenance: config.isUnderMaintenance
                    });
                }
                else {
                    console.error('Error al cargar la configuración general');
                }
            }, error: (err) => {
                console.error('Error', err);
            },
        });
    }
    saveGeneralConfiguration() {
        if (this.generalConfigurationForm.valid) {
            const formValue = this.generalConfigurationForm.value;
            const generalConfiguration = new GeneralConfiguration();
            generalConfiguration.paymentModelCutoffDate = new Date(formValue.paymentModelCutoffDate);
            generalConfiguration.isUnderMaintenance = formValue.isUnderMaintenance;
            this.configurationService.setGeneralConfiguration(generalConfiguration).subscribe({
                next: (value) => {
                    if (value.success) {
                        this.toastrService.success('Configuración se actualizó correctamente.');
                    }
                    else {
                        this.toastrService.error('No se pudo actualizar la configuración.');
                    }
                }, error: (err) => {
                    console.error('Error', err);
                },
            });
        }
    }
    formatDateForInput(date) {
        return date.toISOString().split('T')[0];
    }
};
SettingsComponent = __decorate([
    Component({
        selector: 'app-settings',
        templateUrl: './settings.component.html',
    })
], SettingsComponent);
export { SettingsComponent };
//# sourceMappingURL=settings.component.js.map