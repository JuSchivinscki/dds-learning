import Header from "../dds-learning/(header)/header-component";
import { tutorialChapters } from "@/content/tutorial";
import "../dds-learning/dds-learning.scss";

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
    <div className="dds-learning-layout">
      <Header />

      <div className="dds-learning-body">
        <aside className="dds-learning-sidebar-wrapper">
          <DDSSidenav collapse={false} className="dds--light-mode">
            <DDSSidenavMenu>
              {tutorialChapters.map((chapter) => (
                <DDSSidenavGroup key={chapter.id} id={`${chapter.id}-group`}>
                  <DDSSidenavGroupLabel id={`${chapter.id}-group-label`}>
                    {chapter.title}
                  </DDSSidenavGroupLabel>

                  <DDSSidenavGroupContent>
                    {chapter.steps.map((step) => (
                      <DDSSidenavItem
                        key={step.id}
                        href={`/tutorial/${chapter.id}/${step.id}`}
                      >
                        <DDSSidenavItemContent>
                          {step.title}
                        </DDSSidenavItemContent>
                      </DDSSidenavItem>
                    ))}
                  </DDSSidenavGroupContent>
                </DDSSidenavGroup>
              ))}
            </DDSSidenavMenu>
          </DDSSidenav>
        </aside>

        <main className="dds-learning-content">{children}</main>
      </div>
    </div>
  );
}
