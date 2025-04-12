import express from "express"
import { configDotenv } from "dotenv";
import userRouter from "./routes/user.routes.js";
import connectToDB from "./db/db.js";
import cookieParser from "cookie-parser";
import captainRouter from "./routes/captain.routes.js"
import cors from "cors"
import rideRouter from "./routes/ride.routes.js"
import mapRouter from "./routes/maps.routes.js"

const app = express();
configDotenv()
connectToDB();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.options('*', cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

app.use("/maps", mapRouter);
app.use("/users", userRouter);
app.use("/captains", captainRouter);
app.use("/rides", rideRouter)

app.get("/", (req, res) => {
  res.send("Hello World")
})

export default app;
