import { AuthService } from 'src/app/core/service/authentication-service/auth.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import * as echarts from 'echarts';
import { EChartsOption } from 'echarts';
import { WalletService } from '@app/core/service/wallet-service/wallet.service';
import { AffiliateService } from '@app/core/service/affiliate-service/affiliate.service';
import { ToastrService } from 'ngx-toastr';
import {
  ApexNonAxisChartSeries,
  ApexChart,
  ApexResponsive,
  ApexDataLabels,
  ApexLegend,
  ApexPlotOptions,
  ChartComponent,
} from 'ng-apexcharts';
import { UserAffiliate } from '@app/core/models/user-affiliate-model/user.affiliate.model';

export interface ChartOptions {
  series?: ApexNonAxisChartSeries;
  chart?: ApexChart;
  responsive?: ApexResponsive[];
  labels?: any;
  colors?: string[];
  dataLabels?: ApexDataLabels;
  legend?: ApexLegend;
  plotOptions?: ApexPlotOptions;
}


@Component({
    selector: 'app-home-admin',
    templateUrl: './home-admin.component.html',
    standalone: false
})
export class HomeAdminComponent implements OnInit {
  public mapChartOption: EChartsOption;
  public pieChartOptions: Partial<ChartOptions>;
  public avgLecChartOptions: any;
  totalMembers: number;
  commissionsPaid: number;
  walletProfit: number;
  calculatedCommissions: number;
  totalReverseBalance: number;
  adminCommissions: number;
  maps: any[] = [];
  user: any;
  @ViewChild('chart') chart1: ChartComponent;
  lastRegisteredUsers: UserAffiliate[] = [];

  constructor(
    private walletService: WalletService,
    private affiliateService: AffiliateService,
    private toastr: ToastrService,
    private authService: AuthService,
  ) {
    this.pieChartOptions = {
      series: [],
      chart: {
        type: 'donut',
        width: 200,
      },
      labels: [],
      colors: [],
      dataLabels: {
        enabled: false,
      },
      legend: {
        show: false,
      },
      responsive: [],
    };
    this.getBalanceInformationAdmin();
  }

  ngOnInit() {
    this.initChartReport();
    this.loadLocations();
    this.user = this.authService.currentUserAdminValue;
    this.getLastRegisteredUsers();
  }

  showSuccess(message: string) {
    this.toastr.success(message);
  }

  showError(message: string) {
    this.toastr.error(message);
  }

  private initChartReport3() {
    this.pieChartOptions = {
      series: [
        Number(this.adminCommissions),
        Number(this.walletProfit),
        Number(this.commissionsPaid),
        Number(this.calculatedCommissions),
        Number(this.totalMembers),
        Number(this.totalReverseBalance),
      ],
      colors: [
        '#bfd34cff',
        '#f44336',
        '#2196f3',
        '#96a2b4',
        '#4caf50',
        '#9c27b0',
      ],
      chart: {
        type: 'donut',
        width: 200,
      },
      legend: {
        show: false,
      },
      dataLabels: {
        enabled: false,
      },
      labels: [
        'Comisiones para el admin',
        'Beneficio en billetera',
        'Total comisiones pagadas',
        'Total recycoins vendidos',
        'Afiliados activos',
        'Saldo balance 2',
      ],
      responsive: [
        {
          breakpoint: 480,
          options: {
            dataLabels: {
              enabled: true,
              formatter: function (val: any) {
                return val + '%';
              },
            },
            plotOptions: {
              pie: {
                expandOnClick: false,
              },
            },
          },
        },
      ],
    };
  }

