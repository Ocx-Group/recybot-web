import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxEchartsModule, provideEchartsCore } from 'ngx-echarts';
import * as echarts from 'echarts';
import { EChartsOption } from 'echarts';

export interface CountryData {
  Title: string;
  Value: number;
  Lat: number;
  Lng: number;
}

@Component({
  selector: 'app-world-map-chart',
  templateUrl: './world-map-chart.component.html',
  styleUrls: ['./world-map-chart.component.scss'],
  standalone: true,
  imports: [CommonModule, NgxEchartsModule],
  providers: [
    provideEchartsCore({
      echarts: () => import('echarts'),
    }),
  ],
})
export class WorldMapChartComponent implements OnInit, OnChanges {
  @Input() countries: CountryData[] = [];
  @Input() height: string = '400px';
  @Input() seriesName: string = 'Afiliados por País';

  public mapChartOption: EChartsOption = {};
  private mapLoaded = false;

  async ngOnInit() {
    await this.loadWorldMap();
    this.updateChart();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.mapLoaded && changes['countries']) {
      this.updateChart();
    }
  }

  private async loadWorldMap() {
    try {
      const worldJson = await fetch('assets/data/world.json').then(res =>
        res.json(),
      );
      echarts.registerMap('world', worldJson);
      this.mapLoaded = true;
    } catch (error) {
      console.error('Error loading world map:', error);
    }
  }

  private updateChart() {
    if (!this.countries || this.countries.length === 0) {
      return;
    }

    const scatterData = this.countries.map(item => ({
      name: item.Title,
      value: [item.Lng, item.Lat, item.Value],
      itemStyle: {
        color: '#43e37f',
      },
    }));

    this.mapChartOption = {
      backgroundColor: 'transparent',
      tooltip: {
        trigger: 'item',
        backgroundColor: 'rgba(4, 12, 16, 0.95)',
        borderColor: 'rgba(67, 227, 127, 0.45)',
        borderWidth: 1,
        padding: [8, 12],
        textStyle: {
          color: '#ffffff',
          fontSize: 12,
        },
        extraCssText:
          'border-radius: 10px; box-shadow: 0 8px 24px rgba(0,0,0,0.5), 0 0 18px rgba(67,227,127,0.25); backdrop-filter: blur(10px);',
        formatter: (params: any) => {
          if (params.data) {
            return `<strong style="color:#43e37f">${params.data.name}</strong><br/>Cantidad: <strong>${params.data.value[2]}</strong>`;
          }
          return params.name;
        },
      },
      geo: {
        map: 'world',
        roam: true,
        silent: false,
        itemStyle: {
          areaColor: 'rgba(67, 227, 127, 0.06)',
          borderColor: 'rgba(67, 227, 127, 0.35)',
          borderWidth: 0.6,
          shadowColor: 'rgba(67, 227, 127, 0.15)',
          shadowBlur: 8,
        },
        emphasis: {
          itemStyle: {
            areaColor: 'rgba(67, 227, 127, 0.22)',
            borderColor: '#43e37f',
          },
          label: {
            color: '#43e37f',
          },
        },
      },
      series: [
        {
          name: this.seriesName,
          type: 'effectScatter',
          coordinateSystem: 'geo',
          data: scatterData,
          rippleEffect: {
            brushType: 'stroke',
            scale: 3,
            period: 3.5,
          },
          showEffectOn: 'render',
          symbolSize: (val: any) => {
            return Math.max(Math.sqrt(val[2]) * 2, 10);
          },
          label: {
            show: true,
            formatter: (params: any) => params.data.value[2],
            position: 'inside',
            color: '#04221a',
            fontWeight: 'bold',
            fontSize: 11,
          },
          itemStyle: {
            color: '#43e37f',
            borderColor: '#00d4aa',
            borderWidth: 2,
            shadowColor: 'rgba(67, 227, 127, 0.8)',
            shadowBlur: 14,
          },
          emphasis: {
            scale: 1.2,
            itemStyle: {
              color: '#7af6a4',
              borderColor: '#ffffff',
              shadowBlur: 22,
            },
          },
          zlevel: 2,
        },
      ],
    };
  }
}
