import { Popup } from "react-map-gl";
import TalkImg from "../images/talk.png";

export default function EventPopup({ currentEvent, togglePopup }) {
  return (
    <Popup
      latitude={currentEvent.location[0]}
      longitude={currentEvent.location[1]}
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
            <p className="text-sm text-center mt-1 font-bold">John</p>
          </div>
          <div className="w-3/4">
            <p className="font-bold text-lg text-center">{currentEvent.name}</p>
          </div>
        </div>
        <hr className="mt-1 border-solid border-black"></hr>
        <div className="mt-1 text-center">
          <p>{currentEvent.date}</p>
          <p>{currentEvent.activity}</p>
        </div>
        <div className="flex justify-between text-2xl text-blue-500">
          <i className="fas fa-user-friends relative">
            <div className="absolute bottom-4 left-5 font-sans w-5 h-5 rounded-full bg-red-500 text-white text-xs flex justify-center items-center px-1 py-1">
              13
            </div>
          </i>

          <i className="fas fa-comments"></i>
        </div>
      </div>
    </Popup>
  );
}
