# World Map Chart Component

Componente reutilizable para mostrar un mapa mundial con puntos de dispersión que representan datos por país.

## Uso

```typescript
import { WorldMapChartComponent, CountryData } from '@app/shared/components/world-map-chart/world-map-chart.component';

@Component({
  // ...
  imports: [WorldMapChartComponent]
})
export class MiComponente {
  countries: CountryData[] = [];
}
```

```html
<app-world-map-chart 
  [countries]="countries" 
  [height]="'400px'"
  [seriesName]="'Afiliados por País'">
</app-world-map-chart>
```

## Inputs

- **countries**: Array de objetos CountryData con la información de cada país
  - `Title`: Nombre del país
  - `Value`: Valor numérico a mostrar
  - `Lat`: Latitud
  - `Lng`: Longitud

- **height** (opcional): Altura del mapa. Por defecto: '400px'

- **seriesName** (opcional): Nombre de la serie para el tooltip. Por defecto: 'Afiliados por País'

## Características

- Carga automática del mapa mundial desde `assets/data/world.json`
- Puntos interactivos con tooltip
- Tamaño de punto proporcional al valor
- Zoom y navegación habilitados
- Actualización automática cuando cambian los datos
- Estilos consistentes que funcionan con temas claros y oscuros

## Ejemplo de datos

```typescript
const countries: CountryData[] = [
  { Title: 'México', Value: 150, Lat: 23.6345, Lng: -102.5528 },
  { Title: 'Colombia', Value: 80, Lat: 4.5709, Lng: -74.2973 },
  // ...
];
```

