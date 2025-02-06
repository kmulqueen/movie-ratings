import PropTypes from "prop-types";
import { useState } from "react";
import Star from "../stateless/Star";

const containerStyle = {
  display: "flex",
  alignItems: "center",
  gap: "16px",
};

const starContainerStyle = {
  display: "flex",
  gap: "4px",
};

export default function StarRating({
  maxRating = 5,
  color = "#fcc419",
  size = 25,
  messages = {},
  className = "",
  defaultRating = 0,
  onSetRating = () => null,
}) {
  const [rating, setRating] = useState(defaultRating);
  const [hoverRating, setHoverRating] = useState(0);

  function handleRate(num) {
    setRating(num);
    onSetRating(num);
  }

  function handleHover(num) {
    setHoverRating(num);
  }

  function handleHoverLeave() {
    setHoverRating(0);
  }

  const textStyle = {
    lineHeight: "1",
    margin: "0",
    color,
    fontSize: `${size}px`,
  };

  return (
    <div style={containerStyle} className={className}>
      <div style={starContainerStyle}>
        {Array.from({ length: maxRating }, (_, idx) => (
          <Star
            key={idx}
            handleRate={() => handleRate(idx + 1)}
            full={hoverRating ? idx + 1 <= hoverRating : idx + 1 <= rating}
            handleHover={() => handleHover(idx + 1)}
            handleHoverLeave={() => handleHoverLeave()}
            color={color}
            size={size}
          />
        ))}
      </div>
      <p style={textStyle}>
        {Object.keys(messages).length === maxRating
          ? messages[hoverRating ? hoverRating : rating]
          : hoverRating || rating || ""}
      </p>
    </div>
  );
}

StarRating.propTypes = {
  maxRating: PropTypes.number,
  color: PropTypes.string,
  size: PropTypes.number,
  messages: PropTypes.object,
  className: PropTypes.string,
  defaultRating: PropTypes.number,
  onSetRating: PropTypes.func,
};

// EXAMPLE USAGE
{
  /* <StarRating
        maxRating={5}
        messages={{
          1: "Terrible",
          2: "Not Good",
          3: "Decent",
          4: "Good",
          5: "Great",
        }}
      />
      <StarRating color="lightblue" maxRating={5} size={20} defaultRating={3} /> */
}
