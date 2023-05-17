import React from 'react'
import Link from 'next/link'

const Products = (props) => {
  return (
    <div>
      <Link href={'/products/new'}>
        <button type='button' className='bg-blue-500 text-white rounded-md p-2'>
        New Product
        </button>
      </Link>
    </div>
  )
}

export default Products