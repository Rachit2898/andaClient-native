import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getToken } from "../../utils";
import { login, firstLogin } from "../../utils";
import _ from "lodash";

export const signin = createAsyncThunk("signin", async (body) => {
  const result = await login(body);
  return result;
});
export function containsObject(obj, list) {
  var i;
  for (i = 0; i < list.length; i++) {
    if (list[i].item === obj.item) {
      return true;
    }
  }

  return false;
}

const initialState = {
  token: "",
  loading: false,
  inventoryWatchUrls: [],
  customerLikeYouUrls: [],
  preNegotiatedUrls: [],
  favoritesUrls: [],
  priceReductionUrls: [],
  savingUrls: [],
  closeOutUrls: [],
  shortDateUrls: [],
  isAuthenticated: false,
  sortingUrl: "",
};

const authReducer = createSlice({
  name: "token",
  initialState,

  reducers: {
    logout: (state, action) => {
      state.isAuthenticated = action.payload;
      AsyncStorage.removeItem("token");
    },
    authenticate: (state, action) => {
      state.token = action.payload;
      state.isAuthenticated = true;
    },
    updateIntventoryUrls: (state, action) => {
      if (containsObject(action.payload, state.inventoryWatchUrls)) {
        _.pull(
          state.inventoryWatchUrls,
          _.find(state.inventoryWatchUrls, { item: action.payload.item })
        );
      } else {
        state.inventoryWatchUrls.push(action.payload);
      }
    },
    updateCustomerLikeYouUrls: (state, action) => {
      if (containsObject(action.payload, state.customerLikeYouUrls)) {
        _.pull(
          state.customerLikeYouUrls,
          _.find(state.customerLikeYouUrls, { item: action.payload.item })
        );
      } else {
        state.customerLikeYouUrls.push(action.payload);
      }
    },
    updatePreNegotiatedUrls: (state, action) => {
      if (containsObject(action.payload, state.preNegotiatedUrls)) {
        _.pull(
          state.preNegotiatedUrls,
          _.find(state.preNegotiatedUrls, { item: action.payload.item })
        );
      } else {
        state.preNegotiatedUrls.push(action.payload);
      }
    },
    updateFavoriteUrls: (state, action) => {
      if (containsObject(action.payload, state.favoritesUrls)) {
        _.pull(
          state.favoritesUrls,
          _.find(state.favoritesUrls, { item: action.payload.item })
        );
      } else {
        state.favoritesUrls.push(action.payload);
      }
    },
    updatePriceReductionsUrls: (state, action) => {
      if (containsObject(action.payload, state.priceReductionUrls)) {
        _.pull(
          state.priceReductionUrls,
          _.find(state.priceReductionUrls, { item: action.payload.item })
        );
      } else {
        state.priceReductionUrls.push(action.payload);
      }
    },
    updateSavingUrls: (state, action) => {
      if (containsObject(action.payload, state.savingUrls)) {
        _.pull(
          state.savingUrls,
          _.find(state.savingUrls, { item: action.payload.item })
        );
      } else {
        state.savingUrls.push(action.payload);
      }
    },
    updateCloseOutUrls: (state, action) => {
      if (containsObject(action.payload, state.closeOutUrls)) {
        _.pull(
          state.closeOutUrls,
          _.find(state.closeOutUrls, { item: action.payload.item })
        );
      } else {
        state.closeOutUrls.push(action.payload);
      }
    },
    updateShortDateUrls: (state, action) => {
      if (containsObject(action.payload, state.shortDateUrls)) {
        _.pull(
          state.shortDateUrls,
          _.find(state.shortDateUrls, { item: action.payload.item })
        );
      } else {
        state.shortDateUrls.push(action.payload);
      }
    },
    setSorting: (state, action) => {
      state.sortingUrl = action.payload;
    },
  },
  extraReducers: {
    [signin.pending]: (state, action) => {
      state.loading = true;
    },
    [signin.fulfilled]: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
    },
    [signin.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  logout,
  authenticate,
  updateIntventoryUrls,
  updateCustomerLikeYouUrls,
  updatePreNegotiatedUrls,
  updateFavoriteUrls,
  updatePriceReductionsUrls,
  setSorting,
} = authReducer.actions;
export default authReducer.reducer;
