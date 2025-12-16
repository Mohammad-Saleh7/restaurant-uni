import { configureStore, combineReducers } from "@reduxjs/toolkit";

import cartReducer from "./cartSlice";
import searchReducer from "./searchSlice";
import authReducer from "./authSlice";
import preferencesReducer from "./preferencesSlice"; // ✅ AI prefs

import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import storage from "redux-persist/lib/storage";

/* ---------------- Root Reducer ---------------- */
const rootReducer = combineReducers({
  cart: cartReducer,
  search: searchReducer,
  auth: authReducer,
  preferences: preferencesReducer, // ✅ اضافه شد
});

/* ---------------- Persist Config ---------------- */
const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["cart", "search", "auth", "preferences"], // ✅ preferences هم ذخیره شود
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

/* ---------------- Store ---------------- */
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

/* ---------------- Persistor ---------------- */
export const persistor = persistStore(store);

/* ---------------- Types ---------------- */
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
