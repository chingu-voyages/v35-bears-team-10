export default function EventType({ eventType, isSelected, handleClick }) {
  return (
    <div
      className={`${
        isSelected ? "bg-blue-500" : "bg-white"
      } shadow-lg flex justify-center items-center rounded-full px-2 py-2 cursor-pointer`}
    >
      <img
        src={`${eventType.type}.png`}
        alt={eventType.type}
        width="30px"
        height="30px"
        onClick={() => {
          handleClick(eventType);
        }}
      />
    </div>
  );
}
