import mongoose from "mongoose";

const SchemaProducts = mongoose.Schema({

  timestamp : {
    type : String,
    require : true,
  },

  title : {
    type : String,
    require : true,
  },

  description : {
    type : String,
    require : true,
  },

  code : {
    type : Number,
    require : true,
  },

  pictureURL : {
    type : String,
    require : true,
  },

  price : {
    type : Number,
    require : true,
  },

  stock : {
    type : Number,
    require : true,
  }

}, { versionKey : false})

const ProductsModel = mongoose.model('Products',SchemaProducts)

export {SchemaProducts,ProductsModel}