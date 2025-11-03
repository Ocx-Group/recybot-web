import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PdfViewerComponent } from "@app/shared/components/pdf-viewer/pdf-viewer.component";
import { PdfViewerModule } from "ng2-pdf-viewer";
import { AdminRespondedPipe } from './admin-responded.pipe';
import { BootstrapModule } from './bootstrap.module';
import { IconsModule } from './feather-icons.module';

@NgModule({
  declarations: [
    AdminRespondedPipe,
    PdfViewerComponent,
    PdfViewerComponent
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
    AdminRespondedPipe,
    PdfViewerComponent,
    PdfViewerComponent
  ],
  providers: []
})
export class SharedModule {
}
