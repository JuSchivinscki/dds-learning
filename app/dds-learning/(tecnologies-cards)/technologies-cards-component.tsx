import { DDSCard, DDSLink } from "@dds/react";
import { SiNextdotjs } from "react-icons/si";
import { SiReact } from "react-icons/si";
import { SiJavascript } from "react-icons/si";
import { SiTypescript } from "react-icons/si";

const TechCards = () => {
  return (
    <div className="dds__grid dds__grid-cols--4 dds__grid--regular">
      <DDSCard style={{ padding: "var(--dds-spacing-lg)" }}>
        <SiNextdotjs size={30} />
        <h1> Next.js </h1>
        <span>
          {" "}
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
        <h1> React </h1>
        <span>
          {" "}
          Components, props, and state — the foundation everything here is built
          with.
        </span>

        <DDSLink
          href="https://youtu.be/dCLhUialKPQ?si=hyGuxbTs0-w6DcpH"
          target="_blank"
        >
          Learn React
        </DDSLink>
      </DDSCard>
      <DDSCard style={{ padding: "var(--dds-spacing-lg)" }}>
        <SiJavascript size={30} />
        <h1> Javascript </h1>
        <span> Core syntax: variables, functions, and array methods</span>
        <DDSLink
          href="https://youtu.be/PkZNo7MFNFg?si=05SK7Lwg5Vm7BLiz"
          target="_blank"
        >
          Learn JavaScript
        </DDSLink>
      </DDSCard>
      <DDSCard style={{ padding: "var(--dds-spacing-lg)" }}>
        <SiTypescript size={30} />
        <h1> Typescript </h1>
        <span>
          {" "}
          Basic types and interfaces — DDS components are fully typed.
        </span>
        <DDSLink
          href="https://youtu.be/30LWjhZzg50?si=gRd1EPED2SOc5HcI"
          target="_blank"
        >
          Learn Typescript
        </DDSLink>
      </DDSCard>
    </div>
  );
};

export default TechCards;
