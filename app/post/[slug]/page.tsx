'use client'

import AddComment from "../../components/AddComment"
import Post from "../../components/Post"
import { PostType } from "../../types/Post"
import { useQuery } from '@tanstack/react-query'
import axios from "axios"
import Image from "next/image"

type URL = {
    params: {
        slug: string
    }
}

const fetchDetails = async (slug: string) => {
    const response = await axios.get(`/api/posts/${slug}`)
    return response.data
}

export default function PostDetail(url: URL) {

    const { data, isLoading } = useQuery<PostType>({
        queryKey: ['detail-post'],
        queryFn: () => fetchDetails(url.params.slug)
    })
    if (isLoading) return "Loading.."
    return (
        <div>
            <Post
                id={data?.id}
                name={data?.user.name}
                avatar={data?.user.image}
                postTitle={data?.title}
                comments={data?.Comment} />

            <AddComment
                id={data?.id} />
            {data?.Comment?.map((comment) => (
                <div key={comment.id} className="my-6 bg-white p-8 rounded-md">
                    <div className="flex items-center gap-2">
                        <Image
                            width={24}
                            height={24}
                            src={comment.user?.image}
                            alt="avatar"
                            className="rounded-full"
                        />
                        <h3 className="font-bold">{comment?.user?.name}</h3>
                        <h2 className="tet-sm">{comment.createdAt}</h2>
                    </div>
                    <div className="py-4">{comment.message}</div>
                </div>
            ))}
        </div>
    )
}