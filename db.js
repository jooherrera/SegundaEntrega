import dotenv from 'dotenv'
dotenv.config()
import emoji from "node-emoji"
import mongoose from 'mongoose'

mongoose.connect(
  process.env.MONGOURI,
  {
    useNewUrlParser:true,
    useUnifiedTopology:true
  },
  (error) => {
    if (error) { console.log(error)}
    else{
      console.log(emoji.get('fire'),'Conectado a la Base de datos.')
    }
  }
)

export {mongoose}