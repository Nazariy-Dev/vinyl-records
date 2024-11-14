'use client'

import { usePathname, useRouter } from "next/navigation";

export default function Sort({ className = "select select-bordered w-full max-w-max bg-primary" }: { className?: string }) {
    const { push } = useRouter();
    const pathName = usePathname();


    const handleSort = (term: string) => {
        const params = new URLSearchParams();
        if (term) {
            params.set('sortingOption', term);
        } else {
            params.delete('sortingOption');
        }
        push(`${pathName}?${params.toString()}`);
    };

    return (
        <select onChange={(e) => handleSort(e.target.value)} className={className}>
            <option disabled selected>Sort</option>
            <option value={"priceDescending"}>Sort: Price (Descending)</option>
            <option value={"priceAscending"}>Sort: Price (Ascending)</option>
            <option value={"dateAdded"}>Sort: Date added</option>
        </select>
    )
}
