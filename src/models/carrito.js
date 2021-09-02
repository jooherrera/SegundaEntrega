
import fs from 'fs'

// import producto from './producto';

 class DBCarrito {
  constructor(fileName) {
    this.fileName = fileName;
     this.getAll = this.getAll.bind(this)
     this.readData = this.readData.bind(this)
  }

  load(){
   
    console.log("sad")
    
  }




  async readData() {
    //Objeto para retornar.
    const object = {
      data : {},
      res : {
        ok : true,
        error : ''
      }
    }

    try {
      const data = await fs.promises.readFile(`./src/models/${this.fileName}`, "utf-8"); // Lee el archivo
      if (!data || data === '[]') { throw `El archivo está vacio` } //Error si esta vacio
      const dataObject = await JSON.parse(data); //Transforma la informacion a objeto de js
      object.data = dataObject 
      object.res.ok = true
      return object // Retorna el objeto con la información.
    } catch (error) {
      object.res.ok = false 
      if(error.code === 'ENOENT'){
        object.res.error = `El archivo no existe.`
      }else{
        object.res.error = error 
      }
     return object // Retorna el objeto con el error
    }
  }



  async save() {
    try {
      const  dataPromise = await this.readData(); // Se lee el archivo
      const {data,res} = dataPromise //Se destructura la informacion recibida.

      if(res.ok){ // Si se pudo leer el archivo.

        // let newObject = object
        // delete newObject.isAdmin

        const dataObject = data
        const id = dataObject[dataObject.length - 1].id + 1;
        let fyh = new Date().toLocaleString()
//!---------------------------------------------------------------------------------------------
        dataObject.push({ id: id , timestamp :  fyh}); //Se hace un push con el objeto nuevo.
        fs.promises.writeFile(`./src/models/${this.fileName}`, JSON.stringify(dataObject),error => {throw error})// Se reescribe el archivo
        // fs.promises.writeFile(`./src/models/${this.fileName}`, {...dataObject},error => {throw error})// Se reescribe el archivo
        return id; //retorna el id asignado.
      }else{
        throw res.error
      }
    } catch (error) {
      let fyh = new Date().toLocaleString()
      // Si el archivo no existe. Crear uno nuevo y le asiga el id 1.
      console.log(error);
      console.log("Creando un nuevo archivo..");
      // fs.promises.writeFile(`./src/models/${this.fileName}`, JSON.stringify([{ ...object , id: 1 }]),error => {throw error})
      fs.promises.writeFile(`./src/models/${this.fileName}`, JSON.stringify([{ id: 1 , timestamp :  fyh  }]),error => {throw error})
      console.log("Archivo creado.");
      return 1; // Retorna el ID asignado.
    }
  }


  async actualizar(id, object){
    try {
      const existe = await this.getById(id)

      if(existe){
        const  dataPromise = await this.readData(); // Se lee el archivo
        const {data,res} = dataPromise //Se destructura la informacion recibida.
        if(res.ok){ // Si se pudo leer el archivo.
          const mapeado = data.map((el) => {
             if (el.id == id){
              
              if(el.producto){
                el.producto.push(object)
              }else{
                el.producto = [{...object}]
              }


               return el
              }else{
                return el
              }
           })
          fs.promises.writeFile(`./src/models/${this.fileName}`, JSON.stringify(mapeado),error => {throw error})// Se reescribe el archivo
          console.log("Producto actualizado")
           } else{
          throw res.error
        }

      }else{
        throw ("El producto no existe.")
      }
      return true
    } catch (error) {    
      return null
    }
  }





  async getById(number) {
    try {
      const  dataPromise = await this.readData();
      const {data,res} = dataPromise

      if(res.ok){
        const filtered = data.filter((el) => el.id == number); //Se filtra por id
        if (filtered.length === 0) { throw "Id no existe" }
        return filtered[0]; // Retorna el objeto solicitado
      }else{
        throw res.error
      }
    } catch (error) {
      console.log(`No es posible obtener el producto: ${error}`);
      return null;
    }
  }

  async getAll() {
    try {
    
      const  dataPromise = await this.readData();
      const {data,res} = dataPromise
      if(res.ok){
        return data;
      }else{
        throw res.error
      }
    } catch (error) {
      console.log(error);
      return null

    }
  }

  async deleteById(number) {
    try {
      const  dataPromise = await this.readData();
      const {data,res} = await dataPromise
      if(res.ok){
        const filtered = data.filter((el) => el.id != number);
        if (filtered.length === data.length) { throw "El id no existe" }
        fs.promises.writeFile(`./src/models/${this.fileName}`, JSON.stringify(filtered),error => {throw error}) // Se reescribe el archivo
        console.log("Se elimino el producto.");
      }else{
        throw res.error
      }
      return true
    } catch (error) {
      console.log("No es posible eliminar el producto:", error);
      return null;
    }
  }

  async deleteAll() {
    try {
      const dataPromise = await this.readData();
      const {data,res} = await dataPromise
      if(res.ok){
        data.length = 0
        fs.promises.writeFile(`./src/models/${this.fileName}`,  JSON.stringify(filtered),error => {throw error})
        console.log("Se eliminó todos los productos");
      }else{
        throw res.error
      }    
    } catch (error) {
      console.log(error);
    }
  }


  async deleteProdByID(id, id_prod){
 
    try {
      const existe = await this.getById(id)
   
      if(existe){
        const  dataPromise = await this.readData(); // Se lee el archivo
        const {data,res} = dataPromise //Se destructura la informacion recibida.
        if(res.ok){ // Si se pudo leer el archivo.
         let cont = 0
         
          const mapeado = data.map((el) => {
          
             if (el.id == id){
             
              
                const filtered = el.producto.filter((el) => el.id != id_prod)
               
                if (filtered.length > 0){
                  el.producto = filtered 
                  cont++
                }else{
                  delete el.producto
                  cont++
                  
                }
           
               return el
              }else{
                return el
              }
           })
     
           if(cont === 0 ) { throw `Error`}

           fs.promises.writeFile(`./src/models/${this.fileName}`, JSON.stringify(mapeado),error => {throw error})// Se reescribe el archivo
          console.log(mapeado)
          console.log("Producto actualizado")
           } else{
            
          throw res.error
        }

      }else{
        
        throw ("El producto no existe.")
      }
      return true
    } catch (error) {    
      return null
    }
  }





}

// export default new DataBase("productos.txt") 
// export default new DataBase("carrito.txt") 
export default new DBCarrito("carrito.txt") 