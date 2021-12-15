import PlusImage from "../images/plus.png";

export default function MapHeader(props) {
  return (
    <header className="my-3 flex justify-center items-center absolute bottom-10 left-5 z-10">
      <div className="flex justify-center items-center w-5/6">
        <button className="" onClick={props.handleDropPin}>
          <img src={PlusImage} alt="plus" className="w-14 h-14 ml-2" />
        </button>
      </div>
    </header>
  );
}
