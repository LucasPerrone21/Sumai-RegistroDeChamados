import  Express  from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoute from "./routes/userRoutes";
import authRoute from "./routes/authRoutes";
import unitRoutes from "./routes/unitRoutes";
import campusRoutes from "./routes/campusRoutes";
import workersRoute from "./routes/workers";
import worksRoute from "./routes/worksRoutes";
import { env } from "./enviroment/env";


const app = Express();
app.use(cors({
  origin: env?.APP_FRONTEND_URL,
  credentials: true
}));
app.use(cookieParser());
app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));



app.use("/user", userRoute);
app.use("/auth", authRoute);
app.use("/unit", unitRoutes);
app.use("/campus", campusRoutes);
app.use("/workers", workersRoute);
app.use("/works", worksRoute);

app.get("/", (req, res) => {
  res.send("Hello World");
})


app.listen(env?.APP_PORT, () => {
  console.log(`Server is running on port ${env?.APP_PORT}`);
})