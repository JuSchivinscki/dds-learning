import Header from "./(header)/header-component";
import { tutorialChapters } from "@/content/tutorial";
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
    <div className="dds-learning-layout">
      <Header />
      <div className="dds-learning-body">
        <div className="dds-learning-sidebar-wrapper">
          <DDSSidenav collapse={false} className="dds--light-mode">
            <DDSSidenavMenu>
              <DDSSidenavGroup id="tutorial-group">
                <DDSSidenavGroupLabel id="tutorial-group-label">
                  Tutorial
                </DDSSidenavGroupLabel>
                <DDSSidenavGroupContent>
                  {tutorialChapters.map((chapter) => (
                    <div key={chapter.id} className="dds-learning-chapter">
                      <div className="dds-learning-chapter__title">
                        {chapter.title}
                      </div>
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
                    </div>
                  ))}
                </DDSSidenavGroupContent>
              </DDSSidenavGroup>
            </DDSSidenavMenu>
          </DDSSidenav>
        </div>
        <main className="dds-learning-content">{children}</main>
      </div>
    </div>
  );
}
