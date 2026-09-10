import { DDSCard, DDSLink } from "@dds/react";

import { SiReact } from "react-icons/si";
import { RiNextjsLine } from "react-icons/ri";
import { IoLogoJavascript } from "react-icons/io";
import { TbBrandTypescript } from "react-icons/tb";

const TechCards = () => {
  return (
    <div>
      <div className="dds__grid dds__grid-cols--2 dds__grid--regular">
        <DDSCard
          style={{
            padding: "var(--dds-spacing-lg)",
          }}
        >
          <RiNextjsLine size={30} />

          <h2 className="dds__heading--4">Next.js</h2>

          <span>
            The framework this course is built on — routing, pages, and project
            structure.
          </span>

          <DDSLink
            href="https://youtu.be/I1V9YWqRIeI?si=S0wYq8iHYJkrM2pa"
            target="_blank"
          >
            Learn Next.js
          </DDSLink>
        </DDSCard>

        <DDSCard style={{ padding: "var(--dds-spacing-lg)" }}>
          <SiReact size={30} />

          <h2 className="dds__heading--4">React</h2>

          <span>
            Components, props, and state — the foundation everything here is
            built with.
          </span>

          <DDSLink
            href="https://youtu.be/dCLhUialKPQ?si=hyGuxbTs0-w6DcpH"
            target="_blank"
          >
            Learn React
          </DDSLink>
        </DDSCard>
      </div>
      <div
        className="dds__grid dds__grid-cols--2 dds__grid--regular"
        style={{ marginTop: "var(--dds-spacing-xl)" }}
      >
        <DDSCard style={{ padding: "var(--dds-spacing-lg)" }}>
          <IoLogoJavascript size={30} />

          <h2 className="dds__heading--4">JavaScript</h2>

          <span>Core syntax: variables, functions, and array methods.</span>

          <DDSLink
            href="https://youtu.be/PkZNo7MFNFg?si=05SK7Lwg5Vm7BLiz"
            target="_blank"
          >
            Learn JavaScript
          </DDSLink>
        </DDSCard>

        <DDSCard style={{ padding: "var(--dds-spacing-lg)" }}>
          <TbBrandTypescript size={30} />

          <h2 className="dds__heading--4">TypeScript</h2>

          <span>
            Basic types and interfaces — DDS components are fully typed.
          </span>

          <DDSLink
            href="https://youtu.be/30LWjhZzg50?si=gRd1EPED2SOc5HcI"
            target="_blank"
          >
            Learn TypeScript
          </DDSLink>
        </DDSCard>
      </div>

      <div
        className="dds__caption"
        style={{
          display: "block",
          marginTop: "var(--dds-spacing-md)",
          textAlign: "center",
        }}
      >
        You only need one of JavaScript or TypeScript — DDS supports both.
      </div>
    </div>
  );
};

export default TechCards;
