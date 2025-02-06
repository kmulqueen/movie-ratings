import PropTypes from "prop-types";

function ToggleButton({ isOpen, setIsOpen }) {
  return (
    <button className="btn-toggle" onClick={() => setIsOpen((prev) => !prev)}>
      {isOpen ? "–" : "+"}
    </button>
  );
}

ToggleButton.propTypes = {
  isOpen: PropTypes.bool,
  setIsOpen: PropTypes.func,
};

export default ToggleButton;
