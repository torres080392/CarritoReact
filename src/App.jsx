import { useState, useEffect } from "react";
import "./App.css";
import { db } from "./data/db";
import Header from "./components/Header"; //Componentes importados
import Guitar from "./components/Guitar";

function App() {
   //funcion para que el carrito sea persistente
  const cartInicial = () => {
  const LocalStorageCart = localStorage.getItem('cart')
 return LocalStorageCart ? JSON.parse(LocalStorageCart) : []

  }


  const [data, setData] = useState(db); //guitarras
  const [cart, setCart] = useState(cartInicial); //carrito
  
  //usamos un useefeect para guardar los cambos del carrito en localstorage
  useEffect(
   ()=>{
    localStorage.setItem('cart', JSON.stringify(cart))
   },[cart])



  //añadiendo items al carrito
  function addCart(guitar) {
    const guitarExist = cart.findIndex(item => item.id === guitar.id);
  
    if (guitarExist >= 0) {
      const cartUpdate = [...cart];
      cartUpdate[guitarExist].quantity++; // Si la guitarra existe, aumenta la cantidad en 1
      setCart(cartUpdate); // Actualiza el carrito
    } else {
      const guitarToAdd = { ...guitar, quantity: 1 }; // Agrega la propiedad quantity con valor 1
      setCart([...cart, guitarToAdd]); // Agrega la guitarra al carrito con cantidad 1
    }
  }

  

  //funcion para remover articulos del carrito
  function removeItem(id) {
    setCart((prevCart) => prevCart.filter((guitar) => guitar.id !== id));
  }

  //funcion para incrementar la cantidad

  function addItem(id) {
    const updateCart = cart.map(e => {
      if (e.id === id && e.quantity <=5) {
        return {
          ...e,
          quantity: e.quantity + 1,
        }
      }
      return e
    });

    setCart(updateCart)


  }
    //funcion para decrementar la cantidad

    function deleteItem(id) {
        const deleteCart = cart.map(e => {
          if (e.id === id && e.quantity >1) {
            return {
              ...e,
              quantity: e.quantity -1,
            }
          }
          return e
        });
    
        setCart(deleteCart)
    
      }
      //Funcion para limpiar carrito

      function cleanCart() {
        setCart([])
      }

  
 
  return (
    <>
      <Header
        //pasamos el carrito al header
        cart={cart}
        //pasando la funcion eliminar
        removeItem={removeItem}
        //pasamos la funcion de incrementar}
        addItem={addItem}
        //funcion para decrementar
        deleteItem={deleteItem}

        //funcion limpiar carrito
        cleanCart= {cleanCart}

      />

      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {data.map((guitar) => (
            <Guitar
              key={guitar.id}
              guitar={guitar}
              cart={cart}
              setCart={setCart}
              addCart={addCart}
            />
          ))}
        </div>
      </main>

      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">
            GuitarLA - Todos los derechos Reservados
          </p>
        </div>
      </footer>
    </>
  );
}

export default App;
