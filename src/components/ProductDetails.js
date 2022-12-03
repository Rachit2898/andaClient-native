import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  TextInput,
  ScrollView,
  BackHandler,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Spinner from "./Spinner";
import { useDispatch, useSelector } from "react-redux";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import {
  productHistory,
  userInfo,
  addItem,
  updateValues,
} from "../../redux/features/productApi";
import TabBar from "./TabBar";
import AddButton from "./Ui/AddButton";

import { SafeAreaView } from "react-native-safe-area-context";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const [currentPage, setCurrentPage] = useState(1);
  const [count, setCount] = useState(1);
  const { productDetailsData, productHistoryData, userInfoData, loading } =
    useSelector((state) => ({
      ...state.products,
    }));

  const { searchedValue } = useSelector((state) => ({
    ...state.auth,
  }));
  const userData = userInfoData;
  const items = productDetailsData;

  const addButton = () => {
    setCount(parseInt(count) + 1);
  };
  useEffect(() => {
    dispatch(userInfo());
    setCount(1);
  }, [isFocused]);

  const removeButton = () => {
    setCount(count - 1);
  };
  async function addItemIntoCart(skuId) {
    const accountId = userData?.selectedAccount?.id;
    const quantity = count;
    try {
      dispatch(addItem({ accountId, skuId, quantity }));
    } catch (error) {
      alert("Could not Update Product!!");
    }
  }
  const changeHandler = (value) => {
    setCount(value);
  };

  return (
    <SafeAreaView
      style={{ backgroundColor: "#fff", flex: 1 }}
      edges={["right", "left", "top"]}
    >
      {loading && <Spinner />}
      <View style={{ flex: 1 }}>
        <View style={loading ? styles.mainBoxLoading : styles.mainBox}>
          {/* {!!searchedValue && (
            <Text style={styles.pageText}>
              Showing results for "{searchedValue}"
            </Text>
          )} */}
          <View>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={{ height: 200, marginVertical: 20 }}>
                {items?.product?.mediaMap?.primary?.url ? (
                  <>
                    <Image
                      style={{
                        borderRadius: 3,
                        marginVertical: 5,
                        width: 220,
                        height: 180,
                        justifyContent: "center",
                        alignSelf: "center",
                      }}
                      source={{
                        uri: `https://staging.andanet.com${items?.product?.mediaMap?.primary?.url}`,
                      }}
                    />
                  </>
                ) : (
                  <>
                    <Image
                      source={require("../../assets/camera.png")}
                      style={{
                        width: 120,
                        height: 100,
                        marginHorizontal: 10,
                        marginVertical: 60,
                        borderRadius: 6,
                        justifyContent: "center",
                        alignSelf: "center",
                      }}
                    />
                  </>
                )}
              </View>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    color: "#006ba6",
                    fontWeight: "700",
                    fontSize: 15,
                  }}
                >
                  {items?.name}
                </Text>
              </View>
              <View
                style={{
                  borderTopWidth: 0.3,
                  borderColor: "#ececec",
                  marginTop: 20,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    borderWidth: 0.3,
                    justifyContent: "center",
                    margin: 10,
                  }}
                >
                  <View style={{ paddingHorizontal: 15 }}>
                    <View style={{ paddingVertical: 10 }}>
                      <Text style={{ color: "#494c4c", fontWeight: "700" }}>
                        INV PRICE
                      </Text>
                    </View>
                    <View
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                        paddingVertical: 10,
                      }}
                    >
                      <Text style={{ color: "#494c4c", fontWeight: "700" }}>
                        ${items?.retailPrice?.amount}
                      </Text>
                    </View>
                  </View>
                  <View style={{ borderLeftWidth: 0.3, paddingHorizontal: 15 }}>
                    <View style={{ paddingVertical: 10 }}>
                      <Text style={{ color: "#494c4c", fontWeight: "700" }}>
                        EST. NET PRICE
                      </Text>
                    </View>
                    <View
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                        paddingVertical: 10,
                      }}
                    >
                      <Text style={{ color: "#494c4c", fontWeight: "700" }}>
                        ${items?.retailPrice?.amount}
                      </Text>
                    </View>
                  </View>
                  <View style={{ borderLeftWidth: 0.3, paddingHorizontal: 15 }}>
                    <View style={{ paddingVertical: 10 }}>
                      <Text style={{ color: "#494c4c", fontWeight: "700" }}>
                        PER UNIT
                      </Text>
                    </View>
                    <View
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                        paddingVertical: 10,
                      }}
                    >
                      <Text style={{ color: "#494c4c", fontWeight: "700" }}>
                        --
                      </Text>
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    justifyContent: "center",
                    flexDirection: "row",
                    paddingVertical: 10,
                  }}
                >
                  <View
                    style={{
                      backgroundColor: "#fff",
                      width: 72,
                      height: 25,
                      borderRadius: 3,
                      borderRadius: 4,
                      justifyContent: "space-between",
                      flexDirection: "row",
                      borderWidth: 1,
                      borderColor: "#878787",
                    }}
                  >
                    <Pressable
                      style={{
                        borderRightWidth: 1,
                        borderColor: "#878787",
                        alignItems: "center",
                        justifyContent: "center",
                        paddingHorizontal: 5,
                        backgroundColor: "#cfcccc",
                      }}
                      onPress={() => {
                        removeButton();
                      }}
                      disabled={count === 1}
                    >
                      <Text
                        style={{
                          fontWeight: "bold",
                          fontSize: 15,
                        }}
                      >
                        -
                      </Text>
                    </Pressable>
                    <View
                      style={{
                        alignSelf: "center",
                      }}
                    >
                      <TextInput
                        style={{
                          color: "#005185",
                          alignSelf: "center",
                          justifyContent: "center",
                          textAlign: "center",

                          width: 30,
                        }}
                        onChangeText={(value) => changeHandler(value)}
                        keyboardType="number-pad"
                      >
                        {count}
                      </TextInput>
                    </View>
                    {!!items.dailyOrderLimit ? (
                      <Pressable
                        style={{
                          borderLeftWidth: 1,
                          borderColor: "#878787",
                          alignItems: "center",
                          justifyContent: "center",
                          paddingHorizontal: 5,
                          backgroundColor: "#cfcccc",
                        }}
                        onPress={() => {
                          addButton();
                        }}
                        disabled={count === items.dailyOrderLimit}
                      >
                        <Text
                          style={{
                            fontWeight: "bold",
                            fontSize: 15,
                          }}
                        >
                          +
                        </Text>
                      </Pressable>
                    ) : (
                      <Pressable
                        style={{
                          borderLeftWidth: 1,
                          borderColor: "#878787",
                          alignItems: "center",
                          justifyContent: "center",
                          paddingHorizontal: 5,
                          backgroundColor: "#cfcccc",
                        }}
                        onPress={() => {
                          addButton();
                        }}
                      >
                        <Text
                          style={{
                            fontWeight: "bold",
                            fontSize: 15,
                          }}
                        >
                          +
                        </Text>
                      </Pressable>
                    )}
                  </View>
                  <View style={{ marginHorizontal: 10 }}>
                    <AddButton onPress={() => addItemIntoCart(items?.id)} />
                  </View>
                </View>
                {!!items.dailyOrderLimit && (
                  <View
                    style={{
                      height: 20,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {count === items.dailyOrderLimit && (
                      <Text style={{ fontSize: 12, color: "#bd1c1c" }}>
                        You Can Add Only {items.dailyOrderLimit} Items
                      </Text>
                    )}
                  </View>
                )}
              </View>
              <View>
                <View
                  style={{
                    borderWidth: 0.5,
                    borderColor: "#ececec",
                    paddingHorizontal: 10,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      paddingVertical: 5,
                    }}
                  >
                    <Text
                      style={{
                        fontWeight: "700",
                        fontSize: 12,
                      }}
                    >
                      Brand Equivalent:
                    </Text>
                    <Text style={{ fontSize: 12 }}>{items?.product?.name}</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      paddingVertical: 5,
                    }}
                  >
                    <Text
                      style={{
                        fontWeight: "700",
                        fontSize: 12,
                      }}
                    >
                      Product ID:
                    </Text>
                    <Text style={{ fontSize: 12 }}>{items?.externalId}</Text>
                  </View>
                  <View
                    style={{
                      paddingVertical: 5,
                      flexWrap: "wrap",
                      flexDirection: "row",
                      flex: 1,
                    }}
                  >
                    <Text
                      style={{
                        fontWeight: "700",
                        fontSize: 12,
                      }}
                    >
                      UPC:
                    </Text>
                    <Text
                      style={{
                        fontSize: 12,
                        flexWrap: "wrap",
                        flex: 1,
                      }}
                    >
                      {items?.upc}
                    </Text>
                  </View>
                  <View
                    style={{
                      paddingVertical: 5,
                      flexWrap: "wrap",
                      flexDirection: "row",
                      flex: 1,
                    }}
                  >
                    <Text
                      style={{
                        fontWeight: "700",
                        fontSize: 12,
                      }}
                    >
                      Size:
                    </Text>
                    <Text
                      style={{
                        fontSize: 12,
                        flexWrap: "wrap",

                        flex: 1,
                      }}
                    >
                      {items?.packSizeDisplay}
                    </Text>
                  </View>
                  <View
                    style={{
                      paddingVertical: 5,
                      flexWrap: "wrap",
                      flexDirection: "row",
                      flex: 1,
                    }}
                  >
                    <Text
                      style={{
                        fontWeight: "700",
                        fontSize: 12,
                      }}
                    >
                      Form:
                    </Text>
                    <Text
                      style={{
                        fontSize: 12,
                        flexWrap: "wrap",

                        flex: 1,
                      }}
                    >
                      {items?.itemForm}
                    </Text>
                  </View>
                  <View
                    style={{
                      paddingVertical: 5,
                      flexWrap: "wrap",
                      flexDirection: "row",
                      flex: 1,
                    }}
                  >
                    <Text
                      style={{
                        fontWeight: "700",
                        fontSize: 12,
                      }}
                    >
                      Manufacturer:
                    </Text>
                    <Text
                      style={{
                        fontSize: 12,
                        flexWrap: "wrap",

                        flex: 1,
                      }}
                    >
                      {items?.manufacturer}
                    </Text>
                  </View>
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
        <View style={{ left: 0, right: 0, bottom: 0 }}>
          <TabBar />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({
  mainBoxLoading: { flex: 1, opacity: 0.2 },
  mainBox: { flex: 1, backgroundColor: "#fff" },
  pageText: {
    color: "#494c4c",
    fontWeight: "600",
    fontSize: 18,
    paddingHorizontal: 10,
    alignSelf: "center",
    justifyContent: "center",
  },
});
