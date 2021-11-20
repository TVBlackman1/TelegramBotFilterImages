require('ts-node/register');
import config from './config'

export default {
    client: 'mysql',
    connection: {
        host: config.db.host,
        user: config.db.user,
        password: config.db.password,
        charset: 'utf8',
        database: 'telegram_bot',
        supportBigNumbers: true,
        port: config.db.port
    },
    pool: { min: 0, max: 16 },
    migrations: {
        directory: __dirname + '/sql/migrations',
    },
}