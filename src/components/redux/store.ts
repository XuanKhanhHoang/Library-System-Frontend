import { configureStore } from "@reduxjs/toolkit";
import ReservationReducer from "./feature/documentReservation";
import MarkedDocumentReducer from "./feature/markedDocument";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { setupListeners } from "@reduxjs/toolkit/query";
const store = configureStore({
  reducer: { ReservationReducer, MarkedDocumentReducer },
});
setupListeners(store.dispatch);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const AppUseSelector: TypedUseSelectorHook<RootState> = useSelector;
export default store;
