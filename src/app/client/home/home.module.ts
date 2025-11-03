import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { NgxEchartsModule } from 'ngx-echarts';
import { NgApexchartsModule } from 'ng-apexcharts';
import { NgxGaugeModule } from 'ngx-gauge';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { TranslateModule } from '@ngx-translate/core';
import { FeatherModule } from 'angular-feather';
import { Search } from 'angular-feather/icons';
import { ToastrModule } from 'ngx-toastr';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { HomeComponent } from './home.component';
import { MembershipManagerModule } from '../membership-manager/membership-manager.module';
import { SharethisAngularModule } from 'sharethis-angular';
import { ShareModalComponent } from './share-modal/share-modal.component';
import { SharedModule } from "@app/shared/shared.module";


const icons = {
  Search,
};

@NgModule({
    declarations: [HomeComponent, ShareModalComponent],
    imports: [
        CommonModule,
        ScrollingModule,
        NgbModule,
        FormsModule,
        ClipboardModule,
        ReactiveFormsModule,
        NgbModule,
        TranslateModule,
        NgxEchartsModule.forRoot({
            echarts: () => import('echarts'),
        }),
        ToastrModule.forRoot(),
        FeatherModule.pick(icons),
        NgxDatatableModule,
        NgApexchartsModule,
        NgxGaugeModule,
        MembershipManagerModule,
        SharethisAngularModule,
        SharedModule
    ]
})
export class HomeModule { }
