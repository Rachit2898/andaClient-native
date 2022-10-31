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
  urlY: [],
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
    urlsUpdateY: (state, action) => {
      if (containsObject(action.payload, state.urlY)) {
        _.pull(state.urlY, _.find(state.urlY, { item: action.payload.item }));
      } else {
        state.urlY.push(action.payload);
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

export const { logout, authenticate, urlsUpdateY, setSorting } =
  authReducer.actions;
export default authReducer.reducer;
