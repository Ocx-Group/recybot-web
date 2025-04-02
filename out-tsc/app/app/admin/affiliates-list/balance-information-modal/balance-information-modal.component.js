import { __decorate } from "tslib";
import { Component, ViewChild } from '@angular/core';
import { BalanceInformationModel1A } from '@app/core/models/wallet-model-1a/balance-information-1a.model';
import { BalanceInformationModel1B } from '@app/core/models/wallet-model-1b/balance-information-1b.model';
import { BalanceInformation } from '@app/core/models/wallet-model/balance-information.model';
let BalanceInformationModalComponent = class BalanceInformationModalComponent {
    constructor(modalService, walletModel1AService, walletModel1BService, walletService) {
        this.modalService = modalService;
        this.walletModel1AService = walletModel1AService;
        this.walletModel1BService = walletModel1BService;
        this.walletService = walletService;
        this.withdrawalBalance = 0;
        this.userName = '';
        this.balanceInformation = new BalanceInformation();
        this.balanceInformationModel1A = new BalanceInformationModel1A();
        this.balanceInformationModel1B = new BalanceInformationModel1B();
    }
    ngOnInit() {
        this.pieChartOptions = { series: [], chart: {}, labels: [], responsive: [], dataLabels: {}, legend: {} };
        this.pieChartOptionsModel1A = { series: [], chart: {}, labels: [], responsive: [], dataLabels: {}, legend: {} };
        this.pieChartOptionsModel1B = { series: [], chart: {}, labels: [], responsive: [], dataLabels: {}, legend: {} };
    }
    ngAfterViewInit() {
    }
    initModal(userAffiliate) {
        this.modalService.open(this.balanceInformationModal, { size: 'lg', centered: true });
        this.userName = userAffiliate.user_name;
        this.getBalanceInformationModel2(userAffiliate.id);
        this.getBalanceInformationModel1A(userAffiliate.id);
        this.getBalanceInformationModel1B(userAffiliate.id);
    }
    getBalanceInformationModel2(id) {
        this.walletService.getBalanceInformationByAffiliateId(id).subscribe({
            next: (value) => {
                this.balanceInformation = value;
                this.initChartReport3();
            },
            error: (err) => {
                console.log(err);
            }
        });
    }
    getBalanceInformationModel1A(id) {
        this.walletModel1AService.getBalanceInformationByAffiliateId(id).subscribe({
            next: (value) => {
                this.balanceInformationModel1A = value;
                this.initChartModel1A();
            },
            error: (err) => {
                console.log(err);
            }
        });
    }
    getBalanceInformationModel1B(id) {
        this.walletModel1BService.getBalanceInformationByAffiliateId(id).subscribe({
            next: (value) => {
                this.balanceInformationModel1B = value;
                this.initChartModel1B();
            },
            error: (err) => {
                console.log(err);
            }
        });
    }
    initChartReport3() {
        this.pieChartOptions = {
            series: [
                Number(this.withdrawalBalance),
                this.balanceInformation.availableBalance,
                Number(this.balanceInformation.totalCommissionsPaid),
                Number(this.balanceInformation.totalAcquisitions),
                Number(this.balanceInformation.reverseBalance)
            ],
            colors: ['#f44336', '#2196f3', '#96a2b4', '#4caf50', '#9c27b0'],
            chart: {
                type: 'donut',
                width: 200,
            },
            legend: {
                show: false,
            },
            dataLabels: {
                enabled: false,
            },
            labels: [
                'Por Cobrar',
                'Saldo Disponible',
                'Total Pagado',
                'Total Adquisiciones',
                'Saldo revertido'
            ],
            responsive: [
                {
                    breakpoint: 480,
                    options: {
                        dataLabels: {
                            enabled: true,
                            formatter: function (val) {
                                return val + "%";
                            },
                            plotOptions: {
                                pie: {
                                    expandOnClick: false
                                }
                            }
                        }
                    },
                },
            ],
        };
    }
    initChartModel1A() {
        this.pieChartOptionsModel1A = {
            series: [
                Number(this.withdrawalBalance),
                this.balanceInformationModel1A.availableBalance,
                Number(this.balanceInformationModel1A.totalCommissionsPaid),
                Number(this.balanceInformationModel1A.totalAcquisitions),
                Number(this.balanceInformationModel1A.reverseBalance)
            ],
            colors: ['#f44336', '#2196f3', '#96a2b4', '#4caf50', '#9c27b0'],
            chart: {
                type: 'donut',
                width: 200,
            },
            legend: {
                show: false,
            },
            dataLabels: {
                enabled: false,
            },
            labels: [
                'Por Cobrar',
                'Saldo Disponible',
                'Total Pagado',
                'Total Adquisiciones',
                'Saldo revertido'
            ],
            responsive: [
                {
                    breakpoint: 480,
                    options: {
                        dataLabels: {
                            enabled: true,
                            formatter: function (val) {
                                return val + "%";
                            },
                            plotOptions: {
                                pie: {
                                    expandOnClick: false
                                }
                            }
                        }
                    },
                },
            ],
        };
    }
    initChartModel1B() {
        this.pieChartOptionsModel1B = {
            series: [
                Number(this.withdrawalBalance),
                this.balanceInformationModel1B.availableBalance,
                Number(this.balanceInformationModel1B.totalCommissionsPaid),
                Number(this.balanceInformationModel1B.totalAcquisitions),
                Number(this.balanceInformationModel1B.reverseBalance)
            ],
            colors: ['#f44336', '#2196f3', '#96a2b4', '#4caf50', '#9c27b0'],
            chart: {
                type: 'donut',
                width: 200,
            },
            legend: {
                show: false,
            },
            dataLabels: {
                enabled: false,
            },
            labels: [
                'Por Cobrar',
                'Saldo Disponible',
                'Total Pagado',
                'Total Adquisiciones',
                'Saldo revertido'
            ],
            responsive: [
                {
                    breakpoint: 480,
                    options: {
                        dataLabels: {
                            enabled: true,
                            formatter: function (val) {
                                return val + "%";
                            },
                            plotOptions: {
                                pie: {
                                    expandOnClick: false
                                }
                            }
                        }
                    },
                },
            ],
        };
    }
};
__decorate([
    ViewChild('balanceInformationModal')
], BalanceInformationModalComponent.prototype, "balanceInformationModal", void 0);
BalanceInformationModalComponent = __decorate([
    Component({
        selector: 'app-balance-information-modal',
        templateUrl: './balance-information-modal.component.html',
        styleUrls: ['./balance-information-modal.component.sass']
    })
], BalanceInformationModalComponent);
export { BalanceInformationModalComponent };
//# sourceMappingURL=balance-information-modal.component.js.map