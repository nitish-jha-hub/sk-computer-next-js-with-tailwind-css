import React from 'react'
import { useRouter } from 'next/router'
import mongoose from 'mongoose'
import Order from '../modals/order'

const MyOrder = ({ order }) => {
    const product = order.products;
    // console.log(order)
    return (
        <div className='min-h-full'>
            <section className="text-gray-600 body-font overflow-hidden">
                <div className="container px-5 py-24 mx-auto">
                    <div className="lg:w-4/5 mx-auto flex flex-wrap">
                        <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
                            <h2 className="text-sm title-font text-gray-500 tracking-widest">SK Computer &#38; Printers</h2>
                            <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">Order ID: #{order.orderId}</h1>
                            <p>Your Order has been Placed Successfully</p>
                            <p>Your Payment status is <span className='text-orange-400'>{order.status}</span></p>

                            <div className="flex text-center justify-between mb-4">
                                <a className="flex-grow border-b-2 border-gray-300 py-2 text-lg px-1">Items</a>
                                <a className="flex-grow border-b-2 border-gray-300 py-2 text-lg px-1">Quatity</a>
                                <a className="flex-grow border-b-2 border-gray-300 py-2 text-lg px-1">Amount</a>
                            </div>
                            <p className="leading-relaxed mb-4"></p>

                            {Object.keys(product).map((key) => {
                                return <div key={key} className="flex justify-between border-t border-b border-gray-200 py-2" >
                                    <span className="text-gray-500">{product[key].name}</span>
                                    <span className="text-gray-500">{product[key].qty}</span>
                                    <span className="text-gray-900">₹{product[key].price}</span>
                                </div>
                            })}
                            
                            <div className="flex flex-col">
                                <span className="title-font font-medium text-2xl text-gray-900 mb-6">Subtotal= ₹{order.amount}</span>
                                <button className="text-white bg-orange-600 border-0 py-2 px-6 focus:outline-none hover:bg-orange-700 rounded">Track Order</button>

                            </div>
                        </div>
                        <img alt="ecommerce" className="lg:w-1/2 w-full lg:h-auto object-cover object-center rounded" src="/sk-computer-logo.jpg" />
                    </div>
                </div>
            </section >
        </div >
    )
}

export async function getServerSideProps(context) {
    if (!mongoose.connections[0].readyState) {
        await mongoose.connect(process.env.MONGO_URI)
    }
    let order = await Order.findById(context.query.id)

    return {
        props: { order: JSON.parse(JSON.stringify(order)) },
    }
}

export default MyOrder