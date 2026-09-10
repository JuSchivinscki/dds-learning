import { DDSTag } from "@dds/react";
import "../(header)/header-component.scss";

const Header = () => {
  return (
    <header className="header">
      <h1 className="header__title dds__heading--3">DDS Learning</h1>

      <DDSTag
        rel="noopener noreferrer"
        className="header__button"
        color="brand"
      >
        Visit Dell Design System
      </DDSTag>
    </header>
  );
};

export default Header;
