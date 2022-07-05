import mongoose from 'mongoose';
import dotenv from 'dotenv'
dotenv.config()
const { DB_CONN_STRING } = process.env;


export const connectDB = async () => {
    try {
      const db = await mongoose.connect(DB_CONN_STRING as string);
      console.log("Mongodb is connected to", db.connection.host);
    } catch (error) {
      console.error(error);
    }
  };