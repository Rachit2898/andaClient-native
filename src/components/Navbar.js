import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TextInput,
  Image,
} from "react-native";
import React from "react";

const Navbar = () => {
  return (
    <View style={styles.searchBox}>
      <TextInput
        style={styles.input}
        placeholder="Search by number, name or keyword"
      />
      <Pressable style={{ justifyContent: "center" }}>
        <Image
          source={require("../../assets/barcode.png")}
          style={{
            width: 30,
            height: 30,
          }}
        />
      </Pressable>
      {/* <View>{openBarCode ? <Barcode /> : <></>}</View> */}
    </View>
  );
};

export default Navbar;

const styles = StyleSheet.create({
  searchBox: {
    margin: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#8d9090",
    padding: 5,
    borderRadius: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  input: {
    color: "#494c4c",
    fontSize: 15,
    width: "85%",
  },
});
