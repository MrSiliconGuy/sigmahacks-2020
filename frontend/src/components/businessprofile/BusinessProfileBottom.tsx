import React from "react";
import COVIDTrustBadge from "../COVIDTrustBadge";

type BusinessProfileBottomProps = {};

export default function BusinessProfileBottom(
  props: BusinessProfileBottomProps
) {
  return (
    <div className="UserProfileBottom">
      <COVIDTrustBadge />
      <div className="employees">
        <h2>Employees</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Last Test</th>
              <th>Result</th>
              <th>Going to work</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Bob</td>
              <td>12 days ago</td>
              <td className="text-success">Test Negative</td>
              <td>Yes</td>
            </tr>
            <tr>
              <td>Kevin</td>
              <td>13 days ago</td>
              <td className="text-danger">Test Positive</td>
              <td>No</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
