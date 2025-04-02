import { __decorate } from "tslib";
import { Component, HostListener, ViewChild } from '@angular/core';
import { ProductConfiguration } from '@app/core/models/product-configuration-model/product-configuration.model';
let ProductsServicesConfigurationsComponent = class ProductsServicesConfigurationsComponent {
    constructor(modalService, configurationService, toastr, formBuilder) {
        this.modalService = modalService;
        this.configurationService = configurationService;
        this.toastr = toastr;
        this.formBuilder = formBuilder;
        this.productConfiguration = new ProductConfiguration();
        this.submitted = false;
        this.active = 1;
        this.tab = 1;
        this.rows = [];
        this.temp = [];
        this.loadingIndicator = true;
        this.reorderable = true;
        this.scrollBarHorizontal = window.innerWidth < 1200;
    }
    ngOnInit() {
        this.loadValidations();
        this.loadProductConfiguration();
    }
    onResize(event) {
        if (this.table) {
            this.scrollBarHorizontal = window.innerWidth < 1200;
            this.table.recalculate();
            this.table.recalculateColumns();
        }
    }
    getRowHeight(row) {
        return row.height;
    }
    loadValidations() {
        this.productConfigurationForm = this.formBuilder.group({
            activate_shipping_system: [''],
            passive_payments_module: [''],
            activate_public_store: [''],
            days_product_label: [''],
            currency_symbol: [''],
            symbol_commissionable_value: [''],
            points_symbol_qualify: [''],
            binary_points_symbol: [''],
        });
    }
    showSuccess(message) {
        this.toastr.success(message, 'Success!');
    }
    get product__configuration_controls() {
        return this.productConfigurationForm.controls;
    }
    updateFilter(event) {
        const val = event.target.value.toLowerCase();
        const temp = this.temp.filter(function (d) {
            return d.name.toLowerCase().indexOf(val) !== -1 || !val;
        });
        this.rows = temp;
        this.table.offset = 0;
    }
    createCarrierOpenModal(content) {
        this.modalService.open(content, {
            ariaLabelledBy: 'modal-basic-title',
            size: 'xl',
        });
    }
    loadProductConfiguration() {
        this.configurationService.getProductConfiguration().subscribe((resp) => {
            if (resp != null) {
                this.productConfigurationForm.setValue({
                    activate_shipping_system: resp.activate_shipping_system,
                    passive_payments_module: resp.activate_passive_payments_module,
                    activate_public_store: resp.activate_public_shop,
                    days_product_label: resp.new_product_label,
                    currency_symbol: resp.currency_symbol,
                    symbol_commissionable_value: resp.symbol_commissionable_value,
                    points_symbol_qualify: resp.symbol_points_qualify,
                    binary_points_symbol: resp.binary_points_symbol,
                });
            }
        });
    }
    onSaveProductConfiguration() {
        this.submitted = true;
        if (this.productConfigurationForm.invalid) {
            return;
        }
        this.productConfiguration.activate_shipping_system = this.productConfigurationForm.value.activate_shipping_system;
        this.productConfiguration.activate_passive_payments_module = this.productConfigurationForm.value.passive_payments_module;
        this.productConfiguration.activate_public_shop = this.productConfigurationForm.value.activate_public_store;
        this.productConfiguration.new_product_label = this.productConfigurationForm.value.days_product_label;
        this.productConfiguration.currency_symbol = this.productConfigurationForm.value.currency_symbol;
        this.productConfiguration.symbol_commissionable_value = this.productConfigurationForm.value.symbol_commissionable_value;
        this.productConfiguration.symbol_points_qualify = this.productConfigurationForm.value.points_symbol_qualify;
        this.productConfiguration.binary_points_symbol = this.productConfigurationForm.value.binary_points_symbol;
        this.configurationService.createProductConfiguration(this.productConfiguration).subscribe((resp) => {
            if (resp.success) {
                this.showSuccess('The product configuration was update successfully!');
                this.loadProductConfiguration();
            }
        });
    }
};
__decorate([
    ViewChild('table')
], ProductsServicesConfigurationsComponent.prototype, "table", void 0);
__decorate([
    HostListener('window:resize', ['$event'])
], ProductsServicesConfigurationsComponent.prototype, "onResize", null);
ProductsServicesConfigurationsComponent = __decorate([
    Component({
        selector: 'app-products-services-configurations',
        templateUrl: './products-services-configurations.component.html',
    })
], ProductsServicesConfigurationsComponent);
export { ProductsServicesConfigurationsComponent };
//# sourceMappingURL=products-services-configurations.component.js.map