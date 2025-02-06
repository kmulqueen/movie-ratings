import PropTypes from "prop-types";

export default function Message({ message, type }) {
  return <p className={type}>{message}</p>;
}

Message.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};
