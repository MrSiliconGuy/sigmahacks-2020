import express from "express";
import bodyParser from "body-parser";
import path from "path";
import process from "process";
import {
  businessRouter,
  hospitalRouter,
  loginRouter,
  userRouter,
  placeRouter,
} from "./routes";

const app = express();
app.use(bodyParser.json());

// Routs
app.use(loginRouter);
app.use(userRouter);
app.use(businessRouter);
app.use(hospitalRouter);
app.use(placeRouter);

//Static files
app.use("/static/", express.static(path.join(__dirname, "../frontend/build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
});
const PORT = process.env.PORT ?? 8080;
app.listen(PORT, () => {
  console.log("Starting server on port", PORT);
});
