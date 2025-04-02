export class Ticket {
    constructor() {
        this.id = 0;
        this.affiliateId = 0;
        this.categoryId = 0;
        this.subject = '';
        this.status = false;
        this.isRead = false;
        this.images = [];
        this.description = '';
        this.createdAt = new Date();
        this.updatedAt = new Date();
        this.messages = [];
        this.userName = '';
    }
}
//# sourceMappingURL=ticket.model.js.map