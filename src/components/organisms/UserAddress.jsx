// import React, { useState } from "react";

// export default function EditProfile() {
//   const [isEditing, setIsEditing] = useState(false);
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");

  //   return (
  //     <form
  //     onSubmit={(e) => {
  //         e.preventDefault();
  //         setIsEditing(!isEditing);
  //     }}
  //     >
  //         <label>
  //             First name: {""}
  //             {isEditing ? (
  //                 <input
  //                     value={firstName}
  //                     onChange={(e)=> {
  //                         setFirstName(e.target.value);
  //                     }}
  //                     className="w-100 px-4 py-3 border rounded-lg"
  //                 />
  //             ) : (
  //                 <label>{firstName}</label>
  //             )}
  //         </label>
  //         <label>
  //             Last name: {""}
  //             {isEditing ? (
  //                 <input
  //                     value={lastName}
  //                     onChange={(e)=> {
  //                         setLastName(e.target.value);
  //                     }}
  //                 />
  //             ) : (
  //                 <b>{lastName}</b>
  //             )}
  //         </label>
  //         <button type="summit" className='bg-wood-brown'>{isEditing ? "Save" : "Edit"} Profile</button>
  //         <p>
  //             <i>
  //                 Hello, {firstName} {lastName}!
  //             </i>
  //         </p>
  //         </form>
  //   );
  // };

//   return (
//     <form
//       onSubmit={(e) => {
//         e.preventDefault();
//         setIsEditing(!isEditing);
//       }}
//     >
//       <div className="space-y-4">
//         {/* ชื่อ-นามสกุล */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div>
//             <label className="block text-sm font-bold text-gray-700 mb-2">
//               ชื่อจริง : {""}
//               {isEditing ? (
//                 <input
//                   value={firstName}
//                   onChange={(e) => {
//                     setFirstName(e.target.value);
//                   }}
//                   type="text"
//                   className="w-full px-4 py-3 border rounded-lg"
//                 />
//               ) : (
//                 <label>{firstName}</label>
//               )}
//             </label>
//             <label className="block text-sm font-bold text-gray-700 mb-2">
//               นามสกุล : {""}
//               {isEditing ? (
//                 <input
//                   value={lastName}
//                   onChange={(e) => {
//                     setLastName(e.target.value);
//                   }}
//                   type="text"
//                   className="w-full px-4 py-3 border rounded-lg"
//                 />
//               ) : (
//                 <label>{lastName}</label>
//               )}
//             </label>
//           </div>
//         </div>
//       </div>
//       <button type="summit" className="bg-wood-brown">
//         {isEditing ? "Save" : "Edit"} Profile
//       </button>
//       <p>
//         <i>
//           Hello, {firstName} {lastName}!
//         </i>
//       </p>
//     </form>
//   );
// }

// import React, { useMemo, useRef, useState, createContext, useContext } from "react";

// // ============================
// // THEME (สี + ฟอนต์)
// // ============================
// const theme = {
//   bg: "#FFFBF5",
//   card: "#FFFFFF",
//   ink: "#1F1F1F",
//   muted: "#6B7280",
//   line: "#E9DFC9",
//   brand: "#C49A6C",
//   brandDark: "#A8814F",
// };
// const fontImport = `@import url('https://fonts.googleapis.com/css2?family=Prompt:wght@400;500;600;700&display=swap');`;

// // ============================
// // Helpers
// // ============================
// function getInitials(name = "") {
//   return name
//     .split(" ")
//     .filter(Boolean)
//     .map((s) => s[0]?.toUpperCase())
//     .slice(0, 2)
//     .join("");
// }

// // ============================
// // Mock Upload + Mock Save
// // ============================
// const MAX_IMAGE_MB = 3;
// const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
// async function uploadAvatar(file, { onProgress } = {}) {
//   const total = file.size || 1;
//   let up = 0;
//   return await new Promise((resolve) => {
//     const tick = () => {
//       up = Math.min(total, up + Math.max(18000, total / 12));
//       onProgress?.(Math.round((up / total) * 100));
//       if (up >= total) setTimeout(() => resolve(URL.createObjectURL(file)), 160);
//       else setTimeout(tick, 60);
//     };
//     tick();
//   });
// }
// const mockSave = (ms = 500) => new Promise((r) => setTimeout(r, ms));

