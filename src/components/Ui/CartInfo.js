import { StyleSheet, Text, View, Pressable, Alert } from "react-native";
import React from "react";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";

const CartInfo = () => {
  const { cartLength, cartValidateInfo, cartInfoData, itemLength } =
    useSelector((state) => ({
      ...state.products,
    }));
  const cartData = cartInfoData;

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
  const cartValue = cartLength;

  return (
    <View>
      <View style={styles.summaryContainer}></View>
      <View style={styles.itemQuantityContainer}>
        <View style={styles.itemResponseContainer}>
          <Text style={styles.itemText}>Items:</Text>
          <View style={styles.itemResponseTextContainer}>
            <Text style={styles.itemResponseText}>
              {cartValue === 0 ? itemLength : cartValue}
            </Text>
          </View>
        </View>
        <View style={styles.itemResponseContainer}>
          <Text style={styles.itemText}>Item Quantities:</Text>
          <View style={styles.itemResponseTextContainer}>
            <Text style={styles.itemResponseText}>
              {cartValidateInfo?.order?.itemCount}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.itemQuantityContainer}>
        {_.map(pricedFulfillmentGroups, (fulfillmentGroup) => {
          const fieldName = getFriendlyFulfillmentType(
            cartData,
            fulfillmentGroup
          );
          return (
            <View style={styles.itemResponseContainer}>
              <Text style={styles.itemSubTotal}>{fieldName} Subtotal:</Text>
              <View style={styles.itemResponseTextContainer}>
                <Text style={styles.itemSubTotal}>
                  ${fulfillmentGroup?.merchandiseTotal?.amount}
                </Text>
              </View>
            </View>
          );
        })}
        <View style={styles.itemResponseContainer}>
          <Text style={styles.itemSubTotal}>Shipping Fee:</Text>
          <View style={styles.itemResponseTextContainer}>
            {cartValidateInfo?.order?.totalShipping?.amount > 0 ? (
              <Text style={styles.itemSubTotal}>
                ${cartValidateInfo?.order?.totalShipping?.amount}
              </Text>
            ) : (
              <Text style={styles.itemSubTotalResponseText}>Waived</Text>
            )}
          </View>
        </View>
      </View>
      <View style={styles.itemQuantityContainer}>
        <View style={styles.itemResponseContainer}>
          <Text style={styles.itemEstimated}>Estimated Tax:</Text>
          <View style={styles.itemResponseTextContainer}>
            <Text style={styles.itemSubTax}>
              {" "}
              ${cartValidateInfo?.order?.totalTax?.amount}
            </Text>
          </View>
        </View>
        <View style={styles.itemResponseContainer}>
          <Text style={styles.itemTotal}>Order Total:</Text>
          <View style={styles.itemResponseTotalCostContainer}>
            <Text style={styles.itemTotalResponseText}>
              ${cartValidateInfo?.order?.total?.amount}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default CartInfo;

const styles = StyleSheet.create({
  editComponent: {
    alignItems: "flex-end",
  },
  itemTotal: {
    fontSize: 16,
    fontWeight: "800",
    color: "#494c4c",
  },
  itemResponseTotalCostContainer: {
    alignItems: "flex-end",
  },
  itemEstimated: {
    fontWeight: "600",
    color: "#494c4c",
  },
  itemTotalResponseText: {
    fontSize: 16,
    fontWeight: "800",
    color: "#494c4c",
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
    color: "#494c4c",
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
