import express from "express";
import path from "path";
import process from "process";

const app = express();
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
});
app.use("/static/", express.static(path.join(__dirname, "../frontend/build")));

const PORT = process.env.PORT ?? 8080;
app.listen(PORT, () => {
  console.log("Starting server on port ", PORT);
});
