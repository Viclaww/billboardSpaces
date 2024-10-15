import { configureStore, combineReducers } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistStore, persistReducer } from "redux-persist";
import userSlice from "./dataSlices/user.slice";
import { generalApiSlice } from "./api/baseApiSlice";
const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};
const rootReducer = combineReducers({
  user: userSlice,
  [generalApiSlice.reducerPath]: generalApiSlice.reducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      generalApiSlice.middleware
    ),
  devTools: true,
});
export const persistor = persistStore(store);