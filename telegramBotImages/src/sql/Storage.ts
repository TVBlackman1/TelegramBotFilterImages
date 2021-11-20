import {IStorage, IUser} from "../entities.global/db.entities";

export class Storage implements IStorage {
    public readonly user: IUser;
    constructor(_user: IUser,) {
        this.user = _user
    }
}
// const storage = Storage()