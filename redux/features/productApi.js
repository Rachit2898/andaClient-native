import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
  getToken,
  addItems,
  emptyCart,
  cartValidate,
  checkOutCart,
  deleteItems,
} from "../../utils";

export const addItem = createAsyncThunk("additems", async (body) => {
  const result = await addItems(body);
  return result;
});
export const cartValidating = createAsyncThunk("cartValidating", async () => {
  const result = await cartValidate();
  return result;
});
export const emptyCartItems = createAsyncThunk("emptyCart", async (body) => {
  const result = await emptyCart(body);
  return result;
});
export const cartCheckOut = createAsyncThunk(
  "cartCheckOut",

  async (orderId) => {
    const result = await checkOutCart(orderId);
    return result;
  }
);
export const deleteItem = createAsyncThunk("deleteitems", async (body) => {
  const result = await deleteItems(body);
  return result;
});

export const yourTopPurChase = createAsyncThunk(
  "urls/topPurchase",
  async () => {
    const token = await getToken();

    var url =
      "https://staging.andanet.com/api/customer/product-list/49020/search?pageSize=4&availability=Available";

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    const myData = await response.json();

    return myData;
  }
);
export const customerLikeYou = createAsyncThunk(
  "urls/customerLikeYou",
  async () => {
    const token = await getToken();

    var url =
      "https://staging.andanet.com/api/customer/product-list/97580/search?pageSize=4&availability=Available&previouslyPurchased=Not%20Previously%20Purchased";

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    const myData = await response.json();
    return myData;
  }
);

export const preNegotiatedItems = createAsyncThunk(
  "urls/preNegotiatedItems",
  async () => {
    const token = await getToken();

    var url =
      "https://staging.andanet.com/api/customer/upsell/Pre%20Negotiated%20Items?pageSize=4&availability=Available&previouslyPurchased=Previously%20Purchased";

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    const myData = await response.json();
    return myData;
  }
);
export const inventoryWatch = createAsyncThunk(
  "urls/inventoryWatch",
  async (body) => {
    const token = await getToken();
    var url = `https://staging.andanet.com/api/customer/product-list/49020/search?${body?.value}page=${body?.currentPage}&searchMode=STANDARD`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    const myData = await response.json();
    return myData;
  }
);
export const customerLikeYouSeeMore = createAsyncThunk(
  "urls/customerLikeYouSeeMore",
  async (body) => {
    const token = await getToken();
    var url = `https://staging.andanet.com/api/customer/product-list/96896/search?${body?.value}page=${body?.currentPage}&searchMode=STANDARD`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    const myData = await response.json();
    return myData;
  }
);
export const userInfo = createAsyncThunk("urls/userInfo", async () => {
  const token = await getToken();
  var url = "https://staging.andanet.com/api/customer";
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
  const myData = await response.json();
  return myData;
});
export const cartInfo = createAsyncThunk("urls/cartInfo", async () => {
  const token = await getToken();
  var url = "https://staging.andanet.com/api/cart";
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
  const myData = await response.json();
  return myData;
});

export const checkOutConfirmation = createAsyncThunk(
  "urls/checkoutConfirm",
  async (orderId) => {
    const token = await getToken();
    var url = `https://staging.andanet.com/checkout/confirmation/${orderId}  `;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    const myData = await response.json();
    return myData;
  }
);

export const preNegotiated = createAsyncThunk(
  "urls/preNegotiated",
  async (body) => {
    const token = await getToken();
    var url = `https://staging.andanet.com/api/customer/upsell/Pre%20Negotiated%20Items?${body?.value}page=${body?.currentPage}&searchMode=STANDARD`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    const myData = await response.json();
    return myData;
  }
);

export const favoritesApi = createAsyncThunk("urls/favorites", async (body) => {
  const token = await getToken();
  var url = `https://staging.andanet.com/api/customer/product-list/180781/search?${body?.value}page=${body?.currentPage}&searchMode=STANDARD`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
  const myData = await response.json();
  return myData;
});

