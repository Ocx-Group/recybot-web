import { __decorate } from "tslib";
import { Component, ViewChild } from '@angular/core';
import { takeUntil } from "rxjs/operators";
import Swal from "sweetalert2";
import { Subject } from "rxjs";
import { TicketMessageRequest } from "@app/core/models/ticket-model/ticket-message-request.model";
let TicketViewAdminComponent = class TicketViewAdminComponent {
    constructor(ticketHubService, authService, cdr) {
        this.ticketHubService = ticketHubService;
        this.authService = authService;
        this.cdr = cdr;
        this.destroy$ = new Subject();
        this.config = {
            wheelSpeed: 0.5,
            swipeEasing: true,
            minScrollbarLength: 20,
            maxScrollbarLength: 50,
        };
        this.ticketMessage = new TicketMessageRequest();
        this.messages = new Set();
    }
    ngOnInit() {
        this.user = this.authService.currentUserAdminValue;
        this.ticketHubService.getTicket().subscribe(ticketId => {
            this.startConnection(ticketId);
        });
    }
    ngOnDestroy() {
        this.ticketHubService.leaveRoom(this.ticket.id);
        this.destroy$.next();
        this.destroy$.complete();
        this.messages.clear();
    }
    startConnection(ticketId) {
        this.ticketHubService.startConnection().then(() => {
            this.ticketHubService.joinRoom(ticketId).then();
            this.getTicketById(ticketId);
            this.receivedMessage();
        }, error => console.error('Error al conectar o unirse a la sala:', error));
    }
    showTicketDetails() {
        Swal.fire({
            title: `Detalles del Ticket ${this.ticket.id}`,
            text: this.ticket.description,
            icon: 'info',
            confirmButtonText: 'Cerrar'
        }).then();
    }
    getTicketById(ticketId) {
        this.ticketHubService.getTicketById(ticketId);
        this.ticketHubService.ticketCreated.subscribe({
            next: (ticket) => {
                if (ticket) {
                    this.ticket = ticket;
                    if (ticket.messages && ticket.messages.length > 0) {
                        ticket.messages.forEach(message => this.processMessageSender(message));
                    }
                    else {
                        console.log('Ticket received without messages');
                    }
                }
                else {
                    console.log('No ticket received or connection not established');
                }
            },
            error: (err) => {
                console.error('Error recibiendo ticket:', err);
            }
        });
    }
    receivedMessage() {
        return this.ticketHubService.messageReceived.pipe(takeUntil(this.destroy$)).subscribe({
            next: (message) => this.processMessageSender(message),
            error: (err) => console.error('Error recibiendo mensajes:', err)
        });
    }
    sendMessage() {
        if (this.newMessage.trim() && this.ticketHubService.connectionEstablished.value) {
            this.ticketMessage.id = this.user.id;
            this.ticketMessage.ticketId = this.ticket.id;
            this.ticketMessage.userId = this.user.id;
            this.ticketMessage.messageContent = this.newMessage;
            this.ticketMessage.userName = this.user.user_name;
            this.ticketMessage.imageProfileUrl = this.user.image_profile_url;
            this.ticketHubService.sendMessage(this.ticketMessage);
            this.newMessage = '';
        }
        else {
            console.error('Intento de enviar mensaje con la conexión no establecida.');
        }
    }
    processMessageSender(message) {
        message.createdAt = new Date();
        this.messages.add(message);
        this.cdr.detectChanges();
        setTimeout(() => {
            this.scrollToBottom();
        }, 100);
    }
    isAdmin(userId) {
        return userId == this.user.id;
    }
    scrollToBottom() {
        try {
            this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
        }
        catch (err) {
            console.error('Could not automatically scroll to the bottom', err);
        }
    }
};
__decorate([
    ViewChild('scrollMe')
], TicketViewAdminComponent.prototype, "myScrollContainer", void 0);
TicketViewAdminComponent = __decorate([
    Component({
        selector: 'app-tick-view',
        templateUrl: './ticket-view-admin.component.html',
        styleUrls: ['./ticket-view-admin.component.sass']
    })
], TicketViewAdminComponent);
export { TicketViewAdminComponent };
//# sourceMappingURL=ticket-view-admin.component.js.map