import {IUserStorageManager, User, UserOptions} from "../../entities.global/db.entities";
import knex from '../../libs/db';
import {loggerDevelopment, loggerProduction} from "../../libs/logger";

export class UserStorageManager implements IUserStorageManager {
    async getByChatId(chatId: string): Promise<User> {
        const user: User = await knex('users').where({chatId}).first()
        if (user) {
            loggerDevelopment.silly(`Load info about ${chatId}`)
        } else {
            loggerDevelopment.silly(`Unsuccessful load info about ${chatId}`)
        }
        return user;
    }

    async updateByChatId(chatId: string, options: UserOptions): Promise<void> {
        await knex('users').where({chatId}).update({...options});
        return;
    }

    async addUser(user: User): Promise<void> {
        try {
            await knex('users').insert({...user})
            loggerDevelopment.silly(`Added user ${user.chatId}`)
        } catch (e) {
            loggerProduction.error(e.message)
        }
        return;
    }
}
