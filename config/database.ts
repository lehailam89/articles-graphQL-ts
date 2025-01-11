import mongoose from "mongoose";

export const connect = async (): Promise<void> => {
    try{
        const mongoUrl = process.env.MONGO_URL;
        if (!mongoUrl) {
            throw new Error("MONGO_URL is not defined");
        }
        await mongoose.connect(mongoUrl);
        console.log("Database connected");
    } catch (error) {
        console.log("Connect Error!")
    }
}