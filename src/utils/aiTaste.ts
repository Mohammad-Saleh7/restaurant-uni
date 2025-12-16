// src/utils/aiTaste.ts
export type Lang = "fa" | "en";

export type TasteProfile = {
  version: number;
  updatedAt: number;

  // items user interacted with
  views: Record<string, number>;
  cartAdds: Record<string, number>;

  // preferences
  categoryScores: Record<string, number>;
  tagScores: Record<string, number>;
};

export type MenuItem = {
  id: string;
  name: { fa: string; en: string };
  description: { fa: string; en: string };
  price: number;
  image: string;
};

export type MenuCategory = {
  id: string;
  name: { fa: string; en: string };
  items: MenuItem[];
};

const LS_KEY = "ai_taste_profile_v1";

const DEFAULT_PROFILE: TasteProfile = {
  version: 1,
  updatedAt: Date.now(),
  views: {},
  cartAdds: {},
  categoryScores: {},
  tagScores: {},
};

function safeJsonParse<T>(s: string | null): T | null {
  if (!s) return null;
  try {
    return JSON.parse(s) as T;
  } catch {
    return null;
  }
}

export function loadTasteProfile(): TasteProfile {
  const p = safeJsonParse<TasteProfile>(localStorage.getItem(LS_KEY));
  if (!p || p.version !== 1)
    return { ...DEFAULT_PROFILE, updatedAt: Date.now() };

  return {
    ...DEFAULT_PROFILE,
    ...p,
    views: p.views || {},
    cartAdds: p.cartAdds || {},
    categoryScores: p.categoryScores || {},
    tagScores: p.tagScores || {},
  };
}

export function saveTasteProfile(p: TasteProfile) {
  p.updatedAt = Date.now();
  localStorage.setItem(LS_KEY, JSON.stringify(p));
}

export function resetTasteProfile() {
  localStorage.removeItem(LS_KEY);
}

/** ---------- Tagging (simple, local AI) ---------- */
function norm(str: string) {
  return (str || "")
    .toLowerCase()
    .replace(/ي/g, "ی")
    .replace(/ك/g, "ک")
    .replace(/[آإأ]/g, "ا")
    .replace(/\s+/g, " ")
    .trim();
}

function includesAny(text: string, words: string[]) {
  return words.some((w) => text.includes(w));
}

export function extractTags(item: MenuItem) {
  const text = norm(
    `${item.name.en} ${item.description.en} ${item.name.fa} ${item.description.fa}`
  );

  const tags: string[] = [];

  // category-ish food tags
  if (includesAny(text, ["pizza", "پیتزا"])) tags.push("pizza");
  if (includesAny(text, ["burger", "برگر"])) tags.push("burger");
  if (includesAny(text, ["pasta", "alfredo", "پاستا", "آلفردو"]))
    tags.push("pasta");
  if (includesAny(text, ["steak", "استیک"])) tags.push("steak");
  if (includesAny(text, ["salmon", "سالمون", "fish", "ماهی"]))
    tags.push("seafood");
  if (includesAny(text, ["vegan", "وگان"])) tags.push("vegan");
  if (includesAny(text, ["salad", "سالاد"])) tags.push("salad");
  if (includesAny(text, ["soup", "سوپ"])) tags.push("soup");
  if (includesAny(text, ["hummus", "حمص"])) tags.push("hummus");
  if (includesAny(text, ["falafel", "فلافل"])) tags.push("falafel");
  if (
    includesAny(text, ["coffee", "espresso", "latte", "قهوه", "اسپرسو", "لاته"])
  )
    tags.push("coffee");
  if (includesAny(text, ["tea", "چای"])) tags.push("tea");
  if (includesAny(text, ["juice", "آب", "orange", "پرتقال"]))
    tags.push("juice");
  if (includesAny(text, ["mojito", "موهیتو"])) tags.push("mocktail");

  // fallback
  if (!tags.length) tags.push("general");

  return Array.from(new Set(tags));
}

/** ---------- Training signals ---------- */
export function trackView(itemId: string, categoryId: string, item: MenuItem) {
  const p = loadTasteProfile();
  p.views[itemId] = (p.views[itemId] || 0) + 1;

  // view signal (weak)
  p.categoryScores[categoryId] = (p.categoryScores[categoryId] || 0) + 1;

  const tags = extractTags(item);
  for (const tag of tags) p.tagScores[tag] = (p.tagScores[tag] || 0) + 1;

  saveTasteProfile(p);
}

export function trackAddToCart(
  itemId: string,
  categoryId: string,
  item: MenuItem
) {
  const p = loadTasteProfile();
  p.cartAdds[itemId] = (p.cartAdds[itemId] || 0) + 1;

  // add-to-cart signal (strong)
  p.categoryScores[categoryId] = (p.categoryScores[categoryId] || 0) + 6;

  const tags = extractTags(item);
  for (const tag of tags) p.tagScores[tag] = (p.tagScores[tag] || 0) + 6;

  saveTasteProfile(p);
}

export function hasAnyTasteData() {
  const p = loadTasteProfile();
  return Object.keys(p.views).length > 0 || Object.keys(p.cartAdds).length > 0;
}

/** ---------- Recommendation ---------- */
export type Recommendation = {
  item: MenuItem;
  categoryId: string;
  score: number;
  reasons: string[]; // tags/categories user likes
};

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n));
}

export function recommendItems(args: {
  categories: MenuCategory[];
  excludeItemIds?: string[];
  limit?: number;
}) {
  const { categories, excludeItemIds = [], limit = 4 } = args;
  const exclude = new Set(excludeItemIds);

  const p = loadTasteProfile();

  const all: { item: MenuItem; categoryId: string }[] = [];
  for (const c of categories)
    for (const it of c.items) all.push({ item: it, categoryId: c.id });

  const scored: Recommendation[] = all
    .filter(({ item }) => !exclude.has(item.id))
    .map(({ item, categoryId }) => {
      const tags = extractTags(item);

      const catScore = p.categoryScores[categoryId] || 0;
      const tagScore = tags.reduce((sum, t) => sum + (p.tagScores[t] || 0), 0);

      // bonus if user already interacted with same item
      const seenBonus = clamp(
        (p.views[item.id] || 0) * 2 + (p.cartAdds[item.id] || 0) * 8,
        0,
        30
      );

      // simple scoring
      const score = catScore * 3 + tagScore * 2 + seenBonus;

      // reasons (top 2 tags user seems to like)
      const tagReasons = tags
        .map((t) => ({ t, v: p.tagScores[t] || 0 }))
        .filter((x) => x.v > 0)
        .sort((a, b) => b.v - a.v)
        .slice(0, 2)
        .map((x) => x.t);

      const reasons = [
        ...(catScore > 0 ? [`cat:${categoryId}`] : []),
        ...tagReasons.map((t) => `tag:${t}`),
      ];

      return { item, categoryId, score, reasons };
    })
    .sort((a, b) => b.score - a.score);

  return scored.slice(0, limit);
}
