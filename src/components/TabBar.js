import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import React from "react";
import { useIsFocused, useNavigation } from "@react-navigation/native";

const TabBar = () => {
  const navigation = useNavigation();
  return (
    <View style={{ flexDirection: "row", justifyContent: "center" }}>
      <Pressable
        onPress={() => {
          navigation.navigate("HomePage");
        }}
      >
        <Image
          style={{ height: 30, width: 30 }}
          source={require("../../assets/icon.png")}
        />
      </Pressable>
      <Pressable
        onPress={() => {
          navigation.navigate("Cart");
        }}
        style={{ flexDirection: "row" }}
      >
        <Image
          style={{ height: 20, width: 20 }}
          source={require("../../assets/cartLogo.png")}
        />
      </Pressable>
      <Pressable
        onPress={() => {
          navigation.navigate("Account");
        }}
        style={{ flexDirection: "row" }}
      >
        <Image
          style={{ height: 20, width: 20 }}
          source={require("../../assets/account.png")}
        />
      </Pressable>
      <Pressable
        onPress={() => {
          navigation.navigate("Dashboard");
        }}
        style={{ flexDirection: "row" }}
      >
        <Image
          style={{ height: 20, width: 20 }}
          source={require("../../assets/more.png")}
        />
      </Pressable>
    </View>
  );
};

export default TabBar;

const styles = StyleSheet.create({});
