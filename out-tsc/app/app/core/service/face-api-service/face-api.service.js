import { __awaiter, __decorate } from "tslib";
import { Injectable } from '@angular/core';
import * as faceapi from 'face-api.js';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
let FaceApiService = class FaceApiService {
    constructor(toastr) {
        this.toastr = toastr;
        this.startFunctionUpload = new Subject();
        this.loadWithSsdMobilenetv1();
    }
    verifyImagesWithMcnnModel(files) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                Swal.fire({
                    title: 'Espera un momento mientras se realiza la validación',
                    showCancelButton: false,
                    showConfirmButton: false,
                    confirmButtonColor: '#8963ff',
                    cancelButtonColor: '#fb7823',
                    timer: 3000,
                    timerProgressBar: true,
                });
                Swal.showLoading(Swal.getDenyButton());
                yield this.loadWithMcnnModel();
                const [selfieElement, idDocumentElement] = yield Promise.all([
                    this.createImageElement(files[0]),
                    this.createImageElement(files[1])
                ]);
                const detectionOptions = new faceapi.MtcnnOptions({ minFaceSize: 100 });
                const [selfieDetection, idDocumentDetection] = yield Promise.all([
                    faceapi.detectAllFaces(selfieElement, detectionOptions).withFaceLandmarks().withFaceDescriptors(),
                    faceapi.detectAllFaces(idDocumentElement, detectionOptions).withFaceLandmarks().withFaceDescriptors()
                ]);
                if (selfieDetection && idDocumentDetection && selfieDetection.length > 0 && idDocumentDetection.length > 0) {
                    const distance = faceapi.euclideanDistance(selfieDetection[0].descriptor, idDocumentDetection[0].descriptor);
                    const similarityThreshold = 0.7;
                    if (distance < similarityThreshold) {
                        this.showSuccess('La verificación fue exitosa. Las imágenes coinciden.');
                    }
                    else {
                        this.showError('La verificación falló. Las imágenes no coinciden.');
                    }
                }
                else {
                    this.showError('No se encontró una cara en una de las imágenes.');
                }
            }
            catch (error) {
                this.showError('Ha ocurrido un error durante la verificación.');
                console.error(error);
            }
        });
    }
    createImageElement(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (event) => {
                const image = new Image();
                image.onload = () => {
                    resolve(image);
                };
                image.onerror = reject;
                image.src = event.target.result;
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    }
    loadWithMcnnModel() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield Promise.all([
                    faceapi.nets.mtcnn.loadFromUri('assets/models'),
                    faceapi.nets.faceLandmark68Net.loadFromUri('assets/models'),
                    faceapi.nets.faceRecognitionNet.loadFromUri('assets/models')
                ]);
            }
            catch (error) {
                console.error('Error loading models:', error);
            }
        });
    }
    showError(message) {
        this.toastr.error(message, 'Error!');
    }
    showSuccess(message) {
        this.toastr.success(message, 'Success!');
    }
    loadWithSsdMobilenetv1() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield Promise.all([
                    faceapi.nets.ssdMobilenetv1.load('assets/models'),
                    faceapi.nets.faceLandmark68Net.loadFromUri('assets/models'),
                    faceapi.nets.faceRecognitionNet.loadFromUri('assets/models')
                ]);
            }
            catch (error) {
            }
        });
    }
    verifyImagesWithSsdMobilenetv1(files) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                Swal.fire({
                    title: 'Espera un momento mientras se realiza la validación',
                    showCancelButton: false,
                    showConfirmButton: false,
                    confirmButtonColor: '#8963ff',
                    cancelButtonColor: '#fb7823',
                    timer: 3000,
                    timerProgressBar: true,
                });
                Swal.showLoading(Swal.getDenyButton());
                yield this.loadWithSsdMobilenetv1();
                const [selfieElement, idDocumentElement] = yield Promise.all([
                    this.createImageElement(files[0]),
                    this.createImageElement(files[1])
                ]);
                const detectionOptions = new faceapi.SsdMobilenetv1Options({ minConfidence: 0.5 });
                const [selfieDetection, idDocumentDetection] = yield Promise.all([
                    faceapi.detectSingleFace(selfieElement, detectionOptions).withFaceLandmarks().withFaceDescriptor(),
                    faceapi.detectSingleFace(idDocumentElement, detectionOptions).withFaceLandmarks().withFaceDescriptor()
                ]);
                const canvasSelfie = faceapi.createCanvasFromMedia(selfieElement);
                canvasSelfie.getContext('2d').drawImage(selfieElement, 0, 0, selfieElement.width, selfieElement.height);
                faceapi.draw.drawDetections(canvasSelfie, selfieDetection);
                faceapi.draw.drawFaceLandmarks(canvasSelfie, selfieDetection);
                const canvasIdDocument = faceapi.createCanvasFromMedia(idDocumentElement);
                canvasIdDocument.getContext('2d').drawImage(idDocumentElement, 0, 0, idDocumentElement.width, idDocumentElement.height);
                faceapi.draw.drawDetections(canvasIdDocument, idDocumentDetection);
                faceapi.draw.drawFaceLandmarks(canvasIdDocument, idDocumentDetection);
                const distance = faceapi.euclideanDistance(selfieDetection.descriptor, idDocumentDetection.descriptor);
                const similarityThreshold = 0.8;
                if (distance < similarityThreshold) {
                    this.showSuccess('La verificación fue exitosa. Las imágenes coinciden.');
                    this.startUploadFuntion();
                    return {
                        matched: true,
                        distance: distance,
                        canvasSelfie: canvasSelfie,
                        canvasIdDocument: canvasIdDocument
                    };
                }
                else {
                    this.showError('La verificación falló. Las imágenes no coinciden.');
                    return {
                        matched: false,
                        distance: distance,
                        canvasSelfie: canvasSelfie,
                        canvasIdDocument: canvasIdDocument
                    };
                }
            }
            catch (error) {
                this.showError('Ha ocurrido un error durante la verificación.');
                return {
                    matched: false,
                    distance: NaN,
                    canvasSelfie: null,
                    canvasIdDocument: null
                };
            }
        });
    }
    startUploadFuntion() {
        this.startFunctionUpload.next();
    }
    getFunctionUpload() {
        return this.startFunctionUpload.asObservable();
    }
};
FaceApiService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], FaceApiService);
export { FaceApiService };
//# sourceMappingURL=face-api.service.js.map