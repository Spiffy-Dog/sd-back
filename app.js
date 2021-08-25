const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const express = require('express')
const logger = require('morgan')
const cors = require('cors')

const { errorHandler } = require('./src/helpers/apiHelpers')
const usersRouter = require('./src/routes/usersRouter')

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

app.use('/users', usersRouter)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(errorHandler)

module.exports = app