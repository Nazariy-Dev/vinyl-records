import { fulfillCheckout } from "@/app/lib/actions";
import Stripe from "stripe"

const endpointSecret = "whsec_ae337085ce8dc207b66b5cef5c674b6f8c36304e0c26c327c92a54ad392254c7";

export async function POST(request: Request) {

    const stripe = new Stripe(process.env.STRIPE_SECRET ?? '')

    // Convert the request body to a Buffer
    const buf = await request.arrayBuffer();
    const payload = Buffer.from(buf);
    // const sig = request.headers['stripe-signature'];
    const sig = request.headers.get('stripe-signature')

    let event;

    try {
        event = stripe.webhooks.constructEvent(payload, sig ? sig : "", endpointSecret);
    } catch (err: any) {
        return new Response(err.raw.message, { status: 400 })
    }

    if (
        event.type === 'checkout.session.completed'
        || event.type === 'checkout.session.async_payment_succeeded'
    ) {
        fulfillCheckout(event.data.object.id);
    }

    return new Response("", {
        status: 200
    })
}