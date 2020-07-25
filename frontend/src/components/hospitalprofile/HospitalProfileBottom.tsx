import React from "react";
import COVIDTrustBadge from "../COVIDTrustBadge";

type HospitalProfileBottomProps = {};

export default function HospitalProfileBottom(
  props: HospitalProfileBottomProps
) {
  return (
    <div className="HospitalProfileBottom">
      <h2>Test Availability</h2>
      <p className="test-availability mb-3">Open from 12pm to 5pm every day</p>
      <div className="tests">
        <h2>Tests History</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>ID</th>
              <th>Date</th>
              <th>Result</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Bob</td>
              <td>bob</td>
              <td>12 days ago</td>
              <td className="text-success">Test Negative</td>
            </tr>
            <tr>
              <td>Kevin</td>
              <td>kevin</td>
              <td>12 days ago</td>
              <td className="text-danger">Test Positive</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
