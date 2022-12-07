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
import _ from "lodash";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [openSearch, setOpenSearch] = useState(false);
  const [searchValue, setSearchValue] = useState();
  const { searchItem, searchProducstsData } = useSelector((state) => ({
    ...state.products,
  }));
  const searchItemHandler = async (item) => {
    setSearchValue(item);
    setOpenSearch(true);
    dispatch(searchItems(item));
  };
  const searchProductHandler = async (item) => {
    if (item.length >= 3) {
      try {
        dispatch(searchProducts(item));
        dispatch(searchValues(item));
        setOpenSearch(false);
        navigation.navigate("SearchProduct");
      } catch (e) {
        Alert.alert(e.message);
      }
    }
  };
  const BarCodeHandler = () => {
    navigation.navigate("Barcode");
  };
  // const productDetailHandler = async (Id) => {
  //   navigation.navigate("ProductDetails");
  //   dispatch(productDetails(Id));
  // };

  // useEffect(() => {
  //   if (searchProducstsData.totalResults === 1) {
  //     productDetailHandler(searchProducstsData?.products[0]?.defaultSku?.id);
  //     return;
  //   }
  //   if (searchProducstsData.totalResults > 1) {
  //     navigation.navigate("SearchProduct");
  //     return;
  //   }
  // }, [searchProducstsData]);

  useEffect(() => {
    searchItemHandler("");
  }, [isFocused]);
  const cleanSearchHandler = () => {
    setSearchValue("");
    setOpenSearch(false);
  };

  return (
    <View>
      <View style={styles.searchBox}>
        <Pressable
          onPress={() => searchProductHandler(searchValue)}
          // style={
          //   searchValue?.length >= 3 ? styles.searchIconBlue : styles.searchIcon
          // }
          style={styles.searchIcon}
          // disabled={searchValue?.length < 3}
        >
          {searchValue?.length >= 3 ? (
            <Image
              source={require("../../assets/search-blue.png")}
              style={{
                width: 20,
                height: 20,
              }}
            />
          ) : (
            <Image
              source={require("../../assets/search.png")}
              style={{
                width: 20,
                height: 20,
              }}
            />
          )}
        </Pressable>

        <TextInput
          style={styles.input}
          placeholder="Search by number, name or keyword"
          onChangeText={(value) => searchItemHandler(value)}
          onClear={(value) => searchItemHandler("")}
          returnKeyType="search"
          onSubmitEditing={() => searchProductHandler(searchValue)}
          value={searchValue}
        />
        <View
          style={{
            justifyContent: "center",
            width: "10%",
            alignItems: "center",
          }}
        >
          {searchValue?.length ? (
            <Pressable onPress={() => cleanSearchHandler()}>
              <Image
                source={require("../../assets/close.png")}
                style={{
                  width: 15,
                  height: 15,
                }}
              />
            </Pressable>
          ) : (
            <></>
          )}
        </View>

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
          {searchItem?.map((item, i) => {
            let title = _.split(
              _.toLower(item),
              _.toLower(_.trim(searchValue))
            );
            title = _.flatMap(title, (t, i) => [
              _.toUpper(t),
              <Text
                style={{ fontWeight: "bold", color: "#494c4c" }}
                key={"1" + i}
              >
                {_.toUpper(searchValue)}
              </Text>,
            ]);
            title.pop();
            return (
              <View key={item}>
                {console.log(searchValue.length)}
                {searchValue.length > 0 && (
                  <Pressable
                    style={styles.searchItemList}
                    android_ripple={{ color: "#ccc" }}
                    onPress={() => searchProductHandler(item)}
                  >
                    <Text style={styles.search}>{title}</Text>
                  </Pressable>
                )}
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
    fontSize: 12,
    width: "70%",
    marginHorizontal: 5,
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
  searchIconBlue: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 5,
    backgroundColor: "#006ba6",
    borderRadius: 3,
  },
  searchIcon: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 5,
    borderRadius: 3,
  },
});
