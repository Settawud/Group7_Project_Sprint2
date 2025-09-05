import { useState } from "react";
import StatusFilter from "../components/organisms/StatusFilter";
import OrderCard from "../components/organisms/OrderCard";
import FilterOrder from "../components/organisms/FilterOrder";
import Sidebar from "../components/organisms/Sidebar";
import Navbar from "../components/organisms/Navbar";
import Footer from "../components/organisms/Footer";

const App = () => {
  const orders = [
    {
      id: "ORD001",
      date: "2025-08-01",
      status: "Processing",
      items: [
        {
          image: "./image/222.png",
          name: 'โต๊ะทำงานไม้สไตล์มินิมอล "เรียบง่าย"',
          dimensions: "120x60x75",
          color: "น้ำตาล",
          quantity: 1,
          price: 3890,
        },
        {
          image: "./image/222.png",
          name: 'โต๊ะทำงานไม้สไตล์มินิมอล "เรียบง่าย"',
          dimensions: "120x60x75",
          color: "น้ำตาล",
          quantity: 1,
          price: 3890,
        },
      ],
      total: 3890,
    },
    {
      id: "ORD002",
      date: "2025-08-05",
      status: "Completed",
      items: [
        {
          image: "./image/111.png",
          name: 'เก้าอี้ไม้ "อเนกประสงค์"',
          dimensions: "40x40x90",
          color: "ขาว",
          quantity: 2,
          price: 2598,
        },
      ],
      total: 2598,
    },
    {
      id: "ORD003",
      date: "2025-08-10",
      status: "Pending",
      items: [
        {
          image: "./image/333.png",
          name: "ตู้เก็บของสไตล์โมเดิร์น",
          dimensions: "80x40x180",
          color: "ดำ",
          quantity: 1,
          price: 4990,
        },
      ],
      total: 4990,
    },
  ];

  const [status, setStatus] = useState("All");

  const [filters, setFilters] = useState({
    orderNumber: "",
    keyword: "",
    status: "",
    dateFrom: "",
    dateTo: "",
  });

  const filteredOrders = orders.filter((order) => {
    if (status !== "All" && order.status !== status) return false;

    if (
      filters.orderNumber &&
      !order.id.toLowerCase().includes(filters.orderNumber.toLowerCase())
    ) {
      return false;
    }

    if (filters.keyword) {
      const matchItem = order.items.some((item) =>
        item.name.toLowerCase().includes(filters.keyword.toLowerCase())
      );
      if (!matchItem) return false;
    }

    if (
      filters.status &&
      filters.status !== "All" &&
      order.status !== filters.status
    ) {
      return false;
    }

    if (filters.dateFrom && order.date < filters.dateFrom) return false;
    if (filters.dateTo && order.date > filters.dateTo) return false;

    return true;
  });

  return (
    <div>
      <Navbar />
      <div className="flex flex-col lg:flex-row gap-8 mx-auto">
        <Sidebar />
        <main className="flex-1 p-4">
          <FilterOrder onFilterChange={setFilters} />
          <StatusFilter currentStatus={status} onStatusChange={setStatus} />

          {filteredOrders.length > 0 ? (
            filteredOrders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))
          ) : (
            <p className="text-center text-gray-500 mt-6">No orders found</p>
          )}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default App;
