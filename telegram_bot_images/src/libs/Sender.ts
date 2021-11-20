import {replies} from "../constants/replies";
import TelegramBot, {KeyboardButton} from "node-telegram-bot-api";

export default class Sender {

    private readonly bot: TelegramBot

    constructor(_bot: TelegramBot) {
        this.bot = _bot
    }

    public async sendWelcome(chatId: string, {again = false} = {}) {
        let text: string = replies.bot.start;
        if (again) {
            text = replies.bot.alreadyAdded;
        }
        await this.bot.sendMessage(chatId, text)
    }

    public async sendRequest(chatId: string) {
        let text: string = replies.bot.requestPhoto;
        await this.bot.sendMessage(chatId, text)
    }

    public async sendError(chatId: string) {
        const text: string = replies.bot.serverError;
        await this.bot.sendMessage(chatId, text)
    }

    public async sendFilterList(chatId: string) {
        // TODO
        const text: string = replies.bot.serverError;
        await this.bot.sendMessage(chatId, text)
    }

    public async sendPhoto(chatId: string) {
        // TODO
        const text: string = replies.bot.photoTextMessage;
        await this.bot.sendPhoto(chatId, text, {caption: text});
    }

    public async sendFilterButtons(chatId: string) {
        const text: string = replies.bot.pickFilter;
        let buttons: Array<KeyboardButton> = [
            {text: replies.user.pickFilter.blur},
            {text: replies.user.pickFilter.darker},
            {text: replies.user.pickFilter.lighter},
        ];
        await this.bot.sendMessage(chatId, text, {
            "reply_markup": {
                "keyboard": [buttons]
            }
        })
    }
}

