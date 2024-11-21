import { __decorate } from "tslib";
import { RequestsComponent } from './requests.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FeatherModule } from 'angular-feather';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ClipboardModule } from 'ngx-clipboard';
import { NgxEchartsModule } from 'ngx-echarts';
import { NgxGaugeModule } from 'ngx-gauge';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { ToastrModule } from 'ngx-toastr';
import { Search } from 'angular-feather/icons';
import { CreateRequestsModalComponent } from './create-requests-modal/create-requests-modal.component';
import { SharedModule } from "@app/shared/shared.module";
const icons = {
    Search,
};
let RequestsModule = class RequestsModule {
};
RequestsModule = __decorate([
    NgModule({
        declarations: [RequestsComponent, CreateRequestsModalComponent],
        imports: [
            CommonModule,
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
            PerfectScrollbarModule,
            NgApexchartsModule,
            NgxGaugeModule,
            SharedModule,
        ]
    })
], RequestsModule);
export { RequestsModule };
//# sourceMappingURL=requests.module.js.map