import express from "express"
import { configDotenv } from "dotenv";
import userRouter from "./routes/user.routes.js";
import connectToDB from "./db/db.js";
import cookieParser from "cookie-parser";
import captainRouter from "./routes/captain.routes.js"

const app=express();
configDotenv()
connectToDB();

// Parses JSON data (from API requests with 'Content-Type: application/json')
app.use(express.json());
// Parses URL-encoded form data (from <form> submissions)
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

app.use("/users",userRouter);
app.use("/captains",captainRouter);

app.get("/",(req,res)=>{
  res.send("Hello World")
})

export default app;