// // ============================
// // Auth Context (mock)
// // ============================
// const AuthCtx = createContext(null);
// function AuthProvider({ children }) {
//   const [user, setUser] = useState({
//     id: "u_123",
//     firstName: "ขนมปัง",
//     lastName: "ปั่นประลาภ",
//     email: "",
//     phone: "",
//     avatarUrl: "",
//     defaultAddressId: "a1",
//   });
//   const value = useMemo(() => ({ user, setUser }), [user]);
//   return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
// }
// const useAuth = () => useContext(AuthCtx);

// // ============================
// // UI Primitives
// // ============================
// const Page = ({ children }) => (
//   <div style={{ minHeight: "100vh", background: theme.bg, color: theme.ink }}>
//     <style>{fontImport}</style>
//     <style>{`
//       :root{--radius:16px}
//       *,*::before,*::after{box-sizing:border-box}
//       body{font-family:'Prompt','Noto Sans Thai',system-ui,sans-serif}
//       .container{max-width:1180px;margin:0 auto;padding:28px 16px 80px}
//       .grid{display:grid;gap:20px;grid-template-columns:260px 1fr}
//       .card{background:${theme.card}; border:1px solid ${theme.line}; border-radius:var(--radius); box-shadow:0 2px 0 ${theme.line};}
//       .h1{font-size:24px; font-weight:700; margin:0 0 10px}
//       .label{font-size:14px; color:${theme.ink}; margin-bottom:6px}
//       .input{width:100%; border:1px solid ${theme.line}; border-radius:12px; padding:10px 12px; font-size:14px; outline:none; background:#FFFEFC}
//       .input[readonly]{background:#FFFDF8; color:${theme.muted}}
//       .row{display:grid; gap:12px}
//       .row-2{grid-template-columns:1fr 1fr}
//       .btn{appearance:none; border:none; border-radius:999px; padding:11px 20px; font-weight:600; cursor:pointer}
//       .btn-brand{background:${theme.brand}; color:#fff}
//       .btn-brand:hover{background:${theme.brandDark}}
//       .btn-ghost{background:transparent; border:1px solid ${theme.line}; color:${theme.ink}}
//       .link{color:${theme.brandDark}; text-decoration:none; font-weight:600; cursor:pointer}
//       .muted{color:${theme.muted}}
//       .menu a{display:flex; align-items:center; gap:10px; padding:10px 12px; border-radius:12px; color:${theme.ink}; text-decoration:none}
//       .menu a.active{background:#FFFDF9; border:1px solid ${theme.line}}
//       .addr-item{border:1px solid ${theme.line}; border-radius:12px; padding:12px}
//       .pill{display:inline-flex; align-items:center; gap:8px; padding:6px 10px; border:1px solid ${theme.line}; border-radius:999px; background:#FFFEFC}
//       .progress-track{width:220px;height:8px;background:#EEE;border-radius:999px;overflow:hidden}
//       .progress-bar{height:100%;background:${theme.brand};width:0%}
//     `}</style>
//     <div className="container">{children}</div>
//   </div>
// );

// const SectionCard = ({ title, right, children, footer }) => (
//   <section className="card" style={{ padding: 20, marginBottom: 22 }}>
//     <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
//       <h2 className="h1" style={{ marginTop: 2 }}>{title}</h2>
//       {right}
//     </div>
//     <div>{children}</div>
//     {footer && <div style={{ marginTop: 16 }}>{footer}</div>}
//   </section>
// );

