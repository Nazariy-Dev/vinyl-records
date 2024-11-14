'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import React from 'react'

import { useRouter } from 'next/navigation';

export default function page() {
  const { push } = useRouter();

  return (
    <div className='p-5'>
      <div className='absolute top-1/2 -translate-x-1/2  left-1/2 -translate-y-1/2 '>
        <h1 className='text-3xl text-red-400 font-semibold'>Cancel</h1>
      </div>
      <div className='px-4 py-2 items-center btn justify-start inline' onClick={() => push("../")}>
        <FontAwesomeIcon icon={faArrowLeft} width={10}></FontAwesomeIcon>
        <button className='ml-2 ' >Back to shop</button>
      </div>
    </div>


  )
}
