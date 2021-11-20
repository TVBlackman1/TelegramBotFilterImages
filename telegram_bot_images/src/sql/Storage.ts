import {IStorageManager, IUserStorageManager} from "../entities.global/db.entities";

export class StorageManager implements IStorageManager {
    public readonly user: IUserStorageManager;
    constructor(_user: IUserStorageManager) {
        this.user = _user
    }
}