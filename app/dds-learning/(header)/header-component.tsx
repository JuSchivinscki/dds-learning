import { DDSLink, DDSTag } from "@dds/react";
import "../(header)/header-component.scss";

const Header = () => {
  return (
    <header className="header">
      <DDSLink style={{ textDecoration: "none" }} href="/dds-learning">
        <h1 className="header__title dds__heading--3">DDS Learning</h1>
      </DDSLink>

      <div className="header__actions">
        <DDSLink href="https://www.delldesignsystem.com" target="_blank">
          <DDSTag
            rel="noopener noreferrer"
            className="header__button"
            color="brand"
          >
            Visit Dell Design System
          </DDSTag>
        </DDSLink>

        <DDSLink
          href="https://react.delldesignsystem.com/3.1.0/index.html?path=/"
          target="_blank"
        >
          <DDSTag
            rel="noopener noreferrer"
            className="header__button"
            color="brand"
          >
            Storybook
          </DDSTag>
        </DDSLink>
      </div>
    </header>
  );
};

export default Header;
