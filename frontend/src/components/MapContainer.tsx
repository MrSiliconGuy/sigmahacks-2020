import React from "react";
import {
  Map,
  GoogleAPI,
  GoogleApiWrapper,
  Marker,
  InfoWindow,
} from "google-maps-react";

type MapContainerProps = {
  google: GoogleAPI;
  mapCenter?: { lat: number; lng: number };
  markers: {
    type?: "normal" | "hospital" | "business";
    lat: number;
    lng: number;
    id: string;
    name: string;
  }[];
  selected: string;
  onSelect: (id: string) => void;
};

function MapContainer(props: MapContainerProps) {
  const selectedMarkerPos = props.markers.find((x) => x.id === props.selected);
  let marker: google.maps.Marker;
  if (selectedMarkerPos) {
    marker = new google.maps.Marker({
      position: {
        lat: selectedMarkerPos.lat,
        lng: selectedMarkerPos.lng,
      },
    });
  }
  return (
    <div className="MapContainer">
      <Map google={props.google} initialCenter={props.mapCenter}>
        {props.markers.map((m) => (
          <Marker />
        ))}
        <InfoWindow
          map={{} as google.maps.Map}
          google={props.google}
          marker={marker!}
          visible={true}
        >
          <div>
            <p>A Hospital</p>
          </div>
        </InfoWindow>
      </Map>
    </div>
  );
}

export default GoogleApiWrapper({
  apiKey: "",
})(MapContainer);
