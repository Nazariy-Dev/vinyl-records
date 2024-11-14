import React from 'react'
import SectionHeader from '../../components/SectionHeader'

export default function SongsSectons({ songs }: { songs: string[] }) {
  return (
    <div className='mb-14'>
      <SectionHeader>Songs in this record</SectionHeader>
      {songs.length > 0
        ? <div className='flex gap-2 flex-col'>
          {songs.map(val => <div>{val}</div>)}
        </div>
        : "We will add songs soon..."
      }
    </div>
  )
}
