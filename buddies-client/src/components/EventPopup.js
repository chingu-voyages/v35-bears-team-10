import { useState, useEffect, useContext } from "react";
import { Popup } from "react-map-gl";
import moment from "moment";
import TalkImg from "../images/talk.png";
import { UserContext } from "../context/user-context";
import axios from "axios";
import { toast } from "react-toastify";

export default function EventPopup({ currentEventId, togglePopup }) {
  const [eventOwner, setEventOwner] = useState(null);
  const { user } = useContext(UserContext);
  const [eventData, setEventData] = useState(null);

  const getEventOwner = (event) => {
    axios
      .get(`http://localhost:8000/api/users/${event.userId}`)
      .then((response) => {
        setEventOwner(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getEventData = () => {
    axios
      .get(`http://localhost:8000/api/events/${currentEventId}`)
      .then((response) => {
        setEventData(response.data);
        getEventOwner(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleJoinEvent = () => {
    axios
      .put(`http://localhost:8000/api/events/join/${currentEventId}`, {
        user: user,
      })
      .then((response) => {
        setEventData(response.data);
        toast.success("You joined the event!");
      })
      .catch(({ response }) => {
        toast.error(response.data);
      });
  };

  useEffect(() => {
    getEventData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {eventData && (
        <Popup
          latitude={eventData.location[0]}
          longitude={eventData.location[1]}
          closeButton={false}
          closeOnClick={true}
          onClose={() => togglePopup(false)}
          offsetTop={-20}
          offsetLeft={10}
          className="flex rounded-md z-10"
        >
          <div className="w-300" style={{ width: "200px" }}>
            <div className="flex justify-around">
              <div className="w-1/4 flex flex-col justify-center items-center">
                <img
                  src={TalkImg}
                  alt="talk"
                  className="w-10 h-10 rounded-full border-blue-400 border-2"
                />
                {eventOwner && (
                  <p className="text-sm text-center mt-1 font-bold capitalize">
                    {eventOwner.username}
                  </p>
                )}
              </div>
              <div className="w-3/4">
                <p className="font-bold text-lg text-center capitalize">
                  {eventData.name}
                </p>
              </div>
            </div>
            <hr className="mt-1 border-solid border-black"></hr>
            <div className="mt-1 text-center">
              <p>{moment(eventData.date).format("DD-MMM-YYYY h:mm A")}</p>
              <p>{eventData.activity}</p>
            </div>
            <div className="flex justify-between text-2xl text-blue-500 mt-1">
              <i className="fas fa-user-friends relative">
                <div className="absolute bottom-4 left-5 font-sans w-5 h-5 rounded-full bg-red-500 text-white text-xs flex justify-center items-center px-1 py-1">
                  {eventData.guests.length}
                </div>
              </i>
              <button
                className="bg-blue-500 text-white text-sm rounded font-bold px-3 py-1"
                onClick={handleJoinEvent}
              >
                Join
              </button>

              <i className="fas fa-comments"></i>
            </div>
          </div>
        </Popup>
      )}
    </div>
  );
}
