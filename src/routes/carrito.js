import { Router } from "express";
const carritoRouter = Router()

import { Controller } from '../controllers/index.js'
import { fetchProduct } from '../middlewares/middlewares.js'


//!Borrar producto por ID y por ID de carrito
carritoRouter.delete('/:id/productos/:id_prod',async (req, res) => {
  const { id , id_prod} = req.params
  try {
    const respuesta = await Controller.deleteProdByID(id,id_prod)
    if(!respuesta) { throw `Error`}
    console.log(respuesta)
    res.status(200).json({ok : "ok"})
  } catch (error) {
    console.log(error)
    res.status(401).json({error : "error"})
  }
})



//! Borrar un carrito por id

carritoRouter.delete('/:id',async (req,res,next) => {
  const { id } = req.params
  try {
    const respuesta = await Controller.deleteCartId(id)
    if(!respuesta) { throw `No existe el carrito.`}
    res.status(202).json({ok : `eliminado carrito con ID-${id}`})
  } catch (error) {
    res.status(404).json({error : "Error" , descripcion : error})
    
  }
})



//! Crea carrito y devuelve el id
carritoRouter.post('/', async(req,res) => {

  try {
    const respuesta = await Controller.newCart()
    if(!respuesta) {throw `Error`}
    console.log('Se creo un nuevo carrito')
    res.json(respuesta)

  } catch (error) {
    res.status(401)
   .json({
      error : -2 ,
      descripcion : `${req.originalUrl} no existe`
     })
  }
})

//! Busca el carrito y muestra sus productos.
carritoRouter.get('/:id/productos', async (req, res) => {
  const { id } = req.params
  try {
    const cart = await Controller.getCartById(id)
    if (!cart) {throw `Error`}
    res.json(cart)

  } catch (error) {
    res.status(404)
    .json({
      error : -4 ,
      descripcion : `Este carrito con ID N°${req.params.id} no existe`
     })
  }


})

//! Agregar producto al carrito.

carritoRouter.post('/:id/productos', fetchProduct , async (req,res) => {
  const { id } = req.params
  const { producto } = req.body
  console.log("ID",id)
  console.log("POD",producto)
  try {
    const respuesta = await Controller.saveCart(id,producto)

    console.log("RESOYESTA",respuesta)
    if(!respuesta) { throw `Error`}
    res.status(200).json({ok : "ok"})
    // res.json(req.body)
  } catch (error) {
    res.status(401).json({
      error : -4 ,
      descripcion : `Este carrito con ID N°${req.params.id} no existe`
     })
  }
})



export {carritoRouter}