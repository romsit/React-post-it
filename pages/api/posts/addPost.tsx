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
            return res.status(401).json({ message: "Please sign in to make a post" })
        const title: string = req.body.title

        // Get User
        const prismaUser = await prisma.user.findUnique({
            where: { email: session?.user?.email },
        })

        // check title
        if (title.length > 300)
            return res.status(403).json({ message: "Please write a shorter post." })
        if (title.length === 0)
            return res.status(403).json({ message: "Please do not leave this empty." })

        //Create post
        try {
            const result = await prisma.post.create({
                data: {
                    title,
                    userId: prismaUser.id
                }
            })
            res.status(200).json(result)
        } catch (err) {
            res.status(403).json({err: 'Error has occure whilst making a post.r'})
        }
    }
}