export const inventoryWatchList = createAsyncThunk(
  "urls/backInStockSeeMore",
  async (body) => {
    const token = await getToken();
    var url = `https://staging.andanet.com/api/customer/product-list/23164/search?${body?.value}page=${body?.currentPage}&searchMode=STANDARD`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    const myData = await response.json();
    return myData;
  }
);

export const savings = createAsyncThunk("urls/savings", async (body) => {
  const token = await getToken();
  var url = `https://staging.andanet.com/api/catalog/search?${body?.value}page=${body?.currentPage}&yourSavingsFilters=Price%20Specials&q=*&searchMode=STANDARD`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
  const myData = await response.json();
  return myData;
});

export const closeOut = createAsyncThunk("urls/closeOut", async (body) => {
  const token = await getToken();
  var url = `https://staging.andanet.com/api/catalog/search?${body?.value}page=${body?.currentPage}&yourSavingsFilters=Close%20Out&q=*&searchMode=STANDARD`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
  const myData = await response.json();
  return myData;
});
export const priceReductionItems = createAsyncThunk(
  "urls/priceReduction",
  async (body) => {
    const token = await getToken();

    var url = `https://staging.andanet.com/api/catalog/search?${body?.value}page=${body?.currentPage}&yourSavingsFilters=Price%20Reductions&q=*&searchMode=STANDARD`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    const myData = await response.json();

    return myData;
  }
);
export const shortDate = createAsyncThunk("urls/shortDate", async (body) => {
  const token = await getToken();
  var url = `https://staging.andanet.com/api/catalog/search?${body?.value}page=${body?.currentPage}&yourSavingsFilters=Short%20Date&q=*&searchMode=STANDARD`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
  const myData = await response.json();
  return myData;
});

