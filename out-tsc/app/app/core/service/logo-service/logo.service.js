import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
let LogoService = class LogoService {
    constructor() {
        this.isDarkTheme = new BehaviorSubject(false);
        this.isDarkTheme$ = this.isDarkTheme.asObservable();
        const savedTheme = localStorage.getItem('isDarkTheme') === 'true';
        this.isDarkTheme.next(savedTheme);
    }
    toggleTheme(isDark) {
        this.isDarkTheme.next(isDark);
        localStorage.setItem('isDarkTheme', String(isDark));
    }
    getLogoSrc() {
        return this.isDarkTheme.value ? 'assets/images/logo-dark.png' : 'assets/images/logo-white.png';
    }
};
LogoService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], LogoService);
export { LogoService };
//# sourceMappingURL=logo.service.js.map