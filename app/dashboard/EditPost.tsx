'use client'

import Image from "next/image"
import { useState } from "react"
import Toggle from "./Toggle"

type EditProps = {
    id: string
    avatar: string
    name: string
    title: string
    comments?: {
        id: string
        postId: string
        userId: string
    }[]
}

export default function EditPost({ avatar, name, title, comments, id }: EditProps) {
    // Toggle
    const [toggle, setToggle] = useState(false)
    return (
        <>
        <div className="bg-white my-8 p-8 rounded-lg">
            <div className="flex items-center gap-2">
                <Image width={32} height={32} src={avatar} alt="avatar" className="rounded-full"></Image>
                <h3 className="font-bold text-gray-700">{name}</h3>
            </div>
            <div className="my-8">
                <p className="break-all">{title}</p>
            </div>
            <div className="flex items-center gap-4">
                <p className="text-sm font-bold text-gray-700"> {comments?.length} Comments</p>
                <button className="text-sm font-bold text-red-500"> Delete</button>
            </div>
        </div>
        { toggle && <Toggle />}
        </>
    )
}