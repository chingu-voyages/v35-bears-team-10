import { Marker } from "react-map-gl";
import Pin from "./Pin";

export default function EventMarkerPin({
  marker,
  onMarkerDrag,
  onMarkerDragStart,
  onMarkerDragEnd,
  showPin,
}) {
  return (
    <Marker
      longitude={marker.longitude}
      latitude={marker.latitude}
      offsetTop={-20}
      offsetLeft={-10}
      draggable
      onDragStart={onMarkerDragStart}
      onDrag={onMarkerDrag}
      onDragEnd={onMarkerDragEnd}
      className={`z-10 ${!showPin && "hidden"}`}
    >
      <Pin size={30} />
    </Marker>
  );
}
