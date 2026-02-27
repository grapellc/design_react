import type { ActivityComponentType } from "@stackflow/react/future";
import { AppScreen, AppScreenContent } from "grape_design_react/ui/app-screen";
import {
  AppBar,
  AppBarBackButton,
  AppBarCloseButton,
  AppBarRight,
  AppBarLeft,
} from "grape_design_react/ui/app-bar";
import type { AppBarProps } from "grape_design_react/ui/app-bar";
import { VStack, HStack, Box, Article as SeedArticle } from "@grape_design_react/react";
import { TagGroupRoot, TagGroupItem } from "grape_design_react/ui/tag-group";
import { Text } from "@grape_design_react/react";
import { Badge } from "@grape_design_react/react";
import { SegmentedControl, SegmentedControlItem } from "grape_design_react/ui/segmented-control";
import { Callout } from "grape_design_react/ui/callout";
import { TextField, TextFieldTextarea } from "grape_design_react/ui/text-field";
import { ActionButton } from "grape_design_react/ui/action-button";
import { Skeleton } from "@grape_design_react/react";
import { IconILowercaseSerifCircleFill } from "@karrotmarket/react-monochrome-icon";
import { useState, useEffect, useRef } from "react";
import { ResultSection } from "grape_design_react/ui/result-section";
import { CATEGORIES, type Article, ARTICLES } from "../demo-data";
import { Avatar } from "grape_design_react/ui/avatar";
import { IdentityPlaceholder } from "grape_design_react/ui/identity-placeholder";
import { formatDate } from "../utils/date";
import img from "../assets/peng.jpeg";

declare module "@stackflow/config" {
  interface Register {
    ActivityDemoArticleDetail: {
      articleId: Article["id"];
    };
  }
}

const SEGMENTS = [
  { value: "popular", label: "인기" },
  { value: "latest", label: "최근" },
] as const satisfies { value: string; label: string }[];

const ActivityDemoArticleDetail: ActivityComponentType<"ActivityDemoArticleDetail"> = ({
  params: { articleId },
}: {
  params: { articleId: Article["id"] };
}) => {
  const article = ARTICLES.find((a) => a.id === articleId);

  const categoryName = CATEGORIES.find((c) => c.id === article?.categoryId)?.name;
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [tone, setTone] = useState<AppBarProps["tone"]>("transparent");
  const imageBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setTone(entry.isIntersecting ? "transparent" : "layer"),
      { threshold: [0, 0.1, 0.5, 1], rootMargin: "0px" },
    );

    if (imageBoxRef.current) {
      observer.observe(imageBoxRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  if (!article) return null;

  return (
    <AppScreen layerOffsetTop="none" tone={tone}>
      <AppBar>
        <AppBarLeft>
          <AppBarBackButton />
        </AppBarLeft>
        <AppBarRight>
          <AppBarCloseButton />
        </AppBarRight>
      </AppBar>
      <AppScreenContent>
        <VStack gap="x4">
          <Box
            ref={imageBoxRef}
            style={{ aspectRatio: "1 / 1", position: "relative", isolation: "isolate" }}
          >
            <img
              src={img}
              alt="penguin"
              onLoad={() => setIsImageLoading(false)}
              style={{
                position: "absolute",
                zIndex: 1,
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
            {isImageLoading && <Skeleton width="full" height="full" radius="0" />}
          </Box>
          <VStack gap="x6" pb="x4">
            <VStack px="spacingX.globalGutter" gap="spacingY.componentDefault" align="flex-start">
              {article.isPopular && (
                <Badge variant="outline" tone="brand" size="large">
                  인기
                </Badge>
              )}
              <VStack gap="x2" asChild>
                <SeedArticle>
                  <Text as="h1" textStyle="t7Bold" color="fg.neutral">
                    {article.title}
                  </Text>
                  <Text
                    as="p"
                    textStyle="articleBody"
                    color="fg.neutralMuted"
                    style={{ wordBreak: "keep-all" }}
                  >
                    {article.content}
                  </Text>
                </SeedArticle>
              </VStack>
              <HStack width="full" align="center">
                <HStack gap="x1_5" align="center" flexGrow={1}>
                  <Avatar
                    fallback={<IdentityPlaceholder identity="person" />}
                    size="20"
                    style={{ zIndex: -1 }}
                  />
                  <Text textStyle="t4Medium" color="fg.neutral">
                    {article.author}
                  </Text>
                </HStack>
                <TagGroupRoot size="t3" tone="neutralSubtle">
                  <TagGroupItem label={categoryName} />
                  <TagGroupItem label={formatDate(article.createdAt)} />
                </TagGroupRoot>
              </HStack>
            </VStack>
            <VStack px="spacingX.globalGutter" gap="spacingY.componentDefault">
              <Callout
                tone="neutral"
                description="따뜻한 댓글을 남겨주세요."
                prefixIcon={<IconILowercaseSerifCircleFill />}
              />
              <SegmentedControl
                aria-label="댓글 정렬 방식"
                defaultValue={SEGMENTS[0].value}
                style={{ width: "100%" }}
              >
                {SEGMENTS.map((tab) => (
                  <SegmentedControlItem key={tab.value} value={tab.value}>
                    {tab.label}
                  </SegmentedControlItem>
                ))}
              </SegmentedControl>
              <Box py="x3">
                <ResultSection size="medium" title="댓글 없음" description="댓글이 없습니다." />
              </Box>
              <TextField label="댓글" maxGraphemeCount={200}>
                <TextFieldTextarea placeholder="저는…" />
              </TextField>
              <ActionButton size="large" variant="neutralSolid">
                게시
              </ActionButton>
            </VStack>
          </VStack>
        </VStack>
      </AppScreenContent>
    </AppScreen>
  );
};

export default ActivityDemoArticleDetail;
