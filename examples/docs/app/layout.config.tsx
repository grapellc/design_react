import { gitConfig } from "@/lib/layout.shared";
import { reactSource, source } from "@/lib/source";
import type { DocsLayoutProps } from "fumadocs-ui/layouts/notebook";
import { BookOpen, Code2 } from "lucide-react";
import type { PropsWithChildren } from "react";

function SidebarTabIconContainer({
  children,
  className = "",
}: PropsWithChildren<{ className?: string }>) {
  return (
    <div
      aria-hidden
      className={`[&_svg]:size-full rounded-lg size-full text-(--tab-color) max-md:bg-(--tab-color)/10 max-md:border max-md:p-1.5 ${className}`.trim()}
    >
      {children}
    </div>
  );
}

const baseOptions: Omit<DocsLayoutProps, "tree"> = {
  githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
  nav: {
    mode: "top",
    title: (
      <div className="flex gap-2 justify-center items-center">
        <div>Grape Design</div>
      </div>
    ),
  },
  links: [
    { icon: <BookOpen />, text: "Docs", url: "/docs", active: "nested-url" },
    { icon: <Code2 />, text: "React", url: "/react", active: "nested-url" },
  ],
  sidebar: {
    tabs: [
      {
        title: "Docs",
        description: "Design language and foundation",
        url: "/docs",
        icon: (
          <SidebarTabIconContainer>
            <BookOpen />
          </SidebarTabIconContainer>
        ),
      },
      {
        title: "React",
        description: "React component library",
        url: "/react",
        icon: (
          <SidebarTabIconContainer>
            <Code2 />
          </SidebarTabIconContainer>
        ),
      },
    ],
  },
  tabMode: "navbar",
};

export const docsOptions: DocsLayoutProps = {
  ...baseOptions,
  tree: source.getPageTree(),
};

export const reactOptions: DocsLayoutProps = {
  ...baseOptions,
  tree: reactSource.getPageTree(),
};
