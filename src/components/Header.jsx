import { Link } from "react-router-dom";
import logo from "../images/logo-mesto_color_white.svg";

function Header() {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="логотип место россия" />
      <h3 className="header__entry">Войти</h3>
    </header>
  );
}

export default Header;
