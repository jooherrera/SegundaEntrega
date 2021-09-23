import { ProductsModel, CartModel } from '../models/model.js';
import pkg from 'mongodb';
const {ObjectId} = pkg;

 class Controller  {
  constructor(){}

  async createProduct(producto){
    try {
      const response = await ProductsModel.create(producto)
      console.log(response)
    } catch (error) {
      console.log(error)
      return null
    }
  }

  async getById(id){
    try {
      const producto = await ProductsModel.find({title : id})
      return producto
    } catch (error) {
      return null
    }
  }

  async getAllProducts (){
    let data;
    try {
      data = await ProductsModel.find()
      return data      
    } catch (error) {
      return null
    }
  }
  
  async delete(id){
    try {
      const producto = await ProductsModel.deleteOne({_id : id})
      if (!producto) {throw `Error`}
      return `Se actualizo exitosamente`
    } catch (error) {
      return null
    }
  }

  async actualizar(id, objeto){
    try {
      const producto = await ProductsModel.updateOne({_id : id }, objeto)
      if (!producto) {throw `Error`}
      return `Se actualizo exitosamente`
    } catch (error) {
      return null
    }
  }
 
//!----------------------------------------------------Carrito-------------------------------------------
 
async newCart(){
  try {
    const respuesta = await CartModel.create({ timestamp : new Date().toLocaleString() })
    if(!respuesta) {throw `error`}
      return respuesta._id
  } catch (error) {
    return null
  }
}

async getCartById(id){
    try {
      const products  = await CartModel.findOne({_id : id })
      if (!products) {throw `No existe el ID`}
      return products
    } catch (error) {
      return null
    }
  }

  async saveCart(id,producto){
    try {
      console.log("ID CARRITO" , id)
     const  respuesta = await CartModel.updateOne({_id : id},{ $push : { products : producto }})
      return 1
    } catch (error) {
      return null
    }
  }

  async deleteCartId(id){
    try {
      const respuesta = await CartModel.deleteOne({_id : id})
      if(!respuesta) { throw `No se elimino nada.`}
      return respuesta
    } catch (error) {
      return null
    }
  }

  async deleteProdByID(id,id_prod){
    try {
    const  respuesta = await CartModel.updateMany({_id : id},{ $pull :  { products : { _id : ObjectId(id_prod) }}},{multi : true})
     if(!respuesta ) { throw `Error`}
      return respuesta
    } catch (error) {
      console.log(error)
      return null
    }
  }
 }

export default new Controller()