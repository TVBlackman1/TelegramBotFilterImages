import config from 'src/config'

import {ImageProcessingBot} from 'src/libs/telegramBot'

ImageProcessingBot.createInstance(config.telegram.token)