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
import { useNavigation, useIsFocused } from "@react-navigation/native";
import {
  userInfo,
  cartInfo,
  searchItems,
  searchProducts,
  productDetails,
} from "../../redux/features/productApi";
import { searchValues } from "../../redux/features/authUser.js";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const isFocused = useIsFocused();
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
      setOpenSearch(false);
    } catch (e) {
      Alert.alert(e.message);
    }
  };
  const BarCodeHandler = () => {
    navigation.navigate("Barcode");
  };

  const productDetailHandler = async (Id) => {
    navigation.navigate("ProductDetails");
    dispatch(productDetails(Id));
  };

  useEffect(() => {
    if (searchProducstsData.totalResults === 1) {
      productDetailHandler(searchProducstsData?.products[0]?.defaultSku?.id);
      return;
    }
    if (searchProducstsData.totalResults > 1) {
      navigation.navigate("SearchProduct");
      return;
    }
  }, [searchProducstsData]);

  useEffect(() => {
    searchItemHandler("");
  }, [isFocused]);
  return (
    <View>
      <View style={styles.searchBox}>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: 5,
          }}
        >
          <Image
            source={require("../../assets/search.png")}
            style={{
              width: 20,
              height: 20,
            }}
          />
        </View>
        <TextInput
          style={styles.input}
          placeholder="Search by number, name or keyword"
          onChangeText={(value) => searchItemHandler(value)}
          onClear={(value) => searchItemHandler("")}
        />
        <Pressable
          style={{ justifyContent: "center", marginHorizontal: 5 }}
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
              <View key={item}>
                <Pressable
                  style={styles.searchItemList}
                  android_ripple={{ color: "#ccc" }}
                  onPress={() => searchProductHandler(item)}
                >
                  <Text style={styles.search}>{item}</Text>
                </Pressable>
              </View>
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
    width: "80%",
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
