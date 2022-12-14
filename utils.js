import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useMemo } from "react";
//https://staging.andanet.com/api/customer/validate/username
//https://staging.andanet.com/api/customer
//https://staging.andanet.com/verify/email
async function authenticate(credentials) {
  var url = "https://staging.andanet.com/api/login";

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());

  const token = response.token;

  await AsyncStorage.setItem("token", token);

  return token;
}
export async function changePassword(credentials) {
  const token = await getToken();
  var url = "https://staging.andanet.com/api/customer/changePassword";
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
  const data = response;
  return data;
}
//
export async function forgot_Password(credentials) {
  console.log(credentials);
  const token = await getToken();
  var url = "https://staging.andanet.com/api/authentication/forgot-password";
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(credentials),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("Something went wrong");
    })
    .catch((error) => {
      console.log(error);
    });
  const myData = await response.json();
  console.log({ myData });
  return myData;
}

//https://staging.andanet.com/api/customer/account/register
export async function forgot_user(credentials) {
  var url = "https://staging.andanet.com/api/authentication/forgot-username";
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  })
    .then((data) => {
      if (data.ok) {
        return data.json();
      }
      return "error";
    })
    .catch((error) => {
      return error;
    });

  const myData = await response;
  return myData;
}
export async function register_user(credentials) {
  var url = "https://staging.andanet.com/api/customer/account/register";
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => data);
  const mydata = response;
  console.log({ mydata });
  return mydata;
}
export async function reset_Password(credentials) {
  console.log({ credentials });

  var url = "https://staging.andanet.com/api/authentication/reset-password";
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
  const myData = await response.json();
  console.log({ myData });
  return myData;
}
export async function productList() {
  const token = await getToken();
  var url = "https://staging.andanet.com/api/customer/product-list/lists";
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

export async function cartValidate() {
  const token = await getToken();
  var url = "https://staging.andanet.com/api/cart/validate";
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  }).then((data) => data.json());

  const data = response;

  return data;
}

async function favoriteHandler(credentials) {
  const token = await getToken();

  const url = "https://staging.andanet.com/api/customer/product-list/items";
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());

  const data = response;

  return data;
}

export function favorites(body) {
  const credentials = {
    type: "FAVORITE",
    items: [
      {
        skuId: body.id,
        quantity: 1,
      },
    ],
  };
  return favoriteHandler(credentials);
}

export function favoritesRemove(body) {
  const credentials = {
    type: "FAVORITE",
    items: [
      {
        skuId: body.id,
        quantity: 0,
      },
    ],
  };
  return favoriteHandler(credentials);
}

export async function emptyCart(credentials) {
  const token = await getToken();
  var url = "https://staging.andanet.com/api/cart";
  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());

  const data = response;

  return data;
}

export function login(body) {
  const credentials = {
    username: body.email,
    password: body.password,
    params: {
      apiLogin: true,
      appLogin: true,
    },
  };

  return authenticate(credentials);
}

export const getToken = async () => {
  const token = await AsyncStorage.getItem("token");
  return token;
};

async function updateItem(credentials) {
  const token = await getToken();
  var url = "https://staging.andanet.com/api/cart/items";
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());

  const data = response;

  return data;
}

async function addItem(credentials) {
  const token = await getToken();
  console.log(credentials);
  var url = "https://staging.andanet.com/api/cart/items";
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
  const data = response;
  return data;
}
export function addItems(body) {
  const credentials = {
    updateItemDtos: [
      {
        accountId: body.accountId,
        quantity: body.quantity,
        skuID: body.skuId,
      },
    ],
  };
  return addItem(credentials);
}

export function updateCartItems(body) {
  const credentials = {
    updateItemDtos: [
      {
        orderItemId: body.Id,
        quantity: body.count,
      },
    ],
  };
  return updateItem(credentials);
}

export function deleteItems(body) {
  const credentials = {
    updateItemDtos: [
      {
        orderItemId: body.Id,
        quantity: 0,
      },
    ],
  };
  return updateItem(credentials);
}

export async function checkOutCart(orderId) {
  const token = await getToken();
  var url = `https://staging.andanet.com/api/order/${orderId}/checkout?paymentType=invoice&source=web`;
  console.log(url);
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  }).then((data) => data.json());

  const data = response;

  return data;
}

export const getBioMatricsDetails = async () => {
  const bioMatrics = JSON.parse(await AsyncStorage.getItem("bioMatrics"));

  return bioMatrics;
};

const range = (start, end) => {
  let length = end - start + 1;
  /*
  	Create an array of certain length and set the elements within it from
    start value to end value.
  */
  return Array.from({ length }, (_, idx) => idx + start);
};

export const DOTS = "...";
export const usePagination = ({
  totalCount,
  pageSize,
  siblingCount = 1,
  currentPage,
}) => {
  const paginationRange = useMemo(() => {
    const totalPageCount = Math.ceil(totalCount / pageSize);

    // Pages count is determined as siblingCount + firstPage + lastPage + currentPage + 2*DOTS
    const totalPageNumbers = siblingCount + 5;

    /*
      Case 1:
      If the number of pages is less than the page numbers we want to show in our
      paginationComponent, we return the range [1..totalPageCount]
    */
    if (totalPageNumbers >= totalPageCount) {
      return range(1, totalPageCount);
    }

    /*
    	Calculate left and right sibling index and make sure they are within range 1 and totalPageCount
    */
    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(
      currentPage + siblingCount,
      totalPageCount
    );

    /*
      We do not show dots just when there is just one page number to be inserted between the extremes of sibling and the page limits i.e 1 and totalPageCount. Hence we are using leftSiblingIndex > 2 and rightSiblingIndex < totalPageCount - 2
    */
    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPageCount;

    /*
    	Case 2: No left dots to show, but rights dots to be shown
    */
    if (!shouldShowLeftDots && shouldShowRightDots) {
      let leftItemCount = 3 + 2 * siblingCount;
      let leftRange = range(1, leftItemCount);

      return [...leftRange, DOTS, totalPageCount];
    }

    /*
    	Case 3: No right dots to show, but left dots to be shown
    */
    if (shouldShowLeftDots && !shouldShowRightDots) {
      let rightItemCount = 3 + 2 * siblingCount;
      let rightRange = range(
        totalPageCount - rightItemCount + 1,
        totalPageCount
      );
      return [firstPageIndex, DOTS, ...rightRange];
    }

    /*
    	Case 4: Both left and right dots to be shown
    */
    if (shouldShowLeftDots && shouldShowRightDots) {
      let middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
    }
  }, [totalCount, pageSize, siblingCount, currentPage]);

  return paginationRange;
};
