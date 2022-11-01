import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  ScrollView,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import Spinner from "../components/Spinner";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import {
  inventoryWatch,
  addItem,
  userInfo,
} from "../redux/features/productApi";

const CloseOutScreen = (props) => {
  const scrollRef = useRef();
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
  const onPressTouch = () => {
    scrollRef?.current?.scrollTo({
      y: 0,
      animated: true,
    });
  };
  const data = inventoryWatchData?.products;

  useEffect(() => {
    dispatch(inventoryWatch({ value: "", currentPage }));
    dispatch(userInfo());
  }, []);
  const result = inventoryWatchData;
  const userData = userInfoData;

  const apiCall = async (currentPage) => {
    setCurrentPage(currentPage);
    dispatch(inventoryWatch({ value: "", currentPage }));
    onPressTouch();
  };

  useEffect(() => {
    apiCall(currentPage);
  }, []);

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
    const accountId = userData?.selectedAccount?.id;
    const quantity = count;
    try {
      dispatch(addItem({ accountId, skuId, quantity }));
    } catch (error) {
      alert("Could not Update Product!!");
    }
  }

  return (
    <View
      style={{
        borderTopWidth: 0.3,
        borderBottomWidth: 0.3,
        borderColor: "#757474",
        paddingHorizontal: 10,
        paddingVertical: 20,
        width: "100%",
        justifyContent: "space-between",
      }}
    >
      <View style={{ flexDirection: "row" }}>
        <View
          style={{
            justifyContent: "center",
            alignSelf: "center",
          }}
        >
          {props.inventoryClassKey === "C" && (
            <View
              style={[
                styles.bannerComponent,
                {
                  transform: [{ skewY: "-35deg" }],
                },
              ]}
            >
              <Text style={styles.bannerText}>C/O</Text>
            </View>
          )}
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
              source={require("../assets/camera.png")}
            />
          )}
        </View>
        <View
          style={{
            marginHorizontal: 10,
            justifyContent: "space-around",
            width: "70%",
          }}
        >
          <View style={{ paddingVertical: 5 }}>
            <Text style={{ color: "#005185" }}>{props?.name}</Text>
          </View>
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
                }}
              >
                {props?.itemForm}
              </Text>
              <Text style={{ fontSize: 12 }}>{props?.description}</Text>
              <View style={{ flexDirection: "row" }}>
                {props.netPriceItem && (
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
                      uri: "https://staging.andanet.com/cmsstatic/images/icons/icon_brand.png",
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
                      uri: "https://staging.andanet.com/cmsstatic/images/icons/icon_cii.png",
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
                      uri: "https://staging.andanet.com/cmsstatic/images/icons/icon_pet.png",
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
                      uri: "https://staging.andanet.com/cmsstatic/images/icons/icon_prescription.png",
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
                      uri: "https://staging.andanet.com/cmsstatic/images/icons/icon_refrigerated.png",
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
                      uri: "https://staging.andanet.com/cmsstatic/images/icons/icon_hazardous.png",
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
                      uri: "https://staging.andanet.com/cmsstatic/images/icons/icon_dropship.png",
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
                      uri: "https://staging.andanet.com/cmsstatic/images/icons/icon_dropship.png",
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
                      uri: "https://staging.andanet.com/cmsstatic/images/icons/icon_ab_rated.png",
                    }}
                    style={{
                      width: 20,
                      height: 20,
                    }}
                  />
                )}
                {props.rewardItem === "AB" && (
                  <Image
                    source={{
                      uri: "https://staging.andanet.com/cmsstatic/images/icons/icon_rewards.png",
                    }}
                    style={{
                      width: 20,
                      height: 20,
                    }}
                  />
                )}
                {props.priceType === "INDIRECT_CONTRACT" && (
                  <Image
                    source={{
                      uri: "https://staging.andanet.com/cmsstatic/images/icons/icon_anda_mfg_contract.png",
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
            <Text style={{ fontWeight: "700" }}>${props?.amount}</Text>
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
                  paddingHorizontal: 5,
                }}
              >
                <Text style={{ color: "#005185" }}>{count}</Text>
              </View>
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
                disabled={count === 3}
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
            </View>
            <Pressable
              style={{
                backgroundColor: "#c77500",
                width: 60,
                height: 25,
                borderRadius: 3,
                borderRadius: 4,
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={() => addItemIntoCart(props?.id)}
            >
              <Text
                style={{
                  color: "#fff",
                  fontWeight: "bold",
                  fontSize: 12,
                }}
              >
                ADD
              </Text>
            </Pressable>
          </View>

          <View
            style={{
              height: 20,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {count === 3 && currentIndex === props?.id && (
              <Text style={{ fontSize: 12, color: "#bd1c1c" }}>
                You Can Add Only 3 Items
              </Text>
            )}
          </View>
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

export default CloseOutScreen;

const styles = StyleSheet.create({
  pagination: {
    marginBottom: 100,
  },
  bannerComponent: {
    backgroundColor: "#ed8b00",
    width: 30,
    zIndex: 1,
    height: 20,
    marginHorizontal: 10,
  },
  bannerText: {
    color: "#fff",
    fontSize: 12,
    textAlign: "center",
    paddingHorizontal: 5,
    paddingVertical: 2,
  },
});
