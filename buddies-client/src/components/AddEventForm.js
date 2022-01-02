import { useState, useContext } from "react";
import { UserContext } from "../context/user-context";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import EventType from "./EventType";
import axios from "axios";

export default function AddEventForm({
  isOpen,
  setIsOpen,
  location,
  setEventMarkers,
}) {
  const { user } = useContext(UserContext);
  const [formEventType, setFormEventType] = useState();
  const [eventTypes, setEventTypes] = useState([
    { type: "party", isSelected: false },
    { type: "drink", isSelected: false },
    { type: "coffee", isSelected: false },
    { type: "talk", isSelected: false },
    { type: "walk", isSelected: false },
    { type: "sports", isSelected: false },
  ]);

  const [title, setTitle] = useState("");
  const [date, setDate] = useState();

  const setDefaults = () => {
    setTitle("");
    setDate();
    setFormEventType();
    setEventTypes([
      { type: "party", isSelected: false },
      { type: "drink", isSelected: false },
      { type: "coffee", isSelected: false },
      { type: "talk", isSelected: false },
      { type: "walk", isSelected: false },
      { type: "sports", isSelected: false },
    ]);
  };

  const getIndex = (arr, element) => {
    return arr.indexOf(element);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:8000/api/events", {
        name: title,
        date: date,
        location: [location.latitude, location.longitude],
        activity: formEventType,
        userId: user._id,
      })
      .then((response) => {
        toast.success("Event added successfully!");
        setEventMarkers((prev) => {
          return [...prev, response.data];
        });
        setIsOpen(false);
        setDefaults();
      })
      .catch((error) => {
        toast.error("Unknown error occurred! Please try again.");
      });
  };

  const filterPassedTime = (time) => {
    const currentDate = new Date();
    const selectedDate = new Date(time);

    return currentDate.getTime() < selectedDate.getTime();
  };

  const handleClick = (type) => {
    setEventTypes((prev) => {
      const index = getIndex(prev, type);
      const newArr = prev.filter((element) => {
        return prev.indexOf(element) !== index;
      });
      newArr.forEach((element) => {
        return (element.isSelected = false);
      });
      newArr.splice(index, 0, { ...type, isSelected: true });
      return newArr;
    });

    setFormEventType(type.type);
  };

  return (
    <div
      className="z-20 absolute w-full md:w-1/3 px-3 py-4 flex flex-col justify-center items-center"
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
              setDefaults();
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
                key={eventType.type}
                isSelected={eventType.isSelected}
                handleClick={handleClick}
              />
            );
          })}
        </div>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(event) => {
            setTitle(event.target.value);
          }}
          className="bg-gray-200 px-3 py-1 rounded mt-3 w-2/3"
        ></input>

        <div className="w-2/3">
          <DatePicker
            selected={date}
            onChange={(date) => setDate(date)}
            className="bg-gray-200 px-3 py-1 rounded mt-3 w-full"
            showTimeSelect
            placeholderText="Date and Time"
            dateFormat="MMMM d, yyyy h:mm aa"
            minDate={new Date()}
            filterTime={filterPassedTime}
          />
        </div>
        <button
          onClick={handleSubmit}
          className="bg-blue-500 mt-5 px-3 py-2 text-white font-bold rounded hover:bg-blue-400"
        >
          Create Event
        </button>
      </div>
    </div>
  );
}
