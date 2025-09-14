import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const { MONGO_URI } = process.env;
        if (!MONGO_URI) throw new Error("MONGO_URI is not set");

        await mongoose.connect(process.env.MONGO_URI)
        console.log("✅ MongoDB connected")
    } catch (error) {
        console.log("❌ MongoDB connection Error", error)
        process.exit(1)
    }
}

export default connectDB;