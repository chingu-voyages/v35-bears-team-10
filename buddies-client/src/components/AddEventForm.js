export default function AddEventForm({ isOpen }) {
  return (
    <div
      className="z-10 absolute w-full md:w-1/3 px-3 py-4 flex flex-col justify-center items-center"
      style={{ display: !isOpen && "none" }}
    >
      <div className="px-3 py-4 bg-white w-full flex flex-col justify-center items-center rounded">
        <h1 className="font-bold text-lg text-center">What's happening?</h1>
        <input
          type="text"
          placeholder="Date"
          className="bg-gray-200 px-3 py-1 rounded mt-2"
        ></input>
      </div>
    </div>
  );
}
