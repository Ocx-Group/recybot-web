export class TicketMessage {
    constructor() {
        this.id = 0;
        this.ticketId = 0;
        this.userId = 0;
        this.messageContent = '';
        this.isRead = false;
        this.createdAt = new Date;
        this.updatedAt = new Date;
        this.deletedAt = null;
        this.userName = '';
        this.imageProfileUrl = '';
    }
}
//# sourceMappingURL=ticket-message.model.js.map