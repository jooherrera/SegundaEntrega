import {ProductsModel} from '../models/model.js'
//! isAdmin
  const isAdmin = (req,res,next) => {
    try {
      const { isAdmin } =  req.body
      if(isAdmin === true) {
        console.log("Permitido")
        next()
      }else{
        throw `Unauthorized`
      }
    } catch (err) {
      res.status(401)
      next(err)
    }
  }

//! existe el producto para agregar al carrito?
  const fetchProduct = async (req,res,next) => {
    const { id } = req.body 
    try {
      const respuesta = await ProductsModel.find({_id : id})
      if(!respuesta) { throw `Error`}
       req.body.producto = respuesta[0]
      
      next()
    } catch (error) {
      res.status(404)
      next(error)
    }
  }



export { isAdmin , fetchProduct}