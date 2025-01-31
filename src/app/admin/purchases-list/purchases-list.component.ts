import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { ClipboardService } from 'ngx-clipboard';
import { ToastrService } from 'ngx-toastr';
import * as XLSX from 'xlsx';

import { InvoiceService } from '@app/core/service/invoice-service/invoice.service';
import { PrintService } from '@app/core/service/print-service/print.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
const header = [
  'Afiliado',
  'Nombre y Apellido',
  'No. Factura',
  'Fecha',
  'Estado Factura',
  'Pagado'
];
@Component({
  selector: 'app-purchases-list',
  templateUrl: './purchases-list.component.html',
  providers: [ToastrService],
})
export class PurchasesListComponent implements OnInit {
  rows = [];
  temp = [];
  loadingIndicator = true;
  reorderable = true;
  scrollBarHorizontal = window.innerWidth < 1200;
  startDate: string = null;
  endDate: string = null;
  selectedInvoice: any = null;
  modal: any;
  @ViewChild('detailsModal') detailsModal: ElementRef;
  @ViewChild('table') table: DatatableComponent;

  constructor(
    private toastr: ToastrService,
    private clipboardService: ClipboardService,
    private printService: PrintService,
    private invoiceService: InvoiceService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.scrollBarHorizontal = window.innerWidth < 1200;
    this.table.recalculate();
    this.table.recalculateColumns();
  }

  getRowHeight(row) {
    return row.height;
  }

  loadData() {
    let start = this.startDate ? new Date(this.startDate) : null;
    let end = this.endDate ? new Date(this.endDate) : null;

    this.loadingIndicator = true;
    this.invoiceService.getAllInvoices(start, end).subscribe({
      next: (response) => {
        if (response.success) {
          this.rows = response.data;
          this.temp = response.data;
        }
        this.loadingIndicator = false;
      },
      error: (error) => {
        console.error(error);
        this.loadingIndicator = false;
        this.toastr.error('Error al cargar los datos');
      }
    });
  }

  onDateFilterChange() {
    if (this.startDate && this.endDate) {
      if (new Date(this.startDate) > new Date(this.endDate)) {
        this.toastr.warning('La fecha de inicio no puede ser mayor que la fecha final');
        return;
      }
    }
    this.loadData();
  }

  clearDateFilters() {
    this.startDate = null;
    this.endDate = null;
    this.loadData();
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    const temp = this.temp.filter(function (d) {
      return (
        d.name?.toLowerCase().indexOf(val) !== -1 ||
        d.lastName?.toLowerCase().indexOf(val) !== -1 ||
        d.userName?.toLowerCase().indexOf(val) !== -1 ||
        d.id?.toString().indexOf(val) !== -1 ||
        !val
      );
    });

    this.rows = temp;
    this.table.offset = 0;
  }

  clipBoardCopy() {
    var string = JSON.stringify(this.temp);
    var result = this.clipboardService.copyFromContent(string);

    if (this.temp.length === 0) {
      this.toastr.info('no data to copy');
    } else {
      this.toastr.success('copied ' + this.temp.length + ' rows successfully');
    }
  }


  onPrint() {
    const body = this.temp.map((items: any) => {
      const data = [
        items.userName,
        `${items.name} ${items.lastName}`,
        items.id,
        items.date,
        items.status ? 'Activa' : 'Pendiente o Anulada',
        items.totalInvoice
      ];
      return data;
    });

    this.printService.print(
      header,
      body,
      'Lista de Compras',
      false
    );
  }

  showDetails(invoice: any) {
    this.selectedInvoice = invoice;
    this.modal = this.modalService.open(this.detailsModal, {
      size: 'lg',
      backdrop: 'static',
      keyboard: false
    });
  }

  closeDetails() {
    this.modal?.close();
    this.selectedInvoice = null;
  }

  printInvoiceDetails() {
    if (!this.selectedInvoice) return;

    const header = [
      'Producto',
      'Cantidad',
      'Precio',
      'Total'
    ];

    const body = this.selectedInvoice.invoicesDetails.map(detail => [
      detail.productName,
      detail.productQuantity,
      detail.productPrice,
      detail.baseAmount
    ]);

    this.printService.print(
      header,
      body,
      `Detalle de Compra #${this.selectedInvoice.id}`,
      true
    );
  }

  exportToExcel() {
    if (this.temp.length === 0) {
      this.toastr.info('No hay datos para exportar');
      return;
    }

    try {
      const totalSum = this.temp.reduce((sum, item) => sum + item.totalInvoice, 0);

      const data = this.temp.map(row => ({
        'Afiliado': row.userName,
        'Nombre y Apellido': `${row.name} ${row.lastName}`,
        'No. Factura': row.id,
        'Estado factura': row.status ? 'Activa' : 'Pendiente o Nula',
        'Total pagado': row.totalInvoice,
        'Método de pago': row.paymentMethod,
        'Banco': row.bank,
        'No. Recibo': row.receiptNumber,
        'Fecha de pago': row.depositDate ? new Date(row.depositDate).toLocaleDateString() : ''
      }));

      const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);

      const blankRow = { 'Afiliado': '' };
      XLSX.utils.sheet_add_json(ws, [blankRow], {
        skipHeader: true,
        origin: -1
      });

      const totalRow = { 'Afiliado': 'TOTAL:', 'Total pagado': totalSum };
      XLSX.utils.sheet_add_json(ws, [totalRow], {
        skipHeader: true,
        origin: -1
      });

      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Compras');

      const colWidths = [
        { wch: 15 },
        { wch: 25 },
        { wch: 12 },
        { wch: 12 },
        { wch: 15 },
        { wch: 15 },
        { wch: 15 },
        { wch: 15 },
        { wch: 15 }
      ];

      ws['!cols'] = colWidths;

      const today = new Date();
      const dateStr = today.toLocaleDateString('es-CO').replace(/\//g, '-');
      const timeStr = today.toLocaleTimeString('es-CO').replace(/:/g, '-');
      const fileName = `Lista_de_compras_${dateStr}_${timeStr}.xlsx`;
      XLSX.writeFile(wb, fileName);
      this.toastr.success('Excel generado exitosamente');

    } catch (error) {
      console.error('Error al exportar el excel', error);
      this.toastr.error('Error al generar el excel');
    }
  }
}
