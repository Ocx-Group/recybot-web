import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PdfViewerComponent } from "@app/shared/components/pdf-viewer/pdf-viewer.component";
import { PdfViewerModule } from "ng2-pdf-viewer";
import { AdminRespondedPipe } from './admin-responded.pipe';
import { BootstrapModule } from './bootstrap.module';
import { IconsModule } from './feather-icons.module';
import { SafePipe } from './safe.pipe';
import { TruncateDecimalsPipe } from './truncate-decimals.pipe';

@NgModule({
  declarations: [
    TruncateDecimalsPipe,
    AdminRespondedPipe,
    PdfViewerComponent,
    PdfViewerComponent,
    SafePipe
  ],
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
    PdfViewerComponent,
    SafePipe
  ],
  providers: [
    TruncateDecimalsPipe,
    SafePipe
  ]
})
export class SharedModule {
}
