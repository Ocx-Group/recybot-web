import { __decorate } from "tslib";
import { Component } from '@angular/core';
let PageForceGenealogicalTreeComponent = class PageForceGenealogicalTreeComponent {
    constructor() {
        this.tree = {
            name: 'Rafael Gordon',
            image: 'assets/images/image-gallery/avatar/avatar1.png',
            children: [
                {
                    name: 'Ernesto Webster',
                    image: 'assets/images/image-gallery/avatar/avatar2.png',
                    children: [
                        {
                            name: 'Gene Carson',
                            image: 'assets/images/image-gallery/avatar/avatar3.png',
                            children: [],
                        },
                        {
                            name: 'Marie Alexander',
                            cssClass: 'yellow-on-hover',
                            image: 'assets/images/image-gallery/avatar/avatar4.png',
                            children: [],
                        },
                        {
                            name: 'Blake Briggs',
                            image: 'assets/images/image-gallery/avatar/avatar2.png',
                            children: [],
                        },
                    ],
                },
                {
                    name: 'Dustin Collier',
                    image: 'assets/images/image-gallery/avatar/avatar1.png',
                    children: [
                        {
                            name: 'Erick Brock',
                            image: 'assets/images/image-gallery/avatar/avatar4.png',
                            children: [],
                        },
                        {
                            name: 'Tammy Moody',
                            image: 'assets/images/image-gallery/avatar/avatar3.png',
                            children: [
                                {
                                    name: 'Dwight Cummings',
                                    image: 'assets/images/image-gallery/avatar/avatar1.png',
                                    children: [
                                        {
                                            name: 'Néstor Fuente',
                                            image: 'assets/images/image-gallery/avatar/avatar5.png',
                                            children: [],
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
            ],
        };
    }
};
PageForceGenealogicalTreeComponent = __decorate([
    Component({
        selector: 'app-page-force-genealogical-tree',
        templateUrl: './page-force-genealogical-tree.component.html',
        styleUrls: ['./page-force-genealogical-tree.component.scss'],
    })
], PageForceGenealogicalTreeComponent);
export { PageForceGenealogicalTreeComponent };
//# sourceMappingURL=page-force-genealogical-tree.component.js.map