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

const StickyImage = ({ src, alt = "Product Image" }) => {
  const url = normalizeImage(src) || "/images/logoCutBackground2.png";
  return (
    <div className="relative mx-auto">
      <div className="sticky top-10">
        <img
          src={url}
          alt={alt}
          className="w-full h-auto object-contain"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = "/images/logoCutBackground2.png";
          }}
        />
      </div>
    </div>
  );
};

export default StickyImage;
