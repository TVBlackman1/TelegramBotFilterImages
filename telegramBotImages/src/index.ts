import config from 'src/config'

import {ImageProcessingBot} from 'src/libs/telegramBot'
import {UserStorageManager} from "./sql/user/User";
import {User} from "./entities.global/db.entities";

let userStorageManager = new UserStorageManager();

let user: User = {
    chatId: '1234',
    state: 'start',
}
userStorageManager.addUser(user)

ImageProcessingBot.createInstance(config.telegram.token)