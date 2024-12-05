import { createSlice, PayloadAction } from "@reduxjs/toolkit";
type initialState = {
  value: number[];
};
const initialState: initialState = {
  value: [],
};

export const MarkedDocument = createSlice({
  name: "MarkedDocument",
  initialState: initialState,
  reducers: {
    refreshMarkedDocument: (state, action: PayloadAction<number[]>) => {
      state.value = action.payload;
    },
    addMarkedDocument: (state, action: PayloadAction<number>) => {
      const MarkedDocuments = state.value;
      const { payload } = action;
      MarkedDocuments.push(payload);
    },
    deleteMarkedDocument: (state, action: PayloadAction<Number>) => {
      const MarkedDocuments = state.value;
      const { payload } = action;
      const index = MarkedDocuments.findIndex((item) => item == payload);
      if (index > -1) {
        let tmp = MarkedDocuments.filter((item) => item != action.payload);
        state.value = tmp;
      }
    },
    emptyMarkedDocument: (state) => {
      state.value = [];
    },
  },
});
export const {
  addMarkedDocument,
  deleteMarkedDocument,
  emptyMarkedDocument,
  refreshMarkedDocument,
} = MarkedDocument.actions;
export default MarkedDocument.reducer;
