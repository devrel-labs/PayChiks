import { Request, Response } from "express";
import prisma from "../utils/prismaClient";


export const handlePayChickGetAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await prisma.user.findMany({
            select: {
                Id: true,
                firstname: true,
                lastname: true,
                username: true,
                email: true,
                phone: true,
                address: true,
                isVerified: true,
                createdAt: true,
                updatedAt: true,
                account: true,
            },
        })

        if ( !users || users.length === 0 ) {
           return res.status(400).json({ message: "No users found" });
        }

        return res.status(200).json({
            message: "users fetched",
            data: users
        })

    } catch(e) {
        console.error("fetch error: ", e);
        return res.status(500).json( {error: "Internal Server Error"} );
    }
}