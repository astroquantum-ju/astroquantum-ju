import mongoose from "mongoose";
import { DB_NAME } from '../constants.js';

const connectDB = async () => {
    try {
        const uri = `mongodb+srv://${encodeURIComponent(process.env.MONGODB_USERNAME)}:${encodeURIComponent(process.env.MONGODB_PASS)}@${encodeURIComponent(process.env.MONGODB_CLUSTER)}/${DB_NAME}`;
        const connectionInstance = await mongoose.connect(uri);

        console.log('MongoDB connected successfully');
        console.log('Connected to host:', connectionInstance.connection.host);
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1);
    }
};

export default connectDB;