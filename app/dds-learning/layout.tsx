import Header from "./(header)/header-component";
import "./dds-learning.scss";
import {
  DDSSidenav,
  DDSSidenavGroup,
  DDSSidenavGroupContent,
  DDSSidenavGroupLabel,
  DDSSidenavItem,
  DDSSidenavItemContent,
  DDSSidenavMenu,
} from "@dds/react";

export default function TutorialLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="dds-learning-layout ">
      <Header />
      <DDSSidenav collapse={false} className="dds--light-mode">
        <DDSSidenavMenu>
          <DDSSidenavGroup id="dell-design-system">
            <DDSSidenavGroupLabel id="dds-group-label-dell">
              Dell Design System
            </DDSSidenavGroupLabel>
            <DDSSidenavGroupContent>
              <DDSSidenavItem>
                <DDSSidenavItemContent> Getting Started </DDSSidenavItemContent>
              </DDSSidenavItem>
              <DDSSidenavItem>
                <DDSSidenavItemContent> Base layout </DDSSidenavItemContent>
              </DDSSidenavItem>
              <DDSSidenavItem>
                <DDSSidenavItemContent> Module 01 </DDSSidenavItemContent>
              </DDSSidenavItem>
              <DDSSidenavItem>
                <DDSSidenavItemContent> Module 02 </DDSSidenavItemContent>
              </DDSSidenavItem>
              <DDSSidenavItem>
                <DDSSidenavItemContent> Module 03 </DDSSidenavItemContent>
              </DDSSidenavItem>
              <DDSSidenavItem>
                <DDSSidenavItemContent> Module 04 </DDSSidenavItemContent>
              </DDSSidenavItem>
              <DDSSidenavItem>
                <DDSSidenavItemContent> Module 05 </DDSSidenavItemContent>
              </DDSSidenavItem>
            </DDSSidenavGroupContent>
          </DDSSidenavGroup>
        </DDSSidenavMenu>
      </DDSSidenav>
      <main className="dds-learning-content">{children}</main>
    </section>
  );
}
