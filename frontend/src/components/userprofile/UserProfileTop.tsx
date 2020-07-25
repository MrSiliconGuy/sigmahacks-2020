import React, { useState } from "react";
import userImg from "../../../assets/user.png";
import COVIDTrustBadge from "../COVIDTrustBadge";

type UserProfileTopProps = {};

export default function UserProfileTop(props: UserProfileTopProps) {
  const [resultExpanded, setResultExpanded] = useState(false);
  return (
    <div className="UserProfileTop">
      <h1>My Profile</h1>
      <div className="profile">
        <div className="profile-row">
          <img className="mr-3" src={userImg} />
          <div className="info">
            <span>Bryan Chen</span>
            <span>123 Sesame Street</span>
          </div>
        </div>
        <span>Address: 123 Sesame Street</span>
      </div>
      <COVIDTrustBadge />
    </div>
  );
}
