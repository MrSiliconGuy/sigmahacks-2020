import React, { useRef, useState, useEffect } from "react";
import {
  GoogleApiWrapper,
  GoogleAPI,
  Map,
  Marker,
  InfoWindow,
} from "google-maps-react";
import { Container, Row, Col } from "react-bootstrap";
import { webfetch } from "../../request";

type MapViewProps = {};

type HospitalType = {
  name: string;
  id: string;
  address: string;
  location: {
    lat: number;
    lng: number;
  };
};

type BusinessType = {
  name: string;
  id: string;
  address: string;
  location: {
    lat: number;
    lng: number;
  };
};

export default function MapView(props: MapViewProps) {
  const [hospitals, setHospitals] = useState([] as HospitalType[]);
  const [businesses, setBusinesses] = useState([] as HospitalType[]);
  const [selected, setSelected] = useState(null as string | null);

  useEffect(() => {
    (async () => {
      const res = await webfetch.get("/api/hospital/all");
      const res2 = await webfetch.get("/api/business/all");
      if (res.status === 400) return;
      if (res2.status === 400) return;
      const data = res.data as {
        hospitals: {
          id: string;
          name: string;
          owner: string;
          address: string;
          location: {
            lat: number;
            lng: number;
          };
          testSchedule: string;
          numTests: number;
        }[];
      };
      setHospitals(data.hospitals);
      const data2 = res2.data as {
        businesses: {
          id: string;
          name: string;
          address: string;
          description: string;
          owner: string;
          location: {
            lat: number;
            lng: number;
          };
          employees: string;
        }[];
      };
      setBusinesses(data2.businesses);
    })();
  }, []);

  return (
    <Container fluid className="MapView">
      <Row noGutters className="h-100">
        <Col md={7} className="map-col-1">
          <MapContainer
            selected={selected}
            onClick={(i) => setSelected(i)}
            locations={[
              ...hospitals.map((h) => ({
                id: h.id,
                lat: h.location.lat,
                lng: h.location.lng,
                name: h.name,
                type: "hospital" as "hospital",
              })),
              ...businesses.map((b) => ({
                id: b.id,
                lat: b.location.lat,
                lng: b.location.lng,
                name: b.name,
                type: "business" as "business",
              })),
            ]}
          />
        </Col>
        <Col md={5}>
          <MapList
            selected={selected ?? ""}
            hospitals={hospitals.map((h) => ({
              hightlight: false,
              address: h.address,
              id: h.id,
              link: "/hospital/" + h.id,
              name: h.name,
              onClick: () => setSelected(h.id),
            }))}
            businesses={businesses.map((b) => ({
              hightlight: false,
              address: b.address,
              id: b.id,
              link: "/business/" + b.id,
              name: b.name,
              onClick: () => setSelected(b.id),
            }))}
          />
        </Col>
      </Row>
    </Container>
  );
}

type MapListProps = {
  selected: string;
  hospitals: MapListItemProps[];
  businesses: MapListItemProps[];
};

function MapList({ hospitals, businesses, selected }: MapListProps) {
  return (
    <div className="MapList">
      <div className="inner-wrapper">
        <h2>Hospitals</h2>
        {hospitals.map((h) => (
          <MapListItem
            name={h.name}
            link={h.link}
            address={h.address}
            id={h.id}
            onClick={h.onClick}
            hightlight={h.id === selected}
          />
        ))}
        <h2>Local Businesses</h2>
        {businesses.map((b) => (
          <MapListItem
            name={b.name}
            link={b.link}
            address={b.address}
            id={b.id}
            onClick={b.onClick}
            hightlight={b.id === selected}
          />
        ))}
      </div>
    </div>
  );
}

type MapListItemProps = {
  id: string;
  hightlight: boolean;
  name: string;
  address: string;
  link: string;
  onClick: () => void;
};

function MapListItem(props: MapListItemProps) {
  return (
    <div className={"MapListItem" + (props.hightlight ? " highlight" : "")}>
      <div className="map-row">
        <span className="name mr-auto">{props.name}</span>
        <a className="mr-2" href="#" onClick={props.onClick}>
          Locate
        </a>
        <a href={props.link}>Profile</a>
      </div>
      <span>{props.address}</span>
    </div>
  );
}

type MapContainerProps = {
  google: GoogleAPI;
  locations: {
    type: "hospital" | "business";
    id: string;
    name: string;
    lat: number;
    lng: number;
  }[];
  selected: string;
  onClick: (id: string) => void;
};

const MapContainer = GoogleApiWrapper({ apiKey: "" })(
  (props: MapContainerProps) => {
    const [selectedMarker, setSelectedMarker] = useState(
      undefined as google.maps.Marker | undefined
    );
    const handleClick = (id: string, marker?: google.maps.Marker) => {
      setSelectedMarker(marker);
      props.onClick(id);
    };

    const selectedLoc = props.locations.find((x) => x.id === props.selected);

    return (
      <div className="map-wrapper">
        <Map
          google={props.google}
          initialCenter={{
            lat: selectedLoc?.lat ?? 43.87417,
            lng: selectedLoc?.lng ?? -79.25874,
          }}
          center={{
            lat: selectedLoc?.lat ?? 43.87417,
            lng: selectedLoc?.lng ?? -79.25874,
          }}
        >
          {props.locations.map((l) => (
            <Marker
              onClick={(p, m) => handleClick(l.id, m)}
              position={{ lat: l.lat, lng: l.lng }}
            ></Marker>
          ))}
          <InfoWindow
            map={{} as google.maps.Map}
            google={props.google}
            marker={selectedMarker!}
            visible={true}
          >
            <div>
              <p>{selectedLoc?.name}</p>
            </div>
          </InfoWindow>
        </Map>
      </div>
    );
  }
);
