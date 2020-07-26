import React, { useState } from "react";
import userImg from "../../../assets/user.png";
import COVIDTrustBadge from "../COVIDTrustBadge";
import { User } from "./UserProfileView";

type UserProfileTopProps = {
  profile: User;
};

export default function UserProfileTop({ profile }: UserProfileTopProps) {
  const [resultExpanded, setResultExpanded] = useState(false);
  const badgeRes: "safe" | "sick" | "untested" =
    profile.tests.length === 0
      ? "untested"
      : profile.tests[profile.tests.length - 1].result === "positive"
      ? "sick"
      : "safe";

  return (
    <div className="UserProfileTop">
      <h1>My Profile</h1>
      <div className="profile">
        <div className="profile-row">
          <img className="mr-3" src={userImg} />
          <div className="info">
            <span>{profile.name}</span>
            <span>{profile.id}</span>
          </div>
        </div>
        <span>Address: {profile.address}</span>
        {profile.healthOrgID !== undefined && (
          <span>Health Card: {profile.healthOrgID}</span>
        )}
        {profile.businessID !== undefined && (
          <span>
            Owner of:{" "}
            <a href={"/business/" + profile.businessID}>{profile.businessID}</a>
          </span>
        )}
        {profile.hospitalID !== undefined && (
          <span>
            Administrator of:{" "}
            <a href={"/hospital/" + profile.hospitalID}>{profile.hospitalID}</a>
          </span>
        )}
      </div>
      <COVIDTrustBadge result={badgeRes} />
    </div>
  );
}
