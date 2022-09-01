require('dotenv').config()
const express = require('express')
const routes = require('./utils/routes')
const config = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')

const app = express()

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(middleware.requestLogger)

app.use(routes)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

app.listen(config.PORT, () => {
    logger.info(`Server running on port ${config.PORT}`)
})