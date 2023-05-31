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
        console.log(session)
        if (!session)
            return res.status(401).json({ message: "Please sign in." })

        //Get USer
        const prismaUser = await prisma.user.findUnique({
            where: { email: session?.user?.email }
        })

        //Add Comment
        try {
            const { title, postId } = req.body.data
            if (!title.length) {
                console.log(req.body.data)
                return res.status(401).json({ message: "Please enter some text" })
            }

            const result = await prisma.Comment.create({
                data: {
                    message: title,
                    userId: prismaUser?.id,
                    postId 
                }
            })
            res.status(200).json(result)
        } catch (err) {
            res.status(403).json({ err: 'Error has occure whilst making a post.' })
        }
    }
}