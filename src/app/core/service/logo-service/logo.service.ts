import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LogoService {
  private isDarkTheme = new BehaviorSubject<boolean>(false);
  isDarkTheme$ = this.isDarkTheme.asObservable();

  constructor() {
    const savedTheme = localStorage.getItem('isDarkTheme') === 'true';
    this.isDarkTheme.next(savedTheme);
  }

  toggleTheme(isDark: boolean): void {
    this.isDarkTheme.next(isDark);
    localStorage.setItem('isDarkTheme', String(isDark));
  }

  getLogoSrc(): string {
    return 'assets/images/logos/Logo-recybot.png';
  }
}
