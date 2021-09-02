import {DataBase} from '../models/model.js'

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
      // console.log(err)
      res.status(401)
      next(err)
    }




  }

//! existe el producto para agregar al carrito?
  const fetchProduct = async (req,res,next) => {
    const { id } = req.body 
    try {
      const respuesta = await DataBase.getById(id)
      if(!respuesta) { throw `Error`}
       req.body.producto = respuesta
      
      next()
    } catch (error) {
      res.status(404)
      // .json({
      //   error : "xxxx",
      //   descripcion : `RUTA- ${req.originalUrl} - METODO ${req.method}  - NO AUTORIZADO `
      // })
      next(error)
    }

  }



export { isAdmin , fetchProduct}