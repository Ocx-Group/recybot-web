import {ToastrService} from 'ngx-toastr';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {ChangeDetectorRef, Component, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {ProductRequest, RequestPayment} from '@app/core/models/coinpay-model/request-payment.model';
import {CoinpayService} from '@app/core/service/coinpay-service/coinpay.service';
import {UserAffiliate} from '@app/core/models/user-affiliate-model/user.affiliate.model';
import {Subscription, switchMap, timer} from 'rxjs';
import QRCode from 'qrcode';

@Component({
  selector: 'app-coinpay-modal',
  templateUrl: './coinpay-modal.component.html',
  styleUrls: ['./coinpay-modal.component.scss']
})
export class CoinpayModalComponent implements OnInit {
  paymentGroup: FormGroup;
  @Input() user: UserAffiliate;
  @Input() products: any[];
  @Input() total: number;
  selectedNetwork: any;
  qrCodeDataUrl: string;
  walletAddress: string;
  transactionId: string;
  isLoading: boolean = false;
  private pollingSubscription: Subscription;
  private pollingInterval = 5000;
  networks: any[] = [];
  private modalReference: NgbModalRef;
  @ViewChild('coinpayPaymentModal') coinpayPaymentModal: TemplateRef<any>;

  constructor(
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private coinpayService: CoinpayService,
    private toastr: ToastrService,
    private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.initControls();
    this.getNetworksByUSDT();
  }

  showSuccess(message: string) {
    this.toastr.success(message);
  }

  showError(message: string) {
    this.toastr.error(message);
  }

  initControls() {
    this.paymentGroup = this.formBuilder.group({
      network: ['', Validators.required],
      amount: ['', Validators.required]
    })
  }

  getNetworksByUSDT() {
    let networkId = 19;
    this.coinpayService.getNetworks(networkId).subscribe({
      next: (response) => {
        if (response) {
          this.networks = response;
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  openCoinpayModal() {
    this.modalReference = this.modalService.open(this.coinpayPaymentModal, {
      ariaLabelledBy: 'modal-basic-title',
      size: 'lg',
      centered: true,
    });
    this.selectNetwork();
  }

  getNetworkIcon(shortName: string): string {
    const iconMap = {
      'ERC20': 'assets/images/crypto/erc20.png',
      'BEP20': 'assets/images/crypto/bep20.png',
      'PoS': 'assets/images/crypto/polygon.png',
      'TRC20': 'assets/images/crypto/trc20.png',
      'Solana': 'assets/images/crypto/solana.png'
    };
    return iconMap[shortName] || 'assets/images/crypto/default.png';
  }

  selectNetwork() {
    // this.selectedNetwork = network;
    // this.paymentGroup.get('network').setValue(network.idChain);

    this.walletAddress = '';
    this.transactionId = '';
    this.qrCodeDataUrl = '';

    this.createCoinPayTransaction(56);
  }


  constructProductDetails(): ProductRequest[] {
    return this.products.map(product => {
      return {
        productId: product.id,
        quantity: product.quantity
      };
    });
  }

  createCoinPayTransaction(networkId: number) {
    this.isLoading = true;

    const request = this.createTransactionRequest(networkId);

    this.coinpayService.createChannel(request).subscribe({
      next: async (response) => {
        if (response.success) {
          const transactionData = response.data.data;
          this.walletAddress = transactionData.address;
          this.transactionId = transactionData.idExternalIdentification.toString();

          try {
            this.qrCodeDataUrl = await QRCode.toDataURL(this.walletAddress);
            this.isLoading = false;

            this.cdr.detectChanges();

            this.startTransactionStatusPolling(this.transactionId);
          } catch (error) {
            console.error('Error generating QR code:', error);
            this.isLoading = false;
            this.showError("Error al generar el código QR");
          }
        } else {
          this.isLoading = false;
          this.showError("Error al crear la transacción");
        }
      },
      error: (err) => {
        this.isLoading = false;
        console.log(err);
        this.showError("Error al crear la transacción");
      },
    });
  }

  createTransactionRequest(networkId: number): RequestPayment {
    this.selectedNetwork = true;
    const request = new RequestPayment();
    request.affiliateId = this.user.id;
    request.userName = this.user.user_name;
    request.amount = this.total;
    request.products = this.constructProductDetails();
    request.networkId = networkId;
    return request;
  }

  startTransactionStatusPolling(reference: string) {

    this.pollingSubscription = timer(0, this.pollingInterval).pipe(
      switchMap(() => this.coinpayService.getTransactionByReference(reference))
    ).subscribe({
      next: (response) => {
        if (response.data === true) {
          this.showSuccess('Pago confirmado');
          this.stopTransactionStatusPolling();
          this.cleanAndCloseModal();
        }
      },
      error: (error) => {
        console.error('Error al obtener el estado de la transacción:', error);
        this.showError('Error al verificar el estado del pago');
        this.stopTransactionStatusPolling();
      }
    });
  }

  stopTransactionStatusPolling() {
    if (this.pollingSubscription) {
      this.pollingSubscription.unsubscribe();
    }
  }

  cleanAndCloseModal() {
    if (this.modalReference) {
      this.modalReference.close();
      this.modalReference = null;
    }
  }
}
