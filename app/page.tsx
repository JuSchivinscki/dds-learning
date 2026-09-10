import Image from "next/image";
import { DDSBadge, DDSTag } from "@dds/react";
import Link from "next/link";

export default function Home() {
  return (
    <div
      className="dds__grid dds__grid-cols--2 dds__grid--regular"
      style={{
        gap: "var(--dds-spacing-2xl)",
        margin: "var(--dds-spacing-3xl)",
        padding: "var(--dds-spacing-7xl)",
        alignItems: "center",
      }}
    >
      <section>
        <div>
          <div
            className="dds__d-flex dds__p-3"
            style={{ marginBottom: "var(--dds-spacing-lg)" }}
          >
            <DDSBadge color="neutral" className="dds__mr--sm">
              7 Modules
            </DDSBadge>
            <DDSBadge color="neutral" className="dds__mr--sm">
              1 Project
            </DDSBadge>
            <DDSBadge color="neutral" className="dds__mr--sm">
              All Components
            </DDSBadge>
          </div>
        </div>
        <div
          className="dds__display--1 dds__mt-7"
          style={{
            color: "var(--dds-color-light-blue-70)",
            marginBottom: "var(--dds-spacing-lg)",
          }}
        >
          Learn the Dell Design System by building
        </div>
        <div
          className="dds__subtitle--2"
          style={{
            marginBottom: "var(--dds-spacing-lg)",
            fontWeight: "var(--dds-font-weight-regular)",
          }}
        >
          Master the core principles of accessibility, consistency, and
          scalability through practical, hands-on modules designed for modern
          engineers and designers.
        </div>
        <Link href="/dds-learning">
          <DDSTag>
            <span
              className="dds__p--md"
              style={{
                color: "var(--dds-color-neutral-white)",
              }}
            >
              Get Started
            </span>
          </DDSTag>
        </Link>
      </section>
      <section>
        <Image
          alt="Dell Design System illustration"
          src="/home-bg.png"
          width={500}
          height={500}
        />
      </section>
    </div>
  );
}
