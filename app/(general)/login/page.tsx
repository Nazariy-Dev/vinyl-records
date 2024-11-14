
'use client'
;
import { authenticate } from '@/app/lib/actions';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const schema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
})

type FormFields = z.infer<typeof schema>

export default function Login() {

    const [error, setError] = useState('')
    const { register, handleSubmit, formState: { isSubmitting, errors, isLoading } } = useForm<FormFields>({ resolver: zodResolver(schema) })

    const onSubmit = async (data: FormFields) => {
        const {email, password} = data
        const formData = new FormData();

        formData.append("email", email)
        formData.append("password", password)
        const error = await authenticate(undefined, formData)
        setError(error || "")
    }



    return (
        <div className='flex items-center justify-center h-screen w-full p-4'>
            <div className='max-w-[400px] w-full'>
                <h1 className=' text-center text-5xl font-bold mb-4'>Login</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='flex flex-col gap-4'>
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Email</span>
                            </div>
                            <input {...register("email")} type="email" placeholder="Enter your email" className="input input-bordered w-full" />
                            {errors.email && <div className='mt-2 text-red-500'>{errors.email.message}</div>}

                        </label>
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Password</span>
                            </div>
                            <input {...register("password")} type="text" placeholder="Enter your password" className="input input-bordered w-full" />
                            {errors.password && <div className='mt-2 text-red-500'>{errors.password.message}</div>}

                        </label>
                        {/* <LoginButton /> */}
                        <button className={"btn btn-secondary btn-md text-white"} aria-disabled={isLoading} >Login </button>

                        {error && (
                            <>
                                <FontAwesomeIcon icon={faCircleExclamation} className='h-5 w-5 text-red-500' />
                                <p className="text-sm text-red-500">{error}</p>
                            </>
                        )}

                    </div>
                </form>
            </div>
        </div >

    )
}

function LoginButton() {
    const { pending } = useFormStatus();

    return (
        <button className={"btn btn-secondary btn-md text-white"} aria-disabled={pending}>Login </button>
    );
}

