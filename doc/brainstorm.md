# Brainstorm

Ideas:

- Build an app for local businesses and hospitals to work together
- Lets users also get verified
- Verify that places are safe to go to
- Lets users verify that they have been tested and that they are safe

Hospitals:

- Give information about available testing sites
  - Includes location, date, and time
- Verifies after users get tested
- Verifies that all employees at a local business has gotten tested

Business

- Add a list of users to their business
- Verify that they are a safe to go to

Users:

- Keep track of COVID tests
- Lets someone see their COVID test history
- Indicator for if they are considered 'safe'


## Website layout

Homepage
- Advertise what this product is
- Who it can be used for
- Sign in/Sign up

Sign in/Sign up page
- Users can sign up using an email and password
- When signing up, users can optionally select to be a business owner or hospital administrator

Hospitals
- Hospitals have a profile page, where they can edit information about their hospital
  - Their location, what times they are open
- Hospitals can add or update test results for users
- 

Users
- Can get test results from the hospital
- Gets a badge 



## API Specs
```
Coordinate: {
  lat: number;
  lng: number;
};
TestResult: "positive" | "negative";
Test: {
  id: string;
  date: Date;
  result: TestResult;
  userID: string;
  hospitalID: string;
}
UserBase: {
  id: string;
  name: string;
  address: string;
  businessID: string;
  hospitalID: string;
}
UserLim: UserBase & {
  lastTest: Test;
}
UserFull: UserBase & {
  tests: Test[];
}
Business: {
  id: string;
  name: string;
  address: string;
  description: string;
  owner: string;
  location: Coordinate;
  employees: string[];
}
HospitalBase: {
  id: string;
  name: string;
  owner: string;
  location: Coordinate;
  testSchedule: string;
}
HospitalLim: HospitalBase & {
  numTests: number;
};
HospitalFull: HospitalBase & {
  tests: Test[];
}
AllHospital: {
  hospitals: HospitalLim
}
AllBusiness: {
  businesses: BusinessLim
}

SignupParams: {
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
}
LoginParams: {
  username: string;
  password: string;
}
LoginInfo: {
  userID: string;
  token: string;
}
```
```
POST /api/signup
Params: SignupParams
Result: LoginInfo

POST /api/login
Params: LoginParams
Result: LoginInfo

GET /api/user/info/:username
Result: UserLim

GET /api/user/info/:username?token=TOKEN
Result: UserFull | UserLim (if invalid)

GET /api/business/:id/info
Result: Business

GET /api/hospital/:id/info
Result: HospitalLim

GET /api/business/all
Result: AllBusiness

POST /api/business/:id/employee?token=TOKEN
Params: {
  userID: string;
}
Result: Status

DELETE /api/business/:id/employee?token=TOKEN
Params: {
  userID: string;
}
Result: Status

GET /api/hospital/:id/info?token=TOKEN
Result: HospitalFull | HospitalLim (if invalid)

GET /api/hospital/all
Result: AllHospital

PATCH /api/hospital/:id/update?token=TOKEN
Params: {
  testSchedule?: string;
}
Result: HospitalFull

POST /api/hospital/test?token=TOKEN
Params: {
  date: Date (string);
  userID: string;
  result: TestResult;
}
Result: Status

```