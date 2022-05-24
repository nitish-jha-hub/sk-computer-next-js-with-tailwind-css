import { React, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Link from 'next/link'

const Orders = () => {
  const router = useRouter()
  const [orders, setOrders] = useState([])

  useEffect(() => {
    const fetchorders = async () => {
      let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/myorders`, {
        method: 'POST', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: JSON.parse(localStorage.getItem('myuser')).token}),
      })
      let res = await a.json()
      setOrders(res.orders)      
    }
    if (!localStorage.getItem('myuser')) {
      router.push('/')
    }
    else {
      fetchorders()
    }
  }, [router])

  return (
    <div className='min-h-screen'>
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 mx-auto">
          <div className="w-full my-8 ">
            <h2 className="text-sm title-font text-gray-500 tracking-widest">SK Computer &#38; Printers</h2>
            <h2 className="title-font text-gray-800 font-bold text-center mb-3 bg-slate-300 tracking-widest">My Orders</h2>

            <div className="flex text-center mb-4">
              <a className="flex-grow border-b-2 border-gray-300 py-2 text-lg px-1 text-left">OrderId</a>
              <a className="flex-grow border-b-2 border-gray-300 py-2 text-lg px-1">Email</a>
              <a className="flex-grow border-b-2 border-gray-300 py-2 text-lg px-1 text-right">Amount</a>
              <a className="flex-grow border-b-2 border-gray-300 py-2 text-lg px-1 text-right">Details</a>
            </div>
            {orders.map((item) => {
              return <div key={item._id} className="flex justify-between border-t border-b border-gray-200 py-2">
                <span className="text-gray-500">{item.orderId}</span>
                <span className="text-gray-500">{item.email}</span>
                <span className="text-gray-900">{item.amount}</span>
                <Link href={'/order?id=' + item._id}><a className='text-orange-600 font-serif font-semibold'>Details</a></Link>
              </div>
            })}
            
          </div>

        </div>
      </section>
    </div>

  )
}
export default Orders