require('dotenv').config()

if (process.env.PYTHON_HOST.startsWith('http') === false) {
    process.env.PYTHON_HOST = 'http://' + process.env.PYTHON_HOST
}

export default {
    telegram: {
        token: process.env.TELEGRAM_TOKEN || ''
    },
    urn: {
        imageProcessing: process.env.PYTHON_HOST || 'http://localhost:1316'
    },
    uri: {
        imageProcessing: {
            process: '/api/process'
        }
    },
    db: {
        user: process.env.MYSQL_USER || 'root',
        password: process.env.MYSQL_PASS || 'root',
        host: process.env.MYSQL_HOST || 'http://localhost:3306',
    }
}