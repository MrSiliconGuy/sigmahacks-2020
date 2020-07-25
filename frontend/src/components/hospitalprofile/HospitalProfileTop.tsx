import React, { useState } from "react";
import hospitalImg from "../../../assets/hospital.png";
import COVIDTrustBadge from "../COVIDTrustBadge";
import MapContainer from "../MapContainer";

type HospitalProfileTopProps = {};

export default function HospitalProfileTop(props: HospitalProfileTopProps) {
  return (
    <div className="HospitalProfileTop">
      <h1>Hospital Profile</h1>
      <div className="profile">
        <div className="profile-row">
          <img className="mr-3" src={hospitalImg} />
          <div className="info">
            <span>South West Hospital</span>
            <span>south-west-hospital</span>
          </div>
        </div>
        <span>Address: 123 Sesame Street</span>
      </div>
      <div className="map">
        <MapContainer onSelect={() => {}} markers={[]} selected={""} />
      </div>
    </div>
  );
}
