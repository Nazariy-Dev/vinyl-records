import Link from 'next/link'
import { faHome} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fetchGenres } from '@/app/lib/data';

const links = [
    "Alternative Rock",
    "Alternative/Indie",
    "Art Rock",
    "Dance",
    "Dance Pop",
    "Electronic",
    "Hard Rock",
    "Hip Hop",
    "Indie Folk",
    "Metal",
    "Pop",
    "R&B",
    "Reggae",
    "Rock",
    "Soul",
]

export default async function NavLinks() {
    const genres = await fetchGenres('')

    return (
        <>
            <Link className='hover:text-accent flex items-center' href={'../'}>
                <FontAwesomeIcon icon={faHome} className='mr-3 w-5'/>
                Popular relaeses
            </Link>
            {genres?.map((value, i) => <Link key={i} href={`../search/genre?genre=${value._id}&genreName=${value.name}`} className='hover:text-accent hover:border-b-2 border-accent transition-all'>{value.name}</Link>)}
        </>
    )
}