// const IconUser = () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 12c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5zm0 2c-4.418 0-8 2.239-8 5v2h16v-2c0-2.761-3.582-5-8-5z" fill="currentColor"/></svg>);
// const IconHistory = () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M13 3a9 9 0 1 0 8.485 6H19a7 7 0 1 1-2.05-4.95L15 6h6V0l-2.293 2.293A8.962 8.962 0 0 0 13 3z" fill="currentColor"/></svg>);
// const IconLogout = () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M16 17l5-5-5-5v3H9v4h7v3z" fill="currentColor"/><path d="M4 4h8V2H4a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h8v-2H4V4z" fill="currentColor"/></svg>);
// const IconEdit = () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25z" fill="currentColor"/></svg>);
// const IconTrash = () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M6 7h12l-1 14H7L6 7zm3-3h6l1 2H8l1-2z" fill="currentColor"/></svg>);
// const IconPlus = () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z" fill="currentColor"/></svg>);

// // ============================
// // Sidebar (ตามภาพ)
// // ============================
// function Sidebar() {
//   return (
//     <aside className="card" style={{ padding: 14, height: "fit-content" }}>
//       <div style={{ fontWeight: 700, margin: "6px 8px 10px" }}>My Account</div>
//       <nav className="menu" style={{ display: "grid", gap: 6 }}>
//         <a className="active" href="#"><IconUser /> Profile</a>
//         <a href="#"><IconHistory /> Order History</a>
//         <a href="#"><IconLogout /> Log out</a>
//       </nav>
//     </aside>
//   );
// }

// // ============================
// // Avatar Picker (รองรับ disable เวลาไม่แก้ไข)
// // ============================
// function AvatarPicker({ value, onChange, initials, disabled }) {
//   const [pct, setPct] = useState(0);
//   const ref = useRef(null);
//   const pick = () => !disabled && ref.current?.click();
//   const onPick = async (e) => {
//     const file = e.target.files?.[0];
//     if (!file) return;
//     if (!ACCEPTED_TYPES.includes(file.type)) return alert("รองรับ jpeg/png/webp/gif เท่านั้น");
//     if (file.size > MAX_IMAGE_MB * 1024 * 1024) return alert(`ไฟล์ไม่เกิน ${MAX_IMAGE_MB}MB`);
//     try {
//       const url = await uploadAvatar(file, { onProgress: setPct });
//       onChange(url);
//     } finally { setPct(0); }
//   };
//   return (
//     <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
//       {value ? (
//         <img src={value} alt="avatar" width={96} height={96} style={{ borderRadius: 999, objectFit: "cover", border: `3px solid ${theme.line}`, opacity: disabled ? .7 : 1 }} />
//       ) : (
//         <div style={{ width: 96, height: 96, borderRadius: 999, display: "grid", placeItems: "center", background: "#FFE1CF", color: theme.brandDark, fontWeight: 700, border: `3px solid ${theme.line}`, opacity: disabled ? .7 : 1 }}>{initials || "U"}</div>
//       )}
//       <div>
//         <div className="muted" style={{ marginBottom: 6 }}>ขนาดแนะนำ 300×300 px</div>
//         {disabled ? (
//           <span className="muted">เลือกรูปภาพ</span>
//         ) : (
//           <button type="button" className="link" onClick={pick}>เลือกรูปภาพ</button>
//         )}
//         <input type="file" ref={ref} accept="image/*" onChange={onPick} style={{ display: "none" }} />
//         {pct > 0 && (
//           <div style={{ marginTop: 8 }}>
//             <div className="progress-track"><div className="progress-bar" style={{ width: `${pct}%` }} /></div>
//             <small className="muted">{pct}%</small>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// // ============================
// // Profile Data Card (Toggle แก้ไข ↔ บันทึกโปรไฟล์)
// // ============================
// function ProfileDataCard() {
//   const { user, setUser } = useAuth();
//   const [editing, setEditing] = useState(false);
//   const [draft, setDraft] = useState({
//     firstName: user.firstName,
//     lastName: user.lastName,
//     email: user.email,
//     phone: user.phone,
//     avatarUrl: user.avatarUrl,
//   });
//   const [saving, setSaving] = useState(false);

