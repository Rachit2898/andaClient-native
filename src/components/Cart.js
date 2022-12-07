import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TextInput,
  Image,
  ScrollView,
  RefreshControl,
  Alert,
  StatusBar,
  Modal,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import Spinner from "./Spinner";
import { useDispatch, useSelector } from "react-redux";
import CartScreen from "../screens/CartScreen";
import {
  cartInfo,
  deleteItem,
  emptyCartItems,
  cartValidating,
  updateCartValues,
  productDetails,
} from "../../redux/features/productApi";
import Navbar from "./Navbar";
import TabBar from "./TabBar";
import * as Notifications from "expo-notifications";
import _ from "lodash";
import CartInfo from "../components/Ui/CartInfo";

const ExpandComponent = (props) => {
  const [open, setOpen] = useState(false);
  const [standardItems, setStandardItems] = useState("");
  const [cIIItems, setCIIItems] = useState("");
  const [openCII, setCIIOpen] = useState(false);
  const [newData, setNewData] = useState("");

  const openHandler = (val) => {
    props.onPress();
    if (val === "Standard Items") {
      setOpen((pre) => !pre);
      setCIIOpen(false);
    }
    if (val === "CII Items") {
      setOpen(false);
      setCIIOpen((pre) => !pre);
    }
    if (val === "Items") {
      setOpen((pre) => !pre);
    }
  };
  const { cartInfoData } = useSelector((state) => ({
    ...state.products,
  }));
  const cartData = cartInfoData;
  const fulfillmentGroups = newData;

  function isFgCsos(fg) {
    return _.get(fg, "fulfillmentType.type") === "CSOS";
  }

  function getFriendlyFulfillmentType(order, fg) {
    if (_.size(order?.fulfillmentGroups) > 1) {
      return fg.fulfillmentType.friendlyName;
    }

    if (isFgCsos(fg)) {
      return fg.fulfillmentType.friendlyName;
    } else {
      return "Items";
    }
  }
  function getOrderItemsByFulfillmentGroup(order, fulfillmentGroup) {
    // console.log("full", fulfillmentGroup.fulfillmentGroupItems);
    let orderItemIds = _.map(
      fulfillmentGroup?.fulfillmentGroupItems,

      (fgItem) => fgItem.orderItemId
      // console.log(fulfillmentGroup.fulfillmentGroupItems)
    );
    return _.filter(order.orderItems, (orderItem) =>
      _.includes(orderItemIds, orderItem.id)
    );
  }
  const getOrderItems = () => {
    return getOrderItemsByFulfillmentGroup(cartData, standardItems);
  };
  const getOrderCIIItems = () => {
    return getOrderItemsByFulfillmentGroup(cartData, cIIItems);
  };

  let orderItemsData = getOrderItems();
  let getOrderCIIItemsData = getOrderCIIItems();

  useEffect(() => {
    if (fulfillmentGroups?.length > 1) {
      setStandardItems(fulfillmentGroups[0]);
      setCIIItems(fulfillmentGroups[1]);
    } else {
      setStandardItems(fulfillmentGroups[0]);
      setCIIItems(fulfillmentGroups[0]);
    }
    if (props.fieldName == "Standard Items") {
      setOpen(true);
      setCIIOpen(false);
    }
    if (props.fieldName == "CII Items") {
      setOpen(false);
      setCIIOpen(true);
    }
    if (props.fieldName === "Items") {
      setOpen(true);
    }
    {
      const data = _.map(
        _.orderBy(
          cartData?.fulfillmentGroups,
          ["fulfillmentType.friendlyName"],
          ["desc"]
        )
      );
      setNewData(data);
    }
  }, [cartData]);

  return (
    <View style={{ paddingHorizontal: 10 }}>
      <View>
        <Pressable
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            margin: 10,
            padding: 10,
            backgroundColor: "#f2f1ed",
            borderRadius: 3,
          }}
          onPress={() => openHandler(props.fieldName)}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {open || openCII ? (
              <View>
                <Image
                  source={require("../../assets/minus.png")}
                  style={{
                    width: 12,
                    height: 12,
                    alignSelf: "center",
                  }}
                />
              </View>
            ) : (
              <View>
                <Image
                  source={require("../../assets/add.png")}
                  style={{
                    width: 12,
                    height: 12,
                    alignSelf: "center",
                  }}
                />
              </View>
            )}

            <Text style={{ marginHorizontal: 10 }}>{props.fieldName}</Text>
          </View>
          <Text>
            SubTotal:
            <Text> ${props.amount}</Text>
          </Text>
        </Pressable>
        {open && (
          <View style={props.loading ? styles.mainBoxLoading : styles.mainBox}>
            {orderItemsData?.map((item) => {
              return (
                <View key={item.id}>
                  <CartScreen
                    url={item?.primaryMedia?.url}
                    name={item?.sku?.name}
                    nationalDrugCode={item?.sku?.nationalDrugCode}
                    externalId={item?.sku?.externalId}
                    manufacturer={item?.sku?.manufacturer}
                    description={item?.sku?.description}
                    itemForm={item?.sku?.itemForm}
                    id={item?.id}
                    amount={item?.salePrice.amount}
                    quantity={item?.quantity}
                    skuId={item?.sku?.id}
                    orderLimit={item?.sku?.dailyOrderLimit}
                    type={item?.sku?.productLists[0]?.type}
                    message={item?.sku?.itemMessages}
                    itemReturnable={item?.sku?.returnable}
                    isCart={true}
                  />
                </View>
              );
            })}
          </View>
        )}
        {openCII && (
          <View style={props.loading ? styles.mainBoxLoading : styles.mainBox}>
            {getOrderCIIItemsData?.map((item) => {
              return (
                <View key={item.id}>
                  <CartScreen
                    url={item?.primaryMedia?.url}
                    name={item?.sku?.name}
                    nationalDrugCode={item?.sku?.nationalDrugCode}
                    externalId={item?.sku?.externalId}
                    manufacturer={item?.sku?.manufacturer}
                    description={item?.sku?.description}
                    itemForm={item?.sku?.itemForm}
                    id={item?.id}
                    amount={item?.salePrice.amount}
                    quantity={item?.quantity}
                    skuId={item?.sku?.id}
                    orderLimit={item?.sku?.dailyOrderLimit}
                    type={item?.sku?.productLists[0]?.type}
                    message={item?.sku?.itemMessages}
                    itemReturnable={item?.sku?.returnable}
                    isCart={true}
                  />
                </View>
              );
            })}
          </View>
        )}
      </View>
    </View>
  );
};

