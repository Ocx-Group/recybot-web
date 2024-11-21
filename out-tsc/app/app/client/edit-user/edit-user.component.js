import { __awaiter, __decorate } from "tslib";
import { Component, ViewChild } from '@angular/core';
import { ref, uploadBytesResumable, getDownloadURL } from '@angular/fire/storage';
import { FormControl, Validators, } from '@angular/forms';
import { UpdateImageIdPath } from '@app/core/models/user-affiliate-model/update-image-id-path.model';
import { UserAffiliate } from '@app/core/models/user-affiliate-model/user.affiliate.model';
import { Subject, takeUntil } from 'rxjs';
let EditUserComponent = class EditUserComponent {
    constructor(toastr, authService, affiliateService, formBuilder, storage, faceApiService) {
        this.toastr = toastr;
        this.authService = authService;
        this.affiliateService = affiliateService;
        this.formBuilder = formBuilder;
        this.storage = storage;
        this.faceApiService = faceApiService;
        this.user = new UserAffiliate();
        this.updateImageIdPath = new UpdateImageIdPath();
        this.ngUnsubscribe = new Subject();
        this.listcountry = [];
        this.loadingIndicator = true;
        this.reorderable = true;
        this.active = 1;
        this.files = [];
        this.isUploadCompleted = false;
        this.progress = 0;
        this.displayBirthday = null;
    }
    ngOnInit() {
        this.faceApiService.getFunctionUpload()
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe(() => {
            this.startUpload();
        });
        this.userValidations();
        this.fetchCountry();
        this.getUserInfo();
    }
    ngOnDestroy() {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }
    showError(message) {
        this.toastr.error(message, 'Error!');
    }
    showSuccess(message) {
        this.toastr.success(message, 'Success!');
    }
    userValidations() {
        this.updateUserForm = this.formBuilder.group({
            identification: ['', Validators.required],
            user_name: new FormControl({ value: '', disabled: true }),
            name: new FormControl({ value: '', disabled: true }),
            last_name: new FormControl({ value: '', disabled: true }),
            email: new FormControl({ value: '', disabled: true }),
            father: new FormControl({ value: '', disabled: true }),
            phone: ['', Validators.required],
            address: [],
            country: [],
            tax_id: [],
            zip_code: [],
            created_at: new FormControl({ value: '', disabled: true }),
            birthday: [],
            beneficiary_name: [],
            legal_authorized_first: [],
            legal_authorized_second: [],
            side: []
        });
    }
    setValues(affiliate) {
        var _a, _b, _c, _d, _e, _f, _g;
        let formattedBirthday = null;
        if (affiliate.birthday) {
            const birthdayDate = new Date(affiliate.birthday);
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            this.displayBirthday = birthdayDate.toLocaleDateString('es-ES', options);
            formattedBirthday = birthdayDate.toISOString().split('T')[0];
            this.updateUserForm.get('birthday').setValue(formattedBirthday);
            this.updateUserForm.get('birthday').disable();
        }
        if (affiliate.identification) {
            this.updateUserForm.get('identification').setValue(affiliate.identification);
            this.updateUserForm.get('identification').disable();
        }
        if (affiliate.tax_id) {
            this.updateUserForm.get('tax_id').setValue(affiliate.tax_id);
            this.updateUserForm.get('tax_id').disable();
        }
        if (affiliate.beneficiary_name) {
            this.updateUserForm.get('beneficiary_name').setValue(affiliate.beneficiary_name);
            this.updateUserForm.get('beneficiary_name').disable();
        }
        if (affiliate.legal_authorized_first) {
            this.updateUserForm.get('legal_authorized_first').setValue(affiliate.legal_authorized_first);
            this.updateUserForm.get('legal_authorized_first').disable();
        }
        if (affiliate.legal_authorized_second) {
            this.updateUserForm.get('legal_authorized_second').setValue(affiliate.legal_authorized_second);
            this.updateUserForm.get('legal_authorized_second').disable();
        }
        this.updateUserForm.setValue({
            identification: affiliate.identification,
            user_name: affiliate.user_name,
            name: affiliate.name,
            last_name: affiliate.last_name,
            email: affiliate.email,
            side: (_a = affiliate.binary_matrix_side.toString()) !== null && _a !== void 0 ? _a : 0,
            father: affiliate.father_user_level ? (_b = affiliate.father_user_level.user_name) !== null && _b !== void 0 ? _b : '' : '',
            phone: affiliate.phone,
            address: (_c = affiliate.address) !== null && _c !== void 0 ? _c : '',
            tax_id: (_d = affiliate.tax_id) !== null && _d !== void 0 ? _d : '',
            country: affiliate.country,
            zip_code: affiliate.zip_code,
            created_at: affiliate.created_at,
            birthday: formattedBirthday,
            beneficiary_name: (_e = affiliate.beneficiary_name) !== null && _e !== void 0 ? _e : '',
            legal_authorized_first: (_f = affiliate.legal_authorized_first) !== null && _f !== void 0 ? _f : '',
            legal_authorized_second: (_g = affiliate.legal_authorized_second) !== null && _g !== void 0 ? _g : '',
        });
    }
    checkAndDisableInput() {
    }
    getUserInfo() {
        this.userCookie = this.authService.currentUserAffiliateValue;
        this.setValues(this.userCookie);
        this.affiliateService.getAffiliateById(this.userCookie.id).subscribe((response) => {
            if (response.success) {
                this.user = response.data;
                this.setValues(this.user);
            }
        });
    }
    fetchCountry() {
        this.affiliateService.getCountries().subscribe((data) => {
            this.listcountry = data;
        });
    }
    onSelect(event) {
        if (this.files.length === 0) {
            this.files.push(...event.addedFiles);
        }
    }
    onRemove(event) {
        this.files.splice(this.files.indexOf(event), 1);
    }
    onSaveUser() {
        let userUpdate = new UserAffiliate();
        userUpdate.identification = this.updateUserForm.get('identification').value;
        userUpdate.phone = this.updateUserForm.get('phone').value;
        userUpdate.binary_matrix_side = this.updateUserForm.get('side').value;
        userUpdate.address = this.updateUserForm.get('address').value;
        userUpdate.zip_code = this.updateUserForm.get('zip_code').value;
        userUpdate.country = this.updateUserForm.get('country').value;
        userUpdate.birthday = this.updateUserForm.get('birthday').value;
        userUpdate.tax_id = this.updateUserForm.get('tax_id').value;
        userUpdate.beneficiary_name = this.updateUserForm.get('beneficiary_name').value;
        userUpdate.legal_authorized_first = this.updateUserForm.get('legal_authorized_first').value;
        userUpdate.legal_authorized_second = this.updateUserForm.get('legal_authorized_second').value;
        userUpdate.id = this.user.id;
        this.affiliateService.updateUserProfile(userUpdate).subscribe((response) => {
            if (response !== null) {
                this.showSuccess('The credentials is valid!');
                this.setValues(response);
            }
            else {
                this.showError('Error!');
            }
        });
    }
    onFileSelected(event) {
        const files = Array.from(event.addedFiles);
        if (this.files.length + files.length <= 2) {
            this.files.push(...files);
            if (this.files.length == 2) {
                // this.faceApiService.verifyImagesWithSsdMobilenetv1(this.files)
                //   .then(result => {
                //     const canvasSelfieURL = result.canvasSelfie.toDataURL();
                //     const canvasIdDocumentURL = result.canvasIdDocument.toDataURL();
                //     const title = result.matched ? '¡Éxito! Las imágenes coinciden.' : 'Error: Las imágenes no coinciden.';
                //     Swal.fire({
                //       title: title,
                //       html: `
                //         <div style="display: flex; justify-content: space-between;">
                //           <img src="${canvasSelfieURL}" alt="Selfie" style="max-width: 45%; margin-right: 5%;" />
                //           <img src="${canvasIdDocumentURL}" alt="ID Document" style="max-width: 45%;" />
                //         </div>
                //         <div style="margin-top: 20px;">
                //           Distancia Euclidiana: ${result.distance.toFixed(2)} <br>
                //           Confianza mínima (minConfidence): 0.5
                //         </div>
                //       `,
                //       icon: result.matched ? 'success' : 'error'
                //     });
                // if (result.matched) {
                this.updateCardIdAuthorization(1);
                this.user.card_id_authorization = true;
                this.authService.setUserAffiliateValue(this.user);
            }
            else {
                // this.updateCardIdAuthorization(1);
                // this.user.card_id_authorization = true;
                // this.authService.setUserAffiliateValue(this.user);
            }
            // });
        }
        else {
            this.showError('Error: demasiados archivos seleccionados.');
            this.updateCardIdAuthorization(0);
        }
        const filePath = 'affiliates/' + `${this.user.user_name}/` + `${this.user.id}`;
        this.fileRef = ref(this.storage, filePath);
    }
    updateProgress(snapshot) {
        this.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    }
    handleError(error) {
        this.toastr.error('Upload failed');
    }
    handleComplete() {
        getDownloadURL(this.uploadTask.snapshot.ref)
            .then(downloadURL => this.updateAffiliateImage(downloadURL))
            .catch(err => this.handleUpdateError(err));
    }
    updateAffiliateImage(downloadURL) {
        return __awaiter(this, void 0, void 0, function* () {
            this.updateImageIdPath.image_id_path = downloadURL;
            this.updateImageIdPath.id = this.user.id;
            try {
                yield this.affiliateService.updateImageIdPath(this.updateImageIdPath).toPromise();
                this.handleUpdateSuccess();
            }
            catch (err) {
                this.handleUpdateError(err);
            }
        });
    }
    handleUpdateSuccess() {
        if (!this.isUploadCompleted) {
            this.toastr.success('Image updated successfully');
            this.faceApiService.startUploadFuntion();
            this.files = [];
            this.getUserInfo();
            this.isUploadCompleted = true;
        }
    }
    handleUpdateError(err) {
        this.toastr.error('Error updating affiliate image');
    }
    startUpload() {
        this.isUploadCompleted = false;
        this.uploadTask = uploadBytesResumable(this.fileRef, this.files[0]);
        this.uploadTask.on('state_changed', snapshot => this.updateProgress(snapshot), error => this.handleError(error), () => this.handleComplete());
    }
    deleteImage() {
        const filePath = 'affiliates/' + `${this.user.user_name}/` + `${this.user.id}`;
        this.user.image_id_path = '';
        this.updateImageIdPath.id = this.user.id;
        this.updateImageIdPath.image_id_path = this.user.image_id_path;
        this.affiliateService.updateImageIdPath(this.updateImageIdPath).subscribe({
            next: () => {
                this.showSuccess('Image deleted successfully');
                this.files = [];
            },
            error: () => {
                this.toastr.error('error');
            },
        });
    }
    deleteFile(index) {
        if (this.files.length > 0 && index < this.files.length) {
            this.files.splice(index, 1);
        }
    }
    updateCardIdAuthorization(option) {
        this.affiliateService.updateCardIdAuthorization(this.user.id, option).subscribe({
            next: (value) => {
                if (value.card_id_authorization) {
                    this.showSuccess('Afiliado verificado correctamente');
                }
                else {
                    this.showError('Su verificación se encuentra pendiente');
                }
            },
            error: (err) => {
                this.showError('No se pudo verificar el afiliado');
            },
        });
    }
};
__decorate([
    ViewChild('table')
], EditUserComponent.prototype, "table", void 0);
EditUserComponent = __decorate([
    Component({
        selector: 'app-edit-user',
        templateUrl: './edit-user.component.html',
    })
], EditUserComponent);
export { EditUserComponent };
//# sourceMappingURL=edit-user.component.js.map