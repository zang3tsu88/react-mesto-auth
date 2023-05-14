import logo from "../images/logo-mesto_color_white.svg";

function Header() {
  return (
    <header className="header">
      <img
        className="header__logo"
        src={logo}
        alt="логотип место россия"
      />
    </header>
  )
}

export default Header
