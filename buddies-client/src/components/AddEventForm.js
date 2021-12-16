import { useState } from "react";
import EventType from "./EventType";

export default function AddEventForm({ isOpen, setIsOpen }) {
  const [formEventType, setFormEventType] = useState();
  const [eventTypes, setEventTypes] = useState([
    { type: "party", isSelected: false },
    { type: "drink", isSelected: false },
    { type: "coffee", isSelected: false },
    { type: "talk", isSelected: false },
    { type: "walk", isSelected: false },
    { type: "sport", isSelected: false },
  ]);

  return (
    <div
      className="z-10 absolute w-full md:w-1/3 px-3 py-4 flex flex-col justify-center items-center"
      style={{ display: !isOpen && "none" }}
    >
      <div className="px-3 py-4 bg-yellow-300 w-full flex flex-col justify-center items-center rounded">
        <div className="flex w-full justify-end">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 cursor-pointer"
            viewBox="0 0 20 20"
            fill="currentColor"
            onClick={() => {
              setIsOpen(false);
            }}
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <h1 className="font-bold text-lg text-center">What's happening?</h1>
        <div className="gap-x-2 mt-4 flex justify-center items-center">
          {eventTypes.map((eventType) => {
            return (
              <EventType
                setFormEventType={setFormEventType}
                eventType={eventType}
                setEventTypes={setEventTypes}
              />
            );
          })}
        </div>
        <input
          type="text"
          placeholder="Date"
          className="bg-gray-200 px-3 py-1 rounded mt-3 w-2/3"
        ></input>
      </div>
    </div>
  );
}
