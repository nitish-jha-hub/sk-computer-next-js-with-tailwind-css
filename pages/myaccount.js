import React from 'react'
import { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Router from 'next/router';
import 'react-toastify/dist/ReactToastify.css'


const Myaccount = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [pincode, setPincode] = useState('')
  const [address, setAddress] = useState('')
  const [password, setPassword] = useState('')
  const [cpassword, setCpassword] = useState('')
  const [npassword, setNpassword] = useState('')
  const [user, setUser] = useState({ value: null })

  useEffect(() => {
    const myuser = JSON.parse(localStorage.getItem('myuser'))
    if (!myuser) {
      Router.push('/')
    }
    if (myuser && myuser.token) {
      setUser(myuser)
      setEmail(myuser.email)
      fetchData(myuser.token)
    }
  }, [])

  const fetchData = async (token) => {
    let data = { token: token }
    let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getuser`, {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    let res = await a.json()    
    setName(res.firstname)
    setAddress(res.address)
    setPhone(res.phone)
    setPincode(res.pincode)

  }

  const handleUserSubmit = async () => {
    let data = { token: user.token, address, name, phone, pincode }
    let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updateuser`, {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    let res = await a.json()    
    toast.success("User Data Successfully Updated", {
      position: "top-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }

  const handlePasswordSubmit = async () => {
    let res;
    if (npassword == cpassword) {
      let data = { token: user.token, password, cpassword, npassword }
      let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updatepassword`, {
        method: 'POST', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      res = await a.json()

      if (res.success) {
        toast.success("Password Successfully Updated", {
          position: "top-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
      else {
        toast.error("Incorrect Password", {
          position: "top-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }

    }
    else {
      toast.error("New Password and Confirm password is not same", {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    setPassword('')
    setCpassword('')
    setNpassword('')

  }

  const handleChange = async (e) => {

    if (e.target.name == 'name') {
      setName(e.target.value)
    }
    else if (e.target.name == 'phone') {
      setPhone(e.target.value)
    }
    else if (e.target.name == 'address') {
      setAddress(e.target.value)
    }
    else if (e.target.name == 'pincode') {
      setPincode(e.target.value)
    }
    else if (e.target.name == 'password') {
      setPassword(e.target.value)
    }
    else if (e.target.name == 'cpassword') {
      setCpassword(e.target.value)
    }
    else if (e.target.name == 'npassword') {
      setNpassword(e.target.value)
    }

  }



  return (
    <div className='mx-10'>
      <div>
        <h1 className='text-center font-bold mt-8 bg-slate-200 text-xl'>MY Account</h1>
        <h2 className='font-semibold text-center'>welcome <span className='font-bold text-orange-600 text-lg'>{user.email}</span></h2>
        <div className="relative mb-2">
          <label htmlFor="name" className="leading-7 text-sm text-gray-600">Name</label>
          <input onChange={handleChange} value={name} type="text" id="name" name="name" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
        </div>
        <div className="relative mb-2">
          <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
          {user && user.token ? <input value={user.email} type="email" id="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" readOnly={true} /> : <input onChange={handleChange} value={email} type="email" id="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />}

        </div>
        <div className="relative mb-2">
          <label htmlFor="address" className="leading-7 text-sm text-gray-600">Address</label>
          <textarea onChange={handleChange} value={address} id="address" name="address" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-24 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
        </div>
        <div className='flex'>
          <div className="relative mb-2 w-1/2 mr-2">
            <label htmlFor="phone" className="leading-7 text-sm text-gray-600">Phone</label>
            <input onChange={handleChange} value={phone} type="phone" id="phone" name="phone" placeholder='Enter Your 10 Digit Mobile Number' className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
          <div className="relative mb-2 w-1/2">
            <label htmlFor="pincode" className="leading-7 text-sm text-gray-600">Pincode</label>
            <input onChange={handleChange} value={pincode} type="number" id="pincode" name="pincode" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>
        <div className='items-center text-center'>
          <button onClick={handleUserSubmit} className="disabled:bg-orange-300 flex mx-auto mt-2 text-white bg-orange-600 border-0 py-2 px-8 focus:outline-none hover:bg-orange-700 rounded text-lg">Submit</button>
        </div>
      </div>
      <div>
        <h2 className='font-semibold'>2.Change Password</h2>
        <div className='flex'>
          <div className="relative m-2 w-1/2 mr-2">
            <label htmlFor="password" className="leading-7 text-sm text-gray-600">Current Password</label>
            <input onChange={handleChange} value={password} type="password" id="password" name="password" placeholder='Enter Your Current Password' className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
          <div className="relative m-2 w-1/2">
            <label htmlFor="npassword" className="leading-7 text-sm text-gray-600">Enter New Password</label>
            <input onChange={handleChange} value={npassword} type="password" id="npassword" name="npassword" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
          <div className="relative m-2 w-1/2">
            <label htmlFor="cpassword" className="leading-7 text-sm text-gray-600">Confirm New Password</label>
            <input onChange={handleChange} value={cpassword} type="password" id="cpassword" name="cpassword" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>
        <div className='items-center text-center'>
          <button onClick={handlePasswordSubmit} className="disabled:bg-orange-300 flex mx-auto mt-2 text-white bg-orange-600 border-0 py-2 px-8 focus:outline-none hover:bg-orange-700 rounded text-lg">Submit</button>
        </div>
      </div>

    </div>
  )
}

export default Myaccount