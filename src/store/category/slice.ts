import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICategory } from "../../types/category";
import { createCategory, deleteCategory, getCategory, updateCategory } from "./async";

interface categoryState {
  category: ICategory[];
  loading: boolean;
  error: string | null;
}

const initialState: categoryState = {
  category: [],
  loading: false,
  error: null,
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // get category
    builder
      .addCase(getCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCategory.fulfilled, (state, action) => {
        state.category = action.payload.category;
        state.loading = false;
      })
      .addCase(getCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // add category
    builder
      .addCase(createCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        createCategory.fulfilled,
        (state, action: PayloadAction<ICategory>) => {
          state.category.push(action.payload);
          state.loading = false;
        }
      )
      .addCase(createCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // update category
    builder
      .addCase(updateCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateCategory.fulfilled,
        (state, action: PayloadAction<ICategory>) => {
          const updateCategoryIndex = state.category.findIndex(
            (category) => category.id === action.payload.id
          );

          if (updateCategoryIndex !== -1) {
            state.category[updateCategoryIndex] = action.payload;
          }

          state.loading = false;
        }
      )
      .addCase(updateCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    //   delete category
    builder
      .addCase(deleteCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.category = state.category.filter(
          (category) => category.id !== action.payload
        );
        state.loading = false;
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default categorySlice.reducer;
