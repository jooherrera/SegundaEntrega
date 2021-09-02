import   {DataBase, DBCarrito}   from '../models/model.js'

 class Controller  {
  constructor(){
    
  }

  
  async delete(id){
    try {
      const producto = await DataBase.deleteById(id)
      if (!producto) {throw `Error`}
      return `Se actualizo exitosamente`
    } catch (error) {
      return null
    }
  }


  async actualizar(id, objeto){
    try {
      const producto = await DataBase.actualizar(id,objeto)
      if (!producto) {throw `Error`}
      return `Se actualizo exitosamente`
    } catch (error) {
      return null
    }
  }


  async getAllProducts (){
    let data;
    try {

      data = await DataBase.getAll()
      if (!data) { throw `El archivo está vacio` }    
      return data      
    } catch (error) {
      return null
    }
  }

  async getById(id){
    try {
      const producto = await DataBase.getById(id)
      if (!producto) {throw `No existe el ID`}
      return producto
    } catch (error) {
      return null
    }
  }


  async save(producto){
    try{ 
    const respuesta = await DataBase.save(producto)
      if(respuesta < 0 ) { throw `Error`}
      return respuesta
    } catch (error) {
      return null
    }
  }
//!----------------------------------------------------Carrito-------------------------------------------
  async getCartById(id){
    try {
      const products  = await DBCarrito.getById(id)
      if (!products) {throw `No existe el ID`}
      return products
    } catch (error) {
      return null
    }
  }

  async saveCart(id,producto){
    try {
     const  respuesta = await DBCarrito.actualizar(id,producto)
     if(respuesta < 0 ) { throw `Error`}
      return respuesta
    } catch (error) {
      return null
    }
  }

  async newCart(){
    try {
      const respuesta = await DBCarrito.save()
      if(!respuesta) {throw `error`}
        return respuesta
    } catch (error) {
      return null
    }
  }

  async deleteCartId(id){
    try {
      const respuesta = await DBCarrito.deleteById(id)
      if(!respuesta) { throw `No se elimino nada.`}
      return respuesta

    } catch (error) {
      return null
    }
  }

  async deleteProdByID(id,id_prod){
    try {
     const  respuesta = await DBCarrito.deleteProdByID(id,id_prod)
     if(!respuesta ) { throw `Error`}
      return respuesta
    } catch (error) {
      return null
    }
  }
  
  async getAllProductsCart (){
    let data;
    try {

      data = await DBCarrito.getAll()
      if (!data) { throw `El archivo está vacio` }    
      return data      
    } catch (error) {
      return null
    }
  }

 }





export default new Controller()