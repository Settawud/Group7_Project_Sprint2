const ProductDetails = ({ products }) => {
  const overallTotal = products.reduce(
    (sum, item) => sum + item.quantity * item.unitPrice,
    0
  );

  return (
    <section className="mx-auto px-4 py-3">
      <div className="mb-3 text-3xl font-semibold">Product Details</div>
      <div className="overflow-hidden rounded-lg border border-[#B29675] text-sm">
        <table className="w-full table-auto">
          <thead className="bg-[#B29675] text-sm uppercase tracking-wide text-white">
            <tr>
              <th className="px-6 py-3 text-left">Product Name</th>
              <th className="px-6 py-3 text-center">Quantity</th>
              <th className="px-6 py-3 text-right">Unit Price</th>
              <th className="px-6 py-3 text-right">Total Price</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {products.map(({ id, name, quantity, unitPrice }) => {
              const totalPrice = quantity * unitPrice;
              return (
                <tr key={id}>
                  <td className="px-6 py-4 text-left">{name}</td>
                  <td className="px-6 py-4 text-center">{quantity}</td>
                  <td className="px-6 py-4 text-right">
                    {unitPrice.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    {totalPrice.toLocaleString()}
                  </td>
                </tr>
              );
            })}
            <tr className="border-t border-[#B29675]">
              <td
                colSpan="3"
                className="px-6 py-4 text-right font-semibold text-[#A8A8A8]"
              >
                Overall Total
              </td>
              <td className="px-6 py-4 text-right font-semibold">
                {overallTotal.toLocaleString()}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default ProductDetails;
