import express, { Response } from "express";
import { database } from "../database";
import { Util } from "../util";
import { Test } from "../types";
const { writeError, writeSuccess } = Util;
const router = express.Router();

router.get("/api/user/:id/info", (req, res) => {
  const { id } = req.params;
  const { token } = req.query;
  const user = database.users.get(id);
  if (!user) return writeError(res);
  if (user.login.token === token) {
    res.json({
      id: user.id,
      name: user.name,
      address: user.address,
      businessID: user.businessID,
      hospitalID: user.hospitalID,
      tests: [user.tests[user.tests.length]],
    });
  } else {
    res.json({
      id: user.id,
      name: user.name,
      address: user.address,
      healthOrgID: user.healthOrgID,
      businessID: user.businessID,
      hospitalID: user.hospitalID,
      tests: user.tests,
    });
  }
});

export { router as userRouter };
