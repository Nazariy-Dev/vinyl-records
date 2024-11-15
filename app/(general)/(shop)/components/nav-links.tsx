import Link from 'next/link'
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fetchGenres } from '@/app/lib/data';
import { IGenres } from '@/app/models/definitions/IGenres';
import { useContext } from 'react';
import { SideNavContext } from './layout-wrapper';

export default function NavLinks({ genres }: { genres: IGenres[] | undefined }) {
    const { setSideNavVisible } = useContext(SideNavContext)


    return (
        <>
            <Link onClick={() => setSideNavVisible(false)} className='hover:text-accent flex items-center' href={'../'}>
                <FontAwesomeIcon icon={faHome} className='mr-3 w-5' />
                Popular relaeses
            </Link>

                {genres?.map((value, i) => <li>
                    <Link onClick={() => setSideNavVisible(false)} key={i} href={`../search/genre?genre=${value._id}&genreName=${value.name}`} className='hover:text-accent hover:border-b-2 border-accent transition-all'>{value.name}</Link>
                </li>)}
        </>
    )
}
