import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TextInput,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import {
  cartInfo,
  deleteItem,
  emptyCartItems,
  cartValidating,
  updateCartValues,
  productDetails,
} from "../../redux/features/productApi";

const CartScreen = (props) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [count, setCount] = useState(props.quantity);
  const [visible, setVisible] = useState(false);

  const {
    cartInfoData,
    cartLength,
    userInfoData,
    loading,
    loadingAdd,
    subtotal,
    updateCart,
    deleteCart,
  } = useSelector((state) => ({
    ...state.products,
  }));
  const cartData = cartInfoData;
  const orderItems = cartData?.orderItems;

  const addButton = (id) => {
    setCurrentIndex(id);
    setCount(count + 1);
    setVisible(true);
  };

  const removeButton = (id) => {
    setCurrentIndex(id);
    setCount(count - 1);
    setVisible(true);
  };

  async function emptyCart(id) {
    try {
      dispatch(emptyCartItems(id));
    } catch (error) {
      alert("Could Not Empty Cart!!");
    }
  }

  async function SubmitCart() {
    try {
      dispatch(cartValidating());
      navigation.navigate("Auth", { screen: "SubmitCart" });
    } catch (error) {
      Alert.alert("Could Not Empty Cart!!");
    }
  }
  const deleteCartHandler = async (Id) => {
    setCurrentIndex(Id);
    try {
      dispatch(deleteItem({ Id }));
    } catch (error) {
      Alert.alert("Could Not Delete");
    }
  };
  const updateCartHandler = async (Id) => {
    setCurrentIndex(Id);
    try {
      dispatch(updateCartValues({ Id, count }));
    } catch (error) {
      Alert.alert("Could Not Update");
    }
  };
  const productDetailHandler = async (Id) => {
    navigation.navigate("Auth", { screen: "ProductDetails" });
    dispatch(productDetails(Id));
  };

  return (
    <View>
      <View
        style={{
          borderTopWidth: 0.3,
          borderBottomWidth: 0.3,
          borderColor: "#ececec",
          paddingHorizontal: 10,
          paddingVertical: 20,
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <View
            style={{
              justifyContent: "center",
              alignSelf: "center",
            }}
          >
            {props.url ? (
              <>
                <Image
                  style={{
                    borderRadius: 3,
                    marginVertical: 5,
                    width: 80,
                    height: 80,
                  }}
                  source={{
                    uri: `https://staging.andanet.com${props.url}`,
                  }}
                />
              </>
            ) : (
              <Image
                style={{
                  borderRadius: 3,
                  marginVertical: 5,
                  width: 80,
                  height: 80,
                }}
                source={require("../../assets/camera.png")}
              />
            )}
          </View>
          <View
            style={{
              marginHorizontal: 10,
              justifyContent: "space-around",
              width: "70%",
            }}
          >
            <Pressable
              style={{ paddingVertical: 5 }}
              onPress={() => {
                productDetailHandler(props.skuId);
              }}
            >
              <Text style={{ color: "#005185" }}>{props?.name}</Text>
            </Pressable>
            <View
              style={{
                flexDirection: "row",
                width: "100%",
              }}
            >
              <View>
                <View
                  style={{
                    flexDirection: "row",
                    paddingVertical: 5,
                    width: 120,
                  }}
                >
                  <Text
                    style={{
                      fontWeight: "700",
                      fontSize: 12,
                    }}
                  >
                    NDC:
                  </Text>
                  <Text style={{ fontSize: 12 }}>{props.nationalDrugCode}</Text>
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
                    ITEM:
                  </Text>
                  <Text style={{ fontSize: 12 }}>{props.externalId}</Text>
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
                    MFR:
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      flexWrap: "wrap",

                      flex: 1,
                    }}
                  >
                    {props.manufacturer}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  padding: 5,
                  flexWrap: "wrap",
                  flex: 1,
                }}
              >
                <Text
                  style={{
                    fontSize: 12,
                    flexWrap: "wrap",
                    width: "100%",
                  }}
                >
                  {props.description}
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    flexWrap: "wrap",
                    width: "100%",
                  }}
                >
                  {props.itemForm}
                </Text>
              </View>
            </View>
            <View
              style={{
                marginVertical: 12,
              }}
            >
              <Text style={{ fontWeight: "700" }}>${props.amount}</Text>
            </View>
          </View>
        </View>

        <View>
          <View
            style={{
              justifyContent: "space-around",
              flexDirection: "row",
              paddingVertical: 10,
              paddingLeft: "23%",
              paddingRight: "10%",
            }}
          >
            <View
              style={{
                backgroundColor: "#fff",
                width: 70,
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
                  removeButton(props.id);
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
                  paddingHorizontal: 5,
                }}
              >
                <Text style={{ color: "#005185" }}>{count}</Text>
              </View>
              {!!props.orderLimit ? (
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
                    addButton(props?.id);
                  }}
                  disabled={count === props.orderLimit}
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
                    addButton(props?.id);
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
            <View
              style={{
                width: 60,
                height: 25,
                borderRadius: 4,
              }}
            >
              {currentIndex == props.id && visible && (
                <Pressable
                  style={{
                    backgroundColor: "#c77500",
                    width: 60,
                    height: 25,
                    borderRadius: 4,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  android_ripple={{ color: "#ccc" }}
                  onPress={() => updateCartHandler(props.id)}
                >
                  <View>
                    <Text
                      style={{
                        color: "#fff",
                        fontSize: 10,
                        fontWeight: "bold",
                      }}
                    >
                      UPDATE
                    </Text>
                  </View>
                </Pressable>
              )}
            </View>
            <Pressable
              style={{
                borderColor: "#006ba6",
                borderWidth: 1,
                width: 60,
                height: 25,
                borderRadius: 4,
                justifyContent: "center",
                alignItems: "center",
              }}
              android_ripple={{ color: "#ccc" }}
              onPress={() => deleteCartHandler(props.id)}
            >
              <View>
                <Text style={styles.emptyText}>DELETE</Text>
              </View>
            </Pressable>
          </View>
          {!!props.orderLimit && (
            <View
              style={{
                height: 20,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {count === props.orderLimit && currentIndex === props?.id && (
                <Text style={{ fontSize: 12, color: "#bd1c1c" }}>
                  You Can Add Only {props.orderLimit} Items
                </Text>
              )}
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  cartText: {
    color: "#494c4c",
    fontWeight: "500",
  },
  proceedButtonContainer: {
    backgroundColor: "#ed8b00",
    alignItems: "center",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ed8b00",
    margin: 10,
  },
  proceedButton: {
    fontWeight: "700",
    color: "white",
    paddingVertical: 10,
    justifyContent: "center",
    alignSelf: "center",
  },
  emptyButtonContainer: {
    flexDirection: "row",
    margin: 10,
    justifyContent: "space-between",
  },
  textInput: {
    height: 30,
    width: 200,
    paddingLeft: 10,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,.15)",
  },
  emptyText: {
    color: "#006ba6",
    fontSize: 10,
    fontWeight: "bold",
  },
  emptyContainer: {
    borderColor: "#006ba6",
    borderWidth: 1,
    width: 100,
    height: 30,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyCart: {
    textAlign: "center",
    alignItems: "center",
    marginVertical: 60,
  },
  emptyCartText: {
    fontWeight: "bold",
    fontSize: 15,
  },
});
