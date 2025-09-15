function normalizeImage(img) {
  if (!img) return null;
  if (typeof img === "object" && img.url) return img.url;
  const s = String(img);
  if (/^(https?:|data:|blob:)/i.test(s)) return s;
  let cleaned = s.replace(/^\.\/+/, "");
  if (cleaned.startsWith("/images/")) return cleaned;
  if (cleaned.startsWith("images/")) return "/" + cleaned;
  const idx = cleaned.indexOf("images/");
  if (idx >= 0) return "/" + cleaned.slice(idx);
  return `/images/${cleaned.split("/").pop()}`;
}

const ScrollableThumbnails = ({ images = [] }) => {
  const list = images
    .map((it) => normalizeImage(it))
    .filter(Boolean);
  if (list.length === 0) return null;
  return (
    <div className="mx-auto px-10 pt-20 pb-20">
      <div className="overflow-x-auto">
        <div className="flex w-max gap-10">
          {list.map((src, index) => (
            <div key={index} className="w-96 h-96 rounded-md flex-shrink-0 bg-gray-100">
              <img
                src={src}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-cover rounded-md"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = "/images/logoCutBackground2.png";
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScrollableThumbnails;
