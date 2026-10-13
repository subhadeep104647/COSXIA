import React from 'react'
import{Link} from 'react-router-dom'


const Nev2 = () => {
  return (
    <div className='no-underline list-none flex items-center flex-row justify-center gap-10 absolute right-55 text-base font-semibold tracking-wide'>
      <Link to='/Home2'>Code Analyzer</Link>
      <Link to='/Terminal2'>Terminal</Link>
      <Link to='/Optimizer'>Optimizer</Link>
      <Link to='/Analysis_History'>Analysis History</Link>
      <Link to='/Error_History'>Error History</Link>
    </div>
  )
}

export default Nev2