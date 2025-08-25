import express from "express";
import { handlePayChickGetAllUsers } from "../controllers/open.user.controllers";

const router = express.Router();

router.get("/", handlePayChickGetAllUsers)

export default router;
