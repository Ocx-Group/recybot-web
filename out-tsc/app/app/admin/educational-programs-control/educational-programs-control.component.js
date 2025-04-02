import { __decorate } from "tslib";
import { Component, ViewChild } from '@angular/core';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import Swal from 'sweetalert2';
let EducationalProgramsControlComponent = class EducationalProgramsControlComponent {
    constructor(invoiceService) {
        this.invoiceService = invoiceService;
        this.rows = [];
        this.temp = [];
        this.properties = [];
        this.loadingIndicator = true;
        this.reorderable = true;
        this.scrollBarHorizontal = window.innerWidth < 1200;
    }
    ngOnInit() {
        this.getAllTradingAcademyPurchases();
    }
    updateFilter(event) {
        const val = event.target.value.toLowerCase();
        const temp = this.temp.filter(d => {
            if (d[this.searchField]) {
                return d[this.searchField].toString().toLowerCase().indexOf(val) !== -1;
            }
            return false;
        });
        this.rows = temp;
        this.table.offset = 0;
    }
    onPrint() {
        throw new Error('Method not implemented.');
    }
    clipBoardCopy() {
        throw new Error('Method not implemented.');
    }
    getAllTradingAcademyPurchases() {
        this.invoiceService.getAllInvoicesForTradingAcademyPurchases().subscribe({
            next: (response) => {
                this.rows = response;
                this.temp = [...response];
                this.loadingIndicator = false;
                this.properties = Object.getOwnPropertyNames(this.rows[0]);
            },
            error: (error) => {
                console.error(error);
            }
        });
    }
    sendInvitations() {
        this.showInvitationForm().then((result) => {
            if (result.isConfirmed) {
                this.handleInvitationConfirmation(result.value);
            }
        });
    }
    showInvitationForm() {
        return Swal.fire({
            title: 'Enviar Invitación de Zoom',
            html: '<input id="zoom-link" class="swal2-input" placeholder="Link de Zoom">' +
                '<input id="security-code" class="swal2-input" placeholder="Código de seguridad">',
            focusConfirm: false,
            preConfirm: () => {
                const zoomLink = document.getElementById('zoom-link').value;
                const securityCode = document.getElementById('security-code').value;
                return { zoomLink, securityCode };
            },
            showCancelButton: true,
            confirmButtonText: 'Enviar',
            cancelButtonText: 'Cancelar'
        });
    }
    handleInvitationConfirmation(values) {
        this.invoiceService.sendInvitationsForUpcomingCourses(values.zoomLink, values.securityCode).subscribe({
            next: (response) => this.showInvitationResult(response),
            error: (error) => this.showErrorMessage()
        });
    }
    showInvitationResult(response) {
        if (response.success && response.data.length > 0) {
            let invitedUsersList = response.data.map((user, index) => `${index + 1}. ${user.data.user_name} (${user.data.email})`).join('<br>');
            Swal.fire({
                icon: 'success',
                title: 'Invitaciones enviadas',
                html: `Se han enviado las invitaciones a los siguientes usuarios:<br>${invitedUsersList}`,
                showConfirmButton: true,
            }).then(() => this.captureAndDownload(invitedUsersList));
        }
        else {
            Swal.fire({
                icon: 'info',
                title: 'Ninguna invitación enviada',
                text: 'No se enviaron invitaciones.',
                showConfirmButton: false,
                timer: 1500
            });
        }
    }
    showErrorMessage() {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Ha ocurrido un error al enviar las invitaciones',
            showConfirmButton: false,
            timer: 1500
        });
    }
    captureAndDownload(invitedUsersList) {
        const content = document.createElement('div');
        content.innerHTML = `<h1 style="text-align:center; margin-top: 5mm;">Invitaciones enviadas</h1><div>${invitedUsersList}</div>`;
        content.style.width = '210mm';
        content.style.minHeight = '297mm';
        content.style.margin = '0 auto';
        content.style.fontSize = '12px';
        content.style.paddingTop = '10mm';
        document.body.appendChild(content);
        html2canvas(content, { scale: 2 }).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pageHeight = 277;
            let yOffset = 0;
            let contentHeight = content.offsetHeight / 2;
            pdf.addImage(imgData, 'PNG', 10, 10, 190, Math.min(pageHeight, contentHeight));
            while (contentHeight > yOffset + pageHeight) {
                yOffset += pageHeight;
                pdf.addPage();
                pdf.addImage(imgData, 'PNG', 10, -yOffset + 10, 190, Math.min(pageHeight, contentHeight - yOffset));
            }
            pdf.save('invitations.pdf');
            document.body.removeChild(content);
        });
    }
};
__decorate([
    ViewChild('table')
], EducationalProgramsControlComponent.prototype, "table", void 0);
EducationalProgramsControlComponent = __decorate([
    Component({
        selector: 'app-educational-programs-control',
        templateUrl: './educational-programs-control.component.html',
        styleUrls: ['./educational-programs-control.component.css']
    })
], EducationalProgramsControlComponent);
export { EducationalProgramsControlComponent };
//# sourceMappingURL=educational-programs-control.component.js.map