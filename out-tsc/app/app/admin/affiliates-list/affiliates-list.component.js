import { __decorate } from "tslib";
import { Component, ViewChild, HostListener } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { CreditTransactionAdminRequest } from '@app/core/models/wallet-model/creditTransactionAdminRequest.mode';
import { BalanceInformationModalComponent } from './balance-information-modal/balance-information-modal.component';
const header = [
    'Usuario',
    'Estado',
    'Modo Afiliado',
    'Calificación',
    'Correo',
    'Fecha Registro',
    'Padre',
    'Patrocinador',
    'Patrocinador Binario',
];
let AffiliatesListComponent = class AffiliatesListComponent {
    constructor(router, affiliateService, clipboardService, toast, modalService, printService, walletService, walletModel1AService, walletModel1BService) {
        this.router = router;
        this.affiliateService = affiliateService;
        this.clipboardService = clipboardService;
        this.toast = toast;
        this.modalService = modalService;
        this.printService = printService;
        this.walletService = walletService;
        this.walletModel1AService = walletModel1AService;
        this.walletModel1BService = walletModel1BService;
        this.rows = [];
        this.temp = [];
        this.loadingIndicator = true;
        this.reorderable = true;
        this.scrollBarHorizontal = window.innerWidth < 1200;
    }
    ngOnInit() {
        this.loadAffiliateList();
    }
    onResize(event) {
        this.scrollBarHorizontal = window.innerWidth < 1200;
        this.table.recalculate();
        this.table.recalculateColumns();
    }
    createOpenModal(content) {
        this.modalService.open(content, {
            ariaLabelledBy: 'modal-basic-title',
            size: 'lg',
        });
    }
    closeModals() {
        this.modalService.dismissAll();
    }
    loadAffiliateList() {
        this.affiliateService.getAll().subscribe((affiliates) => {
            if (affiliates !== null) {
                this.temp = [...affiliates];
                this.rows = affiliates;
            }
            setTimeout(() => {
                this.loadingIndicator = false;
            }, 500);
        });
    }
    getRowHeight(row) {
        return row.height;
    }
    updateFilter(event) {
        const val = event.target.value.toLowerCase();
        const temp = this.temp.filter(function (d) {
            return d.user_name.toLowerCase().indexOf(val) !== -1 || !val;
        });
        this.rows = temp;
        this.table.offset = 0;
    }
    clipBoardCopy() {
        var string = JSON.stringify(this.temp);
        var result = this.clipboardService.copyFromContent(string);
        if (this.temp != null) {
            this.toast.info('no data to copy');
        }
        else {
            this.toast.success('copied ' + this.temp.length + ' rows successfully');
        }
    }
    showSuccess(message) {
        this.toast.success(message);
    }
    showError(message) {
        this.toast.error(message);
    }
    onPrint() {
        const body = this.temp.map((items) => {
            const data = [
                items.user_name,
                items.status,
                items.affiliate_mode,
                items.external_grading_id,
                items.email,
                items.created_at,
                items.father,
                items.sponsor,
                items.binary_sponsor,
            ];
            return data;
        });
        this.printService.print(header, body, 'Lista de Afiliados', false);
    }
    onRouteUnilevelTree(id) {
        this.router.navigate([`admin/unilevel-tree/${id}`]);
    }
    onRouteForceGenealogicalTree() {
        this.router.navigate(['admin/force-genealogical-tree']);
    }
    onRouteBinaryGenealogicalTree(id) {
        this.router.navigate([`admin/binary-genealogical-tree/${id}`]);
    }
    confirmationCreateBalance(user) {
        Swal.fire({
            title: 'Acreditar Saldo',
            html: `
        <label id="swal-input-label" class="col-red">Usuario: ${user.user_name}</label>
        <br>
        <label for="swal-input-amount">Monto a Acreditar:</label>
        <input id="swal-input-amount" type="number" class="swal2-input" placeholder="Ingrese el monto">
        <br>
        <br>
        <label for="swal-select-type">Elija el saldo a crear:</label>
        <br>
        <br>
        <select id="swal-select-type" class="swal2-input">
          <option value="modelo2">Saldo Disponible Modelo2</option>
        </select>
      `,
            icon: 'info',
            confirmButtonText: 'Confirmar',
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            focusConfirm: false,
            preConfirm: () => {
                const amount = Swal.getPopup().querySelector('#swal-input-amount').value;
                const type = Swal.getPopup().querySelector('#swal-select-type').value;
                if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
                    Swal.showValidationMessage('Por favor ingrese un monto válido.');
                    return false;
                }
                return {
                    amount: Number(amount),
                    type
                };
            }
        }).then((result) => {
            if (result.isConfirmed && result.value !== false) {
                let creditRequest = new CreditTransactionAdminRequest();
                creditRequest.affiliateId = user.id;
                creditRequest.amount = result.value.amount;
                switch (result.value.type) {
                    case 'modelo2':
                        this.createAvailableBalance(creditRequest);
                        break;
                    case 'modelo1a':
                        this.createServiceBalanceModel1A(creditRequest);
                        break;
                    case 'modelo1b':
                        this.createServiceBalanceModel1B(creditRequest);
                        break;
                    default:
                        console.error('Tipo de saldo desconocido:', result.value.type);
                }
            }
        });
    }
    createAvailableBalance(request) {
        this.walletService.createBalanceAdmin(request).subscribe({
            next: (value) => {
                if (value.success) {
                    this.showSuccess('Se ha acreditado el saldo correctamente.');
                }
                else {
                    this.showError('No se pudo crear la transacción');
                }
            },
            error: (err) => {
                this.showError('Error');
            },
        });
    }
    createServiceBalanceModel1A(request) {
        this.walletModel1AService.createServiceBalanceAdmin(request).subscribe({
            next: (value) => {
                if (value.success) {
                    this.showSuccess('Se ha acreditado el saldo correctamente.');
                }
                else {
                    this.showError('No se pudo crear la transacción');
                }
            },
            error: (err) => {
                this.showError('Error');
            },
        });
    }
    createServiceBalanceModel1B(request) {
        this.walletModel1BService.createServiceBalanceAdmin(request).subscribe({
            next: (value) => {
                if (value.success) {
                    this.showSuccess('Se ha acreditado el saldo correctamente.');
                }
                else {
                    this.showError('No se pudo crear la transacción');
                }
            },
            error: (err) => {
                this.showError('Error');
            },
        });
    }
    openBalanceInformationModal(userAffiliate) {
        if (this.balanceInformationModalComponent) {
            this.balanceInformationModalComponent.initModal(userAffiliate);
        }
    }
};
__decorate([
    ViewChild(BalanceInformationModalComponent)
], AffiliatesListComponent.prototype, "balanceInformationModalComponent", void 0);
__decorate([
    ViewChild('table')
], AffiliatesListComponent.prototype, "table", void 0);
__decorate([
    HostListener('window:resize', ['$event'])
], AffiliatesListComponent.prototype, "onResize", null);
AffiliatesListComponent = __decorate([
    Component({
        selector: 'app-affiliates-list',
        templateUrl: './affiliates-list.component.html',
        providers: [ToastrService],
    })
], AffiliatesListComponent);
export { AffiliatesListComponent };
//# sourceMappingURL=affiliates-list.component.js.map