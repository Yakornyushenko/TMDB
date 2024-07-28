import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "@/src/lib/store/rootReducer";
import { localStorageMiddleware } from "@/src/lib/store/middleware";

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(localStorageMiddleware),
  });
};
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
