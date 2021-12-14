export default function MapHeader(props) {
  return (
    <header className="my-3 flex justify-center items-center">
      <div className="flex justify-center items-center w-5/6">
        <button
          className="w-1/6 bg-yellow-400 text-white font-bold px-4 py-2 rounded mt-2"
          onClick={props.handleDropPin}
        >
          Drop location Pin
        </button>
      </div>
    </header>
  );
}
