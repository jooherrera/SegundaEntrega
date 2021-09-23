import mongoose from 'mongoose'

const SchemaCart = mongoose.Schema({
  timestamp: {
    type : String,
    require : true,
  },
  products : {
    type : Array,
    require : false
  }

}, { versionKey : false})

export const CartModel = mongoose.model('Cart',SchemaCart)