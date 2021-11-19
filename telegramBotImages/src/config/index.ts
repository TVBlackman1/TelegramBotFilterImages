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
    }
}