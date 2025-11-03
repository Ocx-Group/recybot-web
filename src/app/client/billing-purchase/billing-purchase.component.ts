import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';


@Component({
    selector: 'app-billing-purchase',
    templateUrl: './billing-purchase.component.html',
    styleUrls: ['./billing-purchase.component.scss'],
    standalone: true,
    imports: [CommonModule],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BillingPurchaseComponent implements OnInit {
  public searchTerm!: string;
  active: number = 1;

  constructor(
  ) { }

  ngOnInit(): void {

  }

  search(event: any) {
    this.searchTerm = (event.target as HTMLInputElement).value;
  }

  onTabChange(newActive: number) {
    this.active = newActive;
  }
}
