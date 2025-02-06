import PropTypes from "prop-types";
import Logo from "../stateless/Logo";

export default function NavBar({ children }) {
  return (
    <nav className="nav-bar">
      <Logo />
      {children}
    </nav>
  );
}

NavBar.propTypes = {
  children: PropTypes.array,
};
