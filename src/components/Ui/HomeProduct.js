import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  ScrollView,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import LikeButton from "./LikeButton";
import AddButton from "./AddButton";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import {
  addItem,
  productDetails,
  addFavorites,
  removeFavorites,
} from "../../../redux/features/productApi";

const HomeProduct = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  async function addItemIntoCart(skuId) {
    const accountId = props.accountId;
    try {
      dispatch(addItem({ accountId, skuId, quantity: 1 }));
    } catch (error) {
      Alert.alert("Could not Update Product!!");
    }
  }
  const productDetailHandler = async (Id) => {
    navigation.navigate("ProductDetails");
    dispatch(productDetails(Id));
  };
  const favoriteHandler = (id, value) => {
    if (value === "FAVORITE") {
      dispatch(removeFavorites({ id }));
    } else {
      dispatch(addFavorites({ id }));
    }
  };
  return (
    <View>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={{
          height: "90%",
          flexDirection: "row",
          width: "100%",
        }}
      >
        {props.products?.products?.map((item) => {
          return (
            <View
              style={{
                justifyContent: "center",
              }}
              key={item?.defaultSku?.id}
            >
              <View
                style={{
                  borderWidth: 0.3,
                  borderColor: "#ececec",
                  borderRadius: 7,
                  backgroundColor: "#fafafa",
                  width: 180,
                  height: 220,
                  marginHorizontal: 2,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                  }}
                >
                  <Pressable
                    onPress={() => {
                      productDetailHandler(item?.defaultSku?.id);
                    }}
                  >
                    {item?.mediaMap?.primary?.url ? (
                      <Image
                        style={{
                          borderRadius: 3,
                          marginVertical: 5,
                          width: 80,
                          borderRadius: 7,
                          height: 80,
                          justifyContent: "center",
                          alignSelf: "center",
                        }}
                        source={{
                          uri: `https://staging.andanet.com${item?.mediaMap?.primary?.url}`,
                        }}
                      />
                    ) : (
                      <Image
                        style={{
                          borderRadius: 3,
                          marginVertical: 5,
                          width: 80,
                          height: 80,
                          borderRadius: 7,
                          justifyContent: "center",
                          alignSelf: "center",
                        }}
                        source={require("../../../assets/camera.png")}
                      />
                    )}
                  </Pressable>
                  <View
                    style={{
                      marginHorizontal: 10,
                      marginVertical: 5,
                    }}
                  >
                    <LikeButton
                      onPress={() => {
                        favoriteHandler(
                          item?.defaultSku?.id,
                          item?.defaultSku?.productLists[0]?.type
                        );
                      }}
                      value={item?.defaultSku?.productLists[0]?.type}
                    />
                  </View>
                </View>
                <Pressable
                  style={{
                    margin: 5,
                    height: 30,
                  }}
                  onPress={() => {
                    productDetailHandler(item?.defaultSku?.id);
                  }}
                >
                  <Text
                    style={{
                      color: "#006ba6",
                      fontWeight: "700",
                      fontSize: 10,
                      flexWrap: "wrap",
                      width: "100%",
                    }}
                  >
                    {item.defaultSku.name}
                  </Text>
                </Pressable>
                <View style={{ margin: 5 }}>
                  <View style={{ flexDirection: "row" }}>
                    <Text
                      style={{
                        fontWeight: "700",
                        fontSize: 9,
                        color: "#494c4c",
                      }}
                    >
                      NDC:
                    </Text>
                    <Text style={{ fontSize: 9 }}>
                      {item?.defaultSku?.nationalDrugCode}
                    </Text>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <Text
                      style={{
                        fontWeight: "700",
                        fontSize: 9,
                        color: "#494c4c",
                      }}
                    >
                      ITEM:
                    </Text>
                    <Text style={{ fontSize: 9 }}>{item?.defaultSku?.id}</Text>
                  </View>
                  <View
                    style={{
                      marginVertical: 10,
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <View
                      style={{
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Text
                        style={{
                          fontWeight: "700",
                          fontSize: 12,
                          color: "#494c4c",
                        }}
                      >
                        ${item?.defaultSku?.retailPrice?.amount}
                      </Text>
                    </View>
                    <View style={{ marginHorizontal: 10 }}>
                      <AddButton
                        onPress={() => addItemIntoCart(item?.defaultSku?.id)}
                        count={1}
                      />
                    </View>
                  </View>
                </View>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default HomeProduct;

const styles = StyleSheet.create({
  slide: {
    marginHorizontal: 10,
    paddingVertical: 10,
  },
  slideAnim: {
    marginHorizontal: 10,
    backgroundColor: "#006ba6",
    paddingVertical: 10,
    opacity: 1,
  },
});
