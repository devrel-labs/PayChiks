
import express from "express";
import authRoutes from "./routes/auth.routes";
import paymentRoutes from "./routes/payment.routes";
import userRouter from "./routes/open.routes";
import cookieParser from "cookie-parser";

const app = express();
const PORT = parseInt(process.env.PORT ?? "8080", 10);

app.use(express.json())
app.use(cookieParser())

app.use("/api/v2/auth/", authRoutes);
app.use("/api/v2/payment/", paymentRoutes)
app.use("/api/v2/users", userRouter);

app.listen(PORT, () => {
    console.log(`Server is running on PORT : ${PORT}`);
})