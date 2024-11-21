import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { delay, retryWhen, take } from 'rxjs';
import Swal from 'sweetalert2';
let PurchaseConfirmationComponent = class PurchaseConfirmationComponent {
    constructor(activatedRoute, router, invoiceService, toastrService) {
        this.activatedRoute = activatedRoute;
        this.router = router;
        this.invoiceService = invoiceService;
        this.toastrService = toastrService;
        this.invoiceDownloaded = false;
    }
    ngOnInit() {
        this.activatedRoute.params.subscribe(params => {
            const token = params['parametro1'];
            const reference = params['parametro2'];
            if (token && reference) {
                this.showConfirmationAlert(token, reference);
            }
        });
    }
    showConfirmationAlert(token, reference) {
        let counter = 120;
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
        });
        const swalTimerInterval = setInterval(() => {
            if (counter === 110) {
                this.onDownloadInvoice(reference);
            }
            if (counter === 0 || this.invoiceDownloaded) {
                clearInterval(swalTimerInterval);
                Swal.close();
                this.router.navigate(['/app/home']);
            }
            counter--;
        }, 1000);
        swalWithBootstrapButtons.fire({
            title: 'Confirmación de Compra',
            html: `Su compra está siendo procesada, por favor espere mientras se realiza el proceso.<br></strong>`,
            icon: 'success',
            timer: 120000,
            timerProgressBar: true,
            didOpen: () => {
                Swal.showLoading();
            },
        }).then((result) => {
            if (result.dismiss === Swal.DismissReason.timer) {
                this.router.navigate(['/app/home']);
            }
        });
    }
    onDownloadInvoice(reference) {
        this.invoiceService.createInvoiceByReference(reference).pipe(retryWhen(errors => errors.pipe(delay(30000), take(3)))).subscribe({
            next: (result) => {
                this.brandId = result.brandId;
                const blobUrl = window.URL.createObjectURL(result.blob);
                const a = document.createElement('a');
                a.href = blobUrl;
                a.download = `invoice_${reference}.pdf`;
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(blobUrl);
                document.body.removeChild(a);
                this.invoiceDownloaded = true;
            },
            error: (err) => {
                console.log(err);
                this.showError('Error downloading the invoice. Please try again.');
            },
        });
    }
    showError(message) {
        this.toastrService.error(message, 'Error');
    }
};
PurchaseConfirmationComponent = __decorate([
    Component({
        selector: 'app-purchase-confirm',
        templateUrl: './purchase-confirmation.component.html',
        styleUrls: ['./purchase-confirmation.component.sass']
    })
], PurchaseConfirmationComponent);
export { PurchaseConfirmationComponent };
//# sourceMappingURL=purchase-confirmation.component.js.map