import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
  getToken,
  addItems,
  emptyCart,
  cartValidate,
  checkOutCart,
  deleteItems,
  updateCartItems,
  favorites,
  favoritesRemove,
  productList,
} from "../../utils";

export const productLists = createAsyncThunk("urls/productLists", async () => {
  const result = await productList();
  return result;
});

export const addItem = createAsyncThunk("additems", async (body) => {
  const result = await addItems(body);
  return result;
});
export const addFavorites = createAsyncThunk("addFav", async (body) => {
  const result = await favorites(body);
  return result;
});

export const removeFavorites = createAsyncThunk("removeFav", async (body) => {
  const result = await favoritesRemove(body);
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
export const updateCartValues = createAsyncThunk(
  "updateCartValue",
  async (body) => {
    const result = await updateCartItems(body);

    return result;
  }
);

export const yourTopPurChase = createAsyncThunk(
  "urls/topPurchase",
  async () => {
    const token = await getToken();
    const result = await productList();

    var url = `https://staging.andanet.com/api/customer/product-list/${result[2]?.id}/search?pageSize=4&availability=Available`;

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
export const backInStock = createAsyncThunk("urls/backInStock", async () => {
  const token = await getToken();

  var url =
    "https://staging.andanet.com/api/customer/inventory-notification/inventory-watch/search?pageSize=4&availability=Available";

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

export const customerLikeYou = createAsyncThunk(
  "urls/customerLikeYou",
  async () => {
    const token = await getToken();
    const result = await productList();

    var url = `https://staging.andanet.com/api/customer/product-list/${result[3]?.id}/search?pageSize=4&availability=Available&previouslyPurchased=Not%20Previously%20Purchased`;

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
    const result = await productList();
    console.log(result[1]?.id);
    var url = `https://staging.andanet.com/api/customer/product-list/${result[2]?.id}/search?${body?.value}page=${body?.currentPage}&searchMode=STANDARD`;
    console.log(url);
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
    const result = await productList();
    var url = `https://staging.andanet.com/api/customer/product-list/${result[3]?.id}/search?${body?.value}page=${body?.currentPage}&searchMode=STANDARD`;
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
  const result = await productList();
  var url = `https://staging.andanet.com/api/customer/product-list/${result[0]?.id}/search?${body?.value}page=${body?.currentPage}&searchMode=STANDARD`;
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
    const result = await productList();
    var url = `https://staging.andanet.com/api/customer/product-list/${result[1]?.id}/search?${body?.value}page=${body?.currentPage}&searchMode=STANDARD`;
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

export const productDetails = createAsyncThunk(
  "urls/productDetails",

  async (id) => {
    const token = await getToken();
    var url = `https://staging.andanet.com/api/catalog/sku/${id}`;
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
export const searchItems = createAsyncThunk(
  "urls/searchItem",
  async (searchItem) => {
    const token = await getToken();
    var url = `https://staging.andanet.com/api/catalog/search/suggest?q=${searchItem}`;
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

//https://staging.andanet.com/api/catalog/search?page=1&characteristicFacet=Anda%20Contract&q=*
export const searchProducts = createAsyncThunk(
  "urls/searchProducsts",
  async (searchItem) => {
    const token = await getToken();
    var url = `https://staging.andanet.com/api/catalog/search?q=${searchItem}&suggesterUsed=true`;
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

export const andaContractItems = createAsyncThunk(
  "urls/shortDate",
  async (body) => {
    const token = await getToken();
    var url = `https://staging.andanet.com/api/catalog/search?page=1&characteristicFacet=Anda%20Contract&q=*`;
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
    addLoading: false,
    cartCheckOutInfo: false,
    cartInfoData: {},
    subtotal: {},
    cartValidateInfo: {},
    checkOutData: {},
    itemLength: {},
    deleteCart: {},
    preNegotiatedData: {},
    inventoryWatchListData: {},
    productDetailsData: {},
    favoritesData: {},
    savingsData: {},
    closeOutData: {},
    priceReductionData: {},
    shortDateData: {},
    updateCart: {},
    searchItem: [],
    backInStockData: [],
    searchProducstsData: {},
    andaContractItemsData: {},
    favResponse: {},
    productListsData: {},
  },
  extraReducers: {
    [productLists.pending]: (state, action) => {
      state.loading = true;
    },
    [productLists.fulfilled]: (state, action) => {
      state.loading = false;
      state.productListsData = action.payload;
    },
    [productLists.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
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
    [backInStock.pending]: (state, action) => {
      state.loading = true;
    },
    [backInStock.fulfilled]: (state, action) => {
      state.loading = false;
      state.backInStockData = action.payload;
    },
    [backInStock.rejected]: (state, action) => {
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
    [userInfo.pending]: (state, action) => {},
    [userInfo.fulfilled]: (state, action) => {
      state.userInfoData = action.payload;
    },
    [userInfo.rejected]: (state, action) => {
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
    [updateCartValues.pending]: (state, action) => {
      state.loading = true;
    },
    [updateCartValues.fulfilled]: (state, action) => {
      state.loading = false;
      state.updateCart = action.payload;
    },
    [updateCartValues.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [productDetails.pending]: (state, action) => {
      state.loading = true;
    },
    [productDetails.fulfilled]: (state, action) => {
      state.loading = false;
      state.productDetailsData = action.payload;
    },
    [productDetails.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [searchItems.pending]: (state, action) => {
      state.loadingSearch = true;
    },
    [searchItems.fulfilled]: (state, action) => {
      state.loading = false;
      state.searchItem = action.payload;
    },
    [searchItems.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [searchProducts.pending]: (state, action) => {
      state.loading = true;
    },
    [searchProducts.fulfilled]: (state, action) => {
      state.loading = false;
      state.searchProducstsData = action.payload;
    },
    [searchProducts.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [andaContractItems.pending]: (state, action) => {
      state.loading = true;
    },
    [andaContractItems.fulfilled]: (state, action) => {
      state.loading = false;
      state.andaContractItemsData = action.payload;
    },
    [andaContractItems.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [addFavorites.pending]: (state, action) => {
      state.loading = true;
    },
    [addFavorites.fulfilled]: (state, action) => {
      state.loading = false;
      state.favResponse = action.payload;
    },
    [addFavorites.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [removeFavorites.pending]: (state, action) => {
      state.loading = true;
    },
    [removeFavorites.fulfilled]: (state, action) => {
      state.loading = false;
      state.favResponse = action.payload;
    },
    [removeFavorites.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
export default productSlice.reducer;
