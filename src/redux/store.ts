// src/store/store.ts
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./authSlice";
import moduleAjarReducer from "./moduleAjarSlice";

// Konfigurasi persist untuk authReducer
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "moduleAjar"], // Mengatur state yang akan dipersist
};

// const persistedReducer = persistReducer(persistConfig, authReducer);

const rootReducer = {
  auth: persistReducer(persistConfig, authReducer),
  moduleAjar: persistReducer(persistConfig, moduleAjarReducer),
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
