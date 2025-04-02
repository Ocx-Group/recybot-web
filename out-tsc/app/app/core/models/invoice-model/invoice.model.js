export class Invoice {
    constructor() {
        this.id = 0;
        this.invoiceNumber = 0;
        this.purchaseOrderId = 0;
        this.affiliateId = 0;
        this.totalInvoice = 0;
        this.totalInvoiceBtc = 0;
        this.totalCommissionable = 0;
        this.totalPoints = 0;
        this.state = false;
        this.status = false;
        this.date = new Date();
        this.cancellationDate = new Date();
        this.paymentMethod = '';
        this.bank = '';
        this.receiptNumber = '';
        this.depositDate = new Date();
        this.type = false;
        this.reason = '';
        this.invoiceData = '';
        this.invoiceAddress = '';
        this.shippingAddress = '';
        this.secretKey = '';
        this.btcAddress = '';
        this.recurring = 0;
        this.createdAt = new Date();
        this.updatedAt = new Date();
        this.invoiceDetail = [];
    }
}
//# sourceMappingURL=invoice.model.js.map