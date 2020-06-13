import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import mongoose from 'mongoose'
import RouterProvider from './routers/router-provider.js'
import config from './config.js'
import {Logger} from 'neilog'

const app = express()
const logger = new Logger()
initDatabase()

app.set('port', process.env.PORT || 4000)
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

// ROUTES
app.use('/example', RouterProvider.exampleRouter())


// express error handler
app.use((err, req, res, next) => {
    res.status(err.status || 500).send(err.message)
})
// invalid route
app.use((req, res, next) => {
    res.status(404).send('Ups, parece que solicitaste una ruta que no existe')
})

app.listen(app.get('port'), () => {
    console.log('Server listening on port ' + app.get('port'))
})

async function initDatabase() {
    const uri = config.config.dbURI
    logger.info(`Connecting to MongoDB ${config.currentEnv} database`)

    try {
        await mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true})
        mongoose.Model.on('index', function(err) {
            if (err) logger.error(err)
          })
        logger.info( `Succesfully connected to MongoDB ${config.currentEnv} database`)
    } catch (err) {
        logger.error(`Failed to connect to MongoDB ${config.currentEnv} database ${err}`)
    }
}