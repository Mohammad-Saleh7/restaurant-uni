import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface PreferencesState {
  likedCategories: Record<string, number>;
  viewedItems: Record<string, number>;
  lastViewedItemId: string | null;
}

const initialState: PreferencesState = {
  likedCategories: {},
  viewedItems: {},
  lastViewedItemId: null,
};

const preferencesSlice = createSlice({
  name: "preferences",
  initialState,
  reducers: {
    trackView(
      state,
      action: PayloadAction<{ itemId: string; categoryId: string }>
    ) {
      const { itemId, categoryId } = action.payload;

      state.viewedItems[itemId] = (state.viewedItems[itemId] || 0) + 1;

      state.likedCategories[categoryId] =
        (state.likedCategories[categoryId] || 0) + 1;

      state.lastViewedItemId = itemId;
    },

    trackAddToCart(
      state,
      action: PayloadAction<{ itemId: string; categoryId: string }>
    ) {
      const { itemId, categoryId } = action.payload;

      state.likedCategories[categoryId] =
        (state.likedCategories[categoryId] || 0) + 3;

      state.viewedItems[itemId] = (state.viewedItems[itemId] || 0) + 2;
    },

    resetPreferences() {
      return initialState;
    },
  },
});

export const { trackView, trackAddToCart, resetPreferences } =
  preferencesSlice.actions;

export default preferencesSlice.reducer;
