import { __awaiter, __decorate } from "tslib";
import { Component, ViewChild } from '@angular/core';
import { takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";
import { DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';
import Swal from 'sweetalert2';
import { CreateAdminModalComponent } from "@app/admin/tickets/create-admin-modal/create-admin-modal.component";
let TicketsAdminComponent = class TicketsAdminComponent {
    constructor(ticketHubService, ticketCategoryService, router, modalService, toast) {
        this.ticketHubService = ticketHubService;
        this.ticketCategoryService = ticketCategoryService;
        this.router = router;
        this.modalService = modalService;
        this.toast = toast;
        this.tickets = [];
        this.unsubscribe$ = new Subject();
        this.categories = [];
        this.selectedTicket = {};
        this.selectedTickets = [];
        this.loadingIndicator = true;
        this.reorderable = true;
        this.scrollBarHorizontal = window.innerWidth < 1200;
        this.SelectionType = SelectionType;
    }
    ngOnInit() {
        return __awaiter(this, void 0, void 0, function* () {
            this.ticketHubService.connectionEstablished.subscribe(connected => {
                if (connected) {
                    this.loadTicketCategories();
                    this.getAllTickets();
                }
                else {
                    console.error('Connection is not established.');
                }
            });
        });
    }
    showSuccess(message) {
        this.toast.success(message);
    }
    showError(message) {
        this.toast.error(message);
    }
    loadTicketCategories() {
        this.ticketCategoryService.getAll().pipe(takeUntil(this.unsubscribe$)).subscribe({
            next: (value) => {
                this.categories = value;
            },
            error: () => {
                this.showError('Error al cargar las categorías');
            },
        });
    }
    getCategoryName(categoryId) {
        const category = this.categories.find(cat => cat.id === categoryId);
        return category ? category.categoryName : 'Categoría no encontrada';
    }
    getAllTickets() {
        this.ticketHubService.getAllTickets().pipe(takeUntil(this.unsubscribe$)).subscribe({
            next: (tickets) => {
                this.tickets = tickets;
                this.loadingIndicator = false;
            },
            error: () => {
                this.showError('Error al cargar los tickets');
            }
        });
    }
    openTicketMessage(ticket) {
        this.ticketHubService.setTicket(ticket.id);
        this.router.navigate(['admin/ticket-for-admin/message']).then();
    }
    openModal(content, ticket) {
        this.selectedTicket.images = ticket.images || [];
        this.modalService.open(content, { size: 'lg', centered: true }).result.then(() => {
        });
    }
    onSelectTicket(ticket, selected) {
        if (selected) {
            this.selectedTickets.push(ticket);
        }
        else {
            const index = this.selectedTickets.findIndex(t => t.id === ticket.id);
            if (index !== -1) {
                this.selectedTickets.splice(index, 1);
            }
        }
    }
    isTicketSelected(ticket) {
        return this.selectedTickets.some(t => t.id === ticket.id);
    }
    onDeleteTickets() {
        if (this.selectedTickets.length > 0 && this.ticketHubService.connectionEstablished) {
            const idsToDelete = this.selectedTickets.map(ticket => ticket.id);
            Swal.fire({
                title: '¿Estás seguro?',
                text: 'Los tickets seleccionados serán eliminados.',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sí, eliminar',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.isConfirmed) {
                    this.ticketHubService.deleteTickets(idsToDelete).then(() => {
                        this.tickets = this.tickets.filter(ticket => !idsToDelete.includes(ticket.id));
                        this.selectedTickets = [];
                        this.showSuccess('Tickets eliminados exitosamente');
                    }).catch(() => {
                        this.showError('Error eliminando tickets');
                    });
                }
            });
        }
        else {
            this.showError('No ha seleccionado tickets.');
        }
    }
    openCreateTicketModal() {
        this.createTicketModal.openModal();
    }
};
__decorate([
    ViewChild(DatatableComponent)
], TicketsAdminComponent.prototype, "table", void 0);
__decorate([
    ViewChild(CreateAdminModalComponent)
], TicketsAdminComponent.prototype, "createTicketModal", void 0);
TicketsAdminComponent = __decorate([
    Component({
        selector: 'app-tickets-admin',
        templateUrl: './tickets-admin.component.html',
    })
], TicketsAdminComponent);
export { TicketsAdminComponent };
//# sourceMappingURL=tickets-admin.component.js.map