//   const setField = (k) => (e) => setDraft((d) => ({ ...d, [k]: e.target.value }));

//   const onSave = async () => {
//     setSaving(true);
//     await mockSave();
//     setUser((u) => ({ ...u, ...draft }));
//     setSaving(false);
//     setEditing(false); // กลับสู่โหมดดูหลังบันทึก
//   };
//   const onCancel = () => {
//     setDraft({ firstName: user.firstName, lastName: user.lastName, email: user.email, phone: user.phone, avatarUrl: user.avatarUrl });
//     setEditing(false);
//   };

//   const initials = getInitials(`${draft.firstName} ${draft.lastName}`);

//   return (
//     <SectionCard
//       title="Profile Data"
//       right={
//         !editing ? (
//           <button className="btn btn-ghost" onClick={() => setEditing(true)}>แก้ไข</button>
//         ) : null
//       }
//       footer={
//         editing ? (
//           <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
//             <button className="btn btn-ghost" onClick={onCancel} disabled={saving}>ยกเลิก</button>
//             <button className="btn btn-brand" onClick={onSave} disabled={saving}>{saving ? "Saving..." : "บันทึกโปรไฟล์"}</button>
//           </div>
//         ) : null
//       }
//     >
//       <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: 24 }}>
//         <AvatarPicker value={draft.avatarUrl} onChange={(url) => setDraft((d) => ({ ...d, avatarUrl: url }))} initials={initials} disabled={!editing} />
//         <div className="row row-2">
//           <div>
//             <div className="label">ชื่อจริง</div>
//             <input className="input" value={draft.firstName} onChange={setField("firstName")} placeholder="เช่น ขนมปัง" readOnly={!editing} />
//           </div>
//           <div>
//             <div className="label">นามสกุล</div>
//             <input className="input" value={draft.lastName} onChange={setField("lastName")} placeholder="เช่น ปั่นประลาภ" readOnly={!editing} />
//           </div>
//           <div>
//             <div className="label">อีเมล</div>
//             <input className="input" value={draft.email} onChange={setField("email")} placeholder="your@email.com" readOnly={!editing} />
//           </div>
//           <div>
//             <div className="label">เบอร์โทรศัพท์</div>
//             <input className="input" value={draft.phone} onChange={setField("phone")} placeholder="08x-xxx-xxxx" readOnly={!editing} />
//           </div>
//         </div>
//       </div>
//     </SectionCard>
//   );
// }

// // ============================
// // Address Section (ครบ: เลือก default + เพิ่ม/แก้ไข/ลบ)
// // ============================
// function AddressSection() {
//   const { user, setUser } = useAuth();
//   const [addresses, setAddresses] = useState([
//     { id: "a1", line: "54 ห้องเลขที่ 15 ชั้นที่ 1 ซอยการ 24 หมู่ 24 แขวงคลองตันเหนือ เขตวัฒนา กรุงเทพมหานคร 10600" },
//     { id: "a2", line: "545 ต. องครักษ์ อ. องครักษ์ จ. นครนายก 26140" },
//   ]);
//   const [defaultId, setDefaultId] = useState(user.defaultAddressId || "a1");
//   const [openAdd, setOpenAdd] = useState(false);
//   const [editingId, setEditingId] = useState(null);
//   const [form, setForm] = useState({ line1: "", line2: "", province: "", amphoe: "", tambon: "", zip: "" });

//   const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

//   const compose = () => {
//     const s = `${form.line1} ${form.line2} ${form.tambon} ${form.amphoe} ${form.province} ${form.zip}`
//       .replace(/\s+/g, " ")
//       .trim();
//     return s;
//   };

