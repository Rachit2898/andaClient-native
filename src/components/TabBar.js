import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import React, { useState, useEffect } from "react";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { cartInfo } from "../../redux/features/productApi";
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
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-around",
        backgroundColor: "#fff",
        paddingBottom: 20,
        paddingTop: 10,
        borderTopWidth: 1,
        borderColor: "#ececec",
      }}
    >
      <Pressable
        onPress={() => {
          navigation.navigate("HomePage");
        }}
        style={{ justifyContent: "center", alignItems: "center" }}
      >
        <Image
          style={{ height: 20, width: 20 }}
          source={require("../../assets/icon.png")}
        />
        <Text style={{ fontSize: 10 }}>Home</Text>
      </Pressable>
      <Pressable
        onPress={() => {
          navigation.navigate("Cart");
        }}
        style={{ justifyContent: "center", alignItems: "center" }}
      >
        <View style={{ flexDirection: "row" }}>
          <Image
            style={{ height: 20, width: 20 }}
            source={require("../../assets/cartLogo.png")}
          />
          {cartLength > 0 && (
            <View style={{ marginTop: -5, marginLeft: -8 }}>
              <Badge value={cartLength} />
            </View>
          )}
        </View>
        <Text style={{ fontSize: 10 }}>Cart</Text>
      </Pressable>
      <Pressable
        onPress={() => {
          navigation.navigate("Account");
        }}
        style={{ justifyContent: "center", alignItems: "center" }}
      >
        <Image
          style={{ height: 20, width: 20 }}
          source={require("../../assets/account.png")}
        />
        <Text style={{ fontSize: 10 }}>Account</Text>
      </Pressable>
      <Pressable
        onPress={() => {
          navigation.navigate("Dashboard");
        }}
        style={{ justifyContent: "center", alignItems: "center" }}
      >
        <Image
          style={{ height: 20, width: 20 }}
          source={require("../../assets/more.png")}
        />
        <Text style={{ fontSize: 10 }}>Menu</Text>
      </Pressable>
    </View>
  );
};

export default TabBar;

const styles = StyleSheet.create({});
