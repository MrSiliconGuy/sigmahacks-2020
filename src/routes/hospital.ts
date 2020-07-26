import express, { Response } from "express";
import { database } from "../database";
import { Util } from "../util";
import { Test } from "../types";
const { writeError, writeSuccess } = Util;
const router = express.Router();

type UserID = {
  userID: string;
};

router.get("/api/hospital/:id/info", (req, res) => {
  const { id } = req.params;
  const { token } = req.query;
  const hospital = database.hospitals.get(id);
  if (!hospital) return writeError(res);
  const user = database.users.get(hospital.id);
  if (user && user.login.token === token) {
    res.json({
      id: hospital.id,
      name: hospital.name,
      owner: hospital.owner,
      location: hospital.location,
      testSchedule: hospital.testSchedule,
      numTests: hospital.tests.length,
    });
  } else {
    res.json({
      id: hospital.id,
      name: hospital.name,
      owner: hospital.owner,
      location: hospital.location,
      testSchedule: hospital.testSchedule,
      tests: hospital.tests,
    });
  }
});

router.get("/api/hospital/all", (req, res) => {
  const iterable = database.hospitals.values();
  const hospitals = Array.from(iterable).map((x) => ({
    id: x.id,
    name: x.name,
    owner: x.owner,
    address: x.address,
    location: x.location,
    testSchedule: x.testSchedule,
    numTests: x.tests.length,
  }));
  res.json({
    hospitals,
  });
});

type UpdateParams = {
  testSchedule?: string;
};

router.patch("/api/hospital/:id/update", (req, res) => {
  const { token } = req.query;
  const { id } = req.params;
  const data = req.body as UpdateParams;
  const hospital = database.hospitals.get(id);
  if (!hospital) return writeError(res);
  const user = database.users.get(hospital.id);
  if (!user || user.login.token !== token) return writeError(res);

  if (data.testSchedule) hospital.testSchedule = data.testSchedule;
  res.json({
    id: hospital.id,
    name: hospital.name,
    owner: hospital.owner,
    location: hospital.location,
    testSchedule: hospital.testSchedule,
    tests: hospital.tests,
  });
});

type TestParams = {
  date: string;
  userID: string;
  result: "positive" | "negative";
};

router.post("/api/hospital/:id/test", (req, res) => {
  const { token } = req.query;
  const { id } = req.params;
  const data = req.body as TestParams;
  const hospital = database.hospitals.get(id);
  if (!hospital) return writeError(res, "invalid hospital");
  const user = database.users.get(data.userID);
  if (!user || user.login.token !== token) return writeError(res, "invalid-user");

  const testUser = database.users.get(data.userID);
  if (!testUser) return writeError(res);
  const test: Test = {
    id: Util.generateUniqueID(),
    hospitalID: hospital.id,
    result: data.result,
    userID: testUser.id,
    date: new Date(data.date),
  };
  hospital.tests.push(test);
  testUser.tests.push(test);
  res.json({
    id: hospital.id,
    name: hospital.name,
    owner: hospital.owner,
    location: hospital.location,
    testSchedule: hospital.testSchedule,
    tests: hospital.tests,
  });
});

export { router as hospitalRouter };
