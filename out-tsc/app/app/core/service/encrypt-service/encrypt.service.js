import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
let EncryptService = class EncryptService {
    constructor() {
        this.generateSecureKeyAndIV = () => {
            const keySize = 256 / 8;
            const ivSize = 128 / 8;
            const key = CryptoJS.lib.WordArray.random(keySize);
            const iv = CryptoJS.lib.WordArray.random(ivSize);
            const keyHex = CryptoJS.enc.Hex.stringify(key);
            const ivHex = CryptoJS.enc.Hex.stringify(iv);
            console.log('Clave generada:', keyHex);
            console.log('IV generado:', ivHex);
        };
    }
    encryptObject(objet) {
        const key = CryptoJS.enc.Hex.parse('0e4897fd799d9aca629d0036b3a4e524d9d200ab9f7e276933903add694a100f');
        const iv = CryptoJS.enc.Hex.parse('f74dc6fdc72a2828f74dc6fdc72a2828');
        const serializeObject = JSON.stringify(objet);
        const encrypted = CryptoJS.AES.encrypt(serializeObject, key, { iv: iv }).toString();
        return encrypted;
    }
};
EncryptService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], EncryptService);
export { EncryptService };
//# sourceMappingURL=encrypt.service.js.map