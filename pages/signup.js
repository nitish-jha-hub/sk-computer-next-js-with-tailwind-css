import React from 'react'
import Link from 'next/link'
import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
  const [firstname, setFirstname] = useState()
  const [lastname, setLastname] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()

  const handleChange = (e) => {
    if (e.target.name == 'firstname') {
      setFirstname(e.target.value)
    }
    if (e.target.name == 'lastname') {
      setLastname(e.target.value)
    }
    if (e.target.name == 'email') {
      setEmail(e.target.value)
    }
    if (e.target.name == 'password') {
      setPassword(e.target.value)
    }

  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = { firstname, lastname, email, password }
    let res = await fetch('http://localhost:3000/api/signup', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    let response = await res.json()
    // console.log(response)

    setFirstname('')
    setLastname('')
    setEmail('')
    setPassword('')
    toast.success('Success! your account created', {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });

  }

  return (
    <div>
      <div className="font-mono ">
        <div className="container mx-auto">
          <div className="flex justify-center px-6 my-12">
            <div className="w-full xl:w-3/4 lg:w-11/12 flex">
              <div
                className="w-full h-auto  hidden lg:block lg:w-5/12 ">
                <img className='rounded-l-lg bg-cover' src="https://images.unsplash.com/photo-1543599538-a6c4f6cc5c05?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80" alt="Signup Image" />
              </div>
              <div className="w-full lg:w-7/12 bg-white p-5 rounded-lg lg:rounded-l-none md:border-r-2 border-zinc-300">
                <h3 className="pt-4 text-2xl text-center">Create an Account!</h3>
                <form onSubmit={handleSubmit} className="px-8 pt-6 pb-8 mb-4 bg-white rounded" method="POST">
                  <div className="mb-4 md:flex md:justify-between">
                    <div className="mb-4 md:mr-2 md:mb-0">
                      <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="firstname">
                        First Name
                      </label>
                      <input value={firstname} onChange={handleChange}
                        className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        id="firstname"
                        name="firstname"
                        type="text"
                        placeholder="First Name"
                      />
                    </div>
                    <div className="md:ml-2">
                      <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="lastname">
                        Last Name
                      </label>
                      <input value={lastname} name="lastname" onChange={handleChange}
                        className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        id="lastname"
                        type="text"
                        placeholder="Last Name"
                      />
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="email">
                      Email
                    </label>
                    <input value={email} name="email" onChange={handleChange}
                      className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      id="email"
                      type="email"
                      placeholder="Email"
                    />
                  </div>
                  <div className="mb-4 md:flex md:justify-between">
                    <div className="mb-4 md:mr-2 md:mb-0">
                      <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="password">
                        Password
                      </label>
                      <input value={password} name="password" onChange={handleChange}
                        className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border border-red-500 rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        id="password"
                        type="password"
                        placeholder="******************"
                      />
                      <p className="text-xs italic text-red-500">Please choose a password.</p>

                    </div>
                  </div>
                  <div className="mb-6 text-center">
                    <button
                      className="w-full px-4 py-2 font-bold text-white bg-orange-600 rounded-full hover:bg-orange-700 focus:outline-none focus:shadow-outline"
                      type="submit"
                    >
                      Register Account
                    </button>
                  </div>
                  <hr className="mb-6 border-t" />
                  <div className="text-center">
                    <Link href={'/resetpassword'}><a
                      className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                    >
                      Forgot Password?
                    </a></Link>
                  </div>
                  <div className="text-center">
                    <Link href={'/login'} ><a
                      className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                    >
                      Already have an account? Login!
                    </a></Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup