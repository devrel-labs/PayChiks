import express from "express";
import { handlePayChickLoginUser, handlePayChicksRegisterUser } from "../controllers/auth.controllers";

const router = express.Router();

router.post("/signup", handlePayChicksRegisterUser)
router.post("/signin", handlePayChickLoginUser)

export default router;