import type { Response } from "express";
import crypto from "crypto";

export const Util = {
  mapToArr<K, V>(map: Map<K, V>): [K, V][] {
    const arr: [K, V][] = [];
    map.forEach((v, k) => {
      arr.push([k, v]);
    });
    return arr;
  },
  arrToMap<K, V>(arr: [K, V][]) {
    const map = new Map<K, V>();
    arr.forEach((x) => map.set(x[0], x[1]));
    return map;
  },
  writeError(res: Response<any>, message = "error") {
    res.status(400);
    res.json({ status: "error", message });
  },
  writeSuccess(res: Response<any>) {
    res.json({ status: "ok" });
  },
  generateUniqueID: (() => {
    let time = new Date().getTime();
    let counter = 0;
    return () => {
      const curTime = new Date().getTime();
      if (curTime === time) {
        counter++;
      } else {
        counter = 0;
        time = curTime;
      }
      return time.toString(36) + "-" + counter.toString(36);
    };
  })(),
  getToken(username: string, password: string) {
    // High tech login token
    return crypto
      .createHash("sha256")
      .update(username + password)
      .digest("base64");
  },
};
