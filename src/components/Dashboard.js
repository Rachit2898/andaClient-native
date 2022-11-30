import {
  StyleSheet,
  Text,
  View,
  Modal,
  Alert,
  Pressable,
  Image,
  ScrollView,
  TextInput,
  Linking,
} from "react-native";
import { Provider, useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect, useCallback } from "react";
import { logout } from "../../redux/features/authUser";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  NavigationContainer,
  useNavigation,
  StackActions,
} from "@react-navigation/native";
import TabBar from "./TabBar";

const Dashboard = ({ size }) => {
  const [formattedNumber, setFormattedNumber] = useState("");
  const [phoneFaxNumber, setPhoneFaxNumber] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const { userInfoData } = useSelector((state) => ({
    ...state.products,
  }));
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(!modalVisible);
  const userData = userInfoData;
  const logoutHandler = () => {
    navigation.navigate("HomePage");
    setTimeout(() => {
      dispatch(logout(false));
    });
  };
  useEffect(() => {
    let stringNumber =
      userData?.selectedAccount?.accountDetail?.accountRep.number;
    if (stringNumber.length === 10) {
      setFormattedNumber(
        stringNumber.replace(/(\d{3})(\d{3})(\d{4})/gi, "($1) $2-$3")
      );
    }
  }, [userData]);
  const favoritesOpen = async () => {
    navigation.navigate("Favorites");
    setModalVisible(!modalVisible);
  };
  const topPurchseOpen = async () => {
    navigation.navigate("TopPurchase");
    setModalVisible(!modalVisible);
  };
  const customerLikeYouOpen = async () => {
    navigation.navigate("CustomerLikeYou");
    setModalVisible(!modalVisible);
  };
  const preNegotiatedOpen = async () => {
    navigation.navigate("PreNegotiated");
    setModalVisible(!modalVisible);
  };
  const inventoryOpen = async () => {
    navigation.navigate("Inventory");
    setModalVisible(!modalVisible);
  };
  const savingsOpen = async () => {
    navigation.navigate("Savings");
    setModalVisible(!modalVisible);
  };
  const closeOutsOpen = async () => {
    navigation.navigate("CloseOuts");
    setModalVisible(!modalVisible);
  };
  const priceReductionOpen = async () => {
    navigation.navigate("PriceReduction");
    setModalVisible(!modalVisible);
  };
  const shortDateOpen = async () => {
    navigation.navigate("ShortDate");
    setModalVisible(!modalVisible);
  };
  const closeButtonHandler = async () => {
    navigation.goBack();
  };
  const OrderingOptionsOpen = async () => {
    navigation.navigate("OrderingOptions");
  };
  const OpeningAccountOpen = async () => {
    navigation.navigate("OpeningAccount");
  };
  const PaymentOpen = async () => {
    navigation.navigate("Payment");
  };
  const ReturnOpen = async () => {
    navigation.navigate("ReturnPolicy");
  };
  const FaqOpen = async () => {
    navigation.navigate("Faq");
  };
  const SettingOpen = async () => {
    navigation.navigate("Settings");
  };
  return (
    <SafeAreaView
      style={styles.safeAreaContainer}
      edges={["right", "left", "top"]}
    >
      <View style={{ flex: 1, backgroundColor: "#fff" }}>
        <View style={styles.closeButton}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",

              alignItems: "center",
            }}
          >
            <Image
              source={require("../../assets/icon.png")}
              style={{
                height: 40,
                width: 40,
                justifyContent: "center",
              }}
            />
            <View style={{ marginHorizontal: 5, justifyContent: "center" }}>
              <Text style={{ fontSize: 14 }}>{userData?.username}</Text>
            </View>
          </View>

          <Pressable
            onPress={() => closeButtonHandler()}
            style={{
              justifyContent: "center",
              alignSelf: "center",
              padding: 15,
            }}
          >
            <Image
              source={require("../../assets/close.png")}
              style={{
                height: 20,
                width: 20,
              }}
            />
          </Pressable>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          <View>
            <View>
              <View style={styles.prductListBlue}>
                <Text style={styles.productText}>Product Lists</Text>
              </View>
              <View style={{ marginHorizontal: 10, paddingVertical: 5 }}>
                <Pressable
                  onPress={() => {
                    favoritesOpen();
                  }}
                  style={{
                    borderBottomWidth: 1,
                    borderColor: "#ececec",
                    paddingBottom: 5,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 14,
                      paddingVertical: 5,
                      paddingHorizontal: 10,
                    }}
                  >
                    Favorites
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() => {
                    inventoryOpen();
                  }}
                  style={{
                    borderBottomWidth: 1,
                    borderColor: "#ececec",
                    paddingVertical: 5,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 14,
                      paddingVertical: 5,
                      paddingHorizontal: 10,
                    }}
                  >
                    Inventory Watch List
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() => {
                    topPurchseOpen();
                  }}
                  style={{
                    borderBottomWidth: 1,
                    borderColor: "#ececec",
                    paddingVertical: 5,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 14,
                      paddingVertical: 5,
                      paddingHorizontal: 10,
                    }}
                  >
                    Your Top Purchases
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() => {
                    preNegotiatedOpen();
                  }}
                  style={{
                    borderBottomWidth: 1,
                    borderColor: "#ececec",
                    paddingVertical: 5,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 14,
                      paddingVertical: 5,
                      paddingHorizontal: 10,
                    }}
                  >
                    Pre-Negotiated items
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() => {
                    customerLikeYouOpen();
                  }}
                  style={{
                    paddingTop: 5,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 14,
                      paddingVertical: 5,
                      paddingHorizontal: 10,
                    }}
                  >
                    Customers Like You
                  </Text>
                </Pressable>
              </View>
            </View>
            <View>
              <View style={styles.prductListBlue}>
                <Text style={styles.productText}>Savings</Text>
              </View>
              <View style={{ marginHorizontal: 10 }}>
                <Pressable
                  onPress={() => {
                    savingsOpen();
                  }}
                  style={{
                    borderBottomWidth: 1,
                    borderColor: "#ececec",
                    paddingVertical: 5,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 14,
                      paddingVertical: 5,
                      paddingHorizontal: 10,
                    }}
                  >
                    Savings
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() => {
                    closeOutsOpen();
                  }}
                  style={{
                    borderBottomWidth: 1,
                    borderColor: "#ececec",
                    paddingVertical: 5,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 14,
                      paddingVertical: 5,
                      paddingHorizontal: 10,
                    }}
                  >
                    Close Outs
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() => {
                    priceReductionOpen();
                  }}
                  style={{
                    borderBottomWidth: 1,
                    borderColor: "#ececec",
                    paddingVertical: 5,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 14,
                      paddingVertical: 5,
                      paddingHorizontal: 10,
                    }}
                  >
                    Price Reductions
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() => {
                    shortDateOpen();
                  }}
                  style={{
                    paddingVertical: 5,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 14,
                      paddingVertical: 5,
                      paddingHorizontal: 10,
                    }}
                  >
                    Short Dates
                  </Text>
                </Pressable>
              </View>
            </View>
            <View>
              <View style={styles.prductListBlue}>
                <Text style={styles.productText}>Support</Text>
              </View>
              <View style={{ marginHorizontal: 10 }}>
                <Pressable
                  onPress={() => {
                    OrderingOptionsOpen();
                  }}
                  style={{
                    borderBottomWidth: 1,
                    borderColor: "#ececec",
                    paddingVertical: 5,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 14,
                      paddingVertical: 5,
                      paddingHorizontal: 10,
                    }}
                  >
                    Ordering Options and Hours
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() => {
                    OpeningAccountOpen();
                  }}
                  style={{
                    borderBottomWidth: 1,
                    borderColor: "#ececec",
                    paddingVertical: 5,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 14,
                      paddingVertical: 5,
                      paddingHorizontal: 10,
                    }}
                  >
                    Opening an Account
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() => {
                    PaymentOpen();
                  }}
                  style={{
                    borderBottomWidth: 1,
                    borderColor: "#ececec",
                    paddingVertical: 5,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 14,
                      paddingVertical: 5,
                      paddingHorizontal: 10,
                    }}
                  >
                    Payment Options
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() => {
                    ReturnOpen();
                  }}
                  style={{
                    borderBottomWidth: 1,
                    borderColor: "#ececec",
                    paddingVertical: 5,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 14,
                      paddingVertical: 5,
                      paddingHorizontal: 10,
                    }}
                  >
                    Return Policy
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() => {
                    FaqOpen();
                  }}
                  style={{
                    borderBottomWidth: 1,
                    borderColor: "#ececec",
                    paddingVertical: 5,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 14,
                      paddingVertical: 5,
                      paddingHorizontal: 10,
                    }}
                  >
                    FAQs
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() => {
                    SettingOpen();
                  }}
                  style={{
                    borderBottomWidth: 1,
                    borderColor: "#ececec",
                    paddingVertical: 5,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 14,
                      paddingVertical: 5,
                      paddingHorizontal: 10,
                    }}
                  >
                    Settings
                  </Text>
                </Pressable>
                <View>
                  <Text
                    style={{
                      fontSize: 14,
                      paddingVertical: 5,
                      paddingHorizontal: 10,
                      color: "grey",
                    }}
                    onPress={() => Linking.openURL(`tel:${18003312632}`)}
                  >
                    Toll Free:{" "}
                    <Text style={{ color: "#006ba6" }}>1-800-331-2632</Text>
                  </Text>
                </View>
                <View>
                  <Text
                    style={{
                      fontSize: 14,
                      paddingVertical: 5,
                      paddingHorizontal: 10,
                      color: "grey",
                    }}
                    onPress={() => Linking.openURL(`tel:${18872632638}`)}
                  >
                    Tech Support:{" "}
                    <Text style={{ color: "#006ba6" }}>1-887-263-2638</Text>
                  </Text>
                </View>
                <View>
                  <Text
                    style={{
                      fontSize: 14,
                      paddingVertical: 5,
                      paddingHorizontal: 10,
                      color: "grey",
                    }}
                    onPress={() =>
                      Linking.openURL(`mailto:${"info@andanet.com"}`)
                    }
                  >
                    Email:{" "}
                    <Text style={{ color: "#006ba6" }}>info@andanet.com</Text>
                  </Text>
                </View>
                <View style={{}}>
                  <Text
                    style={{
                      fontSize: 14,
                      paddingVertical: 5,
                      paddingHorizontal: 10,
                      color: "grey",
                    }}
                  >
                    {userData?.selectedAccount?.accountDetail?.accountRep.name}
                  </Text>
                </View>
                <View style={{}}>
                  <Text
                    style={{
                      fontSize: 14,
                      paddingVertical: 5,
                      paddingHorizontal: 10,
                      color: "#006ba6",
                    }}
                    onPress={() => Linking.openURL(`tel:${formattedNumber}`)}
                  >
                    {formattedNumber} x
                    {
                      userData?.selectedAccount?.accountDetail?.accountRep
                        .extension
                    }
                  </Text>
                </View>
                <View style={{}}>
                  <Text
                    style={{
                      fontSize: 14,
                      paddingVertical: 5,
                      paddingHorizontal: 10,
                      color: "#006ba6",
                    }}
                    onPress={() =>
                      Linking.openURL(
                        `mailto:${userData?.selectedAccount?.accountDetail?.accountRep.salesRepEmail}`
                      )
                    }
                  >
                    {
                      userData?.selectedAccount?.accountDetail?.accountRep
                        .salesRepEmail
                    }
                  </Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <Text
                    style={{
                      fontSize: 14,
                      paddingVertical: 5,
                      paddingHorizontal: 10,
                      color: "grey",
                    }}
                  >
                    Follow Us @AndaInc
                  </Text>
                  <View style={{ flexDirection: "row" }}>
                    <Pressable
                      onPress={() =>
                        Linking.openURL(
                          "https://www.linkedin.com/company/andainc"
                        )
                      }
                    >
                      <Image
                        source={require("../../assets/linkedin.png")}
                        style={{ height: 30, width: 30 }}
                      />
                    </Pressable>
                    <Pressable
                      onPress={() =>
                        Linking.openURL("https://www.facebook.com/AndaInc")
                      }
                    >
                      <Image
                        source={require("../../assets/facebook.png")}
                        style={{ height: 30, width: 30, marginHorizontal: 10 }}
                      />
                    </Pressable>
                  </View>
                </View>
              </View>
            </View>
            <View>
              <Pressable
                android_ripple={{ color: "#ccc" }}
                style={styles.logoutBox}
                onPress={() => logoutHandler()}
              >
                <Text style={styles.logoutText}>LOGOUT</Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
        <View style={{ left: 0, right: 0, bottom: 0 }}>
          <TabBar />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  mainBoxLoading: { flex: 1, opacity: 0.2 },
  mainBox: { flex: 1, backgroundColor: "#fff" },

  safeAreaContainer: {
    flex: 1,
    backgroundColor: "#063e63",
  },

  modalView: {
    backgroundColor: "#fff",
    paddingVertical: 35,
    zIndex: 3000,
    zIndexInverse: 1000,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  closeButton: {
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  logoutBox: {
    backgroundColor: "#ed8b00",
    width: 80,
    height: 35,
    borderRadius: 3,
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
  },
  logoutText: {
    color: "#fff",

    fontSize: 12,
    fontWeight: "800",
  },
  prductListBlue: {
    backgroundColor: "#006ba6",

    paddingVertical: 5,
    justifyContent: "center",
  },
  productText: {
    color: "#fff",
    alignItems: "center",
    textAlign: "center",
    fontWeight: "600",
    justifyContent: "center",
  },
});
