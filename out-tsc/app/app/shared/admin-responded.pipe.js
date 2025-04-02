import { __decorate } from "tslib";
import { Pipe } from '@angular/core';
import { map, of } from 'rxjs';
let AdminRespondedPipe = class AdminRespondedPipe {
    constructor(userService) {
        this.userService = userService;
        this.adminIds$ = this.userService.getAll().pipe(map(users => users.filter(user => user.rol_name === 'Administrador').map(admin => admin.id)));
    }
    transform(ticket) {
        if (!ticket || !ticket.messages) {
            return of(false);
        }
        return this.adminIds$.pipe(map(adminIds => ticket.messages.some(message => adminIds.includes(message.userId))));
    }
};
AdminRespondedPipe = __decorate([
    Pipe({
        name: 'adminResponded'
    })
], AdminRespondedPipe);
export { AdminRespondedPipe };
//# sourceMappingURL=admin-responded.pipe.js.map