import { useEffect, useState } from "react";
import axios from "axios";

import StatusFilter from "../components/organisms/StatusFilter";
import OrderCard from "../components/organisms/OrderCard";
import FilterOrder from "../components/organisms/FilterOrder";
import Sidebar from "../components/organisms/Sidebar";
import Navbar from "../components/organisms/Navbar";
import Footer from "../components/organisms/Footer";

const Order_History_List = () => {
  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState("All");

  const [filters, setFilters] = useState({
    orderNumber: "",
    keyword: "",
    status: "",
    dateFrom: "",
    dateTo: "",
  });

  useEffect(() => {

    const fetchOrdersAndProducts = async () => {
      try {
        const orderRes = await axios.get("http://localhost:4000/api/v1/mongo/orders", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const rawOrders = orderRes.data.items;
        const mappedOrders = rawOrders.map((order) => ({
          id: order.orderNumber,
          date: new Date(order.createdAt).toISOString().split("T")[0],
          status: order.orderStatus,
          items: order.items.map((item) => {
            const variant = item.variant;
            return {
              productId: item.productId,
              image: variant.image,
              name: item.productName,
              color: variant.variantOption,
              quantity: variant.quantity,
              price: variant.price,
            };
          }),
          total: order.subtotalAmount,
        })).reverse();

        setOrders(mappedOrders);
      } catch (err) {
        console.error("Error fetching orders or products:", err);
        setOrders([]);
      }
    };

    fetchOrdersAndProducts();
  }, []);

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

    if (filters.status && filters.status !== "All" && order.status !== filters.status) {
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

export default Order_History_List;
