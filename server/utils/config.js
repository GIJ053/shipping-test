require('dotenv').config()

const PORT = process.env.PORT
const SHIPENGINE_KEY = process.env.SHIPENGINE_KEY

module.exports = {
    PORT,
    SHIPENGINE_KEY
}