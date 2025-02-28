import express from "express";
import dotenv from "dotenv";
import connection from "./src/config/db.js";
import userRouter from "./src/routes/User.Routes.js";
import FromRouter from "./src/routes/Form.Routes.js";
import AdminRouter from "./src/routes/Admin.Routes.js";
import cors from "cors";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
app.use(
  cors({
    origin: "https://intern-frontend-five.vercel.app/",
    credentials: true,
  })
);
app.use(express.json());
connection()
  .then(() =>
    app.listen(PORT, () => {
      console.log(`Server is running on ${PORT}`);
    })
  )
  .catch((error) => {
    "Server is not Running Due to Some Connection Problem.";
  });

app.use("/", userRouter);
app.use("/form", FromRouter);
app.use("/admin", AdminRouter);
