const StatusFilter = ({ currentStatus, onStatusChange }) => {
  const statuses = [
    "All",
    "Pending",
    "Shipped",
    "Delivered",
  ];

  return (
    <div className="text-sm font-medium text-[#A8A8A8]">
      <nav className="flex justify-between py-4">
        {statuses.map((status) => (
          <button
            key={status}
            type="button"
            onClick={() => onStatusChange(status)}
            className={`flex-grow rounded-t p-6 text-center hover:bg-[#B2967510] focus:outline-none focus:ring-2 focus:ring-[#B29675] ${
              currentStatus === status
                ? "border-b-2 border-[#B29675] text-[#B29675]"
                : ""
            }`}
          >
            {status}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default StatusFilter;
