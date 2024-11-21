import { __awaiter, __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { addDoc, query, orderBy, getDocs } from 'firebase/firestore';
let ChatService = class ChatService {
    constructor() {
        // this.db = getFirestore();
        // this.messagesCollection = collection(this.db, 'messages');
    }
    getMessages() {
        return __awaiter(this, void 0, void 0, function* () {
            const messagesQuery = query(this.messagesCollection, orderBy("timestamp"));
            const messageSnapshot = yield getDocs(messagesQuery);
            return messageSnapshot.docs.map(doc => {
                const data = doc.data();
                if (typeof data === 'object' && data !== null) {
                    return Object.assign({ id: doc.id }, data);
                }
                else {
                    return { id: doc.id };
                }
            });
        });
    }
    addMessage(message, sender) {
        return __awaiter(this, void 0, void 0, function* () {
            yield addDoc(this.messagesCollection, { message, sender, timestamp: new Date() });
        });
    }
};
ChatService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], ChatService);
export { ChatService };
//# sourceMappingURL=chat.service.js.map