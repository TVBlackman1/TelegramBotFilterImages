import {IStorage, IUserStorageManager} from "../entities.global/db.entities";

export class Storage implements IStorage {
    public readonly user: IUserStorageManager;
    constructor(_user: IUserStorageManager,) {
        this.user = _user
    }
}
// const storage = Storage()