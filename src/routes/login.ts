import express from "express";
import { database } from "../database";
import { Util } from "../util";
import { User, Business, Coordinate, Hospital } from "../types";
import { stringify } from "querystring";
const { writeError, writeSuccess } = Util;
const router = express.Router();

type UserID = {
  userID: string;
};

type LoginInfo = {
  userID: string;
  token: string;
};

type SignupParams = {
  name: string;
  username: string;
  password: string;
  address: string;
  healthOrgID: string;
  businessInfo?: {
    id: string;
    name: string;
    address: string;
    description: string;
    location: Coordinate;
  };
  hospitalInfo?: {
    id: string;
    name: string;
    address: string;
    testSchedule: string;
    location: Coordinate;
  };
};

router.post("/api/signup", (req, res) => {
  const data = req.body as SignupParams;
  // Verifications
  // Must be at least 4 letters long
  if (data.username.length < 4) return writeError(res, "username-too-short");
  let found = false;
  database.users.forEach((x) => {
    if (x.id === data.username) found = true;
  });
  // Duplicate username
  if (found) return writeError(res, "username-exists");

  let business: Business | undefined;
  let hospital: Hospital | undefined;
  if (data.businessInfo) {
    if (data.businessInfo.id.length < 4)
      return writeError(res, "business-too-short");
    let found = false;
    database.businesses.forEach((x) => {
      if (x.id === data.businessInfo?.id) found = true;
    });
    if (found) return writeError(res, "business-not-found");
    business = {
      id: data.businessInfo.id,
      name: data.businessInfo.name,
      address: data.businessInfo.address,
      description: data.businessInfo.description,
      employees: [data.username],
      location: data.businessInfo.location,
      owner: data.username,
    };
  }
  if (data.hospitalInfo) {
    if (data.hospitalInfo.id.length < 4)
      return writeError(res, "hospital-too-short");
    let found = false;
    database.hospitals.forEach((x) => {
      if (x.id === data.hospitalInfo?.id) found = true;
    });
    if (found) return writeError(res, "hospital-not-found");
    hospital = {
      id: data.hospitalInfo.id,
      address: data.hospitalInfo.address,
      location: data.hospitalInfo.location,
      name: data.hospitalInfo.name,
      owner: data.username,
      testSchedule: data.hospitalInfo.testSchedule,
      tests: [],
    };
  }
  const user: User = {
    id: data.username,
    name: data.username,
    address: data.address,
    healthOrgID: data.healthOrgID,
    login: {
      username: data.username,
      password: data.password,
      token: Util.getToken(data.username, data.password),
    },
    tests: [],
    businessID: business?.id,
    hospitalID: hospital?.id,
  };
  database.users.set(user.id, user);
  if (business) {
    database.businesses.set(business.id, business);
  }
  if (hospital) {
    database.hospitals.set(hospital.id, hospital);
  }
  res.json({
    userID: user.id,
    name: user.name,
    token: user.login.token,
  });
});

type LoginParams = {
  username: string;
  password: string;
};

router.post("/api/login", (req, res) => {
  const data = req.body as LoginParams;
  console.log(data);
  let user: User | undefined;
  database.users.forEach((v) => {
    if (
      v.login.username === data.username &&
      v.login.password === data.password
    )
      user = v;
  });
  if (!user) return writeError(res, "incorrect-credentials");
  res.json({
    userID: user.id,
    name: user.name,
    token: user.login.token,
  });
});

export { router as loginRouter };
