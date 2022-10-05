import express, { urlencoded, json } from 'express'
import env from 'dotenv'
import morgan from 'morgan'
import cors from 'cors'
import helmet from 'helmet'
import routes from './routes.js'
env.config()

const app = express()

app.use(cors())
app.use(urlencoded({ extended: false }))
app.use(json())
app.use(helmet())
app.use(morgan('dev'))
app.use(routes)

app.listen(process.env.SERVER_PORT)
