import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Alert,
  Linking,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Navbar from "./Navbar";
import { useDispatch, useSelector } from "react-redux";
import { cartCheckOut } from "../../redux/features/productApi";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import TabBar from "./TabBar";
import CartInfo from "../components/Ui/CartInfo";
import CartScreen from "../screens/CartScreen";
import { ScrollView } from "react-native-gesture-handler";

const SubmitCart = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { cartLength, cartValidateInfo, userInfoData, cartInfoData, loading } =
    useSelector((state) => ({
      ...state.products,
    }));
  const userData = userInfoData;
  const checkOutHandler = async (orderId) => {
    try {
      dispatch(cartCheckOut(orderId));
      navigation.navigate("CheckOut");
    } catch (error) {
      Alert.alert("Error");
    }
  };
  const editOrderNavigation = () => {
    navigation.navigate("Cart");
  };
  const cartCount = cartValidateInfo?.order?.itemCount;

  const data = cartInfoData?.orderItems;

  return (
    <SafeAreaView
      style={{ backgroundColor: "#fff", flex: 1 }}
      edges={["right", "left", "top"]}
    >
      <View style={{ flex: 1 }}>
        <View
          style={{
            backgroundColor: "#fff",
            flex: 1,
          }}
        >
          {cartCount && (
            <View>
              <View style={styles.summaryContainer}>
                <View>
                  <Text style={styles.orderText}>Order Summary</Text>
                </View>
                <Pressable
                  onPress={() => {
                    editOrderNavigation();
                  }}
                >
                  <Text style={styles.editOrderText}>EDIT ORDER</Text>
                </Pressable>
              </View>
              <CartInfo />
              <Pressable
                android_ripple={{ color: "#ccc" }}
                style={styles.proceedButtonContainer}
                onPress={() => checkOutHandler(cartValidateInfo?.order?.id)}
              >
                <Text style={styles.proceedButton}>SUBMIT YOUR CART</Text>
              </Pressable>
              <ScrollView showsVerticalScrollIndicator={false}>
                <View>
                  <View style={{ alignItems: "center", marginVertical: 10 }}>
                    <Text style={{ textAlign: "center" }}>
                      <Text style={{ color: "#494c4c" }}>
                        By placing your order, you agree to Anda's{" "}
                      </Text>
                    </Text>
                    <Text
                      onPress={() =>
                        Linking.openURL(
                          "https://staging.andanet.com/content/terms-of-use"
                        )
                      }
                      style={{ color: "#006ba6" }}
                    >
                      Terms & Conditions
                    </Text>
                  </View>

                  <View
                    style={{
                      borderBottomWidth: 2,
                      borderBottomColor: "#f2f2f2",
                      paddingVertical: 5,
                    }}
                  >
                    <Text
                      style={{
                        textAlign: "center",
                        fontWeight: "bold",
                        color: "#494c4c",
                        fontSize: 15,
                      }}
                    >
                      Shipping Information
                    </Text>
                  </View>
                  <View style={{ alignItems: "center" }}>
                    <View style={{ padding: 10, alignItems: "center" }}>
                      <View style={{ flexDirection: "row", marginTop: 5 }}>
                        <Text style={{ color: "#494c4c", textAlign: "center" }}>
                          {userData?.selectedAccount.addresses[0]?.companyName}
                        </Text>
                      </View>
                      <View style={{ flexDirection: "row", marginTop: 5 }}>
                        <Text style={{ color: "#494c4c" }}>
                          {userData?.selectedAccount.addresses[0]?.addressLine1}
                        </Text>
                      </View>
                      <View style={{ flexDirection: "row", marginTop: 5 }}>
                        <Text style={{ color: "#494c4c" }}>
                          {userData?.selectedAccount.addresses[0]?.addressLine2}
                        </Text>
                      </View>
                      <View style={{ flexDirection: "row", marginTop: 5 }}>
                        <Text style={{ color: "#494c4c" }}>
                          {userData?.selectedAccount.addresses[0]?.city},{" "}
                          {
                            userData?.selectedAccount.addresses[0]
                              ?.countrySubdivision?.abbreviation
                          }{" "}
                          {userData?.selectedAccount.addresses[0]?.postalCode}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View
                    style={loading ? styles.mainBoxLoading : styles.mainBox}
                  >
                    {data?.map((item) => {
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
                            isCart={false}
                          />
                        </View>
                      );
                    })}
                  </View>
                </View>
              </ScrollView>
            </View>
          )}
        </View>
        <View style={{ left: 0, right: 0, bottom: 0 }}>
          <TabBar />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SubmitCart;

const styles = StyleSheet.create({
  mainBoxLoading: {},
  mainBox: { backgroundColor: "#fff", marginBottom: 300 },
  editComponent: {
    alignItems: "flex-end",
  },
  itemTotal: {
    fontSize: 16,
    fontWeight: "800",
  },
  itemResponseTotalCostContainer: {
    alignItems: "flex-end",
  },
  itemEstimated: {
    fontWeight: "600",
  },
  itemTotalResponseText: {
    fontSize: 16,
    fontWeight: "800",
  },
  itemSubTax: {},
  itemSubTotalResponseText: {
    color: "#409b4b",
    fontWeight: "800",
  },
  proceedButtonContainer: {
    height: 50,
    backgroundColor: "#ed8b00",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ed8b00",
    marginHorizontal: 10,
    marginTop: 20,
  },
  proceedButton: {
    paddingVertical: 15,
    fontWeight: "700",
    color: "white",
  },
  itemText: {
    color: "#9b9b9b",
    fontSize: 15,
    fontWeight: "800",
  },
  itemResponseContainer: {
    marginVertical: 5,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  itemSubTotal: {
    fontWeight: "500",
  },
  itemResponseTextContainer: {
    alignItems: "flex-end",
  },
  itemQuantityContainer: {
    marginTop: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: "#9b9b9b",
    marginHorizontal: 10,
  },
  itemResponseText: {
    color: "#9b9b9b",
    fontSize: 15,
    fontWeight: "800",
  },
  orderText: {
    fontSize: 15,
    fontWeight: "800",
    color: "#494c4c",
  },
  editOrderText: {
    color: "#006ba6",
    fontSize: 12,
    fontWeight: "800",
  },
  summaryContainer: {
    marginHorizontal: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: "#9b9b9b",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
