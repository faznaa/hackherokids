import React from 'react'
import Spinner from './Spinner'

export default function Button({ disabled, loading ,handleClick,children}:any) {
  return (
    <button disabled={disabled}
    onClick={handleClick}
     className="mt-4 bg-black disabled:bg-gray-400 disabled:cursor-none text-white p-2 rounded-md">
        {loading ? <Spinner/> : children}
    </button>

  )
}
