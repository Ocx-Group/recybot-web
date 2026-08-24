import { LogoService } from '@app/core/service/logo-service/logo.service';
import { Component, Input, OnDestroy, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [],
})
export class LogoComponent implements OnDestroy {
  logoSrc: string;
  @Input() logoClass: string = '';
  private readonly subscription: Subscription;

  constructor(private readonly logoService: LogoService) {
    this.subscription = this.logoService.logoSrc$.subscribe(src => {
      this.logoSrc = src;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
