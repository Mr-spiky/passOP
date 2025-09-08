import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-slate-800 '>
      <div className="mycontainer p-4 h-13 text-white flex justify-between items-center ">

        <div className='logo text-2xl font-bold'>
          <span className='text-green-600'>&lt;</span>
          Pass
          <span className='text-green-600'>OP/&gt;</span>
        </div>
        <div className='space-x-4 font-bold'>
          {/* <ul className='flex space-x-4'>
            <li><a className='text-white hover:text-green-600' href="/">Home</a></li>
            <li><a className='text-white hover:text-green-600' href="/about">About</a></li>
            <li><a className='text-white hover:text-green-600' href="/contact">Contact</a></li>
          </ul> */}
        </div>
        <button className=' text-green-600  border-2 border-green-600 px-4 py-1 rounded-lg flex items-center gap-2 hover:bg-green-600 hover:text-white transition'>
          <img className='w-6 h-6 invert' src="/icon/github.png" alt="github LOGO" />
          <span>Github</span>
        </button>
      </div>
    </nav>
  )
}

export default Navbar
