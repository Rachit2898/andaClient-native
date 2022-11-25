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

function ClockModel(props) {
  const [modalVisible, setShow] = useState(false);
  return (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
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
            width: "100%",
            height: 200,
            backgroundColor: "red",

            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text>Hello</Text>
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => setShow(!modalVisible)}
          >
            <Text style={styles.textStyle}>Hide Modal</Text>
          </Pressable>
        </View>
      </Modal>
    </View>
  );
}

const Cart = () => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const [modalVisible, setShow] = useState(false);
  const navigation = useNavigation();
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [count, setCount] = useState(1);
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
  } = useSelector((state) => ({
    ...state.products,
  }));
  const cartData = cartInfoData;
  const orderItems = cartData?.orderItems;

  async function emptyCart(id) {
    Alert.alert(
      "Hold on!",
      "Are you sure you want to remove all items from your cart?",
      [
        {
          text: "Cancel",
          onPress: () => null,
          style: "NO",
        },
        { text: "YES", onPress: () => dispatch(emptyCartItems(id)) },
      ]
    );
    // try {
    //   dispatch(emptyCartItems(id));
    // } catch (error) {
    //   alert("Could Not Empty Cart!!");
    // }
  }

  useEffect(() => {
    dispatch(cartInfo());
  }, [cartLength, updateCart, isFocused, favResponse]);

  // useEffect(() => {
  //   const subscription1 = Notifications.addNotificationReceivedListener(
  //     (notification) => {
  //       console.log("NOTIFICATION RECEIVED");
  //       console.log(notification);
  //       const userName = notification.request.content.data.userName;
  //       console.log(userName);
  //     }
  //   );

  //   const subscription2 = Notifications.addNotificationResponseReceivedListener(
  //     (response) => {
  //       console.log("NOTIFICATION RESPONSE RECEIVED");
  //       console.log(response);
  //       const userName = response.notification.request.content.data.userName;
  //       console.log(userName);
  //     }
  //   );

  //   return () => {
  //     subscription1.remove();
  //     subscription2.remove();
  //   };
  // }, [cartLength]);

  function scheduleNotificationHandler() {
    Notifications.scheduleNotificationAsync({
      content: {
        title: "Congratulations",
        body: "Your Order Has Been Placed Successfully",
        data: { userName: "Andanet" },
      },
      trigger: {
        seconds: 5,
      },
    });
  }

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
  const onRequestClose = () => {
    Alert.alert("Modal has been closed.");
    setShow(!modalVisible);
  };

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
                  padding: 10,
                }}
              >
                <View>
                  <Text style={styles.cartText}>
                    Your Cart ({cartLength} item
                    {emptyCartItems !== 1 ? "s" : ""})
                  </Text>
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

              <ScrollView
                showsVerticalScrollIndicator={false}
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                  />
                }
              >
                <View style={loading ? styles.mainBoxLoading : styles.mainBox}>
                  {orderItems?.map((item) => {
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
                          message={item?.sku?.itemMessages[0]?.message}
                        />
                      </View>
                    );
                  })}
                </View>
              </ScrollView>
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
});
