import  Express  from "express";
import { engine} from "express-handlebars";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoute from "./routes/userRoutes";
import authRoute from "./routes/authRoutes";
import unitRoutes from "./routes/unitRoutes";
import campusRoutes from "./routes/campusRoutes";
import workersRoute from "./routes/workers";
import worksRoute from "./routes/worksRoutes";
import viewRoutes from "./routes/viewRoutes";
import companyRoute from "./routes/companyRoutes";
import { env } from "./enviroment/env";




const app = Express();
app.use(cors({
  credentials: true
}));
app.use(cookieParser());
app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));

app.engine('handlebars', engine())
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');
app.use(Express.static(`${__dirname}/public`));





app.use("/user", userRoute);
app.use("/auth", authRoute);
app.use("/unit", unitRoutes);
app.use("/campus", campusRoutes);
app.use("/workers", workersRoute);
app.use("/works", worksRoute);
app.use("/company", companyRoute )
app.use("/", viewRoutes);


app.listen(env?.APP_PORT, () => {
  console.log(`Server is running on http://localhost:${env?.APP_PORT}`);
})