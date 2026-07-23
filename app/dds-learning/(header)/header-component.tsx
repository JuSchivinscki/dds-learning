import "../(header)/header-component.scss";

const Header = () => {
  return (
    <header className="header dds__flex-row dds__align-items-center dds__pl-4">
      <h1
        className="header__title dds__heading--3"
        style={{ color: "var(--dds-color-blue-70)" }}
      >
        DDS Learning
      </h1>
    </header>
  );
};

export default Header;
