import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Pressable,
  Linking,
  Alert,
  RefreshControl,
  StatusBar,
} from "react-native";
import Moment from "moment";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState, useEffect } from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import Navbar from "./Navbar";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import LikeButton from "./Ui/LikeButton";
import Spinner from "./Spinner";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TabBar from "./TabBar";
import { useDispatch, useSelector } from "react-redux";
import {
  yourTopPurChase,
  customerLikeYou,
  preNegotiatedItems,
  addItem,
  userInfo,
  backInStock,
  productLists,
} from "../../redux/features/productApi";
import { logout, authenticate } from "../../redux/features/authUser";
import dataSlider from "./DataSlider.js";
import ImageSlider from "./ImageSlide.js";
import { getToken } from "../../utils";
import AddButton from "./Ui/AddButton";
import HomeProduct from "./Ui/HomeProduct";
// import { SliderBox } from "react-native-image-slider-box";

//import { SliderBox } from "react-native-image-slider-box";

// const LikeButton = (props) => {
//   const liked = useSharedValue(0);

//   const [value, setValue] = useState(false);

//   const outlineStyle = useAnimatedStyle(() => {
//     return {
//       transform: [
//         {
//           scale: interpolate(liked.value, [1, 1], [1, 1], Extrapolate.CLAMP),
//         },
//       ],
//     };
//   });

//   const fillStyle = useAnimatedStyle(() => {
//     return {
//       transform: [{ scale: liked.value }],
//       opacity: liked.value,
//     };
//   });

//   const LikeHandler = () => {
//     liked.value = withSpring(liked.value ? false : true);
//     props.onPress();
//   };

//   return (
//     <>
//       <Pressable onPress={() => LikeHandler()}>
//         {console.log("values", props.value === "FAVORITE")}
//         {props.value === "FAVORITE" ? (
//           <Animated.View style={fillStyle}>
//             <MaterialCommunityIcons name={"heart"} size={15} color={"red"} />
//           </Animated.View>
//         ) : (
//           <Animated.View style={[StyleSheet.absoluteFillObject, outlineStyle]}>
//             <MaterialCommunityIcons
//               name={"heart-outline"}
//               size={15}
//               color={"grey"}
//             />
//           </Animated.View>
//         )}
//       </Pressable>
//     </>
//   );
// };

