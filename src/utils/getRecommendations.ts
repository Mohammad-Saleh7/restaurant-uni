import type { PreferencesState } from "../redux/preferencesSlice";

interface Item {
  id: string;
  categoryId: string;
}

export function getRecommendations(
  items: Item[],
  prefs: PreferencesState,
  excludeIds: string[],
  limit = 4
) {
  const scored = items
    .filter((i) => !excludeIds.includes(i.id))
    .map((item) => {
      let score = 0;

      score += prefs.likedCategories[item.categoryId] || 0;
      score += prefs.viewedItems[item.id] || 0;

      return { item, score };
    });

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((s) => s.item);
}
