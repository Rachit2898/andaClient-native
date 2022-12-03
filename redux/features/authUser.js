import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getToken } from "../../utils";
import {
  login,
  changePassword,
  forgot_Password,
  reset_Password,
  forgot_user,
  register_user,
} from "../../utils";
import _ from "lodash";
import jwt_decode from "jwt-decode";

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
//https://staging.andanet.com/api/authentication/reset-password
export const forgotPassword = createAsyncThunk(
  "forgotPassword",
  async (body) => {
    console.log({ body });
    const credentials = {
      fingerprint: "723003fa07ed65c62a48ae4e7975a60b",
      recaptcha: body.token,
      username: body.name,
    };
    const result = await forgot_Password(credentials);
    return result;
  }
);
export const registerUser = createAsyncThunk("registerUser", async (body) => {
  console.log({ body });
  const credentials = {
    accountNumber: body.accountNumber,
    confirmPassword: body.confirmPassword,
    contactName: body.nameLastName,
    email: body.email,
    fingerprint: "723003fa07ed65c62a48ae4e7975a60b",
    password: body.password,
    stateLicense: body.license,
    username: body.userName,
  };
  const result = await register_user(credentials);
  return result;
});
export const resetPassword = createAsyncThunk("resetPassword", async (body) => {
  console.log({ body });
  const credentials = {
    fingerprint: "723003fa07ed65c62a48ae4e7975a60b",
    password: body.password,
    token: body.token,
  };
  const result = await reset_Password(credentials);

  return result;
});
export const forgotUser = createAsyncThunk("forgotUser", async (body) => {
  console.log({ body });
  const credentials = {
    recaptcha: body.token,
    emailAddress: body.email,
  };
  const result = await forgot_user(credentials);

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
  pushToken: "",
  message: "",
};

const authReducer = createSlice({
  name: "token",
  initialState,

  reducers: {
    logout: (state, action) => {
      AsyncStorage.removeItem("token");
      state.isAuthenticated = action.payload;
      state.token = "";
    },
    fingers: (state, action) => {
      state.isFinger = action.payload;
    },
    searchValues: (state, action) => {
      state.searchedValue = action.payload;
    },
    pushTokenApi: (state, action) => {
      state.pushToken = action.payload;
    },
    authenticate: (state, action) => {
      state.loading = true;
      const storedToken = action.payload;

      const jwt_Token_decoded = jwt_decode(storedToken);

      if (storedToken) {
        if (jwt_Token_decoded.exp * 1000 < Date.now()) {
          AsyncStorage.removeItem("token");
          state.isAuthenticated = false;
          state.token = "";
        } else {
          state.token = storedToken;
          state.isAuthenticated = true;
        }
      } else {
        state.token = storedToken;
        state.isAuthenticated = false;
      }
    },
    updateIntventoryUrls: (state, action) => {
      console.log("payload", action.payload, state.inventoryWatchUrls);
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
      console.log(action.payload);
    },
    cartColor: (state, action) => {
      state.cartName = action.payload;
    },
    removeUrls: (state, action) => {
      state.inventoryWatchUrls = [];
      state.customerLikeYouUrls = [];
      state.preNegotiatedUrls = [];
      state.favoritesUrls = [];
      state.priceReductionUrls = [];
      state.savingUrls = [];
      state.closeOutUrls = [];
      state.shortDateUrls = [];
      state.searchProductUrls = [];
      state.andaContractItemsUrls = [];
      state.sortingUrl = "";
    },
  },
  extraReducers: {
    [signin.pending]: (state, action) => {
      state.loading = true;
    },
    [signin.fulfilled]: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;

      state.token = action.payload;
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
    [forgotPassword.pending]: (state, action) => {
      state.loading = true;
    },
    [forgotPassword.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [forgotPassword.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [resetPassword.pending]: (state, action) => {
      state.loading = true;
    },
    [resetPassword.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [resetPassword.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [forgotUser.pending]: (state, action) => {
      state.loading = true;
    },
    [forgotUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    [forgotUser.rejected]: (state, action) => {
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
  updateSavingUrls,
  setSorting,
  searchValues,
  fingers,
  cartColor,
  updateAndaContractItemsUrls,
  updateSearchProductUrls,
  updateCloseOutUrls,
  pushTokenApi,
  removeUrls,
} = authReducer.actions;
export default authReducer.reducer;
