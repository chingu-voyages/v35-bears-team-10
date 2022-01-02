import { useState, useMemo, useRef, useCallback, useEffect } from "react";
import MapGL, { GeolocateControl, Marker } from "react-map-gl";
import Geocoder from "react-map-gl-geocoder";
import axios from "axios";

import Pin from "./Pin";

import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import MapHeader from "./MapHeader";
import AddEventForm from "./AddEventForm";
import EventPopup from "./EventPopup";
import EventAddPopup from "./EventAddPopup";

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

  const [isOpen, setIsOpen] = useState(false);
  const [eventMarkers, setEventMarkers] = useState([]);

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
    togglePopup(false);
  };

  useEffect(() => {
    axios.get("http://localhost:8000/api/events").then((response) => {
      setEventMarkers(response.data);
    });
  }, []);

  const markers = useMemo(
    () =>
      eventMarkers.map((event) => (
        <Marker
          key={event._id}
          longitude={event.location[1]}
          latitude={event.location[0]}
          offsetTop={-20}
          offsetLeft={-10}
          className="z-0 bg-blue-300 flex justify-center items-center px-2 py-2 rounded-full border-2 border-black"
        >
          <img
            src={`${event.activity}.png`}
            alt={event.activity}
            width="30px"
            height="30px"
            onClick={() => {
              setCurrentEvent(event);
              togglePopup(true);
            }}
          />
        </Marker>
      )),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [eventMarkers]
  );

  return (
    <div className="relative flex flex-col justify-center items-center">
      {!isOpen && <MapHeader handleDropPin={handleDropPin} />}
      <AddEventForm
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        location={marker}
        setEventMarkers={setEventMarkers}
      />
      <MapGL
        ref={mapRef}
        {...viewport}
        onViewportChange={(viewport) => setViewPort(viewport)}
        mapboxApiAccessToken="pk.eyJ1Ijoic2hhZnJhemkiLCJhIjoiY2t3Y2V2cDd0MG9jZzJ1cWt0cTN4NjRrZyJ9.bAyu7dLgQogqZfn4SnzweQ"
        mapStyle="mapbox://styles/mapbox/streets-v11"
        width="100%"
        height="99vh"
      >
        {!isOpen && (
          <Marker
            longitude={marker.longitude}
            latitude={marker.latitude}
            offsetTop={-20}
            offsetLeft={-10}
            draggable
            onDragStart={onMarkerDragStart}
            onDrag={onMarkerDrag}
            onDragEnd={onMarkerDragEnd}
            className="z-10"
          >
            <Pin size={30} />
          </Marker>
        )}
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
          <EventPopup currentEvent={currentEvent} togglePopup={togglePopup} />
        )}
        {showEventPinDropPopup && (
          <EventAddPopup
            marker={marker}
            setShowEventPinDropPopup={setShowEventPinDropPopup}
            setIsOpen={setIsOpen}
          />
        )}
        {markers}
      </MapGL>
    </div>
  );
}
