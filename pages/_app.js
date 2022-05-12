import '../styles/globals.css'
import Header from './components/header'
import Footer from './components/footer'
import { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps }) {
  const [Cart, setCart] = useState({})
  const [subTotal, setSubTotal] = useState(0)

  useEffect(() => {
    // console.log("cheak useEfect");
    try {
      if (localStorage.getItem("Cart")){
        setCart(JSON.parse(localStorage.getItem("Cart")))
        // if save cart is cart then subt will show subtotal zero on page reload
        saveCart(JSON.parse(localStorage.getItem("Cart")))
      }
    } catch (error) {
      console.log(Error)
      localStorage.clear()
    }
    
  }, [])

 
  const saveCart = (myCart) => {
    // stringify mycart
    localStorage.setItem("Cart", JSON.stringify(myCart))
    let subt = 0;
    let keys = Object.keys(myCart);
    // i is less then keys.length
    for(let i=0; i<keys.length; i++){
      subt += myCart[keys[i]].price * myCart[keys[i]].qty;
    }
    setSubTotal(subt);
  }

  const addToCart = (itemCode, qty, price, name, size, varient) => {
    let myCart = Cart;
    if (itemCode in Cart) {
      myCart[itemCode].qty = Cart[itemCode].qty + qty
    }
    else {
      myCart[itemCode] = { qty: 1, price, name, size, varient}
    }
    setCart(myCart)
    toast.success('Item added to Your Cart!', {
      position: "bottom-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
    saveCart(myCart)
  }

  const clearCart = () => {
    setCart({})
    saveCart({})
  }

  const removeFromCart = (itemCode, qty, price, name, size, varient) => {
    let myCart = Cart;
    if (itemCode in Cart) {
      myCart[itemCode].qty = Cart[itemCode].qty - qty
    }
    if (myCart[itemCode]["qty"] <= 0) {
      delete myCart[itemCode]
    }
    setCart(myCart)
    toast.error('Item removed from Cart!', {
      position: "bottom-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
    saveCart(myCart)
  }
  return <>
    <Header Cart={Cart} addToCart={addToCart} removeFromCart={removeFromCart} clearCart={clearCart} subTotal={subTotal} />
    <Component Cart={Cart} addToCart={addToCart} removeFromCart={removeFromCart} clearCart={clearCart} subTotal={subTotal} {...pageProps} />
    <Footer />
  </>
}

export default MyApp
