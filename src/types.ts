export type Coordinate = {
  lat: number;
  lng: number;
};
export type TestResult = "positive" | "negative";
export type Test = {
  id: string;
  date: Date;
  result: TestResult;
  hospitalID: string;
  userID: string;
};
export type LoginInfo = {
  username: string;
  password: string;
  token: string;
};
export type User = {
  id: string;
  name: string;
  address: string;
  login: LoginInfo;
  healthOrgID: string;
  tests: Test[];
  businessID?: string;
  hospitalID?: string;
};
export type Business = {
  id: string;
  name: string;
  address: string;
  description: string;
  owner: string;
  location: Coordinate;
  employees: string[];
};
export type Hospital = {
  id: string;
  name: string;
  owner: string;
  location: Coordinate;
  testSchedule: string;
  test: Test[];
};
