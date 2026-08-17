import { DDSButton, DDSDivider } from "@dds/react";
import TechCards from "./(tecnologies-cards)/technologies-cards-component";
import Image from "next/image";
import "./dds-learning.scss";

const WelcomeDDS = () => {
  return (
    <div>
      <div>
        <h1 className="dds__display--3"> Welcome to DDS Learning </h1>
      </div>
      <div
        className="dds__subtitle--1"
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
      <span className="dds__caption dds__mt-5">
        {" "}
        You only need one of JavaScript or TypeScript — DDS supports both.{" "}
      </span>
      <DDSDivider kind="thin" style={{ margin: "var(--dds-spacing-7xl)" }} />
      <div>
        <h1 className="dds__heading--2"> Ready to start? </h1>

        <div className="image-container">
          <Image
            src="/home-bg.png"
            alt="home page image"
            width={700}
            height={500}
          />
        </div>
        <div className="dds-button  ">
          <DDSButton
            style={{
              color: "var(--dds-color-neutral-white)",
            }}
          >
            Start
          </DDSButton>
        </div>
      </div>
    </div>
  );
};

export default WelcomeDDS;
