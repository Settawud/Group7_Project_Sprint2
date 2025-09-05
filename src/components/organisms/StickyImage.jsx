const StickyImage = ({ src, alt = "Product Image" }) => {
  return (
    <div className="relative mx-auto">
      <div className="sticky top-10">
        <img src={src} alt={alt} className="w-full h-auto object-contain" />
      </div>
    </div>
  );
};

export default StickyImage;
