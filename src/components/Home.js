import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Pressable,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState, useEffect } from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import Navbar from "./Navbar";
import Spinner from "./Spinner";
import TabBar from "./TabBar";
import { useDispatch, useSelector } from "react-redux";
import {
  yourTopPurChase,
  customerLikeYou,
  preNegotiatedItems,
  addItem,
  userInfo,
  productDetails,
} from "../../redux/features/productApi";
import { logout, authenticate } from "../../redux/features/authUser";
import dataSlider from "./DataSlider.js";
import ImageSlider from "./ImageSlide.js";

export default function HomePage() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [slideIndex, setSlideIndex] = useState(1);
  const {
    topPurchaseProducts,
    customerLikeYouProducts,
    preNegotiatedItemsProducts,
    loading,
  } = useSelector((state) => ({
    ...state.products,
  }));
  const { userInfoData } = useSelector((state) => ({
    ...state.products,
  }));
  useEffect(() => {
    dispatch(yourTopPurChase());
    dispatch(customerLikeYou());
    dispatch(preNegotiatedItems());
    dispatch(userInfo());
  }, []);

  const inventoryOpen = async () => {
    navigation.navigate("Auth", { screen: "TopPurchase" });
  };
  const CustomerLikeYouOpen = async () => {
    navigation.navigate("Auth", { screen: "CustomerLikeYou" });
  };
  const preNegotiatedOpen = async () => {
    navigation.navigate("Auth", { screen: "PreNegotiated" });
  };
  const favoritesOpen = async () => {
    navigation.navigate("Auth", { screen: "Favorites" });
  };
  const closeOutsOpen = async () => {
    navigation.navigate("Auth", { screen: "ShortDate" });
  };
  const customerLikeYouOpen = async () => {
    navigation.navigate("Auth", { screen: "CustomerLikeYou" });
  };
  const inventoryWatchListOpen = async () => {
    navigation.navigate("Auth", { screen: "Inventory" });
  };
  const productDetailHandler = async (Id) => {
    navigation.navigate("Auth", { screen: "ProductDetails" });
    dispatch(productDetails(Id));
  };

  useEffect(() => {
    if (userInfoData?.validations?.[0]?.level === "ERROR") {
      dispatch(logout(false));
    }
  }, [userInfoData?.validations?.[0]?.level]);

  const userData = userInfoData;
  async function addItemIntoCart(skuId) {
    const accountId = userData?.selectedAccount?.id;
    try {
      dispatch(addItem({ accountId, skuId, quantity: 1 }));
    } catch (error) {
      Alert.alert("Could not Update Product!!");
    }
  }

  const nextSlide = () => {
    if (slideIndex !== dataSlider.length) {
      setSlideIndex(slideIndex + 1);
    } else if (slideIndex === dataSlider.length) {
      setSlideIndex(1);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      nextSlide();
    }, 2500);
  }, [slideIndex]);

  const moveDot = (index) => {
    setSlideIndex(index);
  };

  const img1 = require("../../assets/image1.jpeg");
  const img2 = require("../../assets/image2.jpeg");
  const img3 = require("../../assets/image3.jpeg");

  return (
    <SafeAreaView style={{ backgroundColor: "#fff", flex: 1 }}>
      <View style={{ backgroundColor: "#fff", marginBottom: 90 }}>
        <Navbar />
        <View style={loading ? styles.mainBoxLoading : styles.mainBox}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{ margin: 10 }}>
              <Text style={{ fontWeight: "700", color: "#494c4c" }}>
                Shop Categories & Resources
              </Text>
            </View>
            {loading && <Spinner />}

            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              <View style={{ flexDirection: "row", marginHorizontal: 10 }}>
                <Pressable
                  onPress={() => {
                    inventoryWatchListOpen();
                  }}
                >
                  <Image
                    style={{
                      height: 50,
                      width: 95,
                      borderRadius: 3,
                      marginVertical: 5,
                    }}
                    source={require("../../assets/cart1.jpeg")}
                  />
                  <Text
                    style={{
                      flexWrap: "wrap",
                      color: "#006ba6",
                      fontWeight: "800",
                      fontSize: 10,
                      width: 110,
                    }}
                  >
                    Anda contracted items
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() => {
                    favoritesOpen();
                  }}
                >
                  <Image
                    style={{
                      height: 50,
                      width: 95,
                      borderRadius: 3,
                      marginVertical: 5,
                    }}
                    source={require("../../assets/favorites.jpeg")}
                  />
                  <Text
                    style={{
                      flexWrap: "wrap",
                      color: "#006ba6",
                      fontWeight: "800",
                      fontSize: 10,
                      width: 110,
                    }}
                  >
                    Favorites
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() => {
                    closeOutsOpen();
                  }}
                >
                  <Image
                    style={{
                      height: 50,
                      width: 95,
                      borderRadius: 3,
                      marginVertical: 5,
                    }}
                    source={require("../../assets/shortDate.jpeg")}
                  />
                  <Text
                    style={{
                      flexWrap: "wrap",
                      color: "#006ba6",
                      fontWeight: "800",
                      fontSize: 10,
                      width: 110,
                    }}
                  >
                    Short dates & close outs
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() => {
                    customerLikeYouOpen();
                  }}
                >
                  <Image
                    style={{
                      height: 50,
                      width: 95,
                      borderRadius: 3,
                      marginVertical: 5,
                    }}
                    source={require("../../assets/customer.jpeg")}
                  />
                  <Text
                    style={{
                      flexWrap: "wrap",
                      color: "#006ba6",
                      fontWeight: "800",
                      fontSize: 10,
                      width: 110,
                    }}
                  >
                    Customers like you
                  </Text>
                </Pressable>
                {/* <View>
                  <Image
                    style={{
                      height: 50,
                      width: 95,
                      borderRadius: 3,
                      marginVertical: 5,
                    }}
                    source={require("../../assets/resources.jpeg")}
                  />
                  <Text
                    style={{
                      flexWrap: "wrap",
                      color: "#006ba6",
                      fontWeight: "800",
                      fontSize: 10,
                      width: 110,
                    }}
                  >
                    Customer resources
                  </Text>
                </View> */}
              </View>
            </ScrollView>
            <View
              style={{
                borderTopWidth: 4,
                borderColor: "#fafafa",
                marginVertical: 10,
              }}
            />

            <View
              style={{
                paddingHorizontal: 10,
                backgroundColor: "#fafafa",
                paddingVertical: 5,
                borderRadius: 3,
              }}
            >
              <View
                style={{
                  marginHorizontal: "auto",
                }}
              >
                <ImageSlider />
              </View>
            </View>

            <View style={{ margin: 10, height: 250 }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View>
                  <Text style={{ fontWeight: "700", color: "#494c4c" }}>
                    Your Top Purchases
                  </Text>
                </View>
                <Pressable
                  android_ripple={{ color: "#ccc" }}
                  onPress={() => {
                    inventoryOpen();
                  }}
                >
                  <Text
                    style={{
                      color: "#006ba6",
                      fontWeight: "700",
                    }}
                  >
                    See More
                  </Text>
                </Pressable>
              </View>

              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                style={{
                  height: "90%",
                  flexDirection: "row",
                  width: "100%",
                  paddingHorizontal: 5,
                }}
              >
                {topPurchaseProducts?.products?.map((item) => {
                  return (
                    <View
                      style={{
                        justifyContent: "center",
                      }}
                      key={item?.defaultSku?.id}
                    >
                      <View
                        style={{
                          borderWidth: 0.3,
                          borderColor: "#ececec",
                          borderRadius: 7,
                          backgroundColor: "#fafafa",
                          width: 180,
                          height: 220,
                          marginHorizontal: 2,
                        }}
                      >
                        <Pressable
                          onPress={() => {
                            productDetailHandler(item?.defaultSku?.id);
                          }}
                        >
                          {item?.mediaMap?.primary?.url ? (
                            <Image
                              style={{
                                borderRadius: 3,
                                marginVertical: 5,
                                width: 80,
                                borderRadius: 7,
                                height: 80,
                                justifyContent: "center",
                                alignSelf: "center",
                              }}
                              source={{
                                uri: `https://staging.andanet.com${item?.mediaMap?.primary?.url}`,
                              }}
                            />
                          ) : (
                            <Image
                              style={{
                                borderRadius: 3,
                                marginVertical: 5,
                                width: 80,
                                height: 80,
                                borderRadius: 7,
                                justifyContent: "center",
                                alignSelf: "center",
                              }}
                              source={require("../../assets/camera.png")}
                            />
                          )}
                        </Pressable>
                        <Pressable
                          style={{
                            margin: 5,
                            height: 30,
                          }}
                          onPress={() => {
                            productDetailHandler(item?.defaultSku?.id);
                          }}
                        >
                          <Text
                            style={{
                              color: "#006ba6",
                              fontWeight: "700",
                              fontSize: 10,
                              flexWrap: "wrap",
                              width: "100%",
                            }}
                          >
                            {item.defaultSku.name}
                          </Text>
                        </Pressable>
                        <View style={{ margin: 5 }}>
                          <View style={{ flexDirection: "row" }}>
                            <Text style={{ fontWeight: "700", fontSize: 9 }}>
                              NDC:
                            </Text>
                            <Text style={{ fontSize: 9 }}>
                              {item?.defaultSku?.nationalDrugCode}
                            </Text>
                          </View>
                          <View style={{ flexDirection: "row" }}>
                            <Text style={{ fontWeight: "700", fontSize: 9 }}>
                              ITEM:
                            </Text>
                            <Text style={{ fontSize: 9 }}>
                              {item?.defaultSku?.id}
                            </Text>
                          </View>
                          <View
                            style={{
                              marginVertical: 10,
                              flexDirection: "row",
                              justifyContent: "space-between",
                            }}
                          >
                            <View
                              style={{
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              <Text style={{ fontWeight: "700", fontSize: 12 }}>
                                ${item?.defaultSku?.retailPrice?.amount}
                              </Text>
                            </View>
                            <Pressable
                              style={{
                                backgroundColor: "#c77500",
                                width: 60,
                                height: 25,
                                borderRadius: 3,
                                marginHorizontal: 10,
                                borderRadius: 4,
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                              onPress={() =>
                                addItemIntoCart(item?.defaultSku?.id)
                              }
                            >
                              <Text
                                style={{
                                  color: "#fff",
                                  fontWeight: "bold",
                                  fontSize: 10,
                                }}
                              >
                                ADD
                              </Text>
                            </Pressable>
                          </View>
                        </View>
                      </View>
                    </View>
                  );
                })}
              </ScrollView>
            </View>
            <View style={{ borderTopWidth: 4, borderColor: "#fafafa" }} />
            <View style={{ margin: 10, height: 250 }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View>
                  <Text style={{ fontWeight: "700", color: "#494c4c" }}>
                    Purchased By Customers Like You
                  </Text>
                </View>
                <Pressable
                  android_ripple={{ color: "#ccc" }}
                  onPress={() => {
                    CustomerLikeYouOpen();
                  }}
                >
                  <Text
                    style={{
                      color: "#006ba6",
                      fontWeight: "700",
                    }}
                  >
                    See More
                  </Text>
                </Pressable>
              </View>

              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                style={{
                  height: "90%",
                  flexDirection: "row",
                  width: "100%",
                  paddingHorizontal: 5,
                }}
              >
                {customerLikeYouProducts?.products?.map((item) => {
                  return (
                    <View
                      style={{ justifyContent: "center" }}
                      key={item?.defaultSku?.id}
                    >
                      <View
                        style={{
                          borderWidth: 0.3,
                          borderColor: "#ececec",
                          borderRadius: 7,
                          backgroundColor: "#fafafa",
                          width: 180,
                          height: 220,
                          marginHorizontal: 2,
                        }}
                      >
                        <Pressable
                          onPress={() => {
                            productDetailHandler(item?.defaultSku?.id);
                          }}
                        >
                          {item?.mediaMap?.primary?.url ? (
                            <Image
                              style={{
                                borderRadius: 3,
                                marginVertical: 5,
                                width: 80,
                                height: 80,
                                borderRadius: 7,
                                justifyContent: "center",
                                alignSelf: "center",
                              }}
                              source={{
                                uri: `https://staging.andanet.com${item?.mediaMap?.primary?.url}`,
                              }}
                            />
                          ) : (
                            <Image
                              style={{
                                borderRadius: 3,
                                marginVertical: 5,
                                width: 80,
                                height: 80,
                                borderRadius: 7,
                                justifyContent: "center",
                                alignSelf: "center",
                              }}
                              source={require("../../assets/camera.png")}
                            />
                          )}
                        </Pressable>
                        <Pressable
                          style={{
                            margin: 5,
                            height: 30,
                          }}
                          onPress={() => {
                            productDetailHandler(item?.defaultSku?.id);
                          }}
                        >
                          <Text
                            style={{
                              color: "#006ba6",
                              fontWeight: "700",
                              fontSize: 10,
                              flexWrap: "wrap",
                              width: "100%",
                            }}
                          >
                            {item.defaultSku.name}
                          </Text>
                        </Pressable>
                        <View style={{ margin: 5 }}>
                          <View style={{ flexDirection: "row" }}>
                            <Text style={{ fontWeight: "700", fontSize: 9 }}>
                              NDC:
                            </Text>
                            <Text style={{ fontSize: 9 }}>
                              {item?.defaultSku?.nationalDrugCode}
                            </Text>
                          </View>
                          <View style={{ flexDirection: "row" }}>
                            <Text style={{ fontWeight: "700", fontSize: 9 }}>
                              ITEM:
                            </Text>
                            <Text style={{ fontSize: 9 }}>
                              {item?.defaultSku?.id}
                            </Text>
                          </View>
                          <View
                            style={{
                              marginVertical: 10,
                              flexDirection: "row",
                              justifyContent: "space-between",
                            }}
                          >
                            <View
                              style={{
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              <Text style={{ fontWeight: "700", fontSize: 12 }}>
                                ${item?.defaultSku?.retailPrice?.amount}
                              </Text>
                            </View>
                            <Pressable
                              style={{
                                backgroundColor: "#c77500",
                                width: 60,
                                height: 25,
                                borderRadius: 3,
                                marginHorizontal: 10,
                                borderRadius: 4,
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                              onPress={() =>
                                addItemIntoCart(item?.defaultSku?.id)
                              }
                            >
                              <Text
                                style={{
                                  color: "#fff",
                                  fontWeight: "bold",
                                  fontSize: 10,
                                }}
                              >
                                ADD
                              </Text>
                            </Pressable>
                          </View>
                        </View>
                      </View>
                    </View>
                  );
                })}
              </ScrollView>
            </View>
            <View style={{ borderTopWidth: 4, borderColor: "#fafafa" }} />
            <View style={{ margin: 10, height: 250 }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View>
                  <Text style={{ fontWeight: "700", color: "#494c4c" }}>
                    Pre-Negotiated Items
                  </Text>
                </View>
                <Pressable
                  android_ripple={{ color: "#ccc" }}
                  onPress={() => {
                    preNegotiatedOpen();
                  }}
                >
                  <Text
                    style={{
                      color: "#006ba6",
                      fontWeight: "700",
                    }}
                  >
                    See More
                  </Text>
                </Pressable>
              </View>

              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                style={{
                  height: "90%",
                  flexDirection: "row",
                  width: "100%",
                  paddingHorizontal: 5,
                }}
              >
                {preNegotiatedItemsProducts?.products?.map((item) => {
                  return (
                    <View
                      style={{ justifyContent: "center" }}
                      key={item?.defaultSku?.id}
                    >
                      <View
                        style={{
                          borderWidth: 0.3,
                          borderColor: "#ececec",
                          borderRadius: 7,
                          backgroundColor: "#fafafa",
                          width: 180,
                          height: 220,
                          marginHorizontal: 2,
                        }}
                      >
                        <Pressable
                          onPress={() => {
                            productDetailHandler(item?.defaultSku?.id);
                          }}
                        >
                          {item?.mediaMap?.primary?.url ? (
                            <Image
                              style={{
                                borderRadius: 3,
                                marginVertical: 5,
                                width: 80,
                                borderRadius: 7,
                                height: 80,
                                justifyContent: "center",
                                alignSelf: "center",
                              }}
                              source={{
                                uri: `https://staging.andanet.com${item?.mediaMap?.primary?.url}`,
                              }}
                            />
                          ) : (
                            <Image
                              style={{
                                borderRadius: 3,
                                marginVertical: 5,
                                width: 80,
                                height: 80,
                                borderRadius: 7,
                                justifyContent: "center",
                                alignSelf: "center",
                              }}
                              source={{
                                uri: `https://staging.andanet.com${item?.mediaMap?.primary?.url}`,
                              }}
                            />
                          )}
                        </Pressable>
                        <Pressable
                          style={{
                            margin: 5,
                            height: 30,
                          }}
                          onPress={() => {
                            productDetailHandler(item?.defaultSku?.id);
                          }}
                        >
                          <Text
                            style={{
                              color: "#006ba6",
                              fontWeight: "700",
                              fontSize: 10,
                              flexWrap: "wrap",
                              width: "100%",
                            }}
                          >
                            {item.defaultSku.name}
                          </Text>
                        </Pressable>
                        <View style={{ margin: 5 }}>
                          <View style={{ flexDirection: "row" }}>
                            <Text style={{ fontWeight: "700", fontSize: 9 }}>
                              NDC:
                            </Text>
                            <Text style={{ fontSize: 9 }}>
                              {item?.defaultSku?.nationalDrugCode}
                            </Text>
                          </View>
                          <View style={{ flexDirection: "row" }}>
                            <Text style={{ fontWeight: "700", fontSize: 9 }}>
                              ITEM:
                            </Text>
                            <Text style={{ fontSize: 9 }}>
                              {item?.defaultSku?.id}
                            </Text>
                          </View>
                          <View
                            style={{
                              marginVertical: 10,
                              flexDirection: "row",
                              justifyContent: "space-between",
                            }}
                          >
                            <View
                              style={{
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              <Text style={{ fontWeight: "700", fontSize: 12 }}>
                                ${item?.defaultSku?.retailPrice?.amount}
                              </Text>
                            </View>
                            <Pressable
                              style={{
                                backgroundColor: "#c77500",
                                width: 60,
                                height: 25,
                                borderRadius: 3,
                                marginHorizontal: 10,
                                borderRadius: 4,
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                              onPress={() =>
                                addItemIntoCart(item?.defaultSku?.id)
                              }
                            >
                              <Text
                                style={{
                                  color: "#fff",
                                  fontWeight: "bold",
                                  fontSize: 10,
                                }}
                              >
                                ADD
                              </Text>
                            </Pressable>
                          </View>
                        </View>
                      </View>
                    </View>
                  );
                })}
              </ScrollView>
            </View>
            <View style={{ borderTopWidth: 4, borderColor: "#fafafa" }} />
            <View
              style={{
                backgroundColor: "#f51441",
                margin: 10,
                borderRadius: 6,
                padding: 20,
              }}
            >
              <View>
                <Text
                  style={{ color: "#fff", fontWeight: "800", fontSize: 18 }}
                >
                  Same Day Delivery
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={{
                    justifyContent: "center",
                    alignSelf: "center",
                    width: "60%",
                  }}
                >
                  <Text
                    style={{ color: "#fff", fontSize: 16, flexWrap: "wrap" }}
                  >
                    Same day delivery is available to select locations within
                    South Florida
                  </Text>
                </View>
                <View>
                  <Image
                    style={{
                      borderRadius: 3,
                      marginVertical: 5,
                      width: 110,
                      height: 80,
                      justifyContent: "center",
                      alignSelf: "center",
                    }}
                    source={require("../../assets/delivery.png")}
                  />
                </View>
              </View>
            </View>
            <View
              style={{
                backgroundColor: "#7c8ae6",
                marginHorizontal: 10,
                borderRadius: 6,
                padding: 20,
              }}
            >
              <View>
                <Text
                  style={{ color: "#fff", fontWeight: "800", fontSize: 18 }}
                >
                  Prebooking Available
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={{
                    justifyContent: "center",
                    alignSelf: "center",
                    width: "60%",
                  }}
                >
                  <Text
                    style={{ color: "#fff", fontSize: 16, flexWrap: "wrap" }}
                  >
                    Products available for pre-book
                  </Text>
                </View>
                <View>
                  <Image
                    style={{
                      borderRadius: 3,
                      marginVertical: 5,
                      width: 80,
                      height: 80,
                      justifyContent: "center",
                      alignSelf: "center",
                    }}
                    source={require("../../assets/bottle.png")}
                  />
                </View>
              </View>
            </View>
            <TabBar />
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainBoxLoading: { opacity: 0.2, backgroundColor: "#fff" },
  mainBox: { backgroundColor: "#fff" },
  slide: {
    marginHorizontal: 10,
    paddingVertical: 10,
  },
  slideAnim: {
    marginHorizontal: 10,
    backgroundColor: "#006ba6",
    paddingVertical: 10,
    opacity: 1,
  },

  // dot: {
  //   width: 20,
  //   height: 20,
  //   borderRadius: "50%",
  //   borderWidth: 3,
  //   margin: 5,
  //   backgroundColor: "black",
  //   flexDirection: "row",
  // },
  // dotActive: {
  //   backgroundColor: "red",
  //   flexDirection: "row",
  // },
});
