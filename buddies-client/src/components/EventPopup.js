import { Popup } from "react-map-gl";

export default function EventPopup({ currentEvent, togglePopup }) {
  return (
    <Popup
      latitude={currentEvent.location[1]}
      longitude={currentEvent.location[0]}
      closeButton={false}
      closeOnClick={true}
      onClose={() => togglePopup(false)}
      offsetTop={-20}
      offsetLeft={10}
      className="flex rounded-md z-10"
    >
      <div className="mt-3">
        <p className="">{currentEvent.name}</p>
        <p>{currentEvent.date}</p>
        <p>{currentEvent.activity}</p>
      </div>
    </Popup>
  );
}
