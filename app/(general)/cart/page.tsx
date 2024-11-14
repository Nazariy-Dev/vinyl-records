'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import Link from 'next/link'
import React from 'react'
import CartOverview from './components/cart-overview';
import CartForm from './components/cart-form';
import useCart from '@/app/store/store';

export default function Cart() {
  const cartItems = useCart(state => state.cart)
  console.log("🚀 ~ Cart ~ cartItems:", cartItems)

  return (
    <div className='py-10 px-6 container h-screen mx-auto'>
      <Link href={'/'} className='flex items-center gap-4 mb-6'>
        <FontAwesomeIcon height={"20px"} icon={faArrowLeft} />
        <div className='text-2xl hover:underline'>back to shop</div>
      </Link>
      {/* <CartOverview/> */}
      <div className='flex gap-16 justify-between'>
        {cartItems.length > 0 ?
          <><CartOverview />
            <CartForm />
          </>
          : <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1.5 font-semibold text-4xl '>"Cart is empty :"</div>}
      </div>
    </div>
  )
}
