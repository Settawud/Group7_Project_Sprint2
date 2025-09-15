import { useMemo, useState } from "react";
import Button from "../atoms/Button";
import { api } from "../../lib/api";
import { toast } from "sonner";

export default function CouponCreateForm({ onCreated }) {
  const [code, setCode] = useState("");
  const [type, setType] = useState("percentage");
  const [value, setValue] = useState(10);
  const [maxDiscount, setMaxDiscount] = useState(0);
  const [minOrderAmount, setMinOrderAmount] = useState(0);
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [endDate, setEndDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 30);
    return d.toISOString().slice(0, 10);
  });
  const [submitting, setSubmitting] = useState(false);

  const disabled = useMemo(() => {
    if (!code || !type || !value || !startDate || !endDate) return true;
    if (new Date(endDate) < new Date(startDate)) return true;
    return submitting;
  }, [code, type, value, startDate, endDate, submitting]);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      const payload = {
        code: String(code).trim().toUpperCase(),
        type,
        value: Number(value),
        startDate,
        endDate,
      };
      if (Number(maxDiscount) > 0) payload.maxDiscount = Number(maxDiscount);
      if (Number(minOrderAmount) > 0) payload.minOrderAmount = Number(minOrderAmount);
      if (description) payload.description = description;
      await api.post("/discounts", payload);
      toast.success("Coupon created");
      setCode("");
      setDescription("");
      setValue(10);
      setMaxDiscount(0);
      setMinOrderAmount(0);
      setStartDate(new Date().toISOString().slice(0, 10));
      const d = new Date(); d.setDate(d.getDate() + 30); setEndDate(d.toISOString().slice(0, 10));
      onCreated?.();
    } catch (err) {
      const msg = err?.response?.data?.message || err?.message || "Create failed";
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div id="create-coupon" className="max-w-3xl mx-auto bg-white rounded-2xl shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-800 pb-4">Create Coupon</h2>
      <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium text-gray-700">Code</label>
          <input className="w-full px-4 py-2 rounded-xl border border-gray-300 bg-white" value={code} onChange={(e)=>setCode(e.target.value)} placeholder="SAVE10" required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Type</label>
          <select className="w-full px-4 py-2 rounded-xl border border-gray-300 bg-white" value={type} onChange={(e)=>setType(e.target.value)}>
            <option value="percentage">percentage</option>
            <option value="fixed">fixed</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Value</label>
          <input type="number" min="1" className="w-full px-4 py-2 rounded-xl border border-gray-300 bg-white" value={value} onChange={(e)=>setValue(e.target.value)} required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Max Discount (optional)</label>
          <input type="number" min="0" className="w-full px-4 py-2 rounded-xl border border-gray-300 bg-white" value={maxDiscount} onChange={(e)=>setMaxDiscount(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Min Order Amount (optional)</label>
          <input type="number" min="0" className="w-full px-4 py-2 rounded-xl border border-gray-300 bg-white" value={minOrderAmount} onChange={(e)=>setMinOrderAmount(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <input className="w-full px-4 py-2 rounded-xl border border-gray-300 bg-white" value={description} onChange={(e)=>setDescription(e.target.value)} placeholder="รายละเอียดคูปอง" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Start</label>
          <input type="date" className="w-full px-4 py-2 rounded-xl border border-gray-300 bg-white" value={startDate} onChange={(e)=>setStartDate(e.target.value)} required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">End</label>
          <input type="date" className="w-full px-4 py-2 rounded-xl border border-gray-300 bg-white" value={endDate} onChange={(e)=>setEndDate(e.target.value)} required />
        </div>
        <div className="md:col-span-2 flex justify-end mt-2">
          <Button type="submit" disabled={disabled}>{submitting ? "Creating..." : "Create"}</Button>
        </div>
      </form>
    </div>
  );
}
