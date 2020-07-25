import express from "express";
import { database } from "../database";
import { Util } from "../util";
const { writeError, writeSuccess } = Util;
const router = express.Router();

type UserID = {
  userID: string;
};

router.get("/api/business/:id/info", (req, res) => {
  const { id } = req.params;

  const business = database.businesses.get(id);
  if (business === undefined) {
    return writeError(res);
  }
  res.json({
    id: business.id,
    name: business.name,
    address: business.address,
    description: business.description,
    owner: business.owner,
    location: business.location,
    employees: business.employees,
  });
});

router.post("/api/business/:id/employee", (req, res) => {
  const { id } = req.params;
  const { token } = req.query;
  const data = req.body as UserID;
  console.log(id, token, data);
  if (typeof token !== "string") return writeError(res);

  const business = database.businesses.get(id);
  if (business === undefined) return writeError(res);

  const user = database.users.get(data.userID);
  if (user === undefined) return writeError(res);

  business.employees.push(data.userID);
  res.json({
    employees: business.employees,
  });
});

router.delete("/api/business/:id/employee", (req, res) => {
  const { id } = req.params;
  const { token } = req.query;
  const data = req.body as UserID;
  if (typeof token !== "string") return writeError(res);

  const business = database.businesses.get(id);
  if (business === undefined) return writeError(res);

  const index = business.employees.indexOf(data.userID);
  if (index !== -1) business.employees.splice(index, 1);
  res.json({
    employees: business.employees,
  });
});

router.get("/api/business/all", (req, res) => {
  const iterable = database.businesses.values();
  const businesses = Array.from(iterable).map((b) => ({
    id: b.id,
    name: b.name,
    address: b.address,
    description: b.description,
    owner: b.owner,
    location: b.location,
    employees: b.employees,
  }));

  res.json({
    businesses,
  });
});

export { router as businessRouter };
