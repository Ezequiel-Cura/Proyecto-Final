import express, { Application } from "express";
import { connectDB } from "./db";

// Initializations
connectDB()
export const server: Application = express()

// Settings

server.set("port", process.env.PORT || 3000)