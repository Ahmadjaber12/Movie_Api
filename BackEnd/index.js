import express from 'express'
import  cors from 'cors'
import appinit from './appInit.js'
import * as dotenv from "dotenv"
dotenv.config()
const app = express()
const port = 4000
app.get('/', (req, res) => res.send('Hello World!'))
appinit(app,express)
app.listen(port, () => console.log(`Example app listening on port ${port}!`))