//   const startAdd = () => {
//     setEditingId(null);
//     setForm({ line1: "", line2: "", province: "", amphoe: "", tambon: "", zip: "" });
//     setOpenAdd(true);
//   };
//   const startEdit = (a) => {
//     setEditingId(a.id);
//     setForm({ line1: a.line, line2: "", province: "", amphoe: "", tambon: "", zip: "" });
//     setOpenAdd(true);
//   };
//   const remove = (id) => {
//     setAddresses((prev) => {
//       const filtered = prev.filter((x) => x.id !== id);
//       if (defaultId === id) setDefaultId(filtered[0]?.id || "");
//       return filtered;
//     });
//   };

//   const saveAddress = () => {
//     const c = compose();
//     if (!c) return alert("กรอกที่อยู่ก่อนนะ");
//     if (editingId) setAddresses((arr) => arr.map((x) => (x.id === editingId ? { ...x, line: c } : x)));
//     else setAddresses((arr) => [{ id: Math.random().toString(36).slice(2, 8), line: c }, ...arr]);
//     setOpenAdd(false);
//     setEditingId(null);
//   };

//   const saveDefault = async () => {
//     await mockSave();
//     setUser((u) => ({ ...u, defaultAddressId: defaultId }));
//     alert("บันทึกที่อยู่จัดส่งเริ่มต้นแล้ว");
//   };

//   return (
//     <>
//       <SectionCard
//         title="ที่อยู่จัดส่งสินค้า"
//         right={<button className="pill" onClick={startAdd}><IconPlus /> เพิ่มที่อยู่ใหม่</button>}
//         footer={
//           <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
//             <button className="btn btn-brand" onClick={saveDefault}>บันทึกการเลือกที่อยู่จัดส่ง</button>
//           </div>
//         }
//       >
//         <div className="row" style={{ gap: 12 }}>
//           {addresses.map((a) => (
//             <label key={a.id} className="addr-item" style={{ display: "grid", gridTemplateColumns: "26px 1fr auto", alignItems: "center", gap: 12 }}>
//               <input type="radio" name="addr" checked={defaultId === a.id} onChange={() => setDefaultId(a.id)} />
//               <div style={{ whiteSpace: "pre-wrap" }}>{a.line}</div>
//               <div style={{ display: "flex", gap: 8 }}>
//                 <button type="button" className="pill" onClick={() => startEdit(a)}><IconEdit /> แก้ไข</button>
//                 <button type="button" className="pill" onClick={() => remove(a.id)}><IconTrash /> ลบที่อยู่</button>
//               </div>
//             </label>
//           ))}
//         </div>
//       </SectionCard>

//       {openAdd && (
//         <SectionCard title={editingId ? "แก้ไขที่อยู่" : "เพิ่มที่อยู่ใหม่"}>
//           <div className="row" style={{ gap: 14 }}>
//             <div>
//               <div className="label">เลขที่อาคาร</div>
//               <input className="input" name="line1" value={form.line1} onChange={onChange} placeholder="เลขที่อาคาร" />
//             </div>
//             <div>
//               <div className="label">อาคาร ชื่ออาคาร ถนน และรายละเอียดอื่นๆ</div>
//               <input className="input" name="line2" value={form.line2} onChange={onChange} placeholder="อาคาร/ถนน/รายละเอียด" />
//             </div>
//             <div className="row row-2">
//               <div>
//                 <div className="label">จังหวัด</div>
//                 <select className="input" name="province" value={form.province} onChange={onChange}>
//                   <option value="">เลือกจังหวัด</option>
//                   <option>กรุงเทพมหานคร</option>
//                   <option>ตรัง</option>
//                   <option>กระบี่</option>
//                   <option>นครนายก</option>
//                 </select>
//               </div>
//               <div>
//                 <div className="label">อำเภอ</div>
//                 <select className="input" name="amphoe" value={form.amphoe} onChange={onChange}>
//                   <option value="">เลือกอำเภอ</option>
//                   <option>วัฒนา</option>
//                   <option>ห้วยยอด</option>
//                   <option>เมืองกระบี่</option>
//                   <option>องครักษ์</option>
//                 </select>
//               </div>
//             </div>
//             <div className="row row-2">
//               <div>
//                 <div className="label">ตำบล</div>
//                 <select className="input" name="tambon" value={form.tambon} onChange={onChange}>
//                   <option value="">เลือกตำบล</option>
//                   <option>คลองตันเหนือ</option>
//                   <option>เขาวิเศษ</option>
//                   <option>ปากน้ำ</option>
//                   <option>โคกสะอาด</option>
//                 </select>
//               </div>
//               <div>
//                 <div className="label">รหัสไปรษณีย์</div>
//                 <input className="input" name="zip" value={form.zip} onChange={onChange} placeholder="เช่น 10600" />
//               </div>
//             </div>
//             <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 6, gap: 8 }}>
//               <button className="btn btn-ghost" onClick={() => { setOpenAdd(false); setEditingId(null); }}>ยกเลิก</button>
//               <button className="btn btn-brand" onClick={saveAddress}>บันทึก</button>
//             </div>
//           </div>
//         </SectionCard>
//       )}
//     </>
//   );
// }

