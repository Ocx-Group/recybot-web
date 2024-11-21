import { __decorate } from "tslib";
import { CreateAffiliate } from './../../core/models/user-affiliate-model/create-affiliate.model';
import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { UserAffiliate } from '@app/core/models/user-affiliate-model/user.affiliate.model';
let SignupComponent = class SignupComponent {
    constructor(modalService, activatedRoute, router, formBuilder, affiliateService, toastr, logoService) {
        var _a;
        this.modalService = modalService;
        this.activatedRoute = activatedRoute;
        this.router = router;
        this.formBuilder = formBuilder;
        this.affiliateService = affiliateService;
        this.toastr = toastr;
        this.logoService = logoService;
        this.key = '';
        this.side = '';
        this.submitted = false;
        this.error = '';
        this.sponsor = '';
        this.user = new UserAffiliate();
        this.listcountry = [];
        this.listState = [];
        this.selectedState = '';
        this.listCity = [];
        this.logoUrl = '';
        this.key = this.activatedRoute.snapshot.params.key || '';
        this.side = ((_a = this.user.side) === null || _a === void 0 ? void 0 : _a.toString()) || '';
        if (this.key) {
            this.loadValidations();
            this.getUserByUsername(this.key);
        }
        this.fetchCountry();
    }
    fetchCountry() {
        this.affiliateService.getCountries().subscribe((data) => {
            this.listcountry = data;
        });
    }
    ngOnInit() {
        this.getLogoUrl();
        this.loadValidations();
    }
    onCountrySelected(countryIso) {
        let country = this.listcountry.find((c) => c.id == countryIso);
        if (country === null || country === undefined) {
            return;
        }
        if (country.phoneCode === '1') {
            return;
        }
        this.registerForm.patchValue({
            phone: country.phoneCode
        });
    }
    loadValidations() {
        this.registerForm = this.formBuilder.group({
            user_name: ['', [Validators.required, NoWhitespaceValidator]],
            password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/)]],
            repitpassword: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/)]],
            name: ['', Validators.required],
            last_name: ['', [Validators.required]],
            phone: ['', Validators.required],
            country: ['', Validators.required],
            email: ['', Validators.required],
            terms_conditions: [false, Validators.required]
        }, {
            validator: passwordMatchValidator
        });
    }
    get create_user_controls() {
        return this.registerForm.controls;
    }
    getUserByUsername(key) {
        if (!key)
            return;
        this.affiliateService.getAffiliateByUserName(key).subscribe((user) => {
            if (user !== null) {
                this.sponsor = user.user_name;
                this.user = user;
            }
            else {
                this.router.navigate(['/signin']);
            }
        }, (err) => {
            this.router.navigate(['/signin']);
        });
    }
    get f() {
        return this.registerForm.controls;
    }
    onSubmit() {
        this.submitted = true;
        this.error = '';
        let termis_conditions = this.registerForm.value.terms_conditions;
        if (this.registerForm.invalid) {
            this.showError("Formulario invalido.");
            return;
        }
        if (termis_conditions === false) {
            this.showError("Los terminos y condiciones son requeridos.");
            return;
        }
        let user = new CreateAffiliate();
        user.user_name = this.registerForm.value.user_name;
        user.password = this.registerForm.value.password;
        user.name = this.registerForm.value.name;
        user.last_name = this.registerForm.value.last_name;
        user.phone = this.registerForm.value.phone;
        user.country = this.registerForm.value.country;
        user.state_place = '';
        user.city = '';
        user.email = this.registerForm.value.email;
        user.affiliate_type = this.registerForm.value.affiliate_type;
        user.father = this.user.id;
        user.sponsor = this.user.id;
        user.binary_sponsor = this.user.id;
        user.binary_matrix_side = +this.side;
        user.status = 1;
        this.affiliateService.createAffiliate(user).subscribe((response) => {
            if (response.success) {
                this.showSuccess(response.message);
                setTimeout(() => {
                    this.router.navigate(['/signin']);
                }, 5000);
            }
            else {
                this.showError(response.message);
            }
        });
    }
    openModal(content) {
        this.modalService.open(content, {
            ariaLabelledBy: 'modal-basic-title',
            size: 'xl',
            scrollable: true
        });
    }
    showSuccess(message) {
        this.toastr.success(message);
    }
    showError(message) {
        this.toastr.error(message);
    }
    getLogoUrl() {
        this.logoUrl = this.logoService.getLogoSrc();
    }
};
SignupComponent = __decorate([
    Component({
        selector: 'app-signup',
        templateUrl: './signup.component.html',
        styleUrls: ['./signup.component.scss'],
    })
], SignupComponent);
export { SignupComponent };
export function passwordMatchValidator(formGroup) {
    const password = formGroup.get('password').value;
    const confirmPassword = formGroup.get('repitpassword').value;
    return password === confirmPassword ? null : { passwordMismatch: true };
}
export function NoWhitespaceValidator(control) {
    if (control.value.indexOf(' ') >= 0) {
        return { 'whitespace': true };
    }
    else {
        return null;
    }
}
//# sourceMappingURL=signup.component.js.map