export default function HomePage() {
  const dispatch = useDispatch();

  const [preDate, setPreDate] = useState();
  const [cmeaDate, setCmeaDate] = useState();
  const [date, setDate] = useState();
  const [days, setDays] = useState();
  const [cmeaDays, setCmeaDays] = useState();
  const navigation = useNavigation();
  const [slideIndex, setSlideIndex] = useState(1);
  const [id, setId] = useState();
  const [refreshing, setRefreshing] = React.useState(false);
  const [loadingValue, setLoadingValue] = useState(false);

  const [hidden, setHidden] = useState(false);

  const {
    topPurchaseProducts,
    customerLikeYouProducts,
    preNegotiatedItemsProducts,
    loading,
    favResponse,
    backInStockData,
    userInfoData,
  } = useSelector((state) => ({
    ...state.products,
  }));
  const { isAuthenticated } = useSelector((state) => ({
    ...state.auth,
  }));
  useEffect(() => {
    dispatch(yourTopPurChase());
    dispatch(customerLikeYou());
    dispatch(preNegotiatedItems());
    dispatch(userInfo());
    dispatch(backInStock());
    dispatch(productLists());
  }, [favResponse]);

  const inventoryOpen = async () => {
    navigation.navigate("TopPurchase");
  };
  const CustomerLikeYouOpen = async () => {
    navigation.navigate("CustomerLikeYou");
  };
  const preNegotiatedOpen = async () => {
    navigation.navigate("PreNegotiated");
  };
  const favoritesOpen = async () => {
    navigation.navigate("Favorites");
  };
  const closeOutsOpen = async () => {
    navigation.navigate("SavingsAndCloseOut");
  };
  const customerLikeYouOpen = async () => {
    navigation.navigate("CustomerLikeYou");
  };
  const inventoryWatchListOpen = async () => {
    navigation.navigate("Inventory");
  };
  const AndaContractItemsOpen = async () => {
    navigation.navigate("AndaContractItems");
  };

  useEffect(() => {
    async function fetchToken() {
      const storedToken = await getToken();
      if (storedToken) {
        dispatch(authenticate(storedToken));
      }
    }
    fetchToken();
  }, [isAuthenticated, refreshing]);

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

  useEffect(() => {
    const day = getDifferenceInDays(date1, date2);
    setDays(day);
    const cmea = getDifferenceInCmeaDays(date3, date2);
    setCmeaDays(cmea);
  }, [userData]);

  useEffect(() => {
    setPreDate(
      Moment(userData?.selectedAccount?.deaExpiration).format("MM/DD/YYYY")
    );
    setDate(Moment().format("MM/DD/YYYY"));
    setCmeaDate(
      Moment(userData?.selectedAccount?.cmeaCertificationExpiration).format(
        "MM/DD/YYYY"
      )
    );
  }, [userData]);

  function getDifferenceInDays(date1, date2) {
    const diffInMs = Math.abs(date2 - date1);
    return diffInMs / (1000 * 60 * 60 * 24);
  }
  function getDifferenceInCmeaDays(date1, date2) {
    const diffInMs = Math.abs(date2 - date1);
    return diffInMs / (1000 * 60 * 60 * 24);
  }

  const date1 = new Date(preDate);
  const date2 = new Date(date);
  const date3 = new Date(cmeaDate);

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    dispatch(yourTopPurChase());
    dispatch(customerLikeYou());
    dispatch(preNegotiatedItems());
    dispatch(userInfo());
    dispatch(backInStock());
    dispatch(productLists());
    wait(100).then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    setLoadingValue(
      topPurchaseProducts?.products?.length > 0 ||
        customerLikeYouProducts?.products?.length > 0 ||
        preNegotiatedItemsProducts?.products?.length > 0
    );
    if (loadingValue === false)
      setTimeout(() => {
        setLoadingValue(true);
      }, 1000);
  }, []);

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "#063e63" }}
      edges={["right", "left", "top"]}
    >
      <StatusBar
        animated={false}
        translucent
        backgroundColor={"#063e63"}
        barStyle={"light-content"}
        hidden={false}
      />

      <View style={{ backgroundColor: "#fff", flex: 1 }}>
        <Navbar />

        <View style={{ flex: 1 }}>
          {loadingValue ? (
            <View style={{ backgroundColor: "#fff", flex: 1 }}>
              {userData?.selectedAccount?.cmeaCertificationExpiration &&
                cmeaDays > 0 &&
                days > 0 && (
                  <View
                    style={{
                      borderColor: "#ed8b00",
                      borderWidth: 1,
                      borderRadius: 5,
                      margin: 10,
                    }}
                  >
                    <View
                      style={{
                        borderBottomColor: "#ed8b00",
                        borderBottomWidth: 1,
                      }}
                    >
                      <Text
                        style={{
                          color: "#ed8b00",
                          fontSize: 12,
                          fontWeight: "bold",
                          textAlign: "center",
                        }}
                      >
                        Account Alerts
                      </Text>
                    </View>
                    <View style={{ marginVertical: 10, paddingHorizontal: 5 }}>
                      {days > 0 && days < 100 && (
                        <View
                          style={{
                            flexDirection: "row",
                            paddingHorizontal: 5,
                            alignItems: "center",
                          }}
                        >
                          <Image
                            source={require("../../assets/alert.png")}
                            style={{
                              width: 15,
                              height: 15,
                            }}
                          />
                          <Text
                            style={{
                              fontSize: 12,
                              color: "#494c4c",
                              textAlign: "left",
                            }}
                          >
                            Your DEA license expires in {days - 1} days
                          </Text>
                        </View>
                      )}
                      <View
                        style={{
                          flexDirection: "row",
                          paddingHorizontal: 5,
                        }}
                      >
                        <Text style={{ flex: 1, width: "100%" }}>
                          <Image
                            source={require("../../assets/alert.png")}
                            style={{
                              width: 15,
                              height: 15,
                            }}
                          />

                          <Text
                            style={{
                              fontSize: 12,
                              color: "#494c4c",
                            }}
                          >
                            Your CMEA certificate expires in {cmeaDays - 1}{" "}
                            days. Click
                            <Text
                              onPress={() =>
                                Linking.openURL(
                                  "https://www.deadiversion.usdoj.gov/meth/index.html#self_cert"
                                )
                              }
                              style={{
                                color: "#ed8b00",
                                fontSize: 12,
                                textAlign: "center",
                              }}
                            >
                              {" "}
                              here
                            </Text>
                            , or contact your sales representative for details.
                          </Text>
                        </Text>
                      </View>
                    </View>
                  </View>
                )}
              {loading && <Spinner />}
              <View style={loading ? styles.mainBoxLoading : styles.mainBox}>
                <ScrollView showsVerticalScrollIndicator={false}>
                  <View style={{ flex: 1 }}>
                    <View style={{ margin: 10 }}>
                      <Text style={{ fontWeight: "700", color: "#494c4c" }}>
                        Shop Categories & Resources
                      </Text>
                    </View>

                    <ScrollView
                      horizontal={true}
                      showsHorizontalScrollIndicator={false}
                    >
                      <View
                        style={{ flexDirection: "row", marginHorizontal: 10 }}
                      >
                        <Pressable
                          onPress={() => {
                            AndaContractItemsOpen();
                          }}
                        >
                          <Image
                            style={{
                              height: 50,
                              width: 95,
                              borderRadius: 3,
                              marginVertical: 5,
                              borderWidth: 0.5,
                              borderColor: "#ececec",
                              resizeMode: "stretch",
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
                          style={{ height: 50 }}
                        >
                          <Image
                            style={{
                              height: 50,
                              width: 95,
                              borderRadius: 3,
                              marginVertical: 5,
                              borderWidth: 0.5,
                              borderColor: "#ececec",
                              resizeMode: "stretch",
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
                          style={{ height: 50 }}
                        >
                          <Image
                            style={{
                              height: 50,
                              width: 95,
                              borderRadius: 3,
                              marginVertical: 5,
                              borderWidth: 0.5,
                              borderColor: "#ececec",
                              resizeMode: "stretch",
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
                          style={{ height: 50 }}
                        >
                          <Image
                            style={{
                              height: 50,
                              width: 95,
                              borderRadius: 3,
                              marginVertical: 5,
                              borderWidth: 0.5,
                              borderColor: "#ececec",
                              resizeMode: "stretch",
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
                      <View>
                        <ImageSlider />
                      </View>
                    </View>
                    {backInStockData?.products?.length && (
                      <View style={{ margin: 10, height: 250 }}>
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            marginBottom: 10,
                          }}
                        >
                          <View>
                            <Text
                              style={{ fontWeight: "700", color: "#494c4c" }}
                            >
                              Back In Stock
                            </Text>
                          </View>
                          <Pressable
                            android_ripple={{ color: "#ccc" }}
                            onPress={() => {
                              inventoryWatchListOpen();
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

                        <HomeProduct
                          products={backInStockData}
                          accountId={userData?.selectedAccount?.id}
                        />
                      </View>
                    )}
                    <View
                      style={{ borderTopWidth: 4, borderColor: "#fafafa" }}
                    />

                    <View>
                      {topPurchaseProducts?.products?.length && (
                        <View style={{ margin: 10, height: 250 }}>
                          <View
                            style={{
                              flexDirection: "row",
                              justifyContent: "space-between",
                              marginBottom: 10,
                            }}
                          >
                            <View>
                              <Text
                                style={{ fontWeight: "700", color: "#494c4c" }}
                              >
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

                          <HomeProduct
                            products={topPurchaseProducts}
                            accountId={userData?.selectedAccount?.id}
                          />
                        </View>
                      )}
                    </View>
                    <View
                      style={{ borderTopWidth: 4, borderColor: "#fafafa" }}
                    />
                    {customerLikeYouProducts?.products?.length > 0 && (
                      <View style={{ margin: 10, height: 250 }}>
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            marginBottom: 10,
                          }}
                        >
                          <View>
                            <Text
                              style={{ fontWeight: "700", color: "#494c4c" }}
                            >
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

                        <HomeProduct
                          products={customerLikeYouProducts}
                          accountId={userData?.selectedAccount?.id}
                        />
                      </View>
                    )}
                    <View
                      style={{ borderTopWidth: 4, borderColor: "#fafafa" }}
                    />
                    {preNegotiatedItemsProducts?.products?.length > 0 && (
                      <View style={{ margin: 10, height: 250 }}>
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            marginBottom: 10,
                          }}
                        >
                          <View>
                            <Text
                              style={{ fontWeight: "700", color: "#494c4c" }}
                            >
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
                        <HomeProduct
                          products={preNegotiatedItemsProducts}
                          accountId={userData?.selectedAccount?.id}
                        />
                      </View>
                    )}
                    <View
                      style={{ borderTopWidth: 4, borderColor: "#fafafa" }}
                    />
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
                          style={{
                            color: "#fff",
                            fontWeight: "800",
                            fontSize: 18,
                          }}
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
                            style={{
                              color: "#fff",
                              fontSize: 16,
                              flexWrap: "wrap",
                            }}
                          >
                            Same day delivery is available to select locations
                            within South Florida
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
                        marginBottom: 10,
                        borderRadius: 6,
                        padding: 20,
                      }}
                    >
                      <View>
                        <Text
                          style={{
                            color: "#fff",
                            fontWeight: "800",
                            fontSize: 18,
                          }}
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
                            style={{
                              color: "#fff",
                              fontSize: 16,
                              flexWrap: "wrap",
                            }}
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
                  </View>
                </ScrollView>
              </View>
            </View>
          ) : (
            <View>
              <Spinner />
            </View>
          )}
        </View>
        <View style={{ left: 0, right: 0, bottom: 0 }}>
          <TabBar />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainBoxLoading: { opacity: 0.2, backgroundColor: "#fff", flex: 1 },
  mainBox: { backgroundColor: "#fff", flex: 1 },
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
