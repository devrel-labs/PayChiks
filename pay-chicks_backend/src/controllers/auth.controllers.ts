import { Request, Response } from "express";
// import { Prisma, PrismaClient } from "@prisma/client"
import prisma from "../utils/prismaClient";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import { registerUserSchema } from "../validation/userSchema";

// const prisma = new PrismaClient();

// controllers/registerUser.ts
export const handlePayChicksRegisterUser = async (req: Request, res: Response) => {
  try {
    // 1. Validate request body using Zod validation
    const parsed = registerUserSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        message: "Validation failed",
        errors: parsed.error.flatten().fieldErrors,
      });
    }

    const { username, firstname, lastname, email, password, phone, address } = parsed.data;

    // 2. Check if username exists
    const existingUser = await prisma.user.findFirst({ where: {
      OR: [
        {email},
        {username},
        {phone}
      ]
    } });
    if (existingUser) {
      return res.status(409).json({ message: "Username already exists" });
    }

    // Optional: check email too
    const existingEmail = await prisma.user.findUnique({ where: { email } });
    if (existingEmail) {
      return res.status(409).json({ message: "Email already registered" });
    }

    // 3. Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. Save to DB
    const newUser = await prisma.user.create({
      data: {
        username,
        firstname,
        lastname,
        email,
        password: hashedPassword,
        phone,
        address,
      },
    });

    const account = await prisma.accounts.create({
      data: { 
        userId: newUser.Id
      }
    })

    const { password: _, ...userWithoutPassword } = newUser;

    // 5. Respond
    res.status(201).json({
      message: "User registered successfully",
      user: userWithoutPassword,
      accountId: account.accountNumber
    });
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const handlePayChickLoginUser = async (req: Request, res: Response) => {
    const JWT_SECRET: string = process.env.JWT_SECRET || "random";

    try {

        const { username, password } = req.body;

        const existingUser = await prisma.user.findUnique({
           where : {
             username: username
           },
           include: {
            account: true
           }
        })

        if (!existingUser) return res.status(401).json({
            message: "Inavlid username or password"
        })

        
        const isPasswordMatched = await bcrypt.compare(password, existingUser.password);
        console.log(isPasswordMatched)
        
        if (!isPasswordMatched) return res.status(401).json({
            message: "Inavlid username or password"
        })

        const JWT_TOKEN = jwt.sign({
            id: existingUser.Id,
            username: existingUser.username,
            accountid: existingUser.account?.accountNumber
        }, JWT_SECRET, {
            expiresIn: "7d"
        })

        res.cookie("sessiontoken", JWT_TOKEN, {
            httpOnly: false,
            secure: false,
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        })

        res.status(200).json({
            message: "Login successful",
            jwt_token: JWT_TOKEN,
            user: {
                id: existingUser.Id,
                username: existingUser.username,
                email: existingUser.email,
                accountId: existingUser.account?.accountNumber || null
            }
        })

    } catch(e) {
        console.error("Loign Error: ", e);
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}