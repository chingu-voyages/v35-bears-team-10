import { useState, useMemo } from "react";
import ReactMapGL, { GeolocateControl, Marker, Popup } from "react-map-gl";

const events = [
  {
    name: "Event 1",
    date: "2021-12-31",
    location: [80.4039, 6.6886],
    activity: "party",
    userId: "1",
  },
  {
    name: "Event 2",
    date: "2021-12-31",
    location: [81.4039, 6.6886],
    activity: "drink",
    userId: "1",
  },
  {
    name: "Event 3",
    date: "2021-12-31",
    location: [80.4039, 7.6886],
    activity: "coffee",
    userId: "1",
  },
  {
    name: "Event 4",
    date: "2021-12-31",
    location: [80.4139, 7.7886],
    activity: "talk",
    userId: "1",
  },
  {
    name: "Event 5",
    date: "2021-12-31",
    location: [80.4049, 7.4886],
    activity: "walk",
    userId: "1",
  },
  {
    name: "Event 6",
    date: "2021-12-31",
    location: [80.5039, 7.3886],
    activity: "sport",
    userId: "1",
  },
];

const geolocateControlStyle = {
  right: 10,
  top: 10,
};

export default function Map() {
  const [viewport, setViewPort] = useState({
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 9,
  });

  const [showPopup, togglePopup] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);

  const markers = useMemo(
    () =>
      events.map((event) => (
        <Marker
          key={event.name}
          longitude={event.location[0]}
          latitude={event.location[1]}
        >
          <img
            src={`${event.activity}.png`}
            alt="party"
            width="40px"
            height="40px"
            onClick={() => {
              setCurrentEvent(event);
              togglePopup(true);
            }}
          />
        </Marker>
      )),
    [events]
  );

  return (
    <ReactMapGL
      {...viewport}
      onViewportChange={(viewport) => setViewPort(viewport)}
      mapboxApiAccessToken="pk.eyJ1Ijoic2hhZnJhemkiLCJhIjoiY2t3Y2V2cDd0MG9jZzJ1cWt0cTN4NjRrZyJ9.bAyu7dLgQogqZfn4SnzweQ"
      mapStyle="mapbox://styles/mapbox/streets-v11"
      width="100%"
      height="100vh"
    >
      <GeolocateControl
        style={geolocateControlStyle}
        positionOptions={{ enableHighAccuracy: true }}
        trackUserLocation={true}
        auto
      />
      {showPopup && (
        <Popup
          latitude={currentEvent.location[1]}
          longitude={currentEvent.location[0]}
          closeButton={true}
          closeOnClick={false}
          onClose={() => togglePopup(false)}
          offsetTop={0}
        >
          <div>
            <p>{currentEvent.name}</p>
            <p>{currentEvent.date}</p>
            <p>{currentEvent.activity}</p>
          </div>
        </Popup>
      )}
      {markers}
    </ReactMapGL>
  );
}
