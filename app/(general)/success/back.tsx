'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';


export default function Back() {
    const { push } = useRouter();


    return (
        <div className='px-4 py-2 items-center btn justify-start inline' onClick={() => push("../")}>
            <FontAwesomeIcon icon={faArrowLeft} width={10}></FontAwesomeIcon>
            <button className='ml-2' >Back to shop</button>
        </div>
    )
}
