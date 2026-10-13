import React from 'react'
import{Link} from 'react-router-dom'
import Home from '../../pages/Home'
import Features from '../../pages/Features'
import How_It_Works from '../../pages/How_It_Works'
import Not_Found from '../../pages/Not_Found'

const Nev = () => {
  return (
    <div className='no-underline list-none flex flex-row items-center justify-center gap-10 text-sm font-semibold font-nova tracking-wide text-black -mr-175'>
      <Link to='/'>Home</Link>
      <Link to='/Features'>Features</Link>
      <Link to='/How_It_Works'>How It Works</Link>
    </div>
  )
}

export default Nev