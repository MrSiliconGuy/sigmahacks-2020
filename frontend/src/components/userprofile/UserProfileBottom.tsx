import React from "react";
import { User } from "./UserProfileView";

type UserProfileBottomProps = {
  profile: User;
};

export default function UserProfileBottom({ profile }: UserProfileBottomProps) {
  return (
    <div className="UserProfileBottom">
      <div className="test-history">
        <h3>COVID Test History</h3>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Elapsed</th>
              <th>Result</th>
            </tr>
          </thead>
          <tbody>
            {profile.tests.map((t) => (
              <tr>
                <td>{new Date(t.date).toDateString()}</td>
                <td>12 days ago</td>
                {t.result === "positive" ? (
                  <td className="text-danger">Sick (Negative)</td>
                ) : (
                  <td className="text-success">Safe (Positive)</td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="businesses">
        <h3>Businesses</h3>
        <table>
          <thead>
            <tr>
              <th>Business Name</th>
              <th>Business ID</th>
              <th>Date Joined</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Business Co</td>
              <td>business-name</td>
              <td>Sept 7th, 2019</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
