import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: true,
    optionsSuccessStatus: 200,
    credentials: true,
  })
);

app.options(
  "*",
  cors({
    origin: true,
    optionsSuccessStatus: 200,
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());

//Routes
import userRouter from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js"
import jobsRoute from "./routes/job.route.js"
import applicationRoute from './routes/application.route.js'


//routes declaration
app.use("/api/v1/users", userRouter);

app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobsRoute);
app.use("/api/v1/application", applicationRoute )

export { app };