const productSlice = createSlice({
  name: "products",
  initialState: {
    topPurchaseProducts: {},
    customerLikeYouProducts: {},
    preNegotiatedItemsProducts: {},
    inventoryWatchData: {},
    customerLikeYouSeeMoreData: {},
    cartLength: {},
    userInfoData: {},
    loading: false,
    loading: false,
    cartCheckOutInfo: false,
    cartInfoData: {},
    subtotal: {},
    cartValidateInfo: {},
    checkOutData: {},
    itemLength: {},
    deleteCart: {},
    preNegotiatedData: {},
    inventoryWatchListData: {},
    favoritesData: {},
    savingsData: {},
    closeOutData: {},
    priceReductionData: {},
    shortDateData: {},
  },
  extraReducers: {
    [yourTopPurChase.pending]: (state, action) => {
      state.loading = true;
    },
    [yourTopPurChase.fulfilled]: (state, action) => {
      state.loading = false;
      state.topPurchaseProducts = action.payload;
    },
    [yourTopPurChase.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [customerLikeYou.pending]: (state, action) => {
      state.loading = true;
    },
    [customerLikeYou.fulfilled]: (state, action) => {
      state.loading = false;
      state.customerLikeYouProducts = action.payload;
    },
    [customerLikeYou.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [preNegotiatedItems.pending]: (state, action) => {
      state.loading = true;
    },
    [preNegotiatedItems.fulfilled]: (state, action) => {
      state.loading = false;
      state.preNegotiatedItemsProducts = action.payload;
    },
    [preNegotiatedItems.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [inventoryWatch.pending]: (state, action) => {
      state.loading = true;
    },
    [inventoryWatch.fulfilled]: (state, action) => {
      state.loading = false;
      state.inventoryWatchData = action.payload;
    },
    [inventoryWatch.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [inventoryWatchList.pending]: (state, action) => {
      state.loading = true;
    },
    [inventoryWatchList.fulfilled]: (state, action) => {
      state.loading = false;
      state.inventoryWatchListData = action.payload;
    },
    [inventoryWatchList.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [addItem.pending]: (state, action) => {
      state.loading = true;
    },
    [addItem.fulfilled]: (state, action) => {
      state.loading = false;
      state.cartLength = action.payload?.order?.orderItems?.length;
    },
    [addItem.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [userInfo.pending]: (state, action) => {
      state.loading = true;
    },
    [userInfo.fulfilled]: (state, action) => {
      state.loading = false;
      state.userInfoData = action.payload;
    },
    [userInfo.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [cartInfo.pending]: (state, action) => {
      state.loading = true;
    },
    [cartInfo.fulfilled]: (state, action) => {
      state.loading = false;
      state.cartInfoData = action.payload;
      state.cartLength = action.payload?.orderItems?.length;
      state.subtotal = action.payload?.subTotal?.amount;
    },
    [cartInfo.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [emptyCartItems.pending]: (state, action) => {
      state.loading = true;
    },
    [emptyCartItems.fulfilled]: (state, action) => {
      state.loading = false;
      state.cartLength = 0;
    },
    [emptyCartItems.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [cartValidating.pending]: (state, action) => {
      state.loading = true;
    },
    [cartValidating.fulfilled]: (state, action) => {
      state.loading = false;
      state.cartValidateInfo = action.payload;
    },
    [cartValidating.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [cartCheckOut.pending]: (state, action) => {
      state.loading = true;
    },
    [cartCheckOut.fulfilled]: (state, action) => {
      state.loading = false;
      state.cartCheckOutInfo = true;
      state.cartLength = 0;
      state.itemLength = action.payload?.orderItems?.length;
      state.checkOutData = action.payload;
    },
    [checkOutConfirmation.pending]: (state, action) => {
      state.loading = true;
    },
    [checkOutConfirmation.fulfilled]: (state, action) => {
      state.loading = false;
      state.cartLength = 0;
    },
    [checkOutConfirmation.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [deleteItem.pending]: (state, action) => {
      state.loading = true;
    },
    [deleteItem.fulfilled]: (state, action) => {
      state.loading = false;
      state.cartLength = action.payload?.order?.orderItems?.length;
      state.deleteCart = action.payload;
    },
    [deleteItem.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [customerLikeYouSeeMore.pending]: (state, action) => {
      state.loading = true;
    },
    [customerLikeYouSeeMore.fulfilled]: (state, action) => {
      state.loading = false;
      state.customerLikeYouSeeMoreData = action.payload;
    },
    [customerLikeYouSeeMore.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [preNegotiated.pending]: (state, action) => {
      state.loading = true;
    },
    [preNegotiated.fulfilled]: (state, action) => {
      state.loading = false;
      state.preNegotiatedData = action.payload;
    },
    [preNegotiated.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [favoritesApi.pending]: (state, action) => {
      state.loading = true;
    },
    [favoritesApi.fulfilled]: (state, action) => {
      state.loading = false;
      state.favoritesData = action.payload;
    },
    [favoritesApi.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [savings.pending]: (state, action) => {
      state.loading = true;
    },
    [savings.fulfilled]: (state, action) => {
      state.loading = false;
      state.savingsData = action.payload;
    },
    [savings.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [closeOut.pending]: (state, action) => {
      state.loading = true;
    },
    [closeOut.fulfilled]: (state, action) => {
      state.loading = false;
      state.closeOutData = action.payload;
    },
    [closeOut.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [priceReductionItems.pending]: (state, action) => {
      state.loading = true;
    },
    [priceReductionItems.fulfilled]: (state, action) => {
      state.loading = false;
      state.priceReductionData = action.payload;
    },
    [priceReductionItems.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [shortDate.pending]: (state, action) => {
      state.loading = true;
    },
    [shortDate.fulfilled]: (state, action) => {
      state.loading = false;
      state.shortDateData = action.payload;
    },
    [shortDate.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
export default productSlice.reducer;