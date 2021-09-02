import express from "express";
import emoji from "node-emoji"
import dotenv from 'dotenv'
dotenv.config()
import cors from 'cors'

import { router } from './src/routes/router.js'



const app = express()

app.use(cors())




app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(express.static('public'))
app.use(router)




const server = app.listen(process.env.PORT,() => {console.log(`${emoji.get('computer')}Server ON port ${process.env.PORT}`)})

server.on('error',(error) => console.log(error))