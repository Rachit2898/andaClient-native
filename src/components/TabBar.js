import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import React, { useState, useEffect } from "react";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { cartInfo } from "../../redux/features/productApi";
import { cartColor } from "../../redux/features/authUser";
import { Badge } from "react-native-elements";

const TabBar = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(cartInfo());
  }, []);

  const { cartLength } = useSelector((state) => ({
    ...state.products,
  }));
  const { cartName } = useSelector((state) => ({
    ...state.auth,
  }));
  return (
    <View
      style={{
        flexDirection: "row",
        backgroundColor: "#fff",
        paddingBottom: 20,
        borderTopWidth: 1,
        borderColor: "#ececec",
      }}
    >
      <Pressable
        onPress={() => {
          navigation.navigate("HomePage");
          dispatch(cartColor("Home"));
        }}
        style={[
          cartName === "Home" ? styles.upperBorder : styles.upperBorderNone,
        ]}
      >
        {cartName === "Home" ? (
          <Image
            style={{ height: 20, width: 20 }}
            source={require("../../assets/icon-home-blue.png")}
          />
        ) : (
          <Image
            style={{ height: 20, width: 20 }}
            source={require("../../assets/icon-home.png")}
          />
        )}
        <Text
          style={[cartName === "Home" ? styles.logoNameLight : styles.logoName]}
        >
          Home
        </Text>
      </Pressable>
      <Pressable
        onPress={() => {
          navigation.navigate("Cart");
          dispatch(cartColor("Cart"));
        }}
        style={[
          cartName === "Cart" ? styles.upperBorder : styles.upperBorderNone,
        ]}
      >
        <View style={{ flexDirection: "row", marginLeft: 20 }}>
          {cartName === "Cart" ? (
            <Image
              style={{ height: 20, width: 20 }}
              source={require("../../assets/shopping-cart-blue.png")}
            />
          ) : (
            <Image
              style={{ height: 20, width: 20 }}
              source={require("../../assets/cartLogo.png")}
            />
          )}
          <View style={{ marginTop: -5, marginLeft: -8, width: 30 }}>
            {cartLength > 0 && <Badge value={cartLength} />}
          </View>
        </View>
        <Text
          style={[cartName === "Cart" ? styles.logoNameLight : styles.logoName]}
        >
          Cart
        </Text>
      </Pressable>
      <Pressable
        onPress={() => {
          navigation.navigate("Account");
          dispatch(cartColor("Account"));
        }}
        style={[
          cartName === "Account" ? styles.upperBorder : styles.upperBorderNone,
        ]}
      >
        {cartName === "Account" ? (
          <Image
            style={{ height: 20, width: 20 }}
            source={require("../../assets/user-blue.png")}
          />
        ) : (
          <Image
            style={{ height: 20, width: 20 }}
            source={require("../../assets/account.png")}
          />
        )}

        <Text
          style={[
            cartName === "Account" ? styles.logoNameLight : styles.logoName,
          ]}
        >
          Account
        </Text>
      </Pressable>
      <Pressable
        onPress={() => {
          navigation.navigate("Dashboard");
          dispatch(cartColor("Dashboard"));
        }}
        style={[
          cartName === "Dashboard"
            ? styles.upperBorder
            : styles.upperBorderNone,
        ]}
      >
        {cartName === "Dashboard" ? (
          <Image
            style={{ height: 20, width: 20 }}
            source={require("../../assets/more-blue.png")}
          />
        ) : (
          <Image
            style={{ height: 20, width: 20 }}
            source={require("../../assets/more.png")}
          />
        )}

        <Text
          style={[
            cartName === "Dashboard" ? styles.logoNameLight : styles.logoName,
          ]}
        >
          More
        </Text>
      </Pressable>
    </View>
  );
};

export default TabBar;

const styles = StyleSheet.create({
  logoName: {
    color: "#494c4c",
    fontSize: 10,
  },
  logoNameLight: {
    fontSize: 10,
    color: "#006ba6",
  },
  upperBorder: {
    justifyContent: "center",
    alignItems: "center",
    borderTopWidth: 3,
    borderColor: "#006ba6",
    paddingTop: 7,
    width: "25%",
  },
  upperBorderNone: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 10,
    width: "25%",
  },
});
