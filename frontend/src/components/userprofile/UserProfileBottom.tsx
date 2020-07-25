import React from "react";

type UserProfileBottomProps = {};

export default function UserProfileBottom(props: UserProfileBottomProps) {
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
            <tr>
              <td>August 2nd, 2020</td>
              <td>12 days ago</td>
              <td className="text-success">Clean (Negative)</td>
            </tr>
            <tr>
              <td>August 1st, 2020</td>
              <td>12 days ago</td>
              <td className="text-success">Clean (Negative)</td>
            </tr>
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
