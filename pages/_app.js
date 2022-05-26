import '../styles/globals.css'
import Header from './components/header'
import Footer from './components/footer'
import { useState, useEffect } from 'react'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';
import LoadingBar from 'react-top-loading-bar'

function MyApp({ Component, pageProps }) {
  const [Cart, setCart] = useState({})
  const [subTotal, setSubTotal] = useState(0)
  const [user, setUser] = useState()
  // const [key, setKey] = useState(1)
  const [progress, setProgress] = useState(0)
  const router = useRouter()

  useEffect(() => {
    router.events.on('routeChangeStart', () => {
      setProgress(40)
    })
    router.events.on('routeChangeComplete', () => {
      setProgress(100)
    })
    try {
      if (localStorage.getItem("Cart")) {
        setCart(JSON.parse(localStorage.getItem("Cart")))
        // if save cart is cart then subt will show subtotal zero on page reload
        saveCart(JSON.parse(localStorage.getItem("Cart")))
      }
    } catch (error) {
      localStorage.clear()
    }
    const myuser = JSON.parse(localStorage.getItem("myuser"))
    if (myuser) {
      setUser({ value: myuser.token, email: myuser.email })
      // setKey(Math.random())
    }


  }, [router.query])

  const logout = () => {
    localStorage.removeItem('myuser')
    setUser()
    // setKey(Math.random())
    router.push('/')
  }
  // console.log(key)
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

  const BuyNow = (itemCode, price, name, size, varient) => {
    let myCart = Cart;
    if (itemCode in Cart) {
      myCart[itemCode].qty = Cart[itemCode].qty + 1
      router.push(`${process.env.NEXT_PUBLIC_HOST}/checkout`)
    }
    else {
      myCart[itemCode] = { qty: 1, price, name, size, varient }
      router.push(`${process.env.NEXT_PUBLIC_HOST}/checkout`)
    }
    saveCart(myCart)
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
    <Header logout={logout} user={user}  Cart={Cart} addToCart={addToCart} removeFromCart={removeFromCart} clearCart={clearCart} subTotal={subTotal} />
    <Component Cart={Cart} BuyNow={BuyNow} addToCart={addToCart} removeFromCart={removeFromCart} clearCart={clearCart} subTotal={subTotal} {...pageProps} />
    <Footer />
  </>
}

export default MyApp
