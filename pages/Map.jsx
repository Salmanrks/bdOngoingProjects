import { useState, useEffect, Fragment } from "react";
import "leaflet/dist/leaflet.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
  Popup,
  Tooltip,
} from "react-leaflet";
import { icon } from "leaflet";
import Link from "next/link";

const ICON = icon({
  iconUrl: "/marker.png",
});

export function ChangeView({ coords }) {
  const map = useMap();
  map.setView(coords, 12);
  return null;
}

export default function Map(props) {
  const [geoData, setGeoData] = useState(props.vals);

  const lat = parseFloat(geoData[7].location_coordinates.split(/[(,)]/)[1]);
  const lng = parseFloat(geoData[7].location_coordinates.split(/[(,)]/)[2]);

  const center = [lat, lng];

  return (
    <MapContainer
      center={center}
      zoom={12}
      style={{ height: "60vh", width: "90vw" }}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Fragment>
        {geoData.map((item, index) => {
          return (
            <Marker
              key={Math.random()}
              icon={ICON}
              position={[
                parseFloat(item.location_coordinates.split(/[(,)]/)[1]),
                parseFloat(item.location_coordinates.split(/[(,)]/)[2]),
              ]}
            >
              <Popup>
                <h2>
                  <span className="font-extrabold"> Project Name: </span>
                  {item.project_name}
                </h2>
                <h2>
                  <span className="font-extrabold"> Project Start Time: </span>
                  {item.project_start_time}
                </h2>
                <h2>
                  <span className="font-extrabold"> Category: </span>
                  {item.category}
                </h2>
                <h2>
                  <span className="font-extrabold"> Progress: </span>
                  {item.completion_percentage}
                </h2>
                <h2>
                  <Link
                    href={{
                      pathname: "/details",
                      query: {
                        cstate: index,
                      },
                    }}
                  >
                    View Details
                  </Link>
                </h2>
              </Popup>
              <Tooltip direction="top">
                <div>Click For Details</div>
              </Tooltip>
            </Marker>
          );
        })}
      </Fragment>
      <ChangeView coords={center} />
    </MapContainer>
  );
}
