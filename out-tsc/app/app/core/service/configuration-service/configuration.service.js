import { __decorate } from "tslib";
import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from '@environments/environment';
const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': environment.tokens.systemConfigurationService.toString(),
        'X-Client-ID': environment.tokens.clientID.toString()
    }),
};
let ConfigurationService = class ConfigurationService {
    constructor(router, http) {
        this.router = router;
        this.http = http;
        this.urlApi = environment.apis.systemConfigurationService;
    }
    createMatrixConfiguration(matrixConfiguration) {
        return this.http
            .post(this.urlApi.concat('/configuration/matrix_configuration/'), matrixConfiguration, httpOptions)
            .pipe(map((data) => {
            return data;
        }));
    }
    getMatrixConfiguration() {
        return this.http
            .get(this.urlApi.concat('/configuration/get_matrix_configuration/'), httpOptions)
            .pipe(map((response) => {
            if (response.success)
                return response.data;
            else {
                console.error('ERROR: ' + response);
                return null;
            }
        }));
    }
    createProductConfiguration(productConfiguration) {
        return this.http
            .post(this.urlApi.concat('/configuration/product_configuration/'), productConfiguration, httpOptions)
            .pipe(map((data) => {
            return data;
        }));
    }
    getProductConfiguration() {
        return this.http
            .get(this.urlApi.concat('/configuration/get_product_configuration/'), httpOptions)
            .pipe(map((response) => {
            if (response.success)
                return response.data;
            else {
                console.error('ERROR: ' + response);
                return null;
            }
        }));
    }
    createCompensationPlansConfiguration(compensationPlansConfiguration) {
        return this.http
            .post(this.urlApi.concat('/configuration/compensation_plans_configuration/'), compensationPlansConfiguration, httpOptions)
            .pipe(map((data) => {
            return data;
        }));
    }
    getCompensationPlansConfiguration() {
        return this.http
            .get(this.urlApi.concat('/configuration/get_compensation_plans_configuration/'), httpOptions)
            .pipe(map((response) => {
            if (response.success)
                return response.data;
            else {
                console.error('ERROR: ' + response);
                return null;
            }
        }));
    }
    createWithdrawalsWalletConfiguration(walletWithdrawalsConfiguration) {
        return this.http
            .post(this.urlApi.concat('/configuration/withdrawals_wallet_configuration/'), walletWithdrawalsConfiguration, httpOptions)
            .pipe(map((data) => {
            return data;
        }));
    }
    getWithdrawalsWalletConfiguration() {
        return this.http
            .get(this.urlApi.concat('/configuration/get_withdrawals_wallet_configuration/'), httpOptions)
            .pipe(map((response) => {
            if (response.success)
                return response.data;
            else {
                console.error('ERROR: ' + response);
                return null;
            }
        }));
    }
    createAdditionalParametersWalletConfiguration(additionalParametersConfiguration) {
        return this.http
            .post(this.urlApi.concat('/configuration/additional_parameters_wallet_configuration/'), additionalParametersConfiguration, httpOptions)
            .pipe(map((data) => {
            return data;
        }));
    }
    getAdditionalParametersWalletConfiguration() {
        return this.http
            .get(this.urlApi.concat('/configuration/get_additional_parameters_wallet_configuration/'), httpOptions)
            .pipe(map((response) => {
            if (response.success)
                return response.data;
            else {
                console.error('ERROR: ' + response);
                return null;
            }
        }));
    }
    createPassivePackConfiguration(additionalParametersConfiguration) {
        return this.http
            .post(this.urlApi.concat('/configuration/additional_parameters_wallet_configuration/'), additionalParametersConfiguration, httpOptions)
            .pipe(map((data) => {
            return data;
        }));
    }
    getPassivePackConfiguration() {
        return this.http
            .get(this.urlApi.concat('/configuration/get_additional_parameters_wallet_configuration/'), httpOptions)
            .pipe(map((response) => {
            if (response.success)
                return response.data;
            else {
                console.error('ERROR: ' + response);
                return null;
            }
        }));
    }
    checkMaintenance() {
        return this.http.get(this.urlApi.concat('/configuration/is_under_maintenance'), httpOptions).pipe(map((response) => {
            if (response.success)
                return response.data;
            else {
                console.error('ERROR: ' + response);
                return null;
            }
        }));
    }
    setGeneralConfiguration(generalConfiguration) {
        return this.http.post(this.urlApi.concat('/configuration/set_general_configuration'), generalConfiguration, httpOptions)
            .pipe(map(data => data));
    }
    getGeneralConfiguration() {
        return this.http.get(this.urlApi.concat('/configuration/get_general_configuration'), httpOptions)
            .pipe(map(data => data));
    }
};
ConfigurationService = __decorate([
    Injectable({
        providedIn: 'root',
    })
], ConfigurationService);
export { ConfigurationService };
//# sourceMappingURL=configuration.service.js.map