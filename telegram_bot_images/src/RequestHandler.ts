import {StorageManager} from "src/sql/Storage";
import Sender from "src/libs/Sender";
import {loggerProduction} from "./libs/logger";
import storageManager from "./sql/storageManager";
import {buffer2file, file2buffer} from "./libs/bufferImage";
import {replies} from "./constants/replies";
import {imageProcess} from 'src/libs/imageProcessing'

export class RequestHandler {

    private readonly sender: Sender;
    private readonly storageManager: StorageManager;

    constructor(_sender: Sender, _storageManager: StorageManager) {
        this.sender = _sender;
        this.storageManager = _storageManager;
    }

    public async onStart(msg, match) {
        console.log('onStart')
        const chatId = msg.chat.id;
        loggerProduction.info(`Request from chat:${chatId}`);
        const res = await storageManager.user.getByChatId(chatId);
        if (!res) {
            await storageManager.user.addUser({chatId})
        }
        await this.sender.sendWelcome(chatId, {again: !!res});
    }

    public async onFilter(msg, match) {
        console.log('onFilter')
        const chatId = msg.chat.id;
        loggerProduction.info(`Request from chat:${chatId}`);
        const res = await storageManager.user.getByChatId(chatId);
        if (!res) {
            await storageManager.user.addUser({chatId})
        }
        await this.sender.sendRequest(chatId);
    }

    public async onPhoto(msg, match, imageBuffer: Buffer) {
        console.log('pnPhoto')
        const chatId = msg.chat.id;
        loggerProduction.info(`Request from chat:${chatId}`);
        const res = await storageManager.user.getByChatId(chatId);
        if (!res) {
            await storageManager.user.addUser({chatId})
        }
        const filenameStart = `${__dirname}/public/${chatId}`;
        const [filename, filenameResult] = ['', '-result'].map((elem) => (
            `${filenameStart}${elem}.png`)
        );
        await Promise.all([
            await buffer2file(filename, imageBuffer),
            await buffer2file(filenameResult, imageBuffer),
            await storageManager.user.updateByChatId(chatId, {
                imageSource: filename,
                imageResult: filenameResult
            })
        ])
        await this.sender.sendFilterButtons(chatId);
    }

    public async onKeyboardDown(msg, match) {
        console.log('onKeyboard')
        const chatId = msg.chat.id;
        const text: string = msg.text;
        const num = parseInt(text);

        const keys = Object.keys(replies.user.pickFilter)
        console.log(text, num)
        if (isNaN(num) || num < 1 || num > keys.length) {
            // return await this.sender.sendFilterButtons(chatId);
            return;
        }


        const user = await storageManager.user.getByChatId(chatId);
        if (!user) {
            return await this.sender.sendWelcome(chatId);
        }
        const imageBuffer = await file2buffer(user.imageResult);
        const resultBuffer = await imageProcess(imageBuffer, num)
        if (!resultBuffer) {
            await this.sender.sendPhoto(chatId, imageBuffer);
            return await this.sender.sendServerError(chatId);
        }
        return await this.sender.sendPhoto(chatId, resultBuffer);




        // loggerProduction.info(`Request from chat:${chatId}`);
        // const res = await storageManager.user.getByChatId(chatId);
        // if (!res) {
        //     await storageManager.user.addUser({chatId})
        // }
        // await this.sender.sendRequest(chatId);
    }
}