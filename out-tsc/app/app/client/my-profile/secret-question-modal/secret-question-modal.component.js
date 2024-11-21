import { __decorate } from "tslib";
import { Component, ViewChild } from '@angular/core';
import { Validators, } from '@angular/forms';
import { SecretQuestion } from '@app/core/models/secret-question-model/secret.question.model';
let SecretQuestionModalComponent = class SecretQuestionModalComponent {
    constructor(modalService, formBuilder, toastr, affiliateService) {
        this.modalService = modalService;
        this.formBuilder = formBuilder;
        this.toastr = toastr;
        this.affiliateService = affiliateService;
        this.submitted = false;
        this.secretQuestion = new SecretQuestion();
    }
    ngOnInit() {
        this.loadValidations();
    }
    onChangeSecretQuestionUpload() {
        this.submitted = true;
        if (this.secretQuestionForm.invalid) {
            return;
        }
        this.secretQuestion.password = this.secretQuestionForm.value.currentPassword;
        this.secretQuestion.secret_answer = this.secretQuestionForm.value.pin;
        this.secretQuestion.secret_question = this.secretQuestionForm.value.confirmPin;
        this.secretQuestion.id = this.userId;
        this.affiliateService.updateSecretQuestion(this.secretQuestion).subscribe((response) => {
            if (response.success) {
                this.showSuccess('The secret question has been successfully updated!');
                this.closeModals();
            }
            else {
                this.showError('The password is not correct!');
            }
        });
    }
    showError(message) {
        this.toastr.error(message, 'Error!');
    }
    loadValidations() {
        this.secretQuestionForm = this.formBuilder.group({
            currentPassword: ['', Validators.required],
            secretQuestion: ['', Validators.required],
            secretAnswer: ['', Validators.required],
        });
    }
    openSecretQuestionModal(content, user) {
        this.submitted = false;
        this.modalService.open(content, {
            ariaLabelledBy: 'modal-basic-title',
            size: 'lg',
        });
        this.secretQuestionForm.setValue({
            currentPassword: '',
            secretQuestion: '',
            secretAnswer: '',
        });
        this.userId = user.id;
    }
    get secret_question_form() {
        return this.secretQuestionForm.controls;
    }
    showSuccess(message) {
        this.toastr.success(message, 'Success!');
    }
    closeModals() {
        this.modalService.dismissAll();
    }
};
__decorate([
    ViewChild('secretQuestionModal')
], SecretQuestionModalComponent.prototype, "secretQuestionModal", void 0);
SecretQuestionModalComponent = __decorate([
    Component({
        selector: 'app-secret-question-modal',
        templateUrl: './secret-question-modal.component.html',
    })
], SecretQuestionModalComponent);
export { SecretQuestionModalComponent };
//# sourceMappingURL=secret-question-modal.component.js.map