import React, { useState } from "react";
import businessImg from "../../../assets/business.png";
import COVIDTrustBadge from "../COVIDTrustBadge";
import MapContainer from "../MapContainer";
import { Business } from "./BusinessProfileView";

type BusinessProfileTopProps = {
  profile: Business;
};

export default function BusinessProfileTop({
  profile,
}: BusinessProfileTopProps) {
  return (
    <div className="BusinessProfileTop">
      <h1>Business Profile</h1>
      <div className="profile">
        <div className="profile-row">
          <img className="mr-3" src={businessImg} />
          <div className="info">
            <span>{profile.name}</span>
            <span>{profile.id}</span>
          </div>
        </div>
        <span>{profile.description}</span>
        <span>Address: {profile.address}</span>
      </div>
      <div className="map">
        <MapContainer
          onSelect={() => {}}
          markers={[
            {
              name: profile.name,
              id: profile.id,
              lat: profile.location.lat,
              lng: profile.location.lng,
            },
          ]}
          mapCenter={profile.location}
          selected={""}
        />
      </div>
    </div>
  );
}
