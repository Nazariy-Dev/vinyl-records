import { fulfillCheckout } from "@/app/lib/actions";
import { LineItems } from "@/app/lib/definitions";
import { NextResponse } from "next/server";
import Stripe from "stripe"

export async function POST(request: Request) {
    const body: { lineItems: LineItems[] } = await request.json()

    if (body.lineItems.length === 0) {
        return new Response('Error', {
            status: 405,
        });
    }

    try {
        const stripe = new Stripe(process.env.STRIPE_SECRET ?? '')

        const session = await stripe.checkout.sessions.create({
            success_url: `${process.env.SITE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.SITE_URL}/cancel`,
            line_items: body.lineItems,
            mode: 'payment'
        })
        return NextResponse.json({ session })
    } catch (err) {
        console.log('BROKEN')
        console.log(err)
        return new Response('Error', {
            status: 405,
        });
    }
}

