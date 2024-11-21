import { __decorate } from "tslib";
import { Component } from '@angular/core';
let WhitePaperComponent = class WhitePaperComponent {
    constructor() {
        this.sections = [
            {
                id: 'resumen-ejecutivo',
                title: 'Resumen Ejecutivo',
                content: `<strong>Introducción:</strong> El proyecto RECYCOIN busca revolucionar...`
            },
            {
                id: 'problema-oportunidad',
                title: 'Problema y Oportunidad',
                content: `<strong>Contexto del Mercado:</strong> El sector turístico global...`
            },
            // Agrega todas las secciones del white paper aquí...
        ];
        this.visibleSections = [];
    }
    ngAfterViewInit() {
        this.revealText();
    }
    revealText() {
        this.sections.forEach((section, index) => {
            setTimeout(() => {
                this.visibleSections.push(section.id);
            }, 1000 * index); // Retardo para cada sección
        });
    }
};
WhitePaperComponent = __decorate([
    Component({
        selector: 'app-white-paper',
        templateUrl: './white-paper.component.html',
        styleUrls: ['./white-paper.component.scss'],
    })
], WhitePaperComponent);
export { WhitePaperComponent };
//# sourceMappingURL=white-paper.component.js.map