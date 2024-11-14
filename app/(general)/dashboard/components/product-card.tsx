
'use client'

import { IRecord } from '@/app/models/definitions/IRecord'
import React, { useContext } from 'react'
import EditProduct from './edit-product'
import { IAuthor } from '@/app/models/definitions/IAuthor'
import { IUnits } from '@/app/models/definitions/IUnits'
import { IGenres } from '@/app/models/definitions/IGenres'
import { fetchAuthors, fetchGenres, fetchUnits } from '@/app/lib/data'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import { Context } from './dashboard-wrapper'
import { deleteRecord } from '@/app/lib/actions'


interface ProductCardProps {
  product: IRecord
}

export default function ProductCard({ product }: ProductCardProps) {
  const { image, name, author, price, createdAt, _id } = product
  const { push } = useRouter()
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const drawer = useContext(Context)


  const onEdit = () => {

    const params = new URLSearchParams(searchParams);
    params.set('productID', _id);

    push(`${pathname}?${params.toString()}`);

    if (drawer)
      drawer.current!.checked = true

  };


  return (
    <tr>
      <td>
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="mask mask-squircle h-12 w-12">
              <img
                src={image}
                alt="Product image" />
            </div>
          </div>
          <div>
            <div className="font-bold">{name}</div>
          </div>
        </div>
      </td>
      <td>
        {price ? price + 'usd' : '-'}
      </td>
      <td>
        {author.name}
      </td>
      <td>
        {new Date(createdAt).toDateString()}
      </td>
      <td>

        <button className="btn btn-ghost btn-xs" onClick={() => onEdit()}>edit</button>
        <button className="btn btn-ghost btn-xs" onClick={() => deleteRecord(_id)}> detele</button>
      </td>
    </tr>
  )
}
