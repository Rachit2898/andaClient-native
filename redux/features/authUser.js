import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getToken } from "../../utils";
import { login, changePassword } from "../../utils";
import _ from "lodash";

export const signin = createAsyncThunk("signin", async (body) => {
  const result = await login(body);
  return result;
});
export const changeUserPassword = createAsyncThunk(
  "changePassword",
  async (body) => {
    const credentials = {
      currentPassword: body.currentPassword,
      newPassword: body.newPassword,
    };
    const result = await changePassword(credentials);
    return result;
  }
);
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
  isFinger: false,
  searchedValue: "",
  inventoryWatchUrls: [],
  customerLikeYouUrls: [],
  preNegotiatedUrls: [],
  favoritesUrls: [],
  priceReductionUrls: [],
  savingUrls: [],
  closeOutUrls: [],
  shortDateUrls: [],
  searchProductUrls: [],
  andaContractItemsUrls: [],
  isAuthenticated: false,
  sortingUrl: "",
  changeUserPasswordData: {},
  changePasswordValue: false,
  cartName: "Home",
};

const authReducer = createSlice({
  name: "token",
  initialState,

  reducers: {
    logout: (state, action) => {
      AsyncStorage.removeItem("token");
      AsyncStorage.clear();
      state.isAuthenticated = action.payload;
    },
    fingers: (state, action) => {
      state.isFinger = action.payload;
    },
    searchValues: (state, action) => {
      state.searchedValue = action.payload;
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
    updateSearchProductUrls: (state, action) => {
      if (containsObject(action.payload, state.searchProductUrls)) {
        _.pull(
          state.searchProductUrls,
          _.find(state.searchProductUrls, { item: action.payload.item })
        );
      } else {
        state.searchProductUrls.push(action.payload);
      }
    },
    updateAndaContractItemsUrls: (state, action) => {
      if (containsObject(action.payload, state.andaContractItemsUrls)) {
        _.pull(
          state.andaContractItemsUrls,
          _.find(state.andaContractItemsUrls, { item: action.payload.item })
        );
      } else {
        state.andaContractItemsUrls.push(action.payload);
      }
    },
    setSorting: (state, action) => {
      state.sortingUrl = action.payload;
    },
    cartColor: (state, action) => {
      state.cartName = action.payload;
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
    [changeUserPassword.pending]: (state, action) => {
      state.loading = true;
    },
    [changeUserPassword.fulfilled]: (state, action) => {
      state.loading = false;
      state.changeUserPasswordData = action.payload;
      state.changePasswordValue = false;
    },
    [changeUserPassword.rejected]: (state, action) => {
      state.loading = false;
      state.changePasswordValue = true;
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
  searchValues,
  fingers,
  cartColor,
  updateAndaContractItemsUrls,
  updateSearchProductUrls,
} = authReducer.actions;
export default authReducer.reducer;
