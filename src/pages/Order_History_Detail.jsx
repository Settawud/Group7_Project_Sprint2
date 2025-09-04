import OrderHistory from "../components/organisms/OrderHistory";
import OrderSummarySection from "../components/organisms/OrderSummarySection";
import ProductDetails from "../components/organisms/ProductDetails";
import ShippingAddress from "../components/organisms/ShippingAddress";
import Sidebar from "../components/organisms/Sidebar";

const products = [
  {
    id: 1,
    name: 'โต๊ะทำงานไม้ดีไซน์มินิมอล "เรียบง่าย"',
    quantity: 1,
    unitPrice: 3890,
  },
  {
    id: 2,
    name: 'เก้าอี้สุดไม้ "อเนกประสงค์"',
    quantity: 2,
    unitPrice: 1299,
  },
];

const userAddress = {
  name: "John Wick",
  phone: "0812345678",
  address: "239 Huay Kaew Road, Suthep, Muang, Chiang Mai 50200, Thailand",
};

const orders = [
  {
    orderId: "XXXXXX",
    orderDate: "01/01/25",
    numberOfItems: 2,
    shipping: {
      carrierName: "Thunder",
      shippingDate: "03/01/25",
      shippingMethod: "Standard",
    },
  },
];

const App = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-8 mx-auto">
      <Sidebar />
      <main className="flex-1">
        <OrderSummarySection
          orderNumber="12345678"
          orderStatus="Shipped"
          shippingStatus="In Transit"
        />
        <ShippingAddress
          name={userAddress.name}
          phone={userAddress.phone}
          address={userAddress.address}
        />
        <ProductDetails products={products} />
        <OrderHistory orders={orders} />
      </main>
    </div>
  );
};

export default App;
