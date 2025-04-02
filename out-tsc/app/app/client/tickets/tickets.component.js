import { __awaiter, __decorate } from "tslib";
import { Component, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';
import { CreateTicketModalComponent } from './create-ticket-modal/create-ticket-modal.component';
import { UserAffiliate } from '@app/core/models/user-affiliate-model/user.affiliate.model';
let TicketsComponent = class TicketsComponent {
    constructor(authService, ticketHubService, ticketCategoryService, router, modalService, toast) {
        this.authService = authService;
        this.ticketHubService = ticketHubService;
        this.ticketCategoryService = ticketCategoryService;
        this.router = router;
        this.modalService = modalService;
        this.toast = toast;
        this.user = new UserAffiliate();
        this.messages = [];
        this.tickets = [];
        this.categories = [];
        this.selectedTicket = {};
        this.selectedTickets = [];
        this.loadingIndicator = true;
        this.reorderable = true;
        this.scrollBarHorizontal = window.innerWidth < 1200;
        this.SelectionType = SelectionType;
        this.unsubscribe$ = new Subject();
    }
    ngOnInit() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.ticketHubService.startConnection();
            }
            catch (error) {
                console.error('Error starting connection:', error);
            }
            this.user = this.authService.currentUserAffiliateValue;
            this.initSignalRConnection();
            this.loadTicketCategories();
        });
    }
    ngAfterViewInit() {
        this.createTicketModal.reloadRequested.pipe(takeUntil(this.unsubscribe$)).subscribe(() => {
            this.loadAllTickets();
        });
        this.showOnboardingTour().then();
    }
    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
        this.ticketHubService.stopConnection();
    }
    showSuccess(message) {
        this.toast.success(message);
    }
    showError(message) {
        this.toast.error(message);
    }
    initSignalRConnection() {
        this.ticketHubService.connectionEstablished.pipe(takeUntil(this.unsubscribe$)).subscribe((isConnected) => {
            if (isConnected) {
                this.loadAllTickets();
            }
            else {
                console.error('Failed to establish connection');
            }
        });
    }
    loadAllTickets() {
        this.ticketHubService.getAllTicketsByAffiliateId(this.user.id).pipe(takeUntil(this.unsubscribe$)).subscribe({
            next: (tickets) => {
                this.tickets = tickets;
                this.loadingIndicator = false;
            },
            error: () => {
                this.showError('Error al cargar tickets.');
            }
        });
    }
    loadTicketCategories() {
        this.ticketCategoryService.getAll().pipe(takeUntil(this.unsubscribe$)).subscribe({
            next: (value) => {
                this.categories = value;
            },
            error: () => {
                this.showError('Error al cargar las categorías.');
            },
        });
    }
    openCreateTicketModal() {
        this.createTicketModal.openModal();
    }
    getCategoryName(categoryId) {
        const category = this.categories.find(cat => cat.id === categoryId);
        return category ? category.categoryName : 'Categoría no encontrada';
    }
    openTicketDetails(ticket) {
        this.ticketHubService.setTicket(ticket.id);
        this.router.navigate(['app/tickets/message']).then();
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
    showOnboardingTour() {
        return __awaiter(this, void 0, void 0, function* () {
            const steps = [
                {
                    title: 'Bienvenido al sistema de tickets',
                    text: 'Este tour te guiará a través de las principales características del sistema de tickets.',
                    confirmButtonText: 'Siguiente &rarr;',
                },
                {
                    title: 'Crear Ticket',
                    text: 'Para registrar un nuevo ticket, haz clic en el botón "Crear Ticket."',
                    confirmButtonText: 'Siguiente &rarr;',
                },
                {
                    title: 'Gestión de Tickets',
                    text: 'Después de crear un ticket, podrás verlo listado en esta sección.',
                    confirmButtonText: 'Siguiente &rarr;',
                },
                {
                    title: 'Iniciar un chat',
                    text: 'Para iniciar un chat, haz clic en el ticket deseado o sobre el mensaje. Esto abrirá una nueva vista donde podrás enviar y recibir mensajes relacionados con el ticket.',
                    confirmButtonText: 'Finalizar',
                }
            ];
            for (const step of steps) {
                yield Swal.fire(Object.assign(Object.assign({}, step), { showCancelButton: true, cancelButtonText: 'Cancelar', reverseButtons: true }));
            }
            yield Swal.fire({
                title: 'Tour completado!',
                text: 'Ahora estás más familiarizado con el sistema.',
                icon: 'success',
                confirmButtonText: '¡Listo!'
            });
        });
    }
    onActivateEvent(event) {
        if (event.type === 'click' && event.event.target.type !== 'checkbox') {
            this.openTicketDetails(event.row);
        }
    }
};
__decorate([
    ViewChild(CreateTicketModalComponent)
], TicketsComponent.prototype, "createTicketModal", void 0);
__decorate([
    ViewChild('messageInput')
], TicketsComponent.prototype, "messageInputRef", void 0);
__decorate([
    ViewChild(DatatableComponent)
], TicketsComponent.prototype, "table", void 0);
TicketsComponent = __decorate([
    Component({
        selector: 'app-tickets',
        templateUrl: './tickets.component.html'
    })
], TicketsComponent);
export { TicketsComponent };
//# sourceMappingURL=tickets.component.js.map