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
    <section>
      <DDSSidenav>
        <DDSSidenavMenu>
          <DDSSidenavGroup id="dell-design-system">
            <DDSSidenavGroupLabel>
              <DDSSidenavItemContent>Dell Design System </DDSSidenavItemContent>
            </DDSSidenavGroupLabel>
            <DDSSidenavGroupContent>
              <DDSSidenavItem>
                <DDSSidenavItemContent>Getting Started </DDSSidenavItemContent>
              </DDSSidenavItem>
              <DDSSidenavItem>
                <DDSSidenavItemContent>Base Layout</DDSSidenavItemContent>
              </DDSSidenavItem>
            </DDSSidenavGroupContent>
          </DDSSidenavGroup>
        </DDSSidenavMenu>
      </DDSSidenav>
      {children}
    </section>
  );
}
