import { useState } from "react";

const ReviewSection = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [comment, setComment] = useState("");

  const toggleReview = () => setIsOpen((prev) => !prev);

  const handleMouseEnter = (index) => setHovered(index);
  const handleMouseLeave = () => setHovered(0);
  const handleRatingClick = (index) => setRating(index);

  const submitReview = () => {
    console.log("Review submitted:", { rating, comment });
  };

  return (
    <div className="review-container">
      <div className="text-end">
        <button
          className="mt-2 text-sm border border-[#B29675] text-[#B29675] px-4 py-1 rounded hover:bg-[#B2967510] transition"
          onClick={toggleReview}
        >
          Review
        </button>
      </div>

      {isOpen && (
        <div className="review-section pt-4">
          <div className="flex items-center gap-1">
            <span className="text-sm">Rating:</span>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((index) => (
                <svg
                  key={index}
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={handleMouseLeave}
                  onClick={() => handleRatingClick(index)}
                  className={`w-5 h-5 cursor-pointer ${
                    index <= (hovered || rating)
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 15l-5.878 3.09L5.91 12 1 7.909l6.09-.909L10 1l2.91 6L19 7.909 14.09 12l1.788 6.09z" />
                </svg>
              ))}
            </div>
          </div>

          <div className="pt-2">
            <textarea
              rows="3"
              className="w-full rounded border border-[#B29675] p-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#B29675]"
              placeholder="Write your review..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>

          <div className="text-right pt-2">
            <button
              onClick={submitReview}
              className="bg-[#B29675] text-white px-4 py-2 rounded hover:bg-[#9e8460] transition"
            >
              Submit Review
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewSection;
