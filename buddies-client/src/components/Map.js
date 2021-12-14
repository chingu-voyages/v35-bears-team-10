import { useState, useMemo, useRef, useCallback } from "react";
import MapGL, { GeolocateControl, Marker, Popup } from "react-map-gl";
import Geocoder from "react-map-gl-geocoder";

import Pin from "./Pin";

import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import MapHeader from "./MapHeader";

const eventMarkers = [
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

  const mapRef = useRef();

  const [showPopup, togglePopup] = useState(false);
  const [showEventPinDropPopup, setShowEventPinDropPopup] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);

  const handleViewportChange = useCallback(
    (newViewport) => setViewPort(newViewport),
    []
  );

  const handleGeocoderViewportChange = useCallback(
    (newViewport) => {
      const geocoderDefaultOverrides = { transitionDuration: 1000 };

      return handleViewportChange({
        ...newViewport,
        ...geocoderDefaultOverrides,
      });
    },
    [handleViewportChange]
  );
  const [marker, setMarker] = useState({
    latitude: 37.7577,
    longitude: -122.4376,
  });

  const [events, logEvents] = useState({});

  const onMarkerDragStart = useCallback((event) => {
    logEvents((_events) => ({ ..._events, onDragStart: event.lngLat }));
  }, []);

  const onMarkerDrag = useCallback((event) => {
    logEvents((_events) => ({ ..._events, onDrag: event.lngLat }));
    setShowEventPinDropPopup(false);
  }, []);

  const onMarkerDragEnd = useCallback((event) => {
    logEvents((_events) => ({ ..._events, onDragEnd: event.lngLat }));
    setMarker({
      longitude: event.lngLat[0],
      latitude: event.lngLat[1],
    });
    setShowEventPinDropPopup(true);
  }, []);

  const handleDropPin = () => {
    setMarker({
      longitude: viewport.longitude,
      latitude: viewport.latitude,
    });
    setShowEventPinDropPopup(false);
  };

  const markers = useMemo(
    () =>
      eventMarkers.map((event) => (
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [events]
  );

  return (
    <div>
      <MapHeader handleDropPin={handleDropPin} />
      <MapGL
        ref={mapRef}
        {...viewport}
        onViewportChange={(viewport) => setViewPort(viewport)}
        mapboxApiAccessToken="pk.eyJ1Ijoic2hhZnJhemkiLCJhIjoiY2t3Y2V2cDd0MG9jZzJ1cWt0cTN4NjRrZyJ9.bAyu7dLgQogqZfn4SnzweQ"
        mapStyle="mapbox://styles/mapbox/streets-v11"
        width="100%"
        height="100vh"
      >
        <Marker
          longitude={marker.longitude}
          latitude={marker.latitude}
          offsetTop={-20}
          offsetLeft={-10}
          draggable
          onDragStart={onMarkerDragStart}
          onDrag={onMarkerDrag}
          onDragEnd={onMarkerDragEnd}
        >
          <Pin size={30} />
        </Marker>
        <Geocoder
          mapRef={mapRef}
          onViewportChange={handleGeocoderViewportChange}
          mapboxApiAccessToken="pk.eyJ1Ijoic2hhZnJhemkiLCJhIjoiY2t3Y2V2cDd0MG9jZzJ1cWt0cTN4NjRrZyJ9.bAyu7dLgQogqZfn4SnzweQ"
          position="top-left"
        />
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
        {showEventPinDropPopup && (
          <Popup
            latitude={marker.latitude}
            longitude={marker.longitude}
            closeButton={true}
            closeOnClick={false}
            onClose={() => setShowEventPinDropPopup(false)}
            offsetTop={-20}
            offsetLeft={10}
            className="flex"
          >
            <div className="mt-3">
              <p className="font-bold">Confirm event location?</p>
              <div className="flex">
                <button className="bg-blue-400 w-1/2">YES</button>
                <button
                  onClick={() => {
                    setShowEventPinDropPopup(false);
                  }}
                  className="bg-red-400 w-1/2"
                >
                  DISMISS
                </button>
              </div>
            </div>
          </Popup>
        )}
        {markers}
      </MapGL>
    </div>
  );
}
