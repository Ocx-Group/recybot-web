export class Privilege {
    constructor() {
        this.id = 0;
        this.rol_id = 0;
        this.menu_configuration_id = 0;
        this.can_create = false;
        this.can_read = false;
        this.can_delete = false;
        this.can_edit = false;
        this.created_at = new Date();
        this.updated_at = new Date();
    }
}
//# sourceMappingURL=privilege.model.js.map