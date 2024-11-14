'use client';

import React, { useEffect, useRef } from 'react'
import Stripe from 'stripe'
import useCart, { ICartItem } from '@/app/store/store';
import { useRouter } from 'next/navigation';
import { url } from 'inspector';
import { IRecord } from '@/app/models/definitions/IRecord';


export function ProductCard({ product, avarageImageColor }: {
    product: IRecord,
    avarageImageColor: string
}) {
    const { name, priceId, price: unit_amount, author, image, _id } = product

    const { push } = useRouter();


    const addItemToCartd = useCart(state => state.addItemToCart)

    const onProductClick = () => {

        const newProduct: ICartItem = {
            name,
            priceId,
            unit_amount,
            quantity: 1,
            author: author.name,
            image
        }
        addItemToCartd({ newProduct })
    }

    return (
        <div className='pointer h-full hover:shadow-xl hover:-translate-y-1.5 transition-all'>
            <div className='relative pb-[100%] flex-1' onClick={() => push('../product/' + _id)}>
                <img className='top-0 l-0 absolute w-full h-full bg-contain' src={image} alt="" />
            </div>
            <div className={' text-white relative  p-4 bg-opacity-45 bg-slate-200 overflow-hidden'}
            style={{backgroundColor: avarageImageColor}}>
                {/* <img className='absolute top-0 w-full h-full left-0 z-10 brightness-75 blur-lg scale-150' src={image} alt="" /> */}
                <div className='relative z-20 flex flex-col h-full justify-between'>
                    <div className='relative text-xl font-medium '>
                        {name}
                    </div>
                    <div className=' leading-5'>
                        {author.name}
                    </div>
                    <div className='flex justify-between items-center mt-3 '>
                        <div className=' text-accent'>{unit_amount!} usd</div>
                        <button onClick={() => onProductClick()} className='font-normal btn btn-outline btn-sm rounded-none border-accent border-2 bg-transparent text-white'>
                            Buy
                        </button>
                    </div>
                </div>

            </div>
        </div>
    )
}


