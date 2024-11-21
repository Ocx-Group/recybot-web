import { __decorate } from "tslib";
import { Component } from '@angular/core';
import Swal from 'sweetalert2';
let ServicesAndProductsComponent = class ServicesAndProductsComponent {
    constructor(toast) {
        this.toast = toast;
    }
    ngOnInit() {
    }
    showAlert() {
        Swal.fire({
            title: 'Novedades en camino',
            html: `
            <p>¡Estamos emocionados de anunciar que próximamente estarán disponibles nuevos servicios y productos!</p>
            <p>Manténgase al tanto para descubrir lo que hemos preparado para usted.</p>
        `,
            confirmButtonText: 'Entendido',
            confirmButtonColor: '#3085d6',
            showCancelButton: false,
        }).then((result) => {
            if (result.isConfirmed) {
            }
        });
    }
    onTabChange(newActive) {
        this.active = newActive;
    }
};
ServicesAndProductsComponent = __decorate([
    Component({
        selector: 'app-services-and-products',
        templateUrl: './services-and-products.component.html',
        styleUrls: ['./services-and-products.component.sass']
    })
], ServicesAndProductsComponent);
export { ServicesAndProductsComponent };
//# sourceMappingURL=services-and-products.component.js.map