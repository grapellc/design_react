export type Article = {
  id: string;
  title: string;
  content: string;
  author: string;
  categoryId: string;
  createdAt: string;
  isPopular?: boolean;
};

export type Category = {
  id: string;
  name: string;
};

export const CATEGORIES: Category[] = [
  { id: "travel", name: "Travel" },
  { id: "food", name: "Food" },
  { id: "lifestyle", name: "Lifestyle" },
];

export const ARTICLES: Article[] = [
  {
    id: "1",
    title: "Santorini sunset",
    content:
      "The golden hour over the blue Aegean and white buildings. One of the most romantic moments in Santorini.",
    author: "mollit",
    categoryId: "travel",
    createdAt: "2023-02-15T09:30:00Z",
  },
  {
    id: "2",
    title: "Bamboo forest in Kyoto",
    content:
      "A quiet walk through Arashiyama's bamboo grove. The sound of swaying bamboo brings peace of mind.",
    author: "sunt",
    categoryId: "travel",
    createdAt: "2023-05-22T14:15:00Z",
    isPopular: true,
  },
  {
    id: "3",
    title: "Alps hiking guide",
    content:
      "Beginner-friendly trekking in the Swiss Alps. A 2-hour route from Grindelwald with views of the Eiger north face.",
    author: "ullamco",
    categoryId: "travel",
    createdAt: "2023-10-15T12:10:00Z",
  },
  {
    id: "4",
    title: "Secrets of homemade pasta",
    content:
      "With fresh noodles and sauce you can make restaurant-quality pasta. Olive oil and garlic amount make the difference.",
    author: "dolore",
    categoryId: "food",
    createdAt: "2023-03-30T16:20:00Z",
  },
  {
    id: "5",
    title: "How to pick seasonal strawberries",
    content:
      "Spring strawberries should have vivid green stems. Look for glossy red and a subtle fragrance.",
    author: "aliqua",
    categoryId: "food",
    createdAt: "2023-06-18T10:05:00Z",
  },
  {
    id: "6",
    title: "Coffee brewing tips",
    content:
      "Water at 92°C, medium grind, 3-minute brew. The golden ratio is 15g beans per 200ml water.",
    author: "consectetur",
    categoryId: "food",
    createdAt: "2023-09-25T13:40:00Z",
  },
  {
    id: "7",
    title: "Minimal home decor",
    content:
      "Clear out unnecessary items and create a clean space with white-toned basics.",
    author: "adipisicing",
    categoryId: "lifestyle",
    createdAt: "2023-04-12T15:55:00Z",
    isPopular: true,
  },
  {
    id: "8",
    title: "The power of morning routine",
    content:
      "Start with waking 5 minutes earlier. A glass of warm water and light stretching for an energetic morning.",
    author: "elit",
    categoryId: "lifestyle",
    createdAt: "2023-07-28T08:25:00Z",
    isPopular: true,
  },
  {
    id: "9",
    title: "Air-purifying houseplants",
    content:
      "ZZ plant, peace lily, and snake plant are easy to care for and great at purifying indoor air.",
    author: "exercitation",
    categoryId: "lifestyle",
    createdAt: "2023-08-07T11:45:00Z",
  },
  {
    id: "10",
    title: "Building a reading habit",
    content:
      "Start with 10 pages a day. Twenty minutes of reading before bed improves sleep quality too.",
    author: "magna",
    categoryId: "lifestyle",
    createdAt: "2023-12-03T17:35:00Z",
    isPopular: true,
  },
];
