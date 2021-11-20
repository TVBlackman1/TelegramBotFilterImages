import {IUserStorageManager, User, UserOptions} from "../../entities.global/db.entities";
import knex from "knex";

export class UserStorageManager implements IUserStorageManager {
    async getByChatId(chatId: string): Promise<User> {
        const user: User = await knex('users').where({chatId}).first()
        return user;
    }

    async updateByChatId(chatId: string, options: UserOptions): Promise<void> {
        await knex('users').where({chatId}).update({...options});
        return;
    }

    async addUser(user: User): Promise<void> {
        await knex('users').insert({...user})
        return;
    }
}
