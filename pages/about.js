import React from 'react'
import Head from 'next/head'
import Image from 'next/image'

const about = () => {
  return (
    <div>
      <Head>
        <title>About | SK Computer Saharsa Bihar</title>
        <meta name="description" content="We (SK Computer and printer Saharsa Bihar) Repair and sale all electronics products as well as computer,printer(HP,Brother,Epson etc) Laptop,TFT,LCD,LED and its accessories." />
        <meta name="keywords"
          content="About SK Computer, Saharsa Bihar, SK Electronics, All Computer accessories Available here, SK Computer, Sk Computer Saharsa, sk computer Baghwa, SK-Computer, Printer Service Center, Computer Repair Center, Online Store, Offline store, printer sell, sale, Services, Saharsa, Bihar India" />
        <meta name="author" content="Nitish Jha" />
        <link rel="icon" href="/favicon.ico?" />
      </Head>

      <div className="text-center font-serif m-10 text-4xl">
        WHO WE ARE?
      </div>
      <div className="flex flex-wrap justify-center">
        <div className="h-max max-w-md">
          <h1 className="text-3xl font-bold underline ">OUR AIM AND MISSION</h1>
          <p className="mt-7">We Repair and sale all electronics products as well as computer, printer (HP, Brother, Epson
            etc) Laptop,
            TFT,LCD, LED and all its accessories. <br />
            A repair will almost always be cheaper than a replacement computer, but if the repair is looking to cost
            50-70% of the cost of a replacement then you should always consider the age/condition of the machine
            before
            making a decision. … No sense in replacing a machine you love when it can be repaired.
          </p>
        </div>
        <div className="h-full max-w-md ml-3">
          <Image className="rounded-2xl" src="/assets/About-us-Temp.eb2ca1dd.eb2ca1dd.jpg" width={600} height={350} alt="About Sk Computer image" />
        </div>
      </div>
      <div className="flex flex-wrap justify-evenly mt-20">
        <a href="https://www.facebook.com/natkhat.nitish/" target="_blank" rel="noreferrer"><div className="text-center">
          <Image className="rounded-full hover:scale-90" src="/assets/Nitish-Jha.3940cec7.3940cec7.jpg" width={350} height={350} alt="Nitish jha(CEO of SK Computer)"/>
          <h5 className='font-semibold font-serif italic hover:text-orange-600 hover:underline'>Nitish Jha</h5>
          <p>CEO &amp; Frontend Developer</p>
        </div></a>
        <div className="text-center">
          <Image className="rounded-full" src="/assets/rishabh-raj.ad8040ce.ad8040ce.jpg" width={350} height={350} alt="Rishabh Raj" />
          <h5 className='font-semibold font-serif italic'>Rishabh Raj</h5>
          <p>Programmer &amp; Backend Developer</p>
        </div>
        <div className="text-center items-center">
          <Image className="rounded-full" src="/ujjwal.jpg" width={350} height={350} alt="Ujjwal Pratap Singh" />
          <h5 className='font-semibold font-serif italic'>Ujjwal</h5>
          <p>Database Administrator</p>
        </div>
      </div>

    </div>
  )
}

export default about