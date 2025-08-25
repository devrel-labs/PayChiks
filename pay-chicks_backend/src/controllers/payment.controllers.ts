import { Request, Response } from "express";
import prisma from "../utils/prismaClient";


export const handlePayChickMoneyTransfer = async (req: Request, res: Response) => {
    try {
        const amount = parseInt(req.query.amount as string);
        // @ts-ignore
        const senderId = req.accountid;
        const receiverId = parseInt(req.body.receiverId as string);
        if (!senderId || !receiverId || !amount || amount <= 0 ) {
            return res.status(400).json({
                error: "Invalid transfer details"
            })
        }

        if (senderId === receiverId ) {
            return res.status(400).json({
                error: "Sender and receiver cannot be same"
            })
        }

        // fetch sender and receiver accounts
        const senderAccount = await prisma.accounts.findUnique({
            where: {
                accountNumber: senderId
            }
        })

        const receiverAccount = await prisma.accounts.findUnique({
            where: {
                accountNumber: receiverId
            }
        })

        // checking are the accounts exist
        if (!senderAccount || !receiverAccount) {
            return res.status(400).json({
                error: "Sender or receiver not found"
            })
        }

        if (senderAccount.balance < amount) {
            return res.status(400).json({
                error: "Insufficient balance"
            })
        }

        // perform transcations
        const [updatedSender, updatedReceiver] = await prisma.$transaction([
            prisma.accounts.update({
                where: {
                    accountNumber: senderId
                },
                data: {
                    balance: senderAccount.balance - amount
                }
            }),

            prisma.accounts.update({
                where: {
                    accountNumber: receiverId,
                },
                data: {
                    balance: receiverAccount.balance + amount
                }
            })
        ]);

        return res.status(200).json({
            message: "Money transferred successfully",
            sender: updatedSender,
            receiver: updatedReceiver
        })


    } catch(e) {
        console.error("error: ", e);
        return res.status(500).json({
            error: "Internal server error"
        })
    }
    


}

export const handlePayChickAddMoney = async (req: Request, res: Response) => {

}