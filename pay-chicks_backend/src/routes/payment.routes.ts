import express from "express";
import { handlePayChickMoneyTransfer } from "../controllers/payment.controllers";
import { handlePayChickUserAuthorization } from "../middlewares/user.middleware";

const router = express.Router();

router.post("/transactions/transfer", handlePayChickUserAuthorization, handlePayChickMoneyTransfer);

export default router;