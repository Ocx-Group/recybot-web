import { __decorate } from "tslib";
import { AdminRespondedPipe } from './admin-responded.pipe';
import { BootstrapModule } from './bootstrap.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IconsModule } from './feather-icons.module';
import { TruncateDecimalsPipe } from './truncate-decimals.pipe';
import { PdfViewerComponent } from "@app/shared/components/pdf-viewer/pdf-viewer.component";
import { PdfViewerModule } from "ng2-pdf-viewer";
let SharedModule = class SharedModule {
};
SharedModule = __decorate([
    NgModule({
        declarations: [TruncateDecimalsPipe, AdminRespondedPipe, PdfViewerComponent, PdfViewerComponent],
        imports: [
            CommonModule,
            FormsModule,
            ReactiveFormsModule,
            RouterModule,
            IconsModule,
            BootstrapModule,
            PdfViewerModule
        ],
        exports: [
            CommonModule,
            FormsModule,
            ReactiveFormsModule,
            RouterModule,
            IconsModule,
            BootstrapModule,
            TruncateDecimalsPipe,
            AdminRespondedPipe,
            PdfViewerComponent,
            PdfViewerComponent
        ],
        providers: [
            TruncateDecimalsPipe
        ]
    })
], SharedModule);
export { SharedModule };
//# sourceMappingURL=shared.module.js.map