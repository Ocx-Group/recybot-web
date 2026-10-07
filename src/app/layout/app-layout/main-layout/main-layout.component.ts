import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { UserAffiliate } from '@app/core/models/user-affiliate-model/user.affiliate.model';
import { AffiliateService } from '@app/core/service/affiliate-service/affiliate.service';
import {
  AuthService,
  ZOOM_ANNOUNCEMENT_KEY,
} from '@app/core/service/authentication-service/auth.service';
import { MembershipManagerService } from '@app/core/service/membership-manager-service/membership-manager.service';
import { TermsConditionsService } from '@app/core/service/terms-conditions-service/terms-conditions.service';
import { TicketHubService } from '@app/core/service/ticket-service/ticket-hub.service';
import { ToastrService } from 'ngx-toastr';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '@app/layout/header/header.component';
import { SidebarComponent } from '@app/layout/sidebar/sidebar.component';
import { FooterComponent } from '@app/layout/footer/footer.component';
import { TermsConditionsModalComponent } from '@app/layout/terms-conditions-modal/terms-conditions-modal.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: [],
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    TermsConditionsModalComponent,
  ],
  changeDetection: ChangeDetectionStrategy.Eager,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MainLayoutComponent implements OnInit {
  user: UserAffiliate = new UserAffiliate();
  constructor(
    // private documentCheckService: DocumentCheckService,
    private termsConditionsService: TermsConditionsService,
    private authService: AuthService,
    private membershipManagerService: MembershipManagerService,
    private affiliateService: AffiliateService,
    private toast: ToastrService,
    private ticketHubService: TicketHubService,
  ) {}

  ngOnInit() {
    this.user = this.authService.currentUserAffiliateValue;
    // if (this.user.message_alert == 0) {
    //   this.showAlert();
    // }
  }

  ngAfterViewInit(): void {
    // if (!this.user.termsConditions) {
    //   this.showTermsConditionsModal();
    // }

    if (this.user.activation_date == null) {
      this.showMembershipManager();
    } else if (this.shouldShowZoomAnnouncement()) {
      this.showZoomAnnouncement();
    }
  }

  // Una vez por inicio de sesion (logoutUser borra la marca) y solo hasta que
  // acabe el Zoom: 8 de octubre, 10:30 PM Santiago es la ultima hora listada.
  private shouldShowZoomAnnouncement(): boolean {
    const announcementEnd = new Date('2026-10-09T03:00:00Z');
    return new Date() < announcementEnd && !localStorage.getItem(ZOOM_ANNOUNCEMENT_KEY);
  }

  showZoomAnnouncement() {
    localStorage.setItem(ZOOM_ANNOUNCEMENT_KEY, '1');
    const zoomUrl = 'https://us06web.zoom.us/j/7407569179?pwd=8kDn4ba7QAtaqPleqTGnfwnjPiaPFD.1';

    return Swal.fire({
      icon: 'info',
      title: 'Comunicado Recybot',
      html: `
            <p><strong>Hoy Jueves 8 de Octubre</strong></p>
            <p><a href="${zoomUrl}" target="_blank" rel="noopener noreferrer">Unirse al Zoom</a></p>
            <div style="text-align: left; display: inline-block;">
              7:30 PM Wisconsin 🇺🇸<br>
              7:30 PM Bogotá 🇨🇴<br>
              7:30 PM Lima 🇵🇪<br>
              8:30 PM Miami 🇺🇸<br>
              8:30 PM Caracas 🇻🇪<br>
              6:30 PM CDMX 🇲🇽<br>
              6:30 PM Tegucigalpa 🇭🇳<br>
              6:30 PM San José 🇨🇷<br>
              10:30 PM Santiago 🇨🇱
            </div>
            <p style="margin-top: 1rem;">Información Importante, lo esperamos 👍🏻.</p>
        `,
      confirmButtonText: 'Unirse al Zoom',
      confirmButtonColor: '#3085d6',
      showCancelButton: true,
      cancelButtonText: 'Cerrar',
    }).then(result => {
      if (result.isConfirmed) {
        window.open(zoomUrl, '_blank', 'noopener');
      }
    });
  }

  showMembershipManager() {
    this.membershipManagerService.show();
  }

  showTermsConditionsModal() {
    this.termsConditionsService.show();
  }

  messageReceived() {
    this.affiliateService.updateMessageAlert(this.user.id).subscribe({
      next: value => {
        this.showSuccess('Mensaje recibido correctamente');
        this.authService.setUserAffiliateValue(this.user);
      },
      error: err => {
        this.showError('Error');
      },
    });
  }

  // showAlert() {
  //   Swal.fire({
  //     icon: "info",
  //     title: 'Habilitación de Retiros de Saldo disponible a su billetera',
  //     html: `
  //           <p>Querida familia de recycoin,</p>
  //           <p>Nos complace anunciar que el próximo martes, 23 de abril, estaremos habilitando los retiros de saldo. Esta es una oportunidad para que todos nuestros miembros puedan gestionar sus recursos de manera más efectiva dentro de nuestra plataforma.</p>
  //           <p>¡Agradecemos su paciencia y confianza en nosotros! Prepárense para realizar sus retiros.</p>
  //       `,
  //     confirmButtonText: 'OK',
  //     confirmButtonColor: '#3085d6',
  //     showCancelButton: false,
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       this.messageReceived();
  //     }
  //   });
  // }

  showSuccess(message: string) {
    this.toast.success(message);
  }

  showError(message: string) {
    this.toast.error(message);
  }
}
