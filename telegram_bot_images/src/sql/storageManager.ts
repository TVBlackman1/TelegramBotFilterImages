import {UserStorageManager} from "./user/User";
import {StorageManager} from "./Storage";

const userStorageManager = new UserStorageManager();
const storageManager = new StorageManager(userStorageManager);

export default storageManager;