  private initChartReport() {
    this.avgLecChartOptions = {
      series: [
        {
          name: 'Directos',
          data: [0.5, 0, 1, 0.5, 1, 0, 0, 1, 0.2, 0.4, 1, 0],
        },
      ],
      chart: {
        height: 350,
        type: 'line',
        dropShadow: {
          enabled: true,
          color: '#000',
          top: 18,
          left: 7,
          blur: 10,
          opacity: 0.2,
        },
        toolbar: {
          show: false,
        },
      },
      stroke: {
        curve: 'smooth',
      },
      xaxis: {
        categories: [
          'Ene',
          'Feb',
          'Mar',
          'Abr',
          'May',
          'Jun',
          'Jul',
          'Ago',
          'Sep',
          'Oct',
          'Nov',
          'Dic',
        ],
        title: {
          text: '',
        },
      },
      yaxis: {
        title: {
          text: '',
        },
      },
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'dark',
          gradientToColors: ['#35fdd8'],
          shadeIntensity: 1,
          type: 'horizontal',
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100, 100, 100],
        },
      },
      markers: {
        size: 4,
        colors: ['#FFA41B'],
        strokeColors: '#fff',
        strokeWidth: 2,
        hover: {
          size: 7,
        },
      },
      tooltip: {
        theme: 'dark',
        marker: {
          show: true,
        },
        x: {
          show: true,
        },
      },
    };
  }

  area_line_chart: EChartsOption = {
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      data: ['Intent', 'Pre-order', 'Deal'],
      textStyle: {
        color: '#9aa0ac',
        padding: [0, 5, 0, 5],
      },
    },
    toolbox: {
      show: !0,
      feature: {
        magicType: {
          show: !0,
          title: {
            line: 'Line',
            bar: 'Bar',
            stack: 'Stack',
          },
          type: ['line', 'bar', 'stack'],
        },
        restore: {
          show: !0,
          title: 'Restore',
        },
        saveAsImage: {
          show: !0,
          title: 'Save Image',
        },
      },
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: !1,
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        axisLabel: {
          fontSize: 10,
          color: '#9aa0ac',
        },
      },
    ],
    yAxis: [
      {
        type: 'value',
        axisLabel: {
          fontSize: 10,
          color: '#9aa0ac',
        },
      },
    ],
    series: [
      {
        name: 'Deal',
        type: 'line',
        smooth: !0,
        areaStyle: {},
        emphasis: {
          focus: 'series',
        },
        data: [10, 12, 21, 54, 260, 830, 710],
      },
      {
        name: 'Pre-order',
        type: 'line',
        smooth: !0,
        areaStyle: {},
        emphasis: {
          focus: 'series',
        },
        data: [30, 182, 434, 791, 390, 30, 10],
      },
      {
        name: 'Intent',
        type: 'line',
        smooth: !0,
        areaStyle: {},
        emphasis: {
          focus: 'series',
        },
        data: [1320, 1132, 601, 234, 120, 90, 20],
      },
    ],
    color: ['#9f78ff', '#fa626b', '#32cafe'],
  };

  getBalanceInformationAdmin() {
    this.walletService.getBalanceInformationAdmin().subscribe({
      next: value => {
        this.adminCommissions = value.data.totalCommissionsEarned;
        this.totalMembers = value.data.enabledAffiliates;
        this.calculatedCommissions = value.data.calculatedCommissions;
        this.commissionsPaid = value.data.commissionsPaid;
        this.walletProfit = value.data.walletProfit;
        this.totalReverseBalance = value.data.totalReverseBalance;
        this.initChartReport3();
      },
      error: err => {
        console.log(err);
      },
    });
  }

  setMapInfo() {
    // Preparar datos para ECharts
    const scatterData = this.maps.map(item => ({
      name: item.title,
      value: [item.lng, item.lat, item.value],
      itemStyle: {
        color: '#765cbf'
      }
    }));

    this.mapChartOption = {
      tooltip: {
        trigger: 'item',
        formatter: (params: any) => {
          if (params.data) {
            return `<strong>${params.data.name}</strong><br/>Cantidad: ${params.data.value[2]}`;
          }
          return params.name;
        }
      },
      geo: {
        map: 'world',
        roam: true,
        itemStyle: {
          areaColor: '#96a2b4',
          borderColor: '#fff'
        },
        emphasis: {
          itemStyle: {
            areaColor: '#74a999'
          }
        }
      },
      series: [
        {
          name: 'Afiliados por País',
          type: 'scatter',
          coordinateSystem: 'geo',
          data: scatterData,
          symbolSize: (val: any) => {
            return Math.max(Math.sqrt(val[2]) * 2, 10);
          },
          label: {
            show: true,
            formatter: (params: any) => params.data.value[2],
            position: 'inside',
            color: '#fff'
          },
          itemStyle: {
            color: '#765cbf',
            borderColor: '#B27799',
            borderWidth: 1
          },
          emphasis: {
            itemStyle: {
              color: '#B27799'
            }
          }
        }
      ]
    };
  }

  async loadLocations() {
    // Registrar el mapa mundial para ECharts
    try {
      const worldJson = await fetch('https://cdn.jsdelivr.net/npm/echarts@5/map/json/world.json').then(res => res.json());
      echarts.registerMap('world', worldJson);
    } catch (error) {
      console.error('Error loading world map:', error);
    }

    this.affiliateService.getTotalAffiliatesByCountries().subscribe({
      next: value => {
        this.maps = value.data.map(item => ({
          title: item.Title,
          value: item.Value,
          lat: item.Lat,
          lng: item.Lng,
        }));

        this.setMapInfo();
      },
      error: () => {
        this.showError('Error');
      },
    });
  }

  getLastRegisteredUsers() {
    this.affiliateService.getLastRegisteredAffiliates().subscribe({
      next: value => {
        this.lastRegisteredUsers = value.data;
      },
      error: () => {
        this.showError('Error');
      },
    });
  }
}
