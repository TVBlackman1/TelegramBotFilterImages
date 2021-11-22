import * as TelegramBot from 'node-telegram-bot-api'
import {loggerDevelopment, loggerProduction} from "src/libs/logger";
import {stream2buffer} from "../bufferImage";
import Sender from "src/libs/Sender";
import storageManager from "src/sql/storageManager";
import {RequestHandler} from "../../RequestHandler";
import {PhotoSize} from "node-telegram-bot-api";


class LocalTelegramBot {
    private static instance: LocalTelegramBot;

    static getInstance() {
        if (!this.instance) {
            throw new Error("Instance is not defined")
        }
        return this.instance;
    }

    static createInstance(token: string) {
        this.instance = new LocalTelegramBot(token)
    }

    private readonly bot: TelegramBot;
    private readonly sender: Sender;
    private readonly requestHandler: RequestHandler;

    private constructor(token: string) {

        this.bot = new TelegramBot(token, {
            polling: true,
            filepath: false,
        })

        this.sender = new Sender(this.bot);
        this.requestHandler = new RequestHandler(this.sender, storageManager)

        this.setListeners();

        loggerProduction.info('Bot is listening');
    }

    private async getImage(photo: Array<PhotoSize>): Promise<Buffer> {
        const lastIndex = photo.length - 1
        const fileId = photo[lastIndex].file_id
        const stream = this.bot.getFileStream(fileId)
        return await stream2buffer(stream);
    }

    private setListeners(): void {
        this.bot.onText(/\/start/, this.requestHandler.onStart.bind(this.requestHandler))

        this.bot.onText(/\/filter/, this.requestHandler.onFilter.bind(this.requestHandler))

        this.bot.on('message', this.requestHandler.onKeyboardDown.bind(this.requestHandler))

        this.bot.on('photo', async (msg, match) => {
            const chatId = msg.chat.id;
            loggerProduction.info(`Request from chat:${chatId}`);

            const imageBuffer = await this.getImage(msg.photo);
            await this.requestHandler.onPhoto(msg, match, imageBuffer)
        })
    }
}

export {
    LocalTelegramBot as ImageProcessingBot
}