const Cart = () => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const [modalVisible, setShow] = useState(false);
  const navigation = useNavigation();
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [expandCII, setExpandCII] = useState(false);
  const [expandStandard, setExpandStandard] = useState(false);
  const [fulfillmentGroupsData, setFulfillmentGroupsData] = useState("");

  const [fulfillmentGroupsStandardData, setFulfillmentGroupsStandardData] =
    useState("");
  const [fulfillmentGroupsCIIData, setFulfillmentGroupsCIIData] = useState("");
  const [count, setCount] = useState(1);
  const [showDetails, setShowDetails] = useState(false);
  const [borderWidth, setBorderWidth] = useState(5);
  const [filterOpen, setFilterOpen] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);

  const {
    cartInfoData,
    cartLength,
    userInfoData,
    loading,
    loadingAdd,
    subtotal,
    updateCart,
    deleteCart,
    favResponse,
    cartValidateInfo,
  } = useSelector((state) => ({
    ...state.products,
  }));
  const cartData = cartInfoData;
  const orderItems = cartData?.orderItems;
  const fulfillmentGroups = cartData?.fulfillmentGroups;
  const minimumOrderItems =
    cartData?.customer?.selectedAccount?.minimumOrderAmount;
  console.log(minimumOrderItems);

  async function emptyCart(id) {
    Alert.alert(
      "Hold on!",
      "Are you sure you want to remove all items from your cart?",
      [
        {
          text: "NO",
          onPress: () => null,
          style: "NO",
        },
        { text: "YES", onPress: () => dispatch(emptyCartItems(id)) },
      ]
    );
  }

  useEffect(() => {
    dispatch(cartInfo());
  }, [cartLength, updateCart, isFocused, favResponse]);

  async function SubmitCart() {
    try {
      dispatch(cartValidating());
      navigation.navigate("SubmitCart");
    } catch (error) {
      Alert.alert("Could Not Empty Cart!!");
    }
  }
  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    dispatch(cartInfo());

    wait(0).then(() => setRefreshing(false));
  }, []);

  const modelOpenHandler = () => {
    setShow((pre) => !pre);
    console.log(modalVisible);
  };

  const expnadHandler = (value) => {
    if (value === "Standard Items") {
      setFulfillmentGroupsStandardData(fulfillmentGroups[0]);
      return;
    }
    if (value === "Items") {
      setFulfillmentGroupsData(fulfillmentGroups[0]);
      return;
    }
    if (value === "CII Items") {
      if (fulfillmentGroups?.length > 1) {
        setFulfillmentGroupsCIIData(fulfillmentGroups[1]);
      } else {
        setFulfillmentGroupsCIIData(fulfillmentGroups[0]);
      }
      return;
    }
  };
  let pricedFulfillmentGroups = _.orderBy(
    _.filter(
      cartData.fulfillmentGroups,
      (fulfillmentGroup) => !_.isUndefined(fulfillmentGroup.merchandiseTotal)
    ),
    ["fulfillmentType.friendlyName"],
    ["desc"]
  );

  function isFgCsos(fg) {
    return _.get(fg, "fulfillmentType.type") === "CSOS";
  }

  function getFriendlyFulfillmentType(order, fg) {
    if (_.size(order?.fulfillmentGroups) > 1) {
      return fg.fulfillmentType.friendlyName;
    }

    if (isFgCsos(fg)) {
      return fg.fulfillmentType.friendlyName;
    } else {
      return "Items";
    }
  }
  function getOrderItemsByFulfillmentGroup(order, fulfillmentGroup) {
    // console.log("full", fulfillmentGroup.fulfillmentGroupItems);
    let orderItemIds = _.map(
      fulfillmentGroup?.fulfillmentGroupItems,

      (fgItem) => fgItem.orderItemId
      // console.log(fulfillmentGroup.fulfillmentGroupItems)
    );
    return _.filter(order.orderItems, (orderItem) =>
      _.includes(orderItemIds, orderItem.id)
    );
  }
  const getOrderItems = () => {
    return getOrderItemsByFulfillmentGroup(cartData, fulfillmentGroupsData);
  };

  let orderItemsData = getOrderItems();

  useEffect(() => {
    const percenTage = minimumOrderItems - subtotal;
    if (percenTage >= minimumOrderItems) {
      setBorderWidth(100);
      return;
    }
    if (percenTage < 100) {
      setBorderWidth(percenTage);
      return;
    }
  }, [subtotal]);

  return (
    <SafeAreaView
      style={{
        backgroundColor: "#063e63",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
      edges={["right", "left", "top"]}
    >
      <StatusBar
        animated={false}
        translucent
        backgroundColor={"#063e63"}
        barStyle={"light-content"}
        hidden={false}
      />
      <View style={{}}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setShow(!modalVisible);
          }}
        >
          <View
            style={{
              backgroundColor: "#fff",
              margin: 10,
              marginTop: 250,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 5,
              borderRadius: 5,
            }}
          >
            <View
              style={{
                justifyContent: "space-between",
                padding: 10,
                borderBottomWidth: 1,
                borderColor: "#006ba6",
                flexDirection: "row",
              }}
            >
              <View style={{}}>
                <Text style={{ color: "#494c4c", fontWeight: "500" }}>
                  SHIPPING COUNT DOWN
                </Text>
              </View>
              <Pressable
                onPress={() => setShow(!modalVisible)}
                style={{ justifyContent: "center" }}
              >
                <Image
                  source={require("../../assets/close.png")}
                  style={{
                    width: 20,
                    height: 20,
                  }}
                />
              </Pressable>
            </View>
            <View style={{ padding: 10 }}>
              <Text style={{ color: "#494c4c" }}>
                Time left for next day shipping
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                borderColor: "#9b9b9b",
                borderWidth: 0.3,
                width: "80%",
                alignSelf: "center",
                paddingVertical: 10,
                marginVertical: 30,
                marginBottom: 50,
                borderRadius: 5,
              }}
            >
              <View style={{ paddingHorizontal: 10 }}>
                <Text style={{ fontWeight: "700" }}>00h 00m</Text>
              </View>
              <View style={{ justifyContent: "center", marginHorizontal: 30 }}>
                <Text style={{ fontSize: 10, color: "#9b9b9b" }}>
                  Left for next delivery
                </Text>
              </View>
            </View>
          </View>
        </Modal>
      </View>
      <View
        style={{
          backgroundColor: "#fff",
          flex: 1,
        }}
      >
        <Navbar />
        <View style={{ flex: 1 }}>
          {cartLength > 0 ? (
            <View style={{ flex: 1 }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: 10,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignSelf: "center",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Pressable
                    onPress={() => {
                      setShowDetails((pre) => !pre);
                    }}
                    style={{ paddingHorizontal: 5 }}
                  >
                    {showDetails ? (
                      <View>
                        <Image
                          source={require("../../assets/minus.png")}
                          style={{
                            width: 12,
                            height: 12,
                            alignSelf: "center",
                          }}
                        />
                      </View>
                    ) : (
                      <View>
                        <View>
                          <Image
                            source={require("../../assets/add.png")}
                            style={{
                              width: 12,
                              height: 12,
                              alignSelf: "center",
                            }}
                          />
                        </View>
                      </View>
                    )}
                  </Pressable>
                  <Pressable
                    onPress={() => {
                      setShowDetails((pre) => !pre);
                    }}
                  >
                    <Text style={styles.cartText}>
                      Your Cart ({cartLength} item
                      {emptyCartItems !== 1 ? "s" : ""})
                    </Text>
                  </Pressable>
                </View>
                <Pressable
                  onPress={() => {
                    modelOpenHandler();
                  }}
                >
                  <Image
                    source={require("../../assets/clock.png")}
                    style={{
                      width: 20,
                      height: 20,
                    }}
                  />
                </Pressable>

                <View>
                  <Text style={styles.cartText}> Sub Total: ${subtotal}</Text>
                </View>
              </View>
              {showDetails && (
                <View style={{ justifyContent: "center" }}>
                  <Image
                    source={require("../../assets/delivery-truck.png")}
                    style={{
                      width: 50,
                      height: 40,
                      alignSelf: "center",
                    }}
                  />
                  <View
                    style={{
                      marginHorizontal: "20%",
                      borderRadius: 3,
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <View
                      style={{
                        hieght: 10,
                        width: `${borderWidth < 0 ? 100 : 100 - borderWidth}%`,
                        borderWidth: 5,
                        borderColor: "#b7dd79",
                      }}
                    />
                    {borderWidth > 2 && (
                      <View
                        style={{
                          hieght: 10,
                          width: `${borderWidth}%`,
                          borderWidth: 5,
                          borderColor: "#9b9b9b",
                        }}
                      />
                    )}
                  </View>

                  {borderWidth < 0 ? (
                    <View
                      style={{
                        justifyContent: "center",
                        alignSelf: "center",
                        marginTop: 10,
                        color: "#494c4c",
                      }}
                    >
                      <Text>WOOHOO! Free Shipping!</Text>
                    </View>
                  ) : (
                    <View>
                      <View
                        style={{
                          justifyContent: "center",
                          alignSelf: "center",
                          marginTop: 10,
                          color: "#494c4c",
                        }}
                      >
                        <Text>
                          ${borderWidth.toFixed(2)} away from free shipping
                        </Text>
                      </View>

                      <View
                        style={{
                          justifyContent: "center",
                          alignSelf: "center",
                          marginTop: 10,
                        }}
                      >
                        <Text style={{ color: "#9b9b9b" }}>
                          FREE SHIPPING AT ${minimumOrderItems}
                        </Text>
                      </View>
                    </View>
                  )}
                  <View style={{ marginVertical: 5 }}>
                    <View style={{ marginVertical: 5 }}>
                      <Text style={styles.orderText}>Order Summary</Text>
                    </View>
                    <CartInfo />
                  </View>
                </View>
              )}

              <Pressable
                android_ripple={{ color: "#ccc" }}
                style={styles.proceedButtonContainer}
                onPress={() => SubmitCart()}
              >
                <Text style={styles.proceedButton}>PROCEED TO CHECKOUT</Text>
              </Pressable>
              <View style={styles.emptyButtonContainer}>
                <View>
                  <TextInput placeholder="Add PO#" style={styles.textInput} />
                </View>
                <Pressable
                  style={styles.emptyContainer}
                  android_ripple={{ color: "#ccc" }}
                  onPress={() => emptyCart(cartData?.id)}
                >
                  <Text style={styles.emptyText}>EMPTY CART</Text>
                </Pressable>
              </View>
              {loading && <Spinner />}
              <ScrollView>
                {_.map(pricedFulfillmentGroups, (fulfillmentGroup) => {
                  const fieldName = getFriendlyFulfillmentType(
                    cartData,
                    fulfillmentGroup
                  );
                  return (
                    <View>
                      {/* <Pressable
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        margin: 10,
                        padding: 10,
                        backgroundColor: "#f2f1ed",
                        borderRadius: 3,
                      }}
                      onPress={() => expnadHandler(fieldName)}
                    >
                      <Text>{fieldName}</Text>
                      <Text>
                        SubTotal:
                        <Text>
                          {" "}
                          ${fulfillmentGroup?.merchandiseTotal?.amount}
                        </Text>
                      </Text>
                    </Pressable> */}

                      <ExpandComponent
                        fieldName={fieldName}
                        amount={fulfillmentGroup?.merchandiseTotal?.amount}
                        orderItemsData={orderItemsData}
                        loading={loading}
                        onPress={() => expnadHandler(fieldName)}
                      />
                    </View>
                  );
                })}
              </ScrollView>

              {/* <ScrollView showsVerticalScrollIndicator={false}>
                {!expandStandard && (
                  <View
                    style={loading ? styles.mainBoxLoading : styles.mainBox}
                  >
                    {orderItemsData?.map((item) => {
                      return (
                        <View key={item.id}>
                          <CartScreen
                            url={item?.primaryMedia?.url}
                            name={item?.sku?.name}
                            nationalDrugCode={item?.sku?.nationalDrugCode}
                            externalId={item?.sku?.externalId}
                            manufacturer={item?.sku?.manufacturer}
                            description={item?.sku?.description}
                            itemForm={item?.sku?.itemForm}
                            id={item?.id}
                            amount={item?.salePrice.amount}
                            quantity={item?.quantity}
                            skuId={item?.sku?.id}
                            orderLimit={item?.sku?.dailyOrderLimit}
                            type={item?.sku?.productLists[0]?.type}
                            message={item?.sku?.itemMessages}
                            itemReturnable={item?.sku?.returnable}
                          />
                        </View>
                      );
                    })}
                  </View>
                )}
                {expandCII && (
                  <View
                    style={loading ? styles.mainBoxLoading : styles.mainBox}
                  >
                    {orderItemsData?.map((item) => {
                      return (
                        <View key={item.id}>
                          <CartScreen
                            url={item?.primaryMedia?.url}
                            name={item?.sku?.name}
                            nationalDrugCode={item?.sku?.nationalDrugCode}
                            externalId={item?.sku?.externalId}
                            manufacturer={item?.sku?.manufacturer}
                            description={item?.sku?.description}
                            itemForm={item?.sku?.itemForm}
                            id={item?.id}
                            amount={item?.salePrice.amount}
                            quantity={item?.quantity}
                            skuId={item?.sku?.id}
                            orderLimit={item?.sku?.dailyOrderLimit}
                            type={item?.sku?.productLists[0]?.type}
                            message={item?.sku?.itemMessages}
                            itemReturnable={item?.sku?.returnable}
                          />
                        </View>
                      );
                    })}
                  </View>
                )}
              </ScrollView> */}
            </View>
          ) : (
            <View style={styles.emptyCart}>
              <Text style={styles.emptyCartText}>Your cart is empty</Text>
            </View>
          )}
          <View style={{ left: 0, right: 0, bottom: 0 }}>
            <TabBar />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Cart;

const styles = StyleSheet.create({
  cartText: {
    color: "#494c4c",
    fontWeight: "500",
  },
  mainBoxLoading: { opacity: 0.2, flex: 1 },
  mainBox: { backgroundColor: "#fff", flex: 1 },
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
    flex: 1,
  },
  emptyCartText: {
    fontWeight: "bold",
    fontSize: 15,
  },
  orderText: {
    fontSize: 15,
    fontWeight: "800",
    color: "#494c4c",
    marginHorizontal: 10,
  },
});
