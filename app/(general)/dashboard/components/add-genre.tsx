import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";
import { addAuthor, addGenre } from '@/app/lib/actions';


const schema = z.object({
  genreName: z.string().min(1)
})

export type FormFields = z.infer<typeof schema>


export default function AddGenre() {
  const { register, handleSubmit, formState: { isSubmitting, errors, isSubmitted } } = useForm<FormFields>({ resolver: zodResolver(schema) })

  const [genreDBError, setGenreDBError] = useState();

  const onSubmit = async (data: FormFields) => {
    const { error } = await addGenre(data.genreName)
    
    if (error)
      setGenreDBError(error);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-3' >

      <input {...register("genreName")} type="text" className='input input-bordered w-full' placeholder='Genre name' />
      {errors.genreName && <div className=' text-red-600'>{errors.genreName.message}</div>}
      <button className="btn btn-sm w-1/2  btn-secondary">Add</button>

      {genreDBError && <div className={' text-red-600 ' + (isSubmitting ? "btn-disabled" : "")}>{genreDBError}</div>}
    </form >
  )
}
