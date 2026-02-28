"use client";

import { useState, useMemo } from "react";
import type { ActivityComponentType } from "@stackflow/react/future";
import { useActions } from "@stackflow/react";
import { AppBar, AppBarMain } from "grapu-design/ui/app-bar";
import { AppScreen, AppScreenContent } from "grapu-design/ui/app-screen";
import {
  TabsRoot,
  TabsTrigger,
  TabsList,
  TabsCarousel,
  TabsContent,
} from "grapu-design/ui/tabs";
import { SnackbarProvider } from "grapu-design/ui/snackbar";
import { ResultSection } from "grapu-design/ui/result-section";
import {
  IconSquare2StackedFill,
  IconChevronDownFill,
} from "@grapu-design/icons";
import { Flex, HStack, VStack, Icon, Box, Text, Badge, Portal } from "@grapu-design/react";
import { TagGroupRoot, TagGroupItem } from "grapu-design/ui/tag-group";
import { Chip } from "grapu-design/ui/chip";
import {
  BottomSheetBody,
  BottomSheetRoot,
  BottomSheetContent,
  BottomSheetFooter,
  BottomSheetTrigger,
} from "grapu-design/ui/bottom-sheet";
import { ActionButton } from "grapu-design/ui/action-button";
import { Snackbar, useSnackbarAdapter } from "grapu-design/ui/snackbar";
import { ARTICLES, CATEGORIES, type Article, type Category } from "./demo-data";
import { Avatar } from "grapu-design/ui/avatar";
import { IdentityPlaceholder } from "grapu-design/ui/identity-placeholder";
import { formatDate } from "./utils/date";
import { useActivityZIndexBase } from "@grapu-design/stackflow";
import { tabsCarouselPreventDrag } from "@grapu-design/react";

declare module "@stackflow/config" {
  interface Register {
    "demo/home": {};
  }
}

const TABS = [
  { label: "Recommendations", value: "recommendations" },
  { label: "Subscriptions", value: "subscriptions" },
] as const satisfies { label: string; value: string }[];

type Tab = (typeof TABS)[number]["value"];

const FILTERS = [
  { label: "Category", value: "category" },
  { label: "Location", value: "location" },
  { label: "Author", value: "author" },
  { label: "Date", value: "createdAt" },
] as const satisfies { label: string; value: string }[];

type Filter = (typeof FILTERS)[number]["value"];

const DemoHomeActivity: ActivityComponentType<"demo/home"> = () => {
  const [tab, setTab] = useState<Tab>("recommendations");

  return (
    <SnackbarProvider>
      <style
        dangerouslySetInnerHTML={{
          __html: "::-webkit-scrollbar{display:none}",
        }}
      />
      <AppScreen theme="cupertino">
        <AppBar>
          <AppBarMain title="Demo" />
        </AppBar>
        <AppScreenContent>
          <TabsRoot
            value={tab}
            onValueChange={(value) => setTab(value as Tab)}
            triggerLayout="fill"
            size="medium"
            stickyList
          >
            <TabsList>
              {TABS.map(({ label, value }) => (
                <TabsTrigger key={value} value={value}>
                  {label}
                </TabsTrigger>
              ))}
            </TabsList>
            <TabsCarousel swipeable>
              <TabsContent value={TABS[0].value}>
                <Recommendations />
              </TabsContent>
              <TabsContent value={TABS[1].value}>
                <VStack py="x12" pb="safeArea">
                  <ResultSection
                    asset={
                      <Box pb="x4">
                        <Icon svg={<IconSquare2StackedFill />} size="x10" color="fg.neutralSubtle" />
                      </Box>
                    }
                    title="No subscriptions yet."
                    description="Check out recommended articles."
                    primaryActionProps={{
                      children: "See recommendations",
                      onClick: () => setTab("recommendations"),
                    }}
                  />
                </VStack>
              </TabsContent>
            </TabsCarousel>
          </TabsRoot>
        </AppScreenContent>
      </AppScreen>
    </SnackbarProvider>
  );
};

