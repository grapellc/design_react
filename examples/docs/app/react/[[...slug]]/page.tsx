import { LLMCopyButton, ViewOptions } from "@/components/ai/page-actions";
import { gitConfig } from "@/lib/layout.shared";
import { reactSource } from "@/lib/source";
import { getMDXComponents } from "@/mdx-components";
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from "fumadocs-ui/layouts/notebook/page";
import { createRelativeLink } from "fumadocs-ui/mdx";
import type { MDXComponents } from "mdx/types";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type PageDataWithBody = {
  body: React.ComponentType<{ components?: MDXComponents }>;
  toc?: import("fumadocs-core/toc").TOCItemType[];
  full?: boolean;
};

export default async function Page(props: PageProps<"/react/[[...slug]]">) {
  const params = await props.params;
  const page = reactSource.getPage(params.slug);
  if (!page) notFound();

  const pageData = page.data as PageDataWithBody;
  const MDX = pageData.body;

  return (
    <DocsPage toc={pageData.toc} full={pageData.full}>
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription className="mb-0">
        {page.data.description}
      </DocsDescription>
      <div className="flex flex-row gap-2 items-center border-b pb-6">
        <LLMCopyButton markdownUrl={`${page.url}.mdx`} />
        <ViewOptions
          markdownUrl={`${page.url}.mdx`}
          githubUrl={`https://github.com/${gitConfig.user}/${gitConfig.repo}/blob/${gitConfig.branch}/content/react/${page.path}`}
        />
      </div>
      <DocsBody>
        <MDX
          components={getMDXComponents({
            a: createRelativeLink(reactSource, page),
          } as MDXComponents)}
        />
      </DocsBody>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return reactSource.generateParams();
}

export async function generateMetadata(
  props: PageProps<"/react/[[...slug]]">,
): Promise<Metadata> {
  const params = await props.params;
  const page = reactSource.getPage(params.slug);
  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
  };
}
