// redux/store.js
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import jobSlice from "./slices/jobSlice";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { persistStore, persistReducer } from "redux-persist";

// --- Persist Config ---
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "job"], // Persist only auth and job slices
};

// --- Combine Reducers ---
const rootReducer = combineReducers({
  auth: authSlice,
  job: jobSlice,
});

// --- Wrap with persistReducer ---
const persistedReducer = persistReducer(persistConfig, rootReducer);

// --- Configure Store ---
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          "persist/PAUSE",
          "persist/FLUSH",
          "persist/PURGE",
          "persist/REGISTER",
        ],
      },
    }),
});

// --- Create Persistor ---
export const persistor = persistStore(store);
export default store;
