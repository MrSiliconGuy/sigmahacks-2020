import { User, Business, Hospital } from "./types";
import path from "path";
import fs from "fs";
import { Util } from "./util";

type DatabaseType = {
  users: Map<string, User>;
  businesses: Map<string, Business>;
  hospitals: Map<string, Hospital>;
};
type DatabaseSerialized = {
  users: [string, User][];
  businesses: [string, Business][];
  hospitals: [string, Hospital][];
};

const defaultDatabase: DatabaseType = {
  users: new Map<string, User>(),
  businesses: new Map<string, Business>(),
  hospitals: new Map<string, Hospital>(),
};

// Very high tech database
const databaseFile = path.join(__dirname, "../database.json");

function serialize(database: DatabaseType): DatabaseSerialized {
  return {
    users: Util.mapToArr(database.users),
    businesses: Util.mapToArr(database.businesses),
    hospitals: Util.mapToArr(database.hospitals),
  };
}
function deserialize(database: DatabaseSerialized): DatabaseType {
  return {
    users: Util.arrToMap(database.users),
    businesses: Util.arrToMap(database.businesses),
    hospitals: Util.arrToMap(database.hospitals),
  };
}
function loadDatabase() {
  try {
    let buffer: Buffer;
    try {
      buffer = fs.readFileSync(databaseFile);
    } catch {
      console.log("Error reading from database.json. Using new database.");
      return defaultDatabase;
    }
    const text = buffer.toString("utf-8");
    const obj = JSON.parse(text) as DatabaseSerialized;
    const database = deserialize(obj);
    return database;
  } catch (error) {
    console.error(error);
    return defaultDatabase;
  }
}
function saveDatabase() {
  try {
    const obj = serialize(database);
    const text = JSON.stringify(obj, undefined, 2);
    fs.writeFileSync(databaseFile, text);
    console.log("Saving database.json");
  } catch (error) {
    console.error(error);
  }
}

export const database = loadDatabase();

setInterval(saveDatabase, 60 * 1000);

function onExit() {
  saveDatabase();
  process.exit();
}
process.on("SIGINT", onExit);
process.on("SIGUSR1", onExit);
process.on("SIGUSR2", onExit);
