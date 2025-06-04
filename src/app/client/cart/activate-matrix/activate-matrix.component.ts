import { Component, OnInit } from '@angular/core';
import { ConpaymentTransaction } from '@app/core/models/coinpayment-model/conpayment-transaction.model';
import { CreatePayment } from '@app/core/models/coinpayment-model/create-payment.model';
import { UserAffiliate } from '@app/core/models/user-affiliate-model/user.affiliate.model';
import { AuthService } from '@app/core/service/authentication-service/auth.service';
import { CoinpaymentService } from '@app/core/service/coinpayment-service/coinpayment.service';
import { MatrixConfigurationService } from '@app/core/service/matrix-configuration/matrix-configuration.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-activate-matrix',
  templateUrl: './activate-matrix.component.html',
  styleUrls: ['./activate-matrix.component.scss'],
})
export class ActivateMatrixComponent implements OnInit {
  matrixConfigurations: any[] = [];
  currentUser: UserAffiliate;
  selectedMatrixConfig: any = null;
  loading = false;
  today = new Date();
  products: any = [];
  transaction: ConpaymentTransaction = new ConpaymentTransaction();

  constructor(
    private matrixConfigurationService: MatrixConfigurationService,
    private authService: AuthService,
    private toastrService: ToastrService,
    private conpaymentService: CoinpaymentService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.currentUserAffiliateValue;
    this.getAllMatrixConfigurations();
  }

  getAllMatrixConfigurations(): void {
    this.loading = true;
    this.matrixConfigurationService.getAllMatrixConfigurations().subscribe({
      next: (config) => {
        console.log('Matrix configurations:', config);
        this.matrixConfigurations = config;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading matrix configurations:', err);
        this.errorMessage('Error al cargar las configuraciones de matriz');
        this.loading = false;
      },
    });
  }

  selectMatrixConfig(config: any): void {
    this.selectedMatrixConfig = config;
  }

  successMessage(message: string): void {
    this.toastrService.success(message, 'Éxito', {
      timeOut: 3000,
      progressBar: true,
      progressAnimation: 'increasing',
      closeButton: true,
    });
  }

  errorMessage(message: string): void {
    this.toastrService.error(message, 'Error', {
      timeOut: 3000,
      progressBar: true,
      progressAnimation: 'increasing',
      closeButton: true,
    });
  }

  createTransactionRequest(): CreatePayment {
    if (!this.selectedMatrixConfig) {
      throw new Error('No hay matriz seleccionada');
    }

    const request = new CreatePayment();

    request.amount = this.selectedMatrixConfig.feeAmount;
    request.buyer_email = this.currentUser.email;
    request.buyer_name = `${this.currentUser.name} ${this.currentUser.last_name}`;
    request.item_number = this.currentUser.id.toString();
    request.ipn_url = 'https://wallet.recycoin.net/api/v1/ConPayments/coinPaymentsIPN';
    request.currency1 = 'USDT.BEP20';
    request.currency2 = 'USDT.BEP20';
    request.item_name = `${this.selectedMatrixConfig.matrixName} - ${this.selectedMatrixConfig.matrixType}`;

    // CAMBIO: En lugar de array, usar un objeto único
    request.products = [
      {
        productId: parseInt(this.selectedMatrixConfig.matrixType) || 1,
        quantity: 1,
      },
    ];

    return request;
  }

  showCoinPaymentConfirmation() {
    // Validar que hay una matriz seleccionada
    if (!this.selectedMatrixConfig) {
      this.errorMessage('Por favor selecciona una matriz para activar');
      return;
    }

    // Validar que el usuario tiene los datos necesarios
    if (!this.currentUser?.email) {
      this.errorMessage('Error: No se encontraron los datos del usuario');
      return;
    }

    const matrixName = this.selectedMatrixConfig.matrixName;
    const matrixCost = this.selectedMatrixConfig.feeAmount;

    Swal.fire({
      title: `¿Activar matriz ${matrixName}?`,
      html: `
      <div style="text-align: left; margin: 20px 0;">
        <p><strong>Matriz:</strong> ${matrixName}</p>
        <p><strong>Tipo:</strong> ${this.selectedMatrixConfig.matrixType}</p>
        <p><strong>Costo:</strong> $${matrixCost}</p>
      </div>
      <div style="background: #fff3cd; border: 1px solid #ffeaa7; border-radius: 5px; padding: 10px; margin: 15px 0;">
        <small style="color: #856404;">
          <i class="fas fa-exclamation-triangle"></i>
          En caso de que no se confirme la totalidad de los fondos, su compra será revertida automáticamente.
        </small>
      </div>
    `,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: `Sí, pagar $${matrixCost}`,
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#28a745',
      cancelButtonColor: '#6c757d',
    })
      .then((result) => {
        if (result.isConfirmed) {
          this.loading = true;

          try {
            const transactionRequest = this.createTransactionRequest();

            this.conpaymentService
              .createTransaction(transactionRequest)
              .subscribe({
                next: (response: ConpaymentTransaction) => {
                  this.transaction = response;
                  this.loading = false;

                  if (response?.checkout_Url) {
                    this.successMessage(
                      `Redirigiendo al pago de la matriz ${matrixName}`
                    );

                    // Pequeño delay para que el usuario vea el mensaje
                    setTimeout(() => {
                      window.open(this.transaction.checkout_Url, '_blank');
                    }, 1000);
                  } else {
                    this.errorMessage('Error: No se recibió la URL de pago');
                  }
                },
                error: (error) => {
                  this.loading = false;
                  console.error('Error creando transacción:', error);
                  this.errorMessage('Error al crear la transacción de pago');
                },
              });
          } catch (error) {
            this.loading = false;
            console.error('Error preparando transacción:', error);
            this.errorMessage('Error al preparar la transacción');
          }
        }
      })
      .catch((error) => {
        this.loading = false;
        console.error('Error en confirmación:', error);
      });
  }
}
