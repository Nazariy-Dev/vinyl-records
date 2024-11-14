'use client'

import { Monofett } from "next/font/google";
import { faCartShopping, faBars } from '@fortawesome/free-solid-svg-icons';
import Search from "./search";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Suspense } from "react";

import Link from "next/link";
import useCart from "@/app/store/store";

const monforett = Monofett({ subsets: ["latin"], weight: ["400"] })


export default function Header() {

    const cart = useCart(state => state.cart);


    return (
        <header className="bg-opacity-90 backdrop-blur-md fixed w-full flex  text-black lg:pl-80 py-4 px-12  justify-between items-center bg-base-100 z-20">
            <FontAwesomeIcon className="lg:hidden mr-6" height={"30px"} icon={faBars}></FontAwesomeIcon>
            <div className={" hidden md:block flex-1 text-5xl" + " " + monforett.className}>Vinyl Records</div>
            <div className={"md:hidden flex-1 text-5xl" + " " + monforett.className}>VR</div>
            <Suspense>
                <Search />
            </Suspense>
            <Link href={"/cart"} className="relative flex items-center ml-[4%]">
                <FontAwesomeIcon icon={faCartShopping} className=" shrink-0 h-8" />
               {cart.length > 0 && <div className="flex items-center justify-center absolute -right-2 -bottom-2 rounded-full bg-red-500 text-white p-1">
                    {cart.length}
                </div>}
            </Link>
        </header>
    )
}
