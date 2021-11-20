import {StorageManager} from "src/sql/Storage";
import Sender from "src/libs/Sender";
import {loggerProduction} from "./libs/logger";
import storageManager from "./sql/storageManager";

export class RequestHandler {

    private readonly sender: Sender;
    private readonly storageManager: StorageManager;

    constructor(_sender: Sender, _storageManager: StorageManager) {
        this.sender = _sender;
        this.storageManager = _storageManager;
    }

    public async onStart(msg, match) {
        const chatId = msg.chat.id;
        loggerProduction.info(`Request from chat:${chatId}`);
        const res = await storageManager.user.getByChatId(chatId);
        if (!res) {
            await storageManager.user.addUser({chatId})
        }
        await this.sender.sendWelcome(chatId, {again: !!res});
    }

    public async onFilter(msg, match) {
        const chatId = msg.chat.id;
        loggerProduction.info(`Request from chat:${chatId}`);
        const res = await storageManager.user.getByChatId(chatId);
        if (!res) {
            await storageManager.user.addUser({chatId})
        }
        await this.sender.sendRequest(chatId);
        await this.sender.sendFilterButtons(chatId);
    }

    public async onPhoto(msg, match) {
        const chatId = msg.chat.id;
        loggerProduction.info(`Request from chat:${chatId}`);
        const res = await storageManager.user.getByChatId(chatId);
        if (!res) {
            await storageManager.user.addUser({chatId})
        }
        await this.sender.sendRequest(chatId);
    }
}