import { BehaviorSubject } from "rxjs";
export class UserDataService {
    constructor() {
        this.userSubject = new BehaviorSubject(null);
    }
    setUser(user) {
        this.userSubject.next(user);
    }
    getUser() {
        return this.userSubject.asObservable();
    }
}
//# sourceMappingURL=user-data.service.js.map