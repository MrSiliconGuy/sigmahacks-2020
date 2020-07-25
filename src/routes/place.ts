import axios from "axios";
import express from "express";
import rateLimit from "express-rate-limit";
import queryString from "querystring";
import { Util } from "../util";
const { writeError } = Util;

const limiter = rateLimit({
  windowMs: 5000,
  max: 5,
});
const route = express.Router();
route.use("/api/place", limiter);

route.get("/api/place", async (req, res) => {
  const { q } = req.query;
  if (typeof q !== "string") return writeError(res);
  const url = new URL("https://nominatim.openstreetmap.org/search?format=json");
  url.searchParams.append("q", q);
  const httpRes = await axios.get(url.toString());
  const arr = httpRes.data as {
    lat: number;
    lon: number;
  }[];
  if (arr.length === 0) return writeError(res);
  res.send({
    lat: arr[0].lat,
    lng: arr[0].lon,
  });
});

export { route as placeRouter };
