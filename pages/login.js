import React from 'react'
import Link from 'next/link'
import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useRouter from 'next/router';
import { useEffect } from 'react';



const Login = () => {
    const router = useRouter
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    useEffect(() => {
        if (localStorage.getItem ('token') ) {
            router.push('/')            
        }
    }, [router])
    

    const handleChange = (e) => {
        if (e.target.name == 'email') {
            setEmail(e.target.value)
        }
        if (e.target.name == 'password') {
            setPassword(e.target.value)
        }

    }


    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = { email, password }
        let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/login`, {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        let response = await res.json()
        // console.log(response)

        setEmail('')
        setPassword('')
        if (response.success) {
            localStorage.setItem('token', response.token)
            toast.success('you are successfully logeed in', {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            setTimeout(() => {
                router.push(`${process.env.NEXT_PUBLIC_HOST}`)
            }, 1000);
        }
        else {
            toast.error('Invalid login details', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }

    return (
        <div>
            <section className="h-full gradient-form bg-gray-200">
                <div className="container py-4 px-6 h-full">
                    <div className="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
                        <div className="xl:w-10/12">
                            <div className="block bg-white shadow-lg rounded-lg">
                                <div className="lg:flex lg:flex-wrap g-0">
                                    <div className="lg:w-6/12 px-4 md:px-0">
                                        <div className="md:p-6 md:mx-6">
                                            <div className="text-center">
                                                <img
                                                    className="mx-auto w-48"
                                                    src="/sk-computer-logo.jpg"
                                                    alt="logo"
                                                />
                                                <h4 className="text-xl font-semibold mt-1 mb-6 pb-1">We are The SK Computer Team</h4>
                                            </div>
                                            <form onSubmit={handleSubmit} method="POST">
                                                <p className="mb-4">Please login to your account</p>
                                                <div className="mb-4">
                                                    <input value={email} onChange={handleChange} name="email"
                                                        type="text"
                                                        className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                                        id="email"
                                                        placeholder="Email / Username"
                                                    />
                                                </div>
                                                <div className="mb-4">
                                                    <input value={password} onChange={handleChange}
                                                        name="password"
                                                        type="password"
                                                        className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                                        id="password"
                                                        placeholder="Password"
                                                    />
                                                </div>
                                                <div className="flex items-center">
                                                    <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                                                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900"> Remember me </label>
                                                </div>
                                                <div className="text-center pt-1 mb-6 pb-1">
                                                    <button
                                                        type="submit"
                                                        // have to cheak transion on click
                                                        className="inline-block px-6 py-2.5 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full mb-3"

                                                        data-mdb-ripple="true"
                                                        data-mdb-ripple-color="light"
                                                        style={{ background: "linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)" }}
                                                    >
                                                        Log in
                                                    </button>
                                                    <Link href='/resetpassword'><a className="text-gray-500">Forgot password?</a></Link>
                                                </div>
                                                <div className="flex items-center justify-between pb-6">
                                                    <p className="mb-0 mr-2">Don&#39;t have an account?</p>
                                                    <Link href='/signup'><a><button
                                                        type="button"
                                                        className="inline-block px-6 py-2 border-2 border-red-600 text-red-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
                                                        data-mdb-ripple="true"
                                                        data-mdb-ripple-color="light"
                                                    >
                                                        Signup
                                                    </button></a></Link>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                    <div
                                        className="lg:w-6/12 flex items-center lg:rounded-r-lg rounded-b-lg lg:rounded-bl-none"
                                        // inline css in react js
                                        style={{ background: "linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)" }}
                                    >
                                        <div className="text-white px-4 py-6 md:p-12 md:mx-6">
                                            <h4 className="text-xl font-semibold mb-6">We are more than just a company</h4>
                                            <p className="text-sm">
                                                We Repair and sale all electronics products as well as computer, printer (HP, Brother, Epson etc) Laptop, TFT,LCD, LED and all its accessories.
                                                A repair will almost always be cheaper than a replacement computer, but if the repair is looking to cost 50-70% of the cost of a replacement then you should always consider the age/condition of the machine before making a decision. … No sense in replacing a machine you love when it can be repaired.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div >
            </section >
        </div >
    )
}

export default Login