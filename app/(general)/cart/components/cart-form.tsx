'use client'

import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import { checkout } from "@/app/lib/data";
import useCart from "@/app/store/store";
import { useRouter } from "next/navigation";

const schema = z.object({
    name: z.string().min(3, { message: "Name must contain at least 3 characters" }),
    surname: z.string().min(3, { message: "Surname must contain at least 3 characters" }),
    email: z.string().email(),
    provider: z.string({ message: "Please, select shipping provider" })
})

type FormFields = z.infer<typeof schema>


export default function CartForm() {

    const { register, handleSubmit, formState: { isSubmitting, errors } } = useForm<FormFields>({ resolver: zodResolver(schema) })
    const cart = useCart(state => state.cart)
    const {push} = useRouter()

    const onSubmit = async (data: FormFields) => {
        const lineItems = cart.map(product => ({
            price: product.priceId,
            quantity: product.quantity
        }))
        const res = await checkout(lineItems)
        push(res.session.url)

        // TODO - add order to dashboard
        // addOrder(data)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-1/2 flex flex-col gap-10">
            <h2 className="text-3xl font-semibold">1. Personal Info</h2>
            <div className="grid grid-cols-2 gap-y-16 gap-x-[25%] grid-rows-2">
                <div className=" relative">
                    <input className="w-full border-b pb-1 border-[#959595] placeholder:text-[#959595] outline-none bg-transparent " type="text" {...register("name")} placeholder="Name" />
                    {errors.name && <div className="absolute mt-2 text-red-500">{errors.name.message}</div>}
                </div>
                <div className="relative">
                    <input className=" w-full border-b pb-1 border-[#959595] placeholder:text-[#959595] outline-none bg-transparent " type="text" {...register("surname")} placeholder="Surname" />
                    {errors.surname && <div className="absolute mt-2 text-red-500">{errors.surname.message}</div>}
                </div>
                {/* <input className="border-b pb-1 border-[#959595] placeholder:text-[#959595] outline-none bg-transparent " type="text" {...register("email")} placeholder="Phone" /> */}
                <div className="relative">
                    <input className=" w-full border-b pb-1 border-[#959595] placeholder:text-[#959595] outline-none bg-transparent " type="text" {...register("email")} placeholder="Email" />
                    {errors.email && <div className="absolute mt-2 text-red-500">{errors.email.message}</div>}
                </div>
            </div>
            <h2 className="text-3xl font-semibold">2. Shipping</h2>
            <div className="flex flex-col gap-4 relative">
                <label className="flex items-center gap-3">
                    <input {...register("provider")} id="np" type="radio" value={"sfasfd3"} className="radio radio-sm" />
                    <label htmlFor="np">Нова Пошта</label>
                </label>
                <label className="flex items-center gap-3">
                    <input {...register("provider")} id="up" type="radio" value={"fkladjflkj"} className="radio radio-sm" />
                    <label htmlFor="up">Укр Пошта</label>
                </label>
                {errors.provider && <div className="absolute -bottom-7 mt-2 text-red-500">{errors.provider.message}</div>}

            </div>

            <button className="btn btn-outline border-secondary border-4 btn-lg rounded-none w-[140px]">Checkout</button>
        </form>
    )
}
function addOrder(data: { name: string; surname: string; email: string; provider: string; }) {
    throw new Error("Function not implemented.");
}

