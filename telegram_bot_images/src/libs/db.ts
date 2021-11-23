import knexfile from '../knexfile';
import {loggerProduction} from "./logger";

console.log(knexfile.connection)

const knex = require('knex')({
    client: knexfile.client,
    connection: knexfile.connection,
    pool: {
        afterCreate: function (conn, done) {
            conn.query('select * from users limit 1', function (err) {
                if (err) {
                    loggerProduction.error('Not connected to db', err)
                    done(err, conn);
                } else {
                    loggerProduction.info('Connected to db', err)
                    done(err, conn);
                }
            })
        }
    },
}, () => {})

setInterval(async () => {
    await knex.raw('SELECT * from users limit 1;');
}, 1000 * 60);

export default knex;
