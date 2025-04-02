import { __decorate } from "tslib";
import { Validators, } from '@angular/forms';
import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MatrixConfiguration } from '@app/core/models/matrix-configuration-model/matrix.configuration.model';
const ALERTS = [
    {
        type: 'info',
        message: '',
    },
];
let ArraysConfigurationsComponent = class ArraysConfigurationsComponent {
    constructor(formBuilder, configurationService, toastr) {
        this.formBuilder = formBuilder;
        this.configurationService = configurationService;
        this.toastr = toastr;
        this.show = true;
        this.linkMsj = 'hide';
        this.submitted = false;
        this.matrixConfiguration = new MatrixConfiguration();
        this.alerts = Array.from(ALERTS);
    }
    ngOnInit() {
        this.loadValidations();
        this.loadConfiguration();
    }
    close(alert) {
        this.alerts.splice(this.alerts.indexOf(alert), 1);
    }
    showMsj() {
        if (this.show) {
            this.show = false;
            this.linkMsj = 'show';
        }
        else {
            this.show = true;
            this.linkMsj = 'hide';
        }
    }
    showSuccess(message) {
        this.toastr.success(message, 'Success!');
    }
    get create_matrix_controls() {
        return this.matrixConfigurationForm.controls;
    }
    loadValidations() {
        this.matrixConfigurationForm = this.formBuilder.group({
            unilevel_matrix: [],
            forced_matrix: [],
            binary_matrix: [],
            front_affiliates: ['', Validators.required],
            software_millenium: ['', Validators.required],
        });
    }
    onAddRowSave() {
        var _a, _b, _c;
        this.submitted = true;
        if (this.matrixConfigurationForm.invalid) {
            return;
        }
        this.matrixConfiguration.uni_level_matrix =
            (_a = this.matrixConfigurationForm.value.unilevel_matrix) !== null && _a !== void 0 ? _a : false;
        this.matrixConfiguration.force_matrix =
            (_b = this.matrixConfigurationForm.value.forced_matrix) !== null && _b !== void 0 ? _b : false;
        this.matrixConfiguration.binary_matrix =
            (_c = this.matrixConfigurationForm.value.binary_matrix) !== null && _c !== void 0 ? _c : false;
        this.matrixConfiguration.affiliates_front_num =
            this.matrixConfigurationForm.value.front_affiliates;
        this.matrixConfiguration.software_millennium_front_num =
            this.matrixConfigurationForm.value.software_millenium;
        this.configurationService
            .createMatrixConfiguration(this.matrixConfiguration)
            .subscribe((resp) => {
            this.showSuccess('The configuration was update successfully!');
            this.loadConfiguration();
        });
    }
    loadConfiguration() {
        this.configurationService
            .getMatrixConfiguration()
            .subscribe((resp) => {
            this.matrixConfigurationForm.setValue({
                unilevel_matrix: resp.uni_level_matrix,
                forced_matrix: resp.force_matrix,
                binary_matrix: resp.binary_matrix,
                front_affiliates: resp.affiliates_front_num,
                software_millenium: resp.software_millennium_front_num,
            });
        });
    }
};
ArraysConfigurationsComponent = __decorate([
    Component({
        selector: 'app-arrays-configurations',
        templateUrl: './arrays-configurations.component.html',
        providers: [ToastrService],
    })
], ArraysConfigurationsComponent);
export { ArraysConfigurationsComponent };
//# sourceMappingURL=arrays-configurations.component.js.map