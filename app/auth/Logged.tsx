'use client'

import Image from "next/image"
import { signOut } from 'next-auth/react'
import Link from "next/link"

type User = {
    image: string
}

export default function Logged({ image }: User) {
    return (
        <li className="flex gap-8 items-center">
            <button onClick={() => signOut()} className="bg-gray-700 text-white text-sm py-2 px-6 rounded-md">
                Sign out
            </button>
            <Link href={"/dashboard"}>
                <Image width={64} height={64} src={image} alt="" priority className="w-14 rounded-full" />
            </Link>
        </li>
    )
}