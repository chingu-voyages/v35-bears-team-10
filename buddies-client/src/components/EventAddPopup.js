import { Popup } from "react-map-gl";

export default function EventAddPopup({
  marker,
  setShowEventPinDropPopup,
  setIsOpen,
}) {
  return (
    <Popup
      latitude={marker.latitude}
      longitude={marker.longitude}
      closeButton={false}
      closeOnClick={false}
      onClose={() => setShowEventPinDropPopup(false)}
      offsetTop={-20}
      offsetLeft={10}
      className="flex rounded-md z-20"
    >
      <div className="mt-3">
        <p className="font-bold">Confirm event location?</p>
        <div className="flex justify-around mt-3">
          <button
            className="bg-blue-400 px-2 py-1 text-white font-bold rounded"
            onClick={() => {
              setIsOpen(true);
              setShowEventPinDropPopup(false);
            }}
          >
            YES
          </button>
          <button
            onClick={() => {
              setShowEventPinDropPopup(false);
            }}
            className="bg-red-400 px-2 py-1 text-white font-bold rounded"
          >
            DISMISS
          </button>
        </div>
      </div>
    </Popup>
  );
}
