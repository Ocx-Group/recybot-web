import { Component, OnInit } from '@angular/core';
import { MatrixConfigurationService } from '@app/core/service/matrix-configuration/matrix-configuration.service';

@Component({
  selector: 'app-matrix-list',
  templateUrl: './matrix-list.component.html',
  styleUrls: ['./matrix-list.component.sass']
})
export class MatrixListComponent implements OnInit {
  loadingIndicator: boolean = true;
  rows: [] = [];
  temp = [];
  reorderable: boolean = true;
  scrollBarHorizontal = window.innerWidth < 1200;

  constructor(private matrixConfigurationService: MatrixConfigurationService) {
  }

  ngOnInit(): void {
    this.loadAllConfigurations();
  }

  updateFilter($event: Event) {
  }

  loadAllConfigurations() {
    this.matrixConfigurationService.getAllMatrixConfigurations().subscribe({
      next: (response) => {
        this.rows = response;
        this.temp = [...response];
        this.loadingIndicator = false;
      },
      error: (err) => {
        console.error('Error loading configurations', err)
      }
    })
  }
}
