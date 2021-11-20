import config from 'src/config'

import {ImageProcessingBot} from 'src/libs/telegramBot'
import storageManager from "./sql/storageManager";

storageManager.user.addUser({
    chatId: '12'
})

ImageProcessingBot.createInstance(config.telegram.token)