const ScrollableThumbnails = ({ images }) => {
  return (
    <div className="mx-auto px-10 pt-20 pb-20">
      <div className="overflow-x-auto">
        <div className="flex w-max gap-10">
          {images.map((src, index) => (
            <div
              key={index}
              className="w-96 h-96 bg-gray-200 rounded-md flex-shrink-0"
              style={{
                backgroundImage: `url(${src})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              aria-label={`Thumbnail ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScrollableThumbnails;
