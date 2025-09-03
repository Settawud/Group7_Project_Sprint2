import React from "react";

const STATUS_STYLES = {
  shipped: {
    icon: "./icon/CheckCircle.svg",
    bgColor: "bg-green-50",
    borderColor: "border-green-600",
    textColor: "text-green-700",
    label: "Order Status",
  },
  inTransit: {
    icon: "./icon/Truck.svg",
    bgColor: "bg-yellow-50",
    borderColor: "border-yellow-600",
    textColor: "text-yellow-700",
    label: "Shipping Status",
  },
};

const OrderStatusCard = ({ type, statusText }) => {
  const style = STATUS_STYLES[type];

  return (
    <div
      className={`flex items-center gap-4 rounded-lg border-l-4 ${style.borderColor} ${style.bgColor} p-4 shadow-sm`}
    >
      <img src={style.icon} alt={style.label} className="h-6 w-6" />
      <div>
        <p className={`text-sm ${style.textColor}`}>{style.label}</p>
        <p className="text-lg font-semibold text-black">{statusText}</p>
      </div>
    </div>
  );
};

export default OrderStatusCard;
