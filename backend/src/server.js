import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import cookieParser from 'cookie-parser';

import authRoutes from './routes/auth.route.js';
import messageRoutes from './routes/message.route.js';
import connectDB from './db/index.js';

dotenv.config();

const app = express();
const __dirname = path.resolve();

const PORT = process.env.PORT || 1000;

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    app.get("*", (_, res) => {
        res.sendFile(path.join, "../frontend", "dist", "index.html");
    });
}

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`App is running on the port : ${PORT}`);
    })
}).catch((err) => {
    console.log("MongoDB connection Error", err);
    process.exit(1);
})