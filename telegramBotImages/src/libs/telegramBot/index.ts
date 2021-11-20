import * as TelegramBot from 'node-telegram-bot-api'
import {loggerDevelopment, loggerProduction} from "src/libs/logger";
import {stream2buffer} from "../bufferImage";
import {process} from 'src/libs/imageProcessing'


class LocalTelegramBot {
    private static instance: LocalTelegramBot;

    static getInstance() {
        if (!this.instance) {
            throw new Error("Instance is not defined")
        }
        return this.instance
    }

    static createInstance(token: string) {
        this.instance = new LocalTelegramBot(token)
    }

    private readonly bot: TelegramBot;

    private constructor(token: string) {

        this.bot = new TelegramBot(token, {
            polling: true,
            filepath: false,
        })

        this.setListeners()

        loggerProduction.info('Bot is listening')
    }

    private setListeners(): void {
        this.bot.on('photo', async (msg, match) => {
            const chatId = msg.chat.id;
            loggerProduction.info(`Request from chat:${chatId}`)

            const lastIndex = msg.photo.length - 1
            const fileId = msg.photo[lastIndex].file_id
            const stream = this.bot.getFileStream(fileId)
            let buff = await stream2buffer(stream);
            let newBuff = await process(buff)

            if (!newBuff) {
                this.bot.sendMessage(chatId, 'Server error. Try again later')
            } else {
                this.bot.sendPhoto(chatId, newBuff)
            }
        })
    }
}

export {
    LocalTelegramBot as ImageProcessingBot
}