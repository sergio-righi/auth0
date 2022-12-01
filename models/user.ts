import { UserType } from "@/interfaces";

export default class UserModel {

    constructor(params?: UserType) {
        Object.assign(this, { verified: false, deleted: false }, params);
    }

    static canCreate() {
        return true;
    }

    static canUpdate() {
        return true;
    }
}