import { Component } from '@angular/core';
import { MyTreeNodeClient } from '@app/core/models/unilevel-tree-model/tree-node';
import { NgxSpinnerService } from 'ngx-spinner';

import { MatrixRequest } from '@app/core/interfaces/matrix-request';
import { UserAffiliate } from "@app/core/models/user-affiliate-model/user.affiliate.model";
import { AffiliateService } from "@app/core/service/affiliate-service/affiliate.service";
import { AuthService } from "@app/core/service/authentication-service/auth.service";
import { MatrixConfigurationService } from '@app/core/service/matrix-configuration/matrix-configuration.service';
import { MatrixService } from '@app/core/service/matrix-service/matrix.service';
import 'perfect-scrollbar';

@Component({
  selector: 'app-view-unilevel-tree',
  templateUrl: './view-unilevel-tree.component.html',
  styleUrls: ['./view-unilevel-tree.component.scss'],
})
export class ViewUnilevelTreeComponent {
  userId: number;
  user: UserAffiliate;
  btnBack: boolean = false;
  active;
  matrixConfigurations: any[] = [];

  tree: MyTreeNodeClient = {
    id: 0,
    userName: '',
    image: '',
    children: [],
  };
  typeSelected: string;
  showDiv = false;

  constructor(
    private authService: AuthService,
    private spinnerService: NgxSpinnerService,
    private affiliateService: AffiliateService,
    private matrixConfigurationService: MatrixConfigurationService,
    private matrixService: MatrixService
  ) {
    this.typeSelected = 'cube-transition';
  }

  ngOnInit() {
    this.active = 1;
    this.user = this.authService.currentUserAffiliateValue;
    this.userId = this.user.id;
    if (this.userId) {
      this.onloadFamilyTree(this.userId);
      this.btnBack = false;
    }
    this.getAllMatrixConfigurations();
  }

  getAllMatrixConfigurations() {
    this.matrixConfigurationService.getAllMatrixConfigurations().subscribe({
      next: (config) => {
        console.log('config:', config);
        this.matrixConfigurations = config;
      },
      error: (err) => {
        console.error('Error', err);
      }
    });
  }

  protected onloadFamilyTree(id: number) {
    this.showDiv = false;
    this.spinnerService.show();
    this.btnBack = true;

    if (this.active === 1) {
      this.loadUnilevelTree(id);
    }
    else if (this.active >= 3) {
      const matrixIndex = this.active - 3;

      if (matrixIndex >= 0 && matrixIndex < this.matrixConfigurations.length) {
        const matrixConfig = this.matrixConfigurations[matrixIndex];

        console.log('Matrix Config completo:', matrixConfig);

        const matrixTypeValue = matrixConfig.matrixType;

        if (!matrixTypeValue) {
          console.error('No se pudo determinar el matrixType a partir de la configuración:', matrixConfig);
          this.spinnerService.hide();
          return;
        }

        console.log('Usando matrixType:', matrixTypeValue);
        this.loadMatrixTree(id, matrixTypeValue);
      } else {
        console.error('Índice de matriz inválido');
        this.spinnerService.hide();
      }
    } else {
      this.spinnerService.hide();
    }
  }

  private loadUnilevelTree(id: number) {
    this.affiliateService.getUniLevelTree(id).subscribe(
      (users: MyTreeNodeClient) => {
        if (users !== null) {
          this.tree = users;
          setTimeout(() => {
            this.spinnerService.hide();
            this.showDiv = true;
          }, 500);
        }
      },
      error => {
        console.error('Error loading unilevel tree:', error);
        this.spinnerService.hide();
      }
    );
  }

  onTabChange(newActiveId: number) {
    this.active = newActiveId;
    this.onloadFamilyTree(this.userId);
    this.btnBack = false;
  }

  loadMatrixTree(id: number, matrixType: number) {
    const request: MatrixRequest = {
      userId: id,
      matrixType: matrixType
    };

    console.log(request);

    this.showDiv = false;
    this.spinnerService.show();
    this.matrixService.getMatrixByUserId(request).subscribe(
      (users: MyTreeNodeClient) => {
        if (users !== null) {
          this.tree = users;
          setTimeout(() => {
            this.spinnerService.hide();
            this.showDiv = true;
          }, 500);
        }
      },
      error => {
        console.error('Error loading matrix tree:', error);
        this.spinnerService.hide();
      }
    );
  }
}
