import { DDSButton, DDSLink } from "@dds/react";
import TechCards from "./(tecnologies-cards)/technologies-cards-component";
import "./dds-learning.scss";

const WelcomeDDS = () => {
  return (
    <div>
      <div>
        <h1 className="dds__display--3"> Welcome aboard! </h1>
      </div>

      <div
        className="dds__heading--5"
        style={{ marginBottom: "var(--dds-spacing-xl)" }}
      >
        DDS Learning is where you master the Dell Design System, one hands-on
        module at a time.
      </div>
      <div
        className="dds__heading--5"
        style={{ marginBottom: "var(--dds-spacing-xl)" }}
      >
        {" "}
        Before diving into the Dell Design System, make sure you're comfortable
        with the basics below. You don't need to be an expert — just enough to
        follow along.
      </div>
      <div className="dds--light-mode">
        <TechCards />
      </div>
      <DDSLink
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "var(--dds-spacing-xl)",
        }}
        href="/tutorial/transactions/table"
      >
        <DDSButton> Let's start </DDSButton>
      </DDSLink>
    </div>
  );
};

export default WelcomeDDS;
