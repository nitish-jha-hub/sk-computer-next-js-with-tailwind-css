import React from 'react'
import Link from 'next/link'
import product from '../modals/product'
import mongoose from "mongoose"

const Products = ({ products }) => {
    // console.log(products)
    return (
        <div>
            <section className="text-gray-600 body-font">
                <div className="container px-5 py-6 mx-auto">
                    <div className="flex flex-wrap -m-4">
                        {products.map((item)=>{                            
                            return<div key={item._id} className="lg:w-1/4 md:w-1/2 p-4 w-full">
                                {/* use backtick `` to create string in href section */}
                                <Link href={`/product/${item.slug}`}><a className="block relative h-48 rounded overflow-hidden">
                                    <img alt="SK Computer Products" className="object-cover object-center w-full h-full block" src={item.img} />
                                </a></Link>
                                <div className="mt-4">
                                    <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">{item.catogery}</h3>
                                    <h2 className="text-gray-900 title-font text-lg font-medium">{item.tittle}</h2>
                                    <p className="mt-1">₹{item.price}</p>
                                </div>
                            </div>})}
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

    let products = await product.find() //addproduct.find({category: 'printer'}) for catogery only list

    return {
        props: { products: JSON.parse(JSON.stringify(products)) }, // will be passed to the page component as props
    }
}

export default Products