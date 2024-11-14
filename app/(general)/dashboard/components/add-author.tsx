import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";
import { addAuthor } from '@/app/lib/actions';


const schema = z.object({
    authorName: z.string().min(1)
})

export type FormFields = z.infer<typeof schema>


export default function AddAuthor() {
    const { register, handleSubmit, formState: { isSubmitting, errors, isSubmitted } } = useForm<FormFields>({ resolver: zodResolver(schema) })
    const [authorDBError, setAuthorDBError] = useState();


    const onSubmit = async (data: FormFields) => {
        const { error } = await addAuthor(data.authorName)

        if (error)
            setAuthorDBError(error);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-3' >

            <input {...register("authorName")} type="text" className='input input-bordered w-full' placeholder='Author Name' />
            {errors.authorName && <div className=' text-red-600'>{errors.authorName.message}</div>}
            <button className="btn btn-sm w-1/2  btn-secondary">Add</button>
            {authorDBError && <div className={' text-red-600 ' + (isSubmitting ? "btn-disabled" : "")}>{authorDBError}</div>}

        </form >
    )
}
