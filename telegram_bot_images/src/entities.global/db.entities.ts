type UserState = 'start' | 'pick';

type UserOptions = {
    state?: UserState,
    imageSource?: string,
    imageResult?: string,
}

type User = UserOptions & {
    chatId: string,
}

interface IUserStorageManager {
    getByChatId(chatId: string): Promise<User>;
    updateByChatId(chatId: string, options: UserOptions): Promise<void>
    addUser(user: User): Promise<void>
}

interface IStorageManager {
    user: IUserStorageManager
}

export {
    UserOptions,
    User,
    IUserStorageManager,
    IStorageManager
}