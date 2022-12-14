import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import Navbar from "./Navbar";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { checkOutConfirmation } from "../../redux/features/productApi";
import TabBar from "./TabBar";
import CartInfo from "../components/Ui/CartInfo";
const CheckOut = () => {
  const dispatch = useDispatch();

  const {
    cartLength,
    cartValidateInfo,
    cartCheckOutInfo,
    itemLength,
    checkOutData,
  } = useSelector((state) => ({
    ...state.products,
  }));

  const orderId = cartValidateInfo?.order?.id;

  useEffect(() => {
    dispatch(checkOutConfirmation(orderId));
  }, [dispatch]);
  const cartCount = cartValidateInfo?.order?.itemCount;

  return (
    <SafeAreaView
      style={{ backgroundColor: "#fff", flex: 1 }}
      edges={["right", "left", "top"]}
    >
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <Navbar />
          {cartCheckOutInfo && (
            <View>
              <View style={styles.thankYouContainer}>
                <Text style={styles.thankYouText}>
                  Thank You For Your Order!
                </Text>
              </View>
              <View style={styles.summaryContainer}>
                <Text style={styles.summaryText}>Order Summary</Text>
                <Text
                  style={{
                    color: "#409b4b",
                    fontSize: 15,
                    fontWeight: "800",
                    marginVertical: 30,
                    textAlign: "center",
                  }}
                >
                  Your Order Number is: {checkOutData?.orderNumber}
                </Text>
              </View>
              <View>
                <CartInfo />
              </View>
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

export default CheckOut;

const styles = StyleSheet.create({
  thankYouContainer: {
    alignItems: "center",
    marginVertical: 20,
    textAlign: "center",
    borderBottomWidth: 0.5,
    paddingBottom: 10,
    marginHorizontal: 10,
  },
  thankYouText: {
    fontSize: 20,
    fontWeight: "800",
    color: "#494c4c",
  },
  summaryContainer: {
    alignItems: "center",
    marginVertical: 20,
    textAlign: "center",
  },
  summaryText: {
    fontSize: 15,
    fontWeight: "800",
    color: "#494c4c",
    textAlign: "center",
  },
  editComponent: {
    alignItems: "flex-end",
  },
  itemTotal: {
    fontSize: 20,
    fontWeight: "800",
  },
  itemResponseTotalCostContainer: {
    alignItems: "flex-end",
  },
  itemEstimated: {
    fontWeight: "600",
  },
  itemTotalResponseText: {
    fontSize: 20,
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
    marginTop: 10,
    marginHorizontal: 10,
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: "#9b9b9b",
  },
});
