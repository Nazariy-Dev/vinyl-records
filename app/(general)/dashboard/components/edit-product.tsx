'use client'

import { z } from "zod"
import { useForm, Controller, useFieldArray } from "react-hook-form"
import { Autocomplete, TextField, debounce } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { ReadonlyURLSearchParams, usePathname, useRouter, useSearchParams } from 'next/navigation';
import { updateRecord } from "@/app/lib/actions";
import { convertToBase64 } from "@/app/lib/fuctions";
import { IAuthor } from "@/app/models/definitions/IAuthor";
import { IUnits } from "@/app/models/definitions/IUnits";
import { IGenres } from "@/app/models/definitions/IGenres";
import {  IEditRecordRequest } from "@/app/lib/definitions";
import { IRecord } from "@/app/models/definitions/IRecord";
import dayjs from "dayjs";
import { Context } from "./dashboard-wrapper";

const MAX_FILE_SIZE = 2000000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];
const iFrameLinkRegex = /https?:\/\/[^"']+/

const schema = z.object({
    name: z.string().min(1, { message: "Name is requred" }),
    author:
        z.object({ name: z.string().min(1, { message: "Author is required" }), _id: z.string().min(1) }),
    image: z
        .any()
        .refine(
            (fileOrBase64) => typeof fileOrBase64 === "string" || (fileOrBase64 && fileOrBase64.length > 0),
            "Select photo"
        )
        .refine(
            (fileOrBase64) =>
                typeof fileOrBase64 === "string" || (fileOrBase64 && fileOrBase64[0]?.size <= MAX_FILE_SIZE),
            `Max image size is 2MB`
        )
        .refine(
            (fileOrBase64) =>
                typeof fileOrBase64 === "string" || (fileOrBase64 && ACCEPTED_IMAGE_TYPES.includes(fileOrBase64[0]?.type)),
            "The photo format must be jpeg/jpg/webp type"
        )
        .transform(async (fileOrBase64) =>
            typeof fileOrBase64 === "string" ? fileOrBase64 : await convertToBase64(fileOrBase64[0])
        ),
    unitsInAlbum: z.string(),
    genres: z.array(z.object({ name: z.string().min(1, { message: "Author is required" }), _id: z.string().min(1) })),
    price: z.coerce.number().min(1, { message: "Please, enter price" }),
    releaseDate:
        z.any()
            .refine((date) => {
                return date.$isDayjsObject ? date : null
            }, { message: "Date is required" }),
    quantity: z.coerce.number().min(1, { message: "Pleaase, add quantity" }),
    iFrame: z.string().regex(iFrameLinkRegex, { message: "Enter valid link" }).optional().or(z.literal("")),

    songs: z.array(z.string().min(1, { message: "Song name cannot be empty" }))
})

export type FormFields = z.infer<typeof schema>

interface FormProps {
    units: IUnits[],
    genres: IGenres[],
    authors: IAuthor[],
    product: IRecord,

}

export default function EditProduct({ units, genres, authors, product }: FormProps) {
    const { name, unitsInAlbum, price, quantity, iFramelink, songs, author, genres: product_genres, releaseDate, _id, productId, image } = product
    const { replace } = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const { register, control, handleSubmit, formState: { isSubmitting, errors, isSubmitted }, getValues } = useForm<FormFields>({
        resolver: zodResolver(schema),
        values: {
            name,
            unitsInAlbum: unitsInAlbum.name,
            price,
            quantity,
            iFrame: iFramelink,
            songs,
            author,
            genres: product_genres,
            image,
            releaseDate: dayjs(releaseDate)
        }
    })

    const { fields, append, remove } = useFieldArray({
        control, name: "songs"
    });

    const onSubmit = async (data: FormFields) => {
        let formData: IEditRecordRequest = {
            name: '',
            author: '',
            image: '',
            unitsInAlbum: '',
            genres: [],
            releaseDate: '',
            songs: [],
            price: 0,
            iFramelink: '',
            quantity: 0,
            _id: '',
            productId: ''
        }
        formData.name = data.name
        formData.image = data.image
        formData.songs = data.songs
        formData.releaseDate = data.releaseDate.$d.toDateString()
        formData.quantity = data.quantity
        formData.price = data.price
        if (data.iFrame)
            formData.iFramelink = data.iFrame
        formData._id = _id
        formData.productId = productId

        if (data.author) formData.author = data.author._id
        if (data.genres) formData.genres = data.genres.map((val: any) => val._id)

        formData.unitsInAlbum = units.find(val => val.name = data.unitsInAlbum)!._id

        drawer.current!.checked = false
        await updateRecord(formData)
    }
    const debouncedFetchGenresOptions = useMemo(
        () =>
            debounce((query: string) => {
                const params = new URLSearchParams(searchParams);
                if (query) {
                    params.set('genresQuery', query);
                } else {
                    params.delete('genresQuery');
                }

                replace(`${pathname}?${params.toString()}`);
            }, 500),
        []
    );
    const debouncedFetchAuthorsOptions = useMemo(
        () =>
            // after re-render because of authorQuery, searchParams stay the same in useMemo, so i update it, passing it as a parameter
            debounce((query: string, searchParams: ReadonlyURLSearchParams) => {
                const params = new URLSearchParams(searchParams);
                if (query) {
                    params.set('authorQuery', query);
                } else {
                    params.delete('authorQuery');
                }
                replace(`${pathname}?${params.toString()}`);
            }, 500),
        []
    );

    const drawer = useContext(Context)

    const [imagePreview, setImagePreview] = useState(image);

    useEffect(() => {
        setImagePreview(image)
    }, [image])

    const handleImageChange = (event: any) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result); // Set the image preview URL
            };
            reader.readAsDataURL(file); // Convert image file to base64 URL
        }
    };

    return (

        <div className='flex justify-between items-center'>
            <div className="drawer drawer-end w-auto">
                <input ref={drawer} id="my-drawer-5" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    {/* <label htmlFor="my-drawer-5" className="btn btn-ghost btn-xs">Edit a product</label> */}
                </div>
                <div className="drawer-side overflow-hidden z-[1000]">
                    <label htmlFor="my-drawer-5" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu bg-base-200 text-base-content min-h-full w-2/5 p-4 pr-8 pb-8">
                        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
                            <label className='flex flex-col gap-2'>
                                <label htmlFor="name" className='font-semibold'>Name: </label>
                                <input {...register("name")} type="text" id='name' className='input input-bordered' placeholder='Name' />
                                {errors.name && <div className=" text-red-500">{errors.name.message}</div>}
                            </label>

                            <label className='flex flex-col gap-2'>
                                <label htmlFor="image" className='font-semibold'>Image</label>
                                <input {...register("image", { onChange: (e) => handleImageChange(e) })} id="image" type="file" className="file-input file-input-bordered file-input-secondary w-full max-w-xs" />
                                {imagePreview && (
                                    <img src={imagePreview} alt="Preview" className="w-24 mt-4" />
                                )}
                                {errors.image && <div className=" text-red-500">{errors.image.message}</div>}
                            </label>

                            <label className='flex flex-col gap-2'>
                                <label htmlFor="name" className='font-semibold'>Units in Album: </label>
                                <select {...register("unitsInAlbum")} className="select select-bordered w-full">
                                    <option disabled>Select units</option>
                                    {units.map((value, i) => (
                                        <option key={i} value={value.name}>{value.name}</option>
                                    ))}
                                </select>
                                {errors.unitsInAlbum && <div className=" text-red-500">{errors.unitsInAlbum.message}</div>}

                            </label>

                            <label className='flex flex-col gap-2'>
                                <label htmlFor="price" className='font-semibold'>Price: </label>
                                <input {...register("price")} id="price" type="text" className='input input-bordered' placeholder='Price' />
                                {errors.price && <div className=" text-red-500">{errors.price.message}</div>}

                            </label>

                            <label className='flex flex-col gap-2'>
                                <label htmlFor="name" className='font-semibold'>Quntity: </label>
                                <input {...register("quantity")} type="text" id='name' className='input input-bordered' placeholder='Quantity' />
                                {errors.quantity && <div className=" text-red-500">{errors.quantity.message}</div>}
                            </label>

                            <label className='flex flex-col gap-2'>
                                <label htmlFor="iframe" className='font-semibold'>Iframe: </label>
                                <input {...register("iFrame")} id="iframe" type="text" className='input input-bordered' placeholder='Link' />
                                {errors.iFrame && <div className=" text-red-500">{errors.iFrame.message}</div>}
                            </label>

                            <label className="flex flex-col gap-2">
                                <label htmlFor="songs" className="font-semibold">Songs: </label>

                                {/* Dynamic song input fields */}
                                {fields.map((field, index) => (
                                    <div key={field.id}>
                                        <div className="flex gap-2 items-center">
                                            <input
                                                {...register(`songs.${index}`)}
                                                type="text"
                                                className="input input-bordered"
                                                placeholder="Enter song name"
                                            />
                                            <button type="button" className="btn btn-sm btn-error" onClick={() => remove(index)}>
                                                Remove
                                            </button>
                                        </div>
                                        {errors.songs && <div className="text-red-500 mt-2">{errors.songs[index]?.message}</div>}
                                    </div>
                                ))}

                                <button
                                    type="button"
                                    className="btn btn-sm btn-secondary mt-2"
                                    onClick={() => append('')} // Adds a new empty song input field
                                >
                                    Add Song
                                </button>

                            </label>

                            <div className="divider"></div>

                            <label>
                                <label htmlFor="name" className='font-semibold mb-2 block'>Author: </label>
                                <div className="flex gap-2 items-center justify-between">
                                    <Controller
                                        name="author"
                                        control={control}
                                        render={({ field: { onChange, value } }) => (
                                            <Autocomplete
                                                className="w-full"
                                                disablePortal
                                                options={authors}
                                                getOptionLabel={(option) => option.name}
                                                onChange={(_, value) => onChange(value)}
                                                isOptionEqualToValue={(option, value) => option._id === value._id}
                                                value={value}
                                                filterOptions={(options) => options}
                                                onInputChange={(_, value) => debouncedFetchAuthorsOptions(value, searchParams)}
                                                renderInput={(params) => (
                                                    <TextField {...params} className="flex-1" placeholder="Select Author" variant="outlined" />
                                                )}
                                            />
                                        )}
                                    />

                                </div>
                                {errors.author && <div className=" text-red-500 mt-1">{errors.author.message}</div>}
                            </label>

                            <label>
                                <label htmlFor="name" className='font-semibold mb-2 block'>Genre: </label>
                                <div className="flex gap-2 items-center justify-between">

                                    <Controller
                                        name="genres"
                                        control={control}
                                        render={({ field: { onChange, value } }) => (
                                            <Autocomplete
                                                className="w-full"
                                                multiple
                                                disablePortal
                                                options={genres}
                                                getOptionLabel={(option) => option.name}
                                                onChange={(_, value) => onChange(value)}
                                                isOptionEqualToValue={(option, value) => option._id === value._id}
                                                value={value}
                                                filterOptions={(options) => options}
                                                onInputChange={(_, value) => debouncedFetchGenresOptions(value)}
                                                renderInput={(params) => (
                                                    <TextField {...params} placeholder="Select Genres" variant="outlined" />
                                                )}
                                            />
                                        )}
                                    />

                                </div>
                                {errors.genres && <div className=" text-red-500">{errors.genres.message}</div>}

                            </label>

                            <label className='flex flex-col gap-2'>
                                <label htmlFor="name" className='font-semibold'>Release date: </label>
                                <Controller
                                    name="releaseDate"
                                    control={control}
                                    render={({ field: { onChange } }) => (
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DatePicker onChange={(newValue) => onChange(newValue)} defaultValue={dayjs(new Date(releaseDate))} />
                                        </LocalizationProvider>
                                    )} />
                                {errors.releaseDate && <div className=" text-red-500">{errors.releaseDate.message}</div>}

                            </label>

                            <button className={'btn bg-secondary  btn-md w-20 mt-8' + (isSubmitting ? ' btn-disabled' : '')}>Update</button>
                        </form>
                    </ul>
                </div>
            </div>
        </div>
    )
}

