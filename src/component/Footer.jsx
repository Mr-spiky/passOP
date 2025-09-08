import React from 'react'

const Footer = () => {
  return (
    <div className='text-center p-2 bg-slate-800 text-white'>
        <div className='logo text-2xl font-bold'>
          <span className='text-green-600'>&lt;</span>
          Pass
          <span className='text-green-600'>OP/&gt;</span>
        </div>
      <span>Created with <img className='inline-block w-4 ' src="/icon/heart.png" alt="love" /> by  <b>Spiky</b></span>
    </div>
  )
}

export default Footer
