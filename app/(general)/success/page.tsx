
import React from 'react'
import Stripe from "stripe";
import Back from './back';

const stripe = new Stripe(process.env.STRIPE_SECRET ?? '')

interface SearchParams {
  searchParams: {
    session_id: string
  }
}

export default async function Page({ searchParams }: SearchParams) {
  const sessionId = searchParams.session_id || ""
  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items'],
  });
  console.log("🚀 ~ Page ~ session:", session.line_items)

  return (
    <div className='p-5'>
      <div className='absolute top-1/2 -translate-y-1/2'>
        <h1 className='text-4xl text-green-600 mb-2'>Success!</h1>
        <div className='text-2xl'>Your order: </div>
        {session.line_items?.data.map((item) => {
          return <div className='flex gap-2 text-3xl'>
            <div>{item.description}</div> |
            <div>{item.price?.unit_amount! / 100} usd</div>
          </div>
        })}
      </div>
      <Back />
    </div>


  )
}
