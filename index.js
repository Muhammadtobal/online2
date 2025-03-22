import express from "express";

import cors from "cors";
import dotenv from "dotenv";
import errorHnadler from "./middlewares/errorHandler.js";
import "express-async-errors";
import router from "./routes/allRoutes.js";
import morgan from "morgan";
import cookieParser from "cookie-parser"


dotenv.config();
const app = express();
app.use(express.json());
app.use(cors())
app.use(cookieParser())
app.use(morgan("tiny"));
const port = process.env.PORT || 4001;
if (process.env.NODE_ENV !== 'production') {
  app.listen(port, () => {
    console.log("Connected DB");
    console.log(`Server Running on ${port}`);
  });
}


app.use("/api", router);

app.use(errorHnadler);


export default app;