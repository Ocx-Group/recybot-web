import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
let LanguageService = class LanguageService {
    constructor(translate) {
        this.translate = translate;
        this.languages = ['en', 'es'];
        let browserLang;
        translate.addLangs(this.languages);
        if (localStorage.getItem('lang')) {
            browserLang = localStorage.getItem('lang');
        }
        else {
            browserLang = translate.getBrowserLang();
        }
        translate.use(browserLang.match(/en|es/) ? browserLang : 'es');
    }
    setLanguage(lang) {
        this.translate.use(lang);
        localStorage.setItem('lang', lang);
    }
};
LanguageService = __decorate([
    Injectable({
        providedIn: 'root',
    })
], LanguageService);
export { LanguageService };
//# sourceMappingURL=language.service.js.map