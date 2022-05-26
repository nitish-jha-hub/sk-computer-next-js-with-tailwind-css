import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

export default function home() {
  return (
    <div>
      <Head>
        <title>Home | SK Computer</title>
        <meta name="description" content="We Repair and sale all electronics products as well as computer,printer(HP,Brother,Epson etc) Laptop,TFT,LCD,LED and its accessories" />
        <meta name="keywords"
          content="SK Computer, Sk Computer Saharsa, sk computer Baghwa, SK-Computer, Printer Service Center, Computer Repair Center, Online Store, Offline store, printer sell, sale, Services, Saharsa, Bihar India" />
        <meta name="author" content="Nitish Jha" />
        <link rel="icon" href="/favicon.ico?" />
      </Head>
      <div className='text-2xl font-mono text-gray-400'>
        <marquee behavior="scroll" direction="left" height="" width="100%">Hello, Welcome to SK Computer saharsa, Bihar </marquee>
      </div>
      <div className="flex flex-wrap shadow-sm my-2 rounded-xl font-mono justify-evenly">
        <div className="max-w-lg text-5xl text-center font-serif font-bold text-fuchsia-800">
          <h1 className='text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-pink-600'>Software or Hardware problem? One Solution</h1> <br />
          <h2 className="m-2 text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-pink-600">SK COMPUTER AND PRINTER SAHARSA,BIHAR</h2>

        </div>
        <div className="max-w-lg">
          <Image className="rounded-2xl" src="/assets/SK-Computer-main-bg.29157249.29157249.jpg" alt="Sk Computer saharsa backgrond image" width={500} height={300} />
        </div>
      </div>
      <div className="text-center font-serif font-semibold text-lg mt-10">
        <h1>“We Repair and sale all electronic products as well as computer, printer (HP,Brother,Epson etc)
          Laptop,TFT,LCD,LED and all its accessories”
          Team sk computer
        </h1>
      </div>
      <p
        className="text-center my-10 text-4xl font-semibold text-slate-400 font-serif underline underline-offset-4 capitalize">
        Our Top Services In Saharsa Bihar
      </p>
      <div className="flex flex-wrap justify-evenly">

        <div className="m-2 rounded-2xl inline-block max-w-sm shadow-lg overflow-hidden ">
          <Image className="w-full" src="/assets/sk-computer-store-1.39c83483.39c83483.jpg" width={384} height={200} alt="SK Computer Saharsa store" />
          <h6><Link href={'/products'}><a className="text-2xl font-semibold underline hover:no-underline">Best Computer Store in Saharsa</a></Link></h6>
          <p className="m-2">Buy Pre Built Gaming PCs, Gaming PC Rigs, Laptops, Graphic Cards, CPUs, Motherboards, cpu
            coolers and
            much more</p>
        </div>

        <div className="m-2 rounded-2xl inline-block max-w-sm shadow-lg overflow-hidden">
          <Image className="w-full" src="/assets/Repair-center-Sk-Computer-saharsa.58553bc2.58553bc2.jpg" width={384} height={200}
            alt="Repair-center-Sk-Computer-saharsa" />
          <h6><Link href={'services'}><a className="text-2xl font-semibold underline hover:no-underline" href="#">Fix Hardware and Software problems</a></Link></h6>
          <p className="m-2">A repair will almost always be cheaper than a replacement computer, but if the repair is
            looking to cost
            50-70% of the cost of a replacement then you should always consider the age/condition of the machine
            before making a decision. ... No sense in replacing a machine you love when it can be repaired.</p>
        </div>

        <div className=" m-2 rounded-2xl inline-block max-w-sm shadow-lg overflow-hidden">
          <Image src="/assets/Visiting-Card.12ed331b.12ed331b.jpg" width={384} height={200} alt="SK Computer Visiting Card" />
          <h6><Link href={'/about'}><a className="text-2xl font-semibold underline hover:no-underline">OUR AIM AND MISSION</a></Link></h6>
          <p className="m-2">Sk Computer and printers saharsa . Our Aim is to provide Best Solution to fix your gadgets
            i.e: your
            personal/bussiness PC or laptop, Inktank Printer (HP, Epson, Brother etc), Laserjet Printer, Dot Matrix
            Printer, Thermal Printer, at cheapest cost. Our team is Customer friendly and polite.</p>
        </div>
      </div>
    </div>
  )
}