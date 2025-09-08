import { useState } from 'react'
import './App.css'
import Manager from './component/Manager.jsx'
import Navbar from './component/Navbar.jsx'
import Footer from './component/Footer.jsx'
  <link href="/src/index.css" rel="stylesheet"></link>

function App() {
  

  return (
    <>
    <Navbar/>
   <div className=' bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]'>
    <Manager/>
    </div>
      <Footer/>
    </>
  )
}

export default App
