import { ProductCategory } from '../product-category-model/product-category.model';
export class Product {
    constructor() {
        this.id = 0;
        this.categoryId = 0;
        this.salePrice = 0;
        this.commissionableValue = 0;
        this.binaryPoints = 0;
        this.valuePoints = 0;
        this.tax = 0;
        this.inventory = false;
        this.paymentGroup = 0;
        this.acumCompMin = false;
        this.weight = 0;
        this.offer = false;
        this.comment = false;
        this.hideCommissionable = false;
        this.hidePoint = false;
        this.activeHtmlContent = false;
        this.activeZoomPhotos = false;
        this.date = new Date();
        this.visible = false;
        this.visiblePublic = false;
        this.productType = false;
        this.state = false;
        this.activateCombinations = false;
        this.productPacks = false;
        this.baseAmount = 0;
        this.dailyPercentage = 0;
        this.daysWait = 0;
        this.amountDayPay = 0;
        this.recurringProduct = false;
        this.productHome = false;
        this.associatedQualification = 0;
        this.name = '';
        this.description = '';
        this.descriptionHtml = '';
        this.productCode = '';
        this.keyWord = '';
        this.productsCategory = new ProductCategory();
        this.createdAt = new Date();
        this.updatedAt = new Date();
        this.image = '';
    }
}
//# sourceMappingURL=product.model.js.map