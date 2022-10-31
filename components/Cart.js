import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TextInput,
  Image,
  ScrollView,
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
} from "../redux/features/productApi";
import Navbar from "./Navbar";

const Cart = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [count, setCount] = useState(1);

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
  useEffect(() => {
    dispatch(cartInfo());
  }, [cartLength]);

  return (
    <SafeAreaView style={{ backgroundColor: "#005185", flex: 1 }}>
      <View
        style={{
          backgroundColor: "#fff",
          marginBottom: 150,
        }}
      >
        <Navbar />
        {cartLength > 0 ? (
          <View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                padding: 10,
              }}
            >
              <View>
                <Text style={styles.cartText}>
                  {" "}
                  Your Cart ({cartLength} item
                  {emptyCartItems !== 1 ? "s" : ""})
                </Text>
              </View>
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
            <ScrollView>
              <View style={loading ? styles.mainBoxLoading : styles.mainBox}>
                {orderItems?.map((item) => {
                  return (
                    <View>
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
  mainBox: { backgroundColor: "#fff", marginBottom: 200, flex: 1 },
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
