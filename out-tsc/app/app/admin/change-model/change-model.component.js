import { __decorate } from "tslib";
import { Component, ViewChild } from '@angular/core';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { SplitBalancesModalComponent } from './split-balances-modal/split-balances-modal.component';
import Swal from 'sweetalert2';
let ChangeModelComponent = class ChangeModelComponent {
    constructor(invoiceService, toastr) {
        this.invoiceService = invoiceService;
        this.toastr = toastr;
        this.rows = [];
        this.temp = [];
        this.loadingIndicator = true;
        this.reorderable = true;
        this.scrollBarHorizontal = window.innerWidth < 1200;
        this.selectedInvoices = [];
    }
    ngOnInit() {
        this.loadAllInvoicesForModelOneAndTwo();
        this.loadingIndicator = false;
    }
    ngAfterViewInit() {
        this.splitBalanceModalComponent.reloadRequested.subscribe(() => {
            this.loadAllInvoicesForModelOneAndTwo();
        });
    }
    openModal() {
        if (this.selectedInvoices.length === 0) {
            this.showMessage('Debe seleccionar al menos una factura para poder continuar.');
            return;
        }
        if (this.splitBalanceModalComponent && this.verifySameAffiliateInvoices()) {
            this.splitBalanceModalComponent.setInvoices(this.selectedInvoices);
            this.splitBalanceModalComponent.initModal();
        }
    }
    onSelect({ selected }) {
        this.selectedInvoices.splice(0, this.selectedInvoices.length);
        this.selectedInvoices.push(...selected);
    }
    verifySameAffiliateInvoices() {
        const currentUserName = this.selectedInvoices[0].userName;
        const result = this.selectedInvoices.every(invoice => invoice.userName === currentUserName);
        if (!result) {
            this.showMessage('No se pueden seleccionar facturas de diferentes afiliados.');
        }
        return result;
    }
    showMessage(message) {
        Swal.fire({
            title: 'Atención!',
            text: message,
            icon: 'warning',
            confirmButtonText: 'Ok'
        });
    }
    generetedPdf() {
        const DATA = document.getElementById('table');
        html2canvas(DATA).then(canvas => {
            let pdf = new jsPDF('l', 'mm', 'a4');
            const pageWidth = 297;
            const imgWidth = pageWidth - 40;
            const imgHeight = canvas.height * imgWidth / canvas.width;
            const posX = 20;
            const posY = 30;
            pdf.setFontSize(18);
            pdf.text('Lista de Modelo (1A), (1B) y 2.', pageWidth / 2, 20, { align: 'center' });
            const contentDataURL = canvas.toDataURL('image/png');
            pdf.addImage(contentDataURL, 'PNG', posX, posY, imgWidth, imgHeight);
            pdf.save('documento.pdf');
        });
    }
    copyTableData() {
        const rows = this.table._internalRows;
        if (rows && rows.length) {
            const headers = Object.keys(rows[0]);
            const data = rows.map(row => headers.map(header => row[header]));
            const tableText = [headers, ...data].map(row => row.join('\t')).join('\n');
            this.copyTextToClipboard(tableText);
        }
    }
    copyTextToClipboard(text) {
        try {
            navigator.clipboard.writeText(text);
            this.toastr.success('Se ha copiado al portapapeles');
        }
        catch (err) {
            this.toastr.error('Error al copiar al portapapeles');
        }
    }
    updateFilter(event) {
        let val = event.target.value.toLowerCase().trim();
        const modelMap = {
            'modelo 2': '2',
            'modelo 1a': '7',
            'modelo 1b': '8'
        };
        val = modelMap[val] || val;
        const temp = this.temp.filter(d => {
            if (d[this.searchField]) {
                const fieldValue = d[this.searchField].toString().toLowerCase();
                return val === '' || fieldValue === val || fieldValue === modelMap[fieldValue];
            }
            return false;
        });
        this.rows = temp;
        this.table.offset = 0;
    }
    loadAllInvoicesForModelOneAndTwo() {
        this.invoiceService.getAllInvoicesForModelOneAndTwo().subscribe({
            next: (result) => {
                this.temp = [...result];
                this.rows = result;
            },
            error: (error) => {
                console.log(error);
            }
        });
    }
};
__decorate([
    ViewChild('table')
], ChangeModelComponent.prototype, "table", void 0);
__decorate([
    ViewChild(SplitBalancesModalComponent)
], ChangeModelComponent.prototype, "splitBalanceModalComponent", void 0);
ChangeModelComponent = __decorate([
    Component({
        selector: 'app-change-model',
        templateUrl: './change-model.component.html',
        styleUrls: ['./change-model.component.css']
    })
], ChangeModelComponent);
export { ChangeModelComponent };
//# sourceMappingURL=change-model.component.js.map