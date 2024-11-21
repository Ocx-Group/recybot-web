import { __awaiter, __decorate } from "tslib";
import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { BehaviorSubject, Subject } from 'rxjs';
import { HubConnectionState } from "@microsoft/signalr";
import { environment } from '@environments/environment';
let TicketHubService = class TicketHubService {
    constructor() {
        this.messageReceived = new Subject();
        this.connectionError = new Subject();
        this.ticketCreated = new BehaviorSubject(null);
        this.ticketsReceived = new Subject();
        this.connectionEstablished = new BehaviorSubject(false);
        this.ticketSummaries = new BehaviorSubject([]);
        this.brandId = 2;
        this.urlApi = environment.apis.accountServiceSignalR;
        this.startConnection().then();
        const savedTicket = localStorage.getItem('ticket');
        this.ticketSave = new BehaviorSubject(savedTicket ? JSON.parse(savedTicket) : null);
    }
    setTicket(ticketId) {
        this.ticketSave.next(ticketId);
        localStorage.setItem('ticket', JSON.stringify(ticketId));
    }
    getTicket() {
        return this.ticketSave.asObservable();
    }
    startConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            this.hubConnection = new signalR.HubConnectionBuilder()
                .withUrl(`https://account.ecosystemfx.net/ticketHub`, { withCredentials: true })
                .withAutomaticReconnect()
                .build();
            try {
                yield this.hubConnection.start();
                this.addMessageListener();
                this.connectionEstablished.next(true);
            }
            catch (error) {
                console.error(`Error al iniciar la conexión: ${error}`);
                this.connectionEstablished.next(false);
                this.connectionError.next(`Error al iniciar la conexión: ${error}`);
                throw error;
            }
        });
    }
    addMessageListener() {
        this.hubConnection.on('ReceiveMessage', (message) => {
            this.messageReceived.next(message);
        });
        this.hubConnection.on('TicketCreated', (ticket) => {
            this.ticketCreated.next(ticket);
        });
        this.hubConnection.on('ReceiveTickets', (tickets) => {
            this.ticketsReceived.next(tickets);
        });
        this.hubConnection.on('ReceiveTicketsForAdmin', (tickets) => {
            this.ticketsReceived.next(tickets);
        });
        this.hubConnection.on('DeleteTicket', (ticket) => {
            this.ticketCreated.next(ticket);
        });
        this.hubConnection.on('GetTicketById', (ticket) => {
            this.ticketCreated.next(ticket);
        });
        this.hubConnection.on('ReceiveTicketSummaries', (ticketSummaries) => {
            this.ticketSummaries.next(ticketSummaries);
        });
    }
    joinRoom(ticketId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.hubConnection.invoke('JoinTicketRoom', ticketId);
                return true;
            }
            catch (error) {
                console.error(`Error al unirse a la sala: ${error}`);
                this.connectionError.next(`Error al unirse a la sala: ${error}`);
                return false;
            }
        });
    }
    leaveRoom(ticketId) {
        this.hubConnection.invoke('LeaveTicketRoom', ticketId)
            .catch(error => console.error(`Error al salir de la sala: ${error}`));
    }
    sendMessage(ticketMessage) {
        this.hubConnection.invoke('SendMessageToTicket', ticketMessage)
            .catch(error => console.error(`Error al enviar mensaje: ${error}`));
    }
    stopConnection() {
        this.hubConnection.stop()
            .catch(error => console.error(`Error al detener la conexión: ${error}`));
    }
    createTicket(ticketRequest) {
        if (!this.hubConnection) {
            return Promise.reject("Hub connection is not established.");
        }
        return new Promise((resolve, reject) => {
            this.hubConnection.invoke('CreateTicket', ticketRequest, this.brandId)
                .then(response => resolve(response))
                .catch(error => {
                console.error(`Error al crear el ticket: ${error}`);
                reject(error);
            });
        });
    }
    getAllTicketsByAffiliateId(affiliateId) {
        if (this.hubConnection.state === HubConnectionState.Connected) {
            this.hubConnection.invoke('GetAllTicketsByAffiliateId', affiliateId, this.brandId)
                .catch(error => {
                console.error(`Error retrieving tickets: ${error}`);
            });
        }
        else {
            console.error('Cannot send data if the connection is not in the \'Connected\' State.');
        }
        return this.ticketsReceived;
    }
    getAllTickets() {
        if (this.hubConnection.state === HubConnectionState.Connected) {
            this.hubConnection.invoke('GetAllTickets', this.brandId)
                .catch(error => {
                console.error(`Error retrieving tickets: ${error}`);
            });
        }
        else {
            console.error('Cannot send data if the connection is not in the \'Connected\' State.');
        }
        return this.ticketsReceived;
    }
    deleteTickets(ticketIds) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.hubConnection.state === HubConnectionState.Connected) {
                return this.hubConnection.invoke('DeleteTickets', ticketIds)
                    .then(tickets => {
                    return tickets;
                })
                    .catch(error => {
                    console.error(`Error deleting tickets: ${error}`);
                    throw new Error(`Error deleting tickets: ${error}`);
                });
            }
            else {
                console.error('Cannot delete if the connection is not in the \'Connected\' State.');
                return null;
            }
        });
    }
    getTicketById(ticketId) {
        if (this.hubConnection.state === HubConnectionState.Connected) {
            this.hubConnection.invoke('GetTicketById', ticketId)
                .then(ticket => {
                if (ticket) {
                    this.ticketCreated.next(ticket);
                }
                else {
                    console.error('No ticket received');
                    this.ticketCreated.next(null);
                }
            })
                .catch(error => {
                console.error(`Error retrieving ticket: ${error}`);
                this.ticketCreated.next(null);
            });
        }
        else {
            console.error('Connection is not in the \'Connected\' State.');
        }
    }
    getTicketSummariesByAffiliateId(affiliateId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.hubConnection.state === HubConnectionState.Connected) {
                this.hubConnection.invoke('GetTicketSummariesByAffiliateId', affiliateId, this.brandId)
                    .catch(error => console.error(`Error al obtener tickets: ${error}`));
            }
            else {
                console.error('Connection is not in the \'Connected\' State.');
            }
        });
    }
    markTicketMessagesAsRead(ticketId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.hubConnection.state === HubConnectionState.Connected) {
                this.hubConnection.invoke('MarkTicketMessagesAsRead', ticketId, this.brandId)
                    .catch(error => console.error(`Error al marcar mensajes como leidos: ${error}`));
            }
            else {
                console.error('Connection is not in the \'Connected\' State.');
            }
        });
    }
    getAllTicketSummaries() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.hubConnection.state === HubConnectionState.Connected) {
                this.hubConnection.invoke('GetAllTicketSummaries', this.brandId)
                    .catch(error => console.error(`Error al obtener tickets: ${error}`));
            }
            else {
                console.error('Connection is not in the \'Connected\' State.');
            }
        });
    }
};
TicketHubService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], TicketHubService);
export { TicketHubService };
//# sourceMappingURL=ticket-hub.service.js.map