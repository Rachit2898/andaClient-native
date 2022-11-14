import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TextInput,
  Image,
  Alert,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  userInfo,
  cartInfo,
  searchItems,
  searchProducts,
} from "../../redux/features/productApi";
import { searchValues } from "../../redux/features/authUser.js";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [openSearch, setOpenSearch] = useState(false);
  const {
    userInfoData,
    cartInfoData,
    cartLength,
    searchItem,
    searchProducstsData,
  } = useSelector((state) => ({
    ...state.products,
  }));
  const searchItemHandler = async (item) => {
    setOpenSearch(true);
    dispatch(searchItems(item));
  };
  const searchProductHandler = async (item) => {
    try {
      dispatch(searchProducts(item));
      dispatch(searchValues(item));
      navigation.navigate("Auth", { screen: "SearchProduct" });
      setOpenSearch(false);
    } catch (e) {
      Alert.alert(e.message);
    }
  };
  const BarCodeHandler = () => {
    navigation.navigate("Auth", { screen: "Barcode" });
  };
  return (
    <View>
      <View style={styles.searchBox}>
        <TextInput
          style={styles.input}
          placeholder="Search by number, name or keyword"
          onChangeText={(value) => searchItemHandler(value)}
          onClear={(value) => searchItemHandler("")}
        />
        <Pressable
          style={{ justifyContent: "center" }}
          onPress={() => BarCodeHandler()}
        >
          <Image
            source={require("../../assets/barcode.png")}
            style={{
              width: 30,
              height: 30,
            }}
          />
        </Pressable>
      </View>
      {searchItem.length > 0 && openSearch ? (
        <View style={{ borderBottomWidth: 0.3, borderColor: "#9b9b9b" }}>
          {searchItem?.map((item) => {
            return (
              <>
                <Pressable
                  style={styles.searchItemList}
                  android_ripple={{ color: "#ccc" }}
                  onPress={() => searchProductHandler(item)}
                >
                  <Text style={styles.search}>{item}</Text>
                </Pressable>
              </>
            );
          })}
        </View>
      ) : (
        <></>
      )}
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
    borderColor: "#ececec",
    padding: 5,
    borderRadius: 3,
  },
  input: {
    color: "#494c4c",
    fontSize: 15,
    width: "85%",
  },
  search: {
    color: "#9b9b9b",
    fontWeight: "800",
    paddingLeft: 10,
  },
  searchItemList: {
    height: 25,
    borderColor: "#9b9b9b",
    borderTopWidth: 0.3,
    justifyContent: "center",
    marginVertical: 1,
  },
});
