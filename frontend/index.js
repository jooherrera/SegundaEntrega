const newCarrito = document.getElementById('newCarrito')

newCarrito.addEventListener('click',()=>{
  try {
    fetch('http://localhost:8080/carrito',{
      method : 'POST',
      body : JSON.stringify({
        isAdmin : false,
      }),
      headers:{
        'Content-Type': 'application/json'
      }
    })
    .then((res) =>   res.json())
    .then((res) =>  alert(`Se creo un nuevo carrito: ID generado --> ${res}`))
    .catch(() =>  alert("No se pudo crear el carrito"))
  } catch (error) {
    console.log(error)
  }
})