import type { NextApiRequest, NextApiResponse } from "next"
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../auth/[...nextauth]'
import prisma from '../../../prisma/client'


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "POST") {
        const session: any = await getServerSession(req, res, authOptions)
        if (!session)
            return res.status(401).json({ message: "Please sign in." })
        //Delete a Post
        try {
            const postId = req.body.id
            const result = await prisma.post.delete({
                where: {
                    id: postId
                }
            })
            return res.status(200).json(result)
        } catch (err) {
            res.status(403).json({ err: 'Error has occure whilst deleting a post.' })
        }
    }
}