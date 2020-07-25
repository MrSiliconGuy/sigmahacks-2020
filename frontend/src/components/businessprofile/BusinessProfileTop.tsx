import React, { useState } from "react";
import businessImg from "../../../assets/business.png";
import COVIDTrustBadge from "../COVIDTrustBadge";
import MapContainer from "../MapContainer";

type BusinessProfileTopProps = {};

export default function BusinessProfileTop(props: BusinessProfileTopProps) {
  return (
    <div className="BusinessProfileTop">
      <h1>Business Profile</h1>
      <div className="profile">
        <div className="profile-row">
          <img className="mr-3" src={businessImg} />
          <div className="info">
            <span>Really Cool Flowers</span>
            <span>cool-flowers-business</span>
          </div>
        </div>
        <span>"The coolest flower business in town"</span>
        <span>Address: 123 Sesame Street</span>
      </div>
      <div className="map">
        <MapContainer onSelect={() => {}} markers={[]} selected={""} />
      </div>
    </div>
  );
}
