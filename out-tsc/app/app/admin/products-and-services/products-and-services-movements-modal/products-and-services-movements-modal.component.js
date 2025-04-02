import { __decorate } from "tslib";
import { Component, HostListener, ViewChild } from '@angular/core';
import { ProductInventory } from '@app/core/models/product-inventory-model/product-inventory.model';
const header = ['Ingreso', 'Egreso', 'Soporte', 'Nota', 'Tipo', 'Fecha'];
let ProductsAndServicesMovementsModalComponent = class ProductsAndServicesMovementsModalComponent {
    constructor(modalService, printService, productInventoryService) {
        this.modalService = modalService;
        this.printService = printService;
        this.productInventoryService = productInventoryService;
        this.rows = [];
        this.temp = [];
        this.loadingIndicator = true;
        this.reorderable = true;
        this.scrollBarHorizontal = window.innerWidth < 1200;
        this.productInventory = new ProductInventory();
    }
    ngOnInit() { }
    onResize(event) {
        if (this.tableMovements) {
            this.scrollBarHorizontal = window.innerWidth < 1200;
            this.tableMovements.recalculate();
            this.tableMovements.recalculateColumns();
        }
    }
    movementsOpenModal(content, row) {
        this.productInventory.idProduct = row.id;
        this.loadMovementsList(this.productInventory.idProduct);
        this.modalService.open(content, {
            ariaLabelledBy: 'modal-basic-title',
            size: 'xl',
        });
    }
    loadMovementsList(id) {
        this.productInventoryService
            .getProductsInventoryByProductId(id)
            .subscribe((resp) => {
            if (resp != null) {
                this.temp = [...resp];
                this.rows = resp;
                this.loadingIndicator = false;
            }
        });
    }
    onPrint() {
        const body = this.temp.map((items) => {
            const data = [
                items.ingress,
                items.egress,
                items.support,
                items.note,
                items.type,
                items.date
            ];
            return data;
        });
        this.printService.print(header, body, 'Lista de Movimientos del Producto', false);
    }
};
__decorate([
    ViewChild('tableMovements')
], ProductsAndServicesMovementsModalComponent.prototype, "tableMovements", void 0);
__decorate([
    ViewChild('movementsProductsModal')
], ProductsAndServicesMovementsModalComponent.prototype, "movementsProductsModal", void 0);
__decorate([
    HostListener('window:resize', ['$event'])
], ProductsAndServicesMovementsModalComponent.prototype, "onResize", null);
ProductsAndServicesMovementsModalComponent = __decorate([
    Component({
        selector: 'app-products-and-services-movements-modal',
        templateUrl: './products-and-services-movements-modal.component.html',
    })
], ProductsAndServicesMovementsModalComponent);
export { ProductsAndServicesMovementsModalComponent };
//# sourceMappingURL=products-and-services-movements-modal.component.js.map