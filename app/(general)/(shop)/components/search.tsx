'use client';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';



export default function Search() {
    const searchParams = useSearchParams();
    const { push } = useRouter();

    const handleSearch = (term: string) => {
        const params = new URLSearchParams();
        params.set('page', '1');
        if (term) {
            params.set('query', term);
        } else {
            params.delete('query');
        }
        push(`/search/records?${params.toString()}`);
    };

    const onInput = (e: any) => {
        if (e.key != 'Enter')
            return
        if (e.target.value.length > 0) {
            handleSearch(e.target.value)
        } else if (e.target.value == 0) {
            push('/');
        }
    }

    return (
        <div className="flex py-2 px-4 rounded-full bg-primary items-center">
            <input onKeyUp={(e: any) => onInput(e)} type="text" className=" placeholder:text-black focus:outline-none bg-transparent" name="Search" placeholder="Search" id="" />
            <FontAwesomeIcon icon={faSearch} className="min-w-4" />
        </div>
    );
}
