import express from "express";
import path from "path";
import process from "process";

const app = express();
app.use("/static/", express.static(path.join(__dirname, "../frontend/build")));

app.get("/api/:id", (req, res) => {
  const { id } = req.params;
  res.json({ hello: "world" });
  console.log(id);
  console.log(req.query.session);
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
});
const PORT = process.env.PORT ?? 8080;
app.listen(PORT, () => {
  console.log("Starting server on port", PORT);
});
