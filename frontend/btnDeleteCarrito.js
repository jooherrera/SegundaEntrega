const deleteCarrito = document.getElementById('deleteCarrito')

deleteCarrito.addEventListener('click', async ()=>{
  // let id = prompt("Ingrese el id del carrito a eliminar")

  try {
    let id = parseInt(prompt("Ingrese el id del carrito a eliminar"), 10)
    if(!id){ throw `Ingresar un numero`}
   
   const respuesta = await fetch(`http://localhost:8080/carrito/${id}`,{
      method : 'DELETE',
      headers:{
              'Content-Type': 'application/json'
              }
    })
   const data = await respuesta.json()
   if (respuesta.status === 404){ throw `El carrito no existe`}
   if (respuesta.status === 202){ alert("Se elimino el carrito correctamente")}
   window.location.href = 'index.html'
  } catch (error) {
    alert(error)
  }

})
 