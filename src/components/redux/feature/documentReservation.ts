import { createSlice, PayloadAction } from "@reduxjs/toolkit";
type initialState = {
  value: Reservation[];
};
export type Reservation = {
  document_id: number;
  quantity: number;
};
const initialState: initialState = {
  value: [],
};

export const documentReservation = createSlice({
  name: "document_reservation",
  initialState: initialState,
  reducers: {
    refreshReservation: (state) => {
      let localItems: Reservation[] = JSON.parse(
        localStorage.getItem("document_reservation") || "[]"
      );
      if (!localItems || localItems.length == 0) {
        localStorage.setItem("document_reservation", "[]");
        return;
      }
      state.value = localItems;
    },
    addReservation: (state, action: PayloadAction<Reservation>) => {
      const reservations = state.value;
      const { payload } = action;
      reservations.push(payload);
      localStorage.setItem(
        "document_reservation",
        JSON.stringify(reservations)
      );
    },
    updateQuantityReservation: (state, action: PayloadAction<Reservation>) => {
      const reservations = state.value;
      const { payload } = action;
      if (action.payload.quantity < 0) return;
      const index = reservations.findIndex(
        (item) => item.document_id == payload.document_id
      );
      if (index == -1) return;
      reservations[index].quantity = payload.quantity;

      localStorage.setItem(
        "document_reservation",
        JSON.stringify(reservations)
      );
    },
    deleteReservation: (state, action: PayloadAction<Number>) => {
      const reservations = state.value;
      const { payload } = action;
      const index = reservations.findIndex(
        (item) => item.document_id == payload
      );
      if (index > -1) {
        let tmp = reservations.filter(
          (item) => item.document_id != action.payload
        );
        state.value = tmp;
        localStorage.setItem("document_reservation", JSON.stringify(tmp));
      }
    },
    emptyReservations: (state) => {
      state.value = [];
    },
  },
});
export const {
  addReservation,
  deleteReservation,
  emptyReservations,
  refreshReservation,
  updateQuantityReservation,
} = documentReservation.actions;
export default documentReservation.reducer;
