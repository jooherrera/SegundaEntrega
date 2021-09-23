import mongoose from 'mongoose'
 import {SchemaProducts} from './product.model.js'
 import pkg from 'mongoose';
const { Mixed } = pkg;

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