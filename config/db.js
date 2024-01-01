import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/EduDealsDB");
        console.log("Successfully connected to Database.")
    } catch (error) {
        console.log(`Error connnecting to Database: ${error}`);
    }
}

export default connectDB;