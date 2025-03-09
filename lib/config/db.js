import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://satvik2804:satvik2804@cluster0.wlbas.mongodb.net/blog-app')
    console.log('Database connected');
}