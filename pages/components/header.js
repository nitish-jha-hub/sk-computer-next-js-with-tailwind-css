import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useEffect } from 'react'
import { AiOutlineShoppingCart, AiFillCloseSquare, AiFillPlusCircle, AiFillMinusCircle } from 'react-icons/ai'
import { BsFillBagCheckFill } from 'react-icons/bs'
import { MdOutlineRemoveShoppingCart } from 'react-icons/md'
import Router, { useRouter } from 'next/router'
import { VscAccount } from 'react-icons/vsc'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react'

const Header = ({ logout, user, Cart, addToCart, removeFromCart, clearCart, subTotal }) => {
    const [dropdown, setDropdown] = useState(false)
    const [sidecart, setSidecart] = useState(false)
    let router = useRouter()
    console.log(router)

    useEffect(() => {
        Object.keys(Cart).length !== 0 && setSidecart(true)
        let nosidecart = ['/checkout', '/orders']
        if (nosidecart.includes(router.pathname)) {
            setSidecart(false)
        }
    }, [])


    const toggleCart = () => {
        setSidecart(!sidecart)
    }


    return (
        <>
            < ToastContainer />
            <div className='sticky top-0 z-40'>
            {!sidecart && <span onMouseOver={() => { setDropdown(true) }} onMouseLeave={() => { setDropdown(false) }}  className='absolute z-30 top-4 right-14 md:right-9'>
                {dropdown && <div className='absolute right-2 top-4 z-30 bg-orange-300 p-2 font-bold rounded-xl drop-shadow-2xl'><ul>
                    <Link href="/myaccount"><a><li className='hover:text-slate-100'>Account</li></a></Link>
                    <Link href="/orders"><a><li className='hover:text-slate-100'>MyOrders</li></a></Link>
                    <li onClick={logout} className='hover:text-slate-100 cursor-pointer'>LogOut</li>
                </ul></div>}                
                    {user && <VscAccount className='mx-2 text-3xl text-slate-800' />}                
            </span>}
            </div>

            <nav className={`z-20 sticky flex bg-slate-50 flex-col top-0 justify-between items-center md:flex-row text-slate-800 drop-shadow-lg rounded-b-2xl ${!sidecart && 'overflow-hidden'}`}>
                <div>
                    <Link href="/"><a className="mx-4" ><Image className="border-2 border-zinc-900 rounded-xl" src="/sk-computer-logo.jpg" alt="Logo sk-computer saharsa" width={45} height={45} /></a></Link>
                    <div className='hidden lg:inline-block'><Link href="/"><a className="" ><Image src="/assets/skcomputerlogo2.png" alt="Logo sk-computer saharsa" width={175} height={55} /></a></Link></div>
                </div>
                <ul className="flex flex-wrap md:mr-20" id="navmenu">
                    <li className="md:m-4 m-3 "> <Link href='/' ><a
                        className="p-2 rounded-xl cursor-pointer shadow-md bg-slate-50 hover:bg-slate-100 drop-shadow-lg"
                        title="Home">Home</a></Link></li>
                    <li className="md:m-4 m-3 "><Link href='/contact'><a
                        className="p-2 rounded-xl cursor-pointer shadow-md bg-slate-50 hover:bg-slate-100 drop-shadow-lg"
                        title="Contact US">Contact</a></Link></li>
                    <li className="md:m-4 m-3 "><Link href='/services' ><a
                        className="p-2 rounded-xl cursor-pointer shadow-md bg-slate-50 hover:bg-slate-100 drop-shadow-lg"
                        title="Services offered">Services</a></Link></li>
                    <li className="md:m-4 m-3 "><Link href='/products' ><a
                        className="p-2 rounded-xl cursor-pointer shadow-md bg-slate-50 hover:bg-slate-100 drop-shadow-lg"
                        title="Our Products">Shop Now</a></Link></li>
                </ul>
                <a href="#" className="md:hidden absolute left-6 top-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </a>

                <div className='absolute flex right-8 top-4 cursor-pointer md:right-3'>


                    {!user && <Link href="/login"><a><button className=' text-white bg-orange-600 py-1 px-1 focus:outline-none hover:bg-orange-700 border-2 rounded-full"'>Login</button></a></Link>}
                    <a title='Your Shopping cart'><AiOutlineShoppingCart onClick={toggleCart} className='text-slate-800 text-3xl' /></a>
                </div>


                <div className={`absolute w-72 top-0 z-20 h-[100vh] bg-slate-200 transition-all p-10 ${sidecart ? 'right-0' : '-right-full'}`}>
                    <h2 className='text-lg'>Your Shopping Cart</h2>
                    <span onClick={toggleCart} className='cursor-pointer absolute top-3 right-2 text-3xl text-orange-600'><AiFillCloseSquare /></span>
                    <ol className='list-decimal'>
                        {Object.keys(Cart).length == 0 && <div className='mt-4 font-bold'>Your Cart is Empty</div>}

                        {Object.keys(Cart).map((k) => {
                            return <li key={k}>
                                <div className='flex'>
                                    <div className='w-2/3 font-semibold'>{Cart[k].name}</div>
                                    <div className='w-1/3 flex justify-center font-semibold'><AiFillMinusCircle onClick={() => removeFromCart(k, 1, Cart[k].price, Cart[k].name, Cart[k].size, Cart[k].varient)} className='m-1 cursor-pointer text-xl text-orange-600' /> {Cart[k].qty} <AiFillPlusCircle onClick={() => addToCart(k, 1, Cart[k].price, Cart[k].name, Cart[k].size, Cart[k].varient)} className='m-1 cursor-pointer text-xl text-orange-600' /></div>
                                </div>
                            </li>
                        })}
                    </ol>
                    <div className='-ml-4 text-lg font-semibold text-slate-600'>
                        Subtotal= ₹{subTotal}
                    </div>
                    <div className='flex justify-center'>
                        <Link href="/checkout"><a><button disabled={Object.keys(Cart).length === 0} className="disabled:bg-orange-300 flex mt-6 text-white bg-orange-600 border-0 py-2 px-3 focus:outline-none hover:bg-orange-700 rounded"><BsFillBagCheckFill className='m-1' />Checkout </button></a></Link>
                        <button disabled={Object.keys(Cart).length === 0} onClick={clearCart} className="disabled:bg-orange-300 flex mx-2 mt-6 text-white bg-orange-600 border-0 py-2 px-3 focus:outline-none hover:bg-orange-700 rounded"> <MdOutlineRemoveShoppingCart className='m-1' />ClearCart</button>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Header