// // ============================
// // PAGE
// // ============================
// function ProfilePage() {
//   return (
//     <Page>
//       <div className="grid">
//         <Sidebar />
//         <div>
//           <ProfileDataCard />
//           <AddressSection />
//         </div>
//       </div>
//     </Page>
//   );
// }

// export default function App() {
//   return (
//     <AuthProvider>
//       <ProfilePage />
//     </AuthProvider>
//   );
// }

import React, { useState } from "react";
import AddressList from "../molecules/AddressList";
import AddressForm from "../molecules/AddressForm";
import Modal from "../layout/Modal";

export default function UserAddress() {
  const [addresses, setAddresses] = useState([
    {
      building: "54",
      detail: "ห้องสมุด 15 ชั้น 1 อาคาร 24 หมู่ 24",
      subDistrict: "คลองต้นไทร",
      district: "คลองสาน",
      province: "กรุงเทพมหานคร",
      postalCode: "10600",
    },
    {
      building: "545",
      detail: "",
      subDistrict: "ดอนแตง",
      district: "ขาณุวรลักษบุรี",
      province: "กำแพงเพชร",
      postalCode: "62140",
    },
  ]);

  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const handleSave = (fullAddress, index = null, formData) => {
    if (index !== null) {
      const updated = [...addresses];
      updated[index] = formData;
      setAddresses(updated);
    } else {
      setAddresses([...addresses, formData]);
    }
    setShowPopup(false);
    setEditIndex(null);
  };

  const handleDelete = (index) => {
    setAddresses(addresses.filter((_, i) => i !== index));
    if (selectedAddress === index) setSelectedAddress(null);
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setShowPopup(true);
  };

  const formatAddress = (addr) => {
    return `${addr.building} ${addr.detail} ${addr.subDistrict} ${addr.district} ${addr.province} ${addr.postalCode}`;
  };

  return (
    <div>
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-md p-6">
        {/* Header */}
        <h2 className="text-xl font-bold text-gray-800 border-gray-200 pb-4">
          📦 ที่อยู่จัดส่งสินค้า
        </h2>

        {/* Address List */}
        <div className="space-y-3">
          <AddressList
            addresses={addresses.map((a) => formatAddress(a))}
            selectedAddress={selectedAddress}
            onSelect={setSelectedAddress}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>

        {/* Add new address button */}
        <div className="mt-6">
          <button
            onClick={() => { setShowPopup(true); setEditIndex(null); }}
            className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl border border-dashed border-amber-400 text-amber-600 bg-amber-50 hover:bg-amber-100 transition"
          >
            <span className="text-lg">➕</span>
            <span className="font-medium">เพิ่มที่อยู่ใหม่</span>
          </button>
        </div>
      </div>

      {/* Modal for Address Form */}
      {showPopup && (
        <Modal onClose={() => setShowPopup(false)}>
          <AddressForm
            onSave={handleSave}
            editData={editIndex !== null ? addresses[editIndex] : null}
            editIndex={editIndex}
          />
        </Modal>
      )}
    </div>
  );
}
