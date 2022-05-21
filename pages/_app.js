import '../styles/globals.css'
import Header from './components/header'
import Footer from './components/footer'
import { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';
import LoadingBar from 'react-top-loading-bar'

function MyApp({ Component, pageProps }) {
  const [Cart, setCart] = useState({})
  const [subTotal, setSubTotal] = useState(0)
  const [user, setUser] = useState({ value: null })
  const [key, setKey] = useState(1)
  const [progress, setProgress] = useState(0)
  const router = useRouter()

  useEffect(() => {
    router.events.on('routeChangeStart', () => {
      setProgress(40)
    })
    router.events.on('routeChangeComplete', () => {
      setProgress(100)
    })
    console.log("cheak useEfect from app");
    try {
      if (localStorage.getItem("Cart")) {
        setCart(JSON.parse(localStorage.getItem("Cart")))
        // if save cart is cart then subt will show subtotal zero on page reload
        saveCart(JSON.parse(localStorage.getItem("Cart")))
      }
    } catch (error) {
      // console.log(Error)
      localStorage.clear()
    }
    const myuser = JSON.parse(localStorage.getItem("myuser"))
    if (myuser) {
      setUser({ value: myuser.token, email:myuser.email })
    }
    setKey(Math.random()) //to rerender element
    
  }, [router.query])

  const logout = () => {
    localStorage.removeItem('myuser')
    setUser({ value: null })
    setKey(Math.random())
    router.push('/')
  }

  const saveCart = (myCart) => {
    // stringify mycart
    localStorage.setItem("Cart", JSON.stringify(myCart))
    let subt = 0;
    let keys = Object.keys(myCart);
    // i is less then keys.length
    for (let i = 0; i < keys.length; i++) {
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
      myCart[itemCode] = { qty: 1, price, name, size, varient }
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
    <LoadingBar
      color='#FF4500'
      progress={progress}
      waitingTime={500}
      onLoaderFinished={() => setProgress(0)}
    />
    {key && <Header logout={logout} user={user} key={key} Cart={Cart} addToCart={addToCart} removeFromCart={removeFromCart} clearCart={clearCart} subTotal={subTotal} />}
    {<Component Cart={Cart} addToCart={addToCart} removeFromCart={removeFromCart} clearCart={clearCart} subTotal={subTotal} {...pageProps} />}
    <Footer />
  </>
}

export default MyApp
