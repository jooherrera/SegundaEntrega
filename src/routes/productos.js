import { Router } from 'express'
const productsRouter = Router()
import { Controller } from '../controllers/index.js'

import { isAdmin } from '../middlewares/middlewares.js'


//! Delete()

productsRouter.delete('/:id', isAdmin , async(req,res) => {
  const { id } = req.params
  console.log(id)
  try {
    const respuesta = await Controller.delete(id)
    if (!respuesta) { throw `Error`}
    res.json(respuesta)
  } catch (error) {
    res.json({
      error : -2 ,
      descripcion : `${req.originalUrl} no existe`
     })
  }
})


//! Actualizar()

productsRouter.put('/:id', isAdmin, async(req,res) => {
  const { id } = req.params
  const { body } = req
  try {
    const producto = await Controller.actualizar(id, body)
    if(!producto) { throw `No se pudo actualizar`}
    res.json(producto)
  } catch (error) {
    res.json({
      error : -2 ,
      descripcion : `${req.originalUrl} no existe`
     })
  }
})


//! Save()
productsRouter.post ('/', isAdmin , async(req,res,next) => {
  console.log("Aca")
  const {body} = req
  try {
    const respuesta = await Controller.createProduct(body)
    if(!respuesta) {throw `Error`}
    res.json({ok : ok})
  } catch (error) {
    res.json({
      error : -2 ,
      descripcion : `${req.originalUrl} no existe`
     })

  }
})

//! getByID
productsRouter.get('/:id?', async(req,res) => {
  const {id} = req.query
  try {
    let producto
    if(id){
      producto = await Controller.getById(id)
    }else{
      producto = await Controller.getAllProducts()
    }
    
    if(!producto) {throw `No existe el ID`}
    res.json(producto)
  } catch (error) {
    res.json({
      error : -2 ,
      res: true,
      descripcion : `${req.originalUrl} No hay productos para mostrar`
     })
  }
})


export {productsRouter}