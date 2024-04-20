import mongoose from "mongoose";
import { DBName } from "../constant.js";

const connectDB = async () => {
    try {
        const connectionString = await mongoose.connect(`${process.env.MONGODB_URI}/${DBName}`);
        console.log(`\n MONGOOSE CONNECTED! \n HOST :- ${connectionString.connection.host}`);
    } catch (error) {
        console.log("Error:- ", error);
        throw error;
    }
}
export default connectDB;