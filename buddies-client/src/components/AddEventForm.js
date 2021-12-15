export default function AddEventForm({ isOpen }) {
  return (
    <div
      className="bg-white z-10 absolute w-1/2 md:w-1/3 px-3 py-4 flex flex-col justify-center items-center"
      style={{ display: !isOpen && "none" }}
    >
      <div className="">
        <h1 className="font-bold text-lg">What's happening?</h1>
        <input
          type="text"
          placeholder="Date"
          className="bg-gray-200 px-3 py-1 rounded"
        ></input>
      </div>
    </div>
  );
}
