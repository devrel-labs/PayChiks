import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";


export const handlePayChickUserAuthorization = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies?.sessiontoken;

    if (!token) {
        return res.status(401).json({
            message: "user unauthorized"
        })
    }

    const secret = process.env.JWT_SECRET as string;

    try {
        const decoded = jwt.verify(token, secret) as { id: number; accountId: number };
        // @ts-ignore
        req.accountid = decoded.accountid;
        next();

    } catch(e) {
        return res.status(403).json({
            message: "Invalid token",
            error: e
        })
    }

}