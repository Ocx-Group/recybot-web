import { NgModule } from '@angular/core';
import { FeatherModule } from 'angular-feather';
import { allIcons } from 'angular-feather/icons';

/**
 * Módulo tradicional para componentes con módulos (NgModule)
 * @deprecated Usar provideFeatherIcons() para componentes standalone
 */
@NgModule({
  imports: [FeatherModule.pick(allIcons)],
  exports: [FeatherModule],
})
export class IconsModule {}

/**
 * Helper para usar en standalone components
 *
 * Uso:
 * @Component({
 *   standalone: true,
 *   imports: [CommonModule, provideFeatherIcons()],
 *   ...
 * })
 */
export function provideFeatherIcons() {
  return FeatherModule.pick(allIcons);
}

/**
 * Helper para usar iconos específicos en standalone components
 *
 * Uso:
 * import { User, Key, Eye } from 'angular-feather/icons';
 *
 * @Component({
 *   standalone: true,
 *   imports: [CommonModule, provideFeatherIconsPick({ User, Key, Eye })],
 *   ...
 * })
 */
export function provideFeatherIconsPick(icons: any) {
  return FeatherModule.pick(icons);
}

