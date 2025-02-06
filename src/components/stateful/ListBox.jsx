import PropTypes from "prop-types";
import { useState } from "react";
import ToggleButton from "../stateless/ToggleButton";

function ListBox({ children }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="box">
      <ToggleButton isOpen={isOpen} setIsOpen={setIsOpen} />
      {isOpen && children}
    </div>
  );
}

ListBox.propTypes = {
  children: PropTypes.object,
};

export default ListBox;
