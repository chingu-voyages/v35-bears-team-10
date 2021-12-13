export default function MapHeader(props) {
  return (
    <header className="my-3 flex">
      <div className="flex justify-center items-center w-5/6">
        <button
          className="w-1/2 bg-yellow-400 text-white font-bold"
          onClick={props.handleDropPin}
        >
          Drop location Pin
        </button>
      </div>
    </header>
  );
}
