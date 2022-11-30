import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  ScrollView,
  Alert,
  TextInput,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import Spinner from "../components/Spinner";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import {
  inventoryWatch,
  addItem,
  userInfo,
  productDetails,
  addFavorites,
  removeFavorites,
} from "../../redux/features/productApi";
import LikeButton from "../components/Ui/LikeButton";
import AddButton from "../components/Ui/AddButton";

const SearchProductScreen = (props) => {
  const scrollRef = useRef();
  const navigation = useNavigation();
  const [itemValues, setItem] = useState([]);
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [count, setCount] = useState(1);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const { inventoryWatchData, userInfoData, addLoading } = useSelector(
    (state) => ({
      ...state.products,
    })
  );

  const checkBoxHandler = (item) => {
    setItem(item);
  };

  const addButton = (id) => {
    setCurrentIndex(id);
    setCount(count + 1);
  };

  const removeButton = (id) => {
    setCurrentIndex(id);
    setCount(count - 1);
  };
  async function addItemIntoCart(skuId) {
    const accountId = props.accountId;
    const quantity = count;
    if (quantity <= 0) {
      Alert.alert("Please enter quantity greater than 0");
      return;
    }
    try {
      dispatch(addItem({ accountId, skuId, quantity }));
    } catch (error) {
      alert("Could not Update Product!!");
    }
  }

  const productDetailHandler = async (Id) => {
    navigation.navigate("ProductDetails");
    dispatch(productDetails(Id));
  };

  const favoriteHandler = (id, value) => {
    console.log({ id });
    if (value === "FAVORITE") {
      dispatch(removeFavorites({ id }));
    } else {
      dispatch(addFavorites({ id }));
    }
  };
  const changeHandler = (id, value) => {
    setCount(value);
    setCurrentIndex(id);
  };
  const historyPage = false;
  const returnAuthoizationsEnabled = false;
  const contractFacetLabelChangeEnabled = true;

  return (
    <View
      style={{
        borderTopWidth: 0.3,
        borderBottomWidth: 0.3,
        borderColor: "#ececec",
        paddingHorizontal: 10,
        paddingVertical: 20,
        width: "100%",
        justifyContent: "space-between",
      }}
    >
      <View style={{ flexDirection: "row" }}>
        <Pressable
          style={{
            justifyContent: "center",
            alignSelf: "center",
          }}
          onPress={() => {
            productDetailHandler(props.id);
          }}
        >
          {props.url ? (
            <>
              <Image
                style={{
                  borderRadius: 3,
                  marginVertical: 5,
                  width: 80,
                  height: 80,
                }}
                source={{
                  uri: `https://staging.andanet.com${props?.url}`,
                }}
              />
            </>
          ) : (
            <Image
              style={{
                borderRadius: 3,
                marginVertical: 5,
                width: 80,
                height: 80,
              }}
              source={require("../../assets/camera.png")}
            />
          )}
        </Pressable>
        <LikeButton
          onPress={() => {
            favoriteHandler(props?.id, props.type);
          }}
          value={props.type}
        />
        <View
          style={{
            marginHorizontal: 10,
            justifyContent: "space-around",
            width: "70%",
          }}
        >
          <Pressable
            style={{ paddingBottom: 5 }}
            onPress={() => {
              productDetailHandler(props.id);
            }}
          >
            <Text style={{ color: "#005185" }}>{props?.name}</Text>
          </Pressable>
          <View
            style={{
              flexDirection: "row",
              width: "100%",
            }}
          >
            <View>
              <View
                style={{
                  flexDirection: "row",
                  paddingVertical: 5,
                  width: 120,
                }}
              >
                <Text
                  style={{
                    fontWeight: "700",
                    fontSize: 12,
                    color: "#494c4c",
                  }}
                >
                  NDC:
                </Text>
                <Text style={{ fontSize: 12 }}>{props?.nationalDrugCode}</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  paddingVertical: 5,
                }}
              >
                <Text
                  style={{
                    fontWeight: "700",
                    fontSize: 12,
                    color: "#494c4c",
                  }}
                >
                  ITEM:
                </Text>
                <Text style={{ fontSize: 12 }}>{props?.externalId}</Text>
              </View>
              <View
                style={{
                  paddingVertical: 5,
                  flexWrap: "wrap",
                  flexDirection: "row",
                  flex: 1,
                }}
              >
                <Text
                  style={{
                    fontWeight: "700",
                    fontSize: 12,
                    color: "#494c4c",
                  }}
                >
                  MFR:
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    flexWrap: "wrap",

                    flex: 1,
                  }}
                >
                  {props?.manufacturer}
                </Text>
              </View>
            </View>
            <View
              style={{
                padding: 5,
                flexWrap: "wrap",
                flex: 1,
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                  flexWrap: "wrap",
                  width: "100%",
                  color: "#494c4c",
                }}
              >
                {props?.itemForm}
              </Text>
              <Text style={{ fontSize: 12, color: "#494c4c" }}>
                {props?.description}
              </Text>
              <View style={{ flexDirection: "row" }}>
                {props.netPriceItem && !historyPage && (
                  <Image
                    source={{
                      uri: "https://staging.andanet.com/cmsstatic/images/icons/icon_netprice_hover_2.png",
                    }}
                    style={{
                      width: 20,
                      height: 20,
                    }}
                  />
                )}

                {props.generic && !props.petFriendly && (
                  <Image
                    source={{
                      uri: "https://staging.andanet.com/cmsstatic/images/icons/icon_brand_hover.png",
                    }}
                    style={{
                      width: 20,
                      height: 20,
                    }}
                  />
                )}

                {props.schedule === 2 && (
                  <Image
                    source={{
                      uri: "https://staging.andanet.com/cmsstatic/images/icons/icon_cii_hover.png",
                    }}
                    style={{
                      width: 20,
                      height: 20,
                    }}
                  />
                )}
                {props.petFriendly && (
                  <Image
                    source={{
                      uri: "https://staging.andanet.com/cmsstatic/images/icons/icon_pet_hover.png",
                    }}
                    style={{
                      width: 20,
                      height: 20,
                    }}
                  />
                )}
                {props.petFriendly && props.rxItem && (
                  <Image
                    source={{
                      uri: "https://staging.andanet.com/cmsstatic/images/icons/icon_prescription_hover.png",
                    }}
                    style={{
                      width: 20,
                      height: 20,
                    }}
                  />
                )}
                {props.refrigerated && (
                  <Image
                    source={{
                      uri: "https://staging.andanet.com/cmsstatic/images/icons/icon_refrigerated_hover.png",
                    }}
                    style={{
                      width: 20,
                      height: 20,
                    }}
                  />
                )}
                {props.hazardousMaterial && (
                  <Image
                    source={{
                      uri: "https://staging.andanet.com/cmsstatic/images/icons/icon_hazardous_hover.png",
                    }}
                    style={{
                      width: 20,
                      height: 20,
                    }}
                  />
                )}
                {props.groundShip && (
                  <Image
                    source={{
                      uri: "https://staging.andanet.com/cmsstatic/images/icons/icon_dropship_hover.png",
                    }}
                    style={{
                      width: 20,
                      height: 20,
                    }}
                  />
                )}
                {props.dropShipOnly && (
                  <Image
                    source={{
                      uri: "https://staging.andanet.com/cmsstatic/images/icons/icon_dropship_hover.png",
                    }}
                    style={{
                      width: 20,
                      height: 20,
                    }}
                  />
                )}
                {props.itemRating === "AB" && (
                  <Image
                    source={{
                      uri: "https://staging.andanet.com/cmsstatic/images/icons/icon_ab_rated_hover.png",
                    }}
                    style={{
                      width: 20,
                      height: 20,
                    }}
                  />
                )}
                {props.rewardItem && !historyPage && (
                  <Image
                    source={{
                      uri: "https://staging.andanet.com/cmsstatic/images/icons/icon_rewards_hover.png",
                    }}
                    style={{
                      width: 20,
                      height: 20,
                    }}
                  />
                )}
                {props.priceType === "INDIRECT_CONTRACT" &&
                  !contractFacetLabelChangeEnabled && (
                    <Image
                      source={{
                        uri: "https://staging.andanet.com/cmsstatic/images/icons/icon_indirectContract_hover.png",
                      }}
                      style={{
                        width: 20,
                        height: 20,
                      }}
                    />
                  )}
                {props.priceType === "DIRECT_CONTRACT" &&
                  contractFacetLabelChangeEnabled && (
                    <Image
                      source={{
                        uri: "https://staging.andanet.com/cmsstatic/images/icons/icon_anda_contract_hover.png",
                      }}
                      style={{
                        width: 20,
                        height: 20,
                      }}
                    />
                  )}
                {props.priceType === "DIRECT_CONTRACT" &&
                  !contractFacetLabelChangeEnabled && (
                    <Image
                      source={{
                        uri: "https://staging.andanet.com/cmsstatic/images/icons/icon_directContract_hover.png",
                      }}
                      style={{
                        width: 20,
                        height: 20,
                      }}
                    />
                  )}
                {props.itemReturnable && returnAuthoizationsEnabled && (
                  <Image
                    source={{
                      uri: "https://staging.andanet.com/cmsstatic/images/icons/icon_anda_mfg_contract_hover.png",
                    }}
                    style={{
                      width: 20,
                      height: 20,
                    }}
                  />
                )}
              </View>
            </View>
          </View>
          <View style={{}}>
            <Text style={{ fontWeight: "700", color: "#494c4c" }}>
              ${props?.amount}
            </Text>
          </View>
        </View>
      </View>
      {props?.values !== 0 ? (
        <View>
          <View
            style={{
              justifyContent: "space-around",
              flexDirection: "row",
              paddingVertical: 10,
            }}
          >
            <View
              style={{
                backgroundColor: "#fff",
                width: 70,
                height: 25,
                borderRadius: 3,
                marginLeft: "12%",
                borderRadius: 4,
                justifyContent: "space-between",
                flexDirection: "row",
                borderWidth: 1,
                borderColor: "#878787",
              }}
            >
              <Pressable
                style={{
                  borderRightWidth: 1,
                  borderColor: "#878787",
                  alignItems: "center",
                  justifyContent: "center",
                  paddingHorizontal: 5,
                  backgroundColor: "#cfcccc",
                }}
                onPress={() => {
                  removeButton(props?.id);
                }}
                disabled={count === 1}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 15,
                  }}
                >
                  -
                </Text>
              </Pressable>
              <View
                style={{
                  alignSelf: "center",
                }}
              >
                <TextInput
                  style={{
                    color: "#005185",
                    alignSelf: "center",
                    justifyContent: "center",
                    textAlign: "center",

                    width: 30,
                  }}
                  onChangeText={(value) => changeHandler(props?.id, value)}
                  keyboardType="number-pad"
                >
                  {count}
                </TextInput>
              </View>
              {!!props.orderLimit ? (
                <Pressable
                  style={{
                    borderLeftWidth: 1,
                    borderColor: "#878787",
                    alignItems: "center",
                    justifyContent: "center",
                    paddingHorizontal: 5,
                    backgroundColor: "#cfcccc",
                  }}
                  onPress={() => {
                    addButton(props?.id);
                  }}
                  disabled={count === props.orderLimit}
                >
                  <Text
                    style={{
                      fontWeight: "bold",
                      fontSize: 15,
                    }}
                  >
                    +
                  </Text>
                </Pressable>
              ) : (
                <Pressable
                  style={{
                    borderLeftWidth: 1,
                    borderColor: "#878787",
                    alignItems: "center",
                    justifyContent: "center",
                    paddingHorizontal: 5,
                    backgroundColor: "#cfcccc",
                  }}
                  onPress={() => {
                    addButton(props?.id);
                  }}
                >
                  <Text
                    style={{
                      fontWeight: "bold",
                      fontSize: 15,
                    }}
                  >
                    +
                  </Text>
                </Pressable>
              )}
            </View>
            <AddButton onPress={() => addItemIntoCart(props?.id)} />
          </View>

          {!!props.orderLimit && (
            <View
              style={{
                height: 20,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {count === props.orderLimit && currentIndex === props?.id && (
                <Text style={{ fontSize: 12, color: "#bd1c1c" }}>
                  You Can Add Only {props.orderLimit} Items
                </Text>
              )}
            </View>
          )}
        </View>
      ) : (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginVertical: 10,
          }}
        >
          <Text style={{}}>We will notify you when this item is in stock</Text>
        </View>
      )}
    </View>
  );
};

export default SearchProductScreen;

const styles = StyleSheet.create({
  pagination: {
    marginBottom: 100,
  },
});