function Recommendations() {
  const [currentFilterBottomSheet, setCurrentFilterBottomSheet] = useState<Filter | null>(null);

  const defaultFilters = useMemo(
    () => ({
      category: [] as string[],
      location: [] as string[],
      author: [] as string[],
      createdAt: [] as string[],
    }),
    [],
  );

  const [selectedFilters, setSelectedFilters] = useState<Record<Filter, string[]>>(defaultFilters);

  const adapter = useSnackbarAdapter();

  const onUnavailableFilterClick = () =>
    adapter.create({
      render: () => (
        <Snackbar
          message="You can only filter by category."
          variant="critical"
          actionLabel="OK"
          onAction={adapter.dismiss}
        />
      ),
    });

  const filteredArticles = useMemo(() => {
    let filtered = ARTICLES;

    if (selectedFilters.category?.length) {
      filtered = ARTICLES.filter((article) =>
        selectedFilters.category?.includes(article.categoryId),
      );
    }

    return filtered;
  }, [selectedFilters]);

  const handleFilterConfirm = (filter: Filter, values: string[]) => {
    setSelectedFilters((prev) => ({ ...prev, [filter]: values }));
  };

  return (
    <VStack gap="spacingY.componentDefault" py="x4" pb="safeArea">
      <Flex
        gap="spacingX.betweenChips"
        px="spacingX.globalGutter"
        overflowX="auto"
        {...tabsCarouselPreventDrag}
      >
        {FILTERS.map(({ label, value }) => (
          <BottomSheetRoot
            key={value}
            closeOnEscape
            closeOnInteractOutside
            open={currentFilterBottomSheet === value}
            onOpenChange={(open) => setCurrentFilterBottomSheet(open ? value : null)}
          >
            {value === "category" ? (
              <BottomSheetTrigger asChild>
                <Chip.Button onClick={value !== "category" ? onUnavailableFilterClick : undefined}>
                  <Chip.Label>
                    {selectedFilters[value]?.length
                      ? selectedFilters[value]
                          .map((id) => CATEGORIES.find((c) => c.id === id)?.name)
                          .join(", ") || label
                      : label}
                  </Chip.Label>
                  <Chip.SuffixIcon>
                    <Icon svg={<IconChevronDownFill />} />
                  </Chip.SuffixIcon>
                </Chip.Button>
              </BottomSheetTrigger>
            ) : (
              <Chip.Button onClick={onUnavailableFilterClick}>
                <Chip.Label>{label}</Chip.Label>
                <Chip.SuffixIcon>
                  <Icon svg={<IconChevronDownFill />} />
                </Chip.SuffixIcon>
              </Chip.Button>
            )}
            <Portal>
              <FilterBottomSheet
                filter={value}
                currentFilter={selectedFilters[value]}
                onClose={() => setCurrentFilterBottomSheet(null)}
                onConfirm={(values) => handleFilterConfirm(value, values)}
              />
            </Portal>
          </BottomSheetRoot>
        ))}
      </Flex>
      <VStack gap="x4" as="ul">
        {filteredArticles
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
          .map((article) => (
            <li key={article.id}>
              <ArticleListItem {...article} />
            </li>
          ))}
      </VStack>
    </VStack>
  );
}

function FilterBottomSheet({
  filter,
  currentFilter,
  onClose,
  onConfirm,
}: {
  filter: string;
  currentFilter: string[];
  onClose: () => void;
  onConfirm: (values: string[]) => void;
}) {
  const options = useMemo(() => {
    switch (filter) {
      case "category":
        return CATEGORIES;
      default:
        return [];
    }
  }, [filter]);

  const [selectedOptions, setSelectedOptions] = useState<string[]>(currentFilter);

  return (
    <BottomSheetContent
      title={FILTERS.find((f) => f.value === filter)?.label}
      layerIndex={useActivityZIndexBase({ activityOffset: 1 })}
    >
      <BottomSheetBody>
        <HStack gap="x2" wrap>
          {options.map((option: Category) => (
            <Chip.Toggle
              variant="outlineStrong"
              key={option.id}
              checked={selectedOptions.includes(option.id)}
              onCheckedChange={(checked) =>
                setSelectedOptions((prev) =>
                  checked ? [...prev, option.id] : prev.filter((id) => id !== option.id),
                )
              }
            >
              <Chip.Label>{option.name}</Chip.Label>
            </Chip.Toggle>
          ))}
        </HStack>
      </BottomSheetBody>
      <BottomSheetFooter>
        <HStack pt="x3">
          <ActionButton
            flexGrow
            size="large"
            variant="neutralSolid"
            onClick={() => {
              onConfirm(selectedOptions);
              onClose();
            }}
          >
            Done
          </ActionButton>
        </HStack>
      </BottomSheetFooter>
    </BottomSheetContent>
  );
}

type ArticleProps = Article;

function ArticleListItem(article: ArticleProps) {
  const { title, content, author, categoryId, createdAt, isPopular } = article;
  const categoryName = CATEGORIES.find((c) => c.id === categoryId)?.name;
  const actions = useActions();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    actions?.push("demo/article-detail", { articleId: article.id });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="w-full text-left border-0 bg-transparent p-0 cursor-pointer relative z-[1]"
      style={{ font: "inherit" }}
    >
      <VStack
        gap="x2_5"
        px="spacingX.globalGutter"
        py="x1"
        style={{ textAlign: "start" }}
      >
        <HStack justify="space-between" align="center">
          <HStack gap="x1_5" align="center" flexGrow={1}>
            <Avatar
              fallback={<IdentityPlaceholder identity="person" />}
              size="20"
              style={{ zIndex: -1 }}
            />
            <Text textStyle="t4Medium" color="fg.neutral">
              {author}
            </Text>
          </HStack>
        </HStack>
        <VStack gap="x2">
          <VStack gap="x1">
            <Text as="h1" textStyle="t5Bold" color="fg.neutral" maxLines={1}>
              {title}
            </Text>
            <Text as="p" textStyle="t4Regular" color="fg.neutralMuted" maxLines={2}>
              {content}
            </Text>
          </VStack>
          <HStack align="center" gap="x2">
            {isPopular && (
              <Badge variant="outline" tone="brand">
                Popular
              </Badge>
            )}
            <TagGroupRoot size="t4" tone="neutralSubtle">
              <TagGroupItem label={categoryName} />
              <TagGroupItem label="Local" />
              <TagGroupItem label={formatDate(createdAt)} />
            </TagGroupRoot>
          </HStack>
        </VStack>
      </VStack>
    </button>
  );
}

export default DemoHomeActivity;
