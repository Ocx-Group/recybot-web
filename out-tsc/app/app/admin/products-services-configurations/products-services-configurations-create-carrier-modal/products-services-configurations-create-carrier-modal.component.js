import { __decorate } from "tslib";
import { Component, ViewChild } from '@angular/core';
import { Validators, } from '@angular/forms';
let ProductsServicesConfigurationsCreateCarrierModalComponent = class ProductsServicesConfigurationsCreateCarrierModalComponent {
    constructor(formBuilder) {
        this.formBuilder = formBuilder;
        this.title = 'angular13bestcode';
        this.general_parameters_step = false;
        this.place_shipping_costs_step = false;
        this.summary_step = false;
        this.step = 1;
    }
    ngOnInit() {
        this.generalParameters = this.formBuilder.group({
            carrier_name: ['', Validators.required],
            delivery_time: ['', Validators.required],
        });
        this.placeShippingCosts = this.formBuilder.group({
            commission_shipment: [''],
            out_range: [''],
            include_maintenance_costs: [''],
            free_delivery: [''],
            billing: [''],
            range_1: ['', Validators.required],
            range_2: ['', Validators.required],
            zone: ['', Validators.required],
            cost: ['', Validators.required],
        });
        this.summary = this.formBuilder.group({});
    }
    get general_parameters_controls() {
        return this.generalParameters.controls;
    }
    get place_shipping_costs_controls() {
        return this.placeShippingCosts.controls;
    }
    get summary_controls() {
        return this.summary.controls;
    }
    next() {
        if (this.step == 1) {
            this.general_parameters_step = true;
            if (this.generalParameters.invalid) {
                return;
            }
            this.step++;
        }
        else if (this.step == 2) {
            this.place_shipping_costs_step = true;
            if (this.placeShippingCosts.invalid) {
                return;
            }
            this.step++;
        }
    }
    previous() {
        this.step--;
        if (this.step == 1) {
            this.place_shipping_costs_step = false;
        }
        if (this.step == 2) {
            this.summary_step = false;
        }
    }
    submit() {
        if (this.step == 3) {
            this.summary_step = true;
            if (this.summary.invalid) {
                return;
            }
            alert('Well done!!');
        }
    }
};
__decorate([
    ViewChild('carrierCreateModal')
], ProductsServicesConfigurationsCreateCarrierModalComponent.prototype, "carrierCreateModal", void 0);
ProductsServicesConfigurationsCreateCarrierModalComponent = __decorate([
    Component({
        selector: 'app-products-services-configurations-create-carrier-modal',
        templateUrl: './products-services-configurations-create-carrier-modal.component.html',
        styleUrls: [
            'products-services-configurations-create-carrier-modal.component.scss',
        ],
    })
], ProductsServicesConfigurationsCreateCarrierModalComponent);
export { ProductsServicesConfigurationsCreateCarrierModalComponent };
//# sourceMappingURL=products-services-configurations-create-carrier-modal.component.js.map