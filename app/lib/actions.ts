'use server'

import dbConnect from "./db";
import RecordModel from "../models/recordModel"
import { revalidatePath } from 'next/cache';
import Stripe from "stripe";
import { IRecord } from "../models/definitions/IRecord";
import { IAddRecordRequest, IEditRecordRequest } from "./definitions";
import AuthorModel from "../models/authorModel";
import GenreModel from "../models/genreModel";
import CheckoutSessionModel from "../models/checkoutSession";
import { fa0 } from "@fortawesome/free-solid-svg-icons";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";

const stripe = new Stripe(process.env.STRIPE_SECRET ?? '')

interface IAddStripeProduct extends IAddRecordRequest {
    priceId: string | null | undefined | Stripe.Price,
    productId: string
}

export async function addRecord(data: IAddRecordRequest) {
    await dbConnect()

    try {
        const { name, price } = data
        const product = await stripe.products.create({
            name,
            default_price_data: {
                currency: "usd",
                unit_amount: price * 100
            },
        });

        // TODO - check for additon, productId is missing
        const newRecord: IAddStripeProduct = { ...data, priceId: product.default_price, productId: product.id }
        const record = await RecordModel.create(newRecord)

        revalidatePath('/dashboard')

        return JSON.stringify(record)


    } catch (e: any) {
        console.log(e.message)
        return e.message
    }
}

export async function deleteRecord(_id: string): Promise<string> {
    await dbConnect()

    try {
        const deletedProduct = await RecordModel.deleteOne({_id})

        revalidatePath('/dashboard')
        return JSON.stringify(deletedProduct)


    } catch (e: any) {
        console.log(e.message)
        return e.message
    }
}
export async function updateRecord(data: IEditRecordRequest): Promise<string> {
    await dbConnect()

    try {
        const { name, price, _id, productId, author, unitsInAlbum, genres, releaseDate, songs, quantity, iFramelink, image } = data

        // update stripe product
        const newPrice = await stripe.prices.create({
            currency: 'usd',
            unit_amount: price * 100,
            product: productId
        });

        const foundRecord = await RecordModel.findOne({ _id })

        if (name != foundRecord.name)
            await stripe.products.update(productId, { name })

        // update product in DB

        if (!foundRecord)
            throw new Error(`Record "${name}" is not found`)

        debugger
        foundRecord.name = name
        foundRecord.author = author
        foundRecord.image = image
        foundRecord.unitsInAlbum = unitsInAlbum
        foundRecord.genres = genres
        foundRecord.releaseDate = releaseDate
        foundRecord.songs = songs
        foundRecord.price = price
        foundRecord.quantity = quantity
        foundRecord.iFramelink = iFramelink
        foundRecord.priceId = newPrice.id

        await foundRecord.save();

        revalidatePath('/dashboard')
        return JSON.stringify(foundRecord)


    } catch (e: any) {
        console.log(e.message)
        return e.message
    }
}



export async function addAuthor(name: string): Promise<{ data: any, error: '' }> {
    await dbConnect()

    try {
        const existingAuthor = await AuthorModel.findOne({ name })
        if (existingAuthor)
            throw new Error("This author alreary exist")

        const newAuthor = await AuthorModel.create({ name })
        return { data: JSON.stringify(newAuthor), error: '' }
    } catch (e: any) {
        console.log(e.message)
        return { data: "", error: e.message }

    }
}

export async function addGenre(name: string): Promise<{ data: any, error: '' }> {
    await dbConnect()

    const existingGenre = await GenreModel.findOne({ name })
    if (existingGenre)
        throw new Error("This author alreary exist")

    try {
        const newAuthor = await GenreModel.create({ name })
        return { data: JSON.stringify(newAuthor), error: '' }
    } catch (e: any) {
        console.log(e.message)
        return { data: "", error: e.message }

    }
}

export async function Remove() {
    await dbConnect()

    await AuthorModel.deleteMany({ name: "" })
}

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    try {

        await signIn('credentials', formData);
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Invalid credentials.';
                default:
                    return 'Something went wrong.';
            }
        }
        throw error;
    }
}

export async function fulfillCheckout(sessionId: string) {
    debugger
    // Set your secret key. Remember to switch to your live secret key in production.
    // See your keys here: https://dashboard.stripe.com/apikeys
    const stripe = new Stripe(process.env.STRIPE_SECRET ?? '')

    console.log('Fulfilling Checkout Session ' + sessionId);

    // Retrieve the Checkout Session from the API with line_items expanded
    const checkoutSession = await stripe.checkout.sessions.retrieve(sessionId, {
        expand: ['line_items'],
    });

    // Check the Checkout Session's payment_status property
    // to determine if fulfillment should be peformed
    if (checkoutSession.payment_status !== 'unpaid') {

        checkoutSession.line_items?.data.forEach(async (item) => {
            const product = await RecordModel.findOne({ productId: item.price?.product })
            if (item.quantity)
                product.quantity -= item.quantity

            await product.save()
        })

        let checkoutRecord = await CheckoutSessionModel.findOne({ sessionId })

        if (checkoutRecord?.fulfilled) {
            console.log(`Checkout session ${sessionId} already fulfilled.`);
            return; // Exit if already fulfilled
        }

        // Mark the session as fulfilled
        if (!checkoutRecord) {
            CheckoutSessionModel.create({ sessionId, fulfilled: true })
        } else {
            checkoutRecord.fulfilled = true;
            checkoutRecord.fulfilledAt = new Date();
        }
        await checkoutRecord.save();
    }
}

