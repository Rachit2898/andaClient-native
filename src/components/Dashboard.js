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
      <View style={{ flex: 1 }}>
        <View style={styles.closeButton}>
          <View style={{ flexDirection: "row" }}>
            <Image
              source={require("../../assets/icon.png")}
              style={{ height: 40, width: 40 }}
            />
            <View style={{ marginHorizontal: 5, justifyContent: "center" }}>
              <Text style={{ fontSize: 12 }}>{userData?.username}</Text>
            </View>
          </View>

          <Pressable
            onPress={() => closeButtonHandler()}
            style={{ justifyContent: "center", alignSelf: "center" }}
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
                      fontSize: 12,
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
                      fontSize: 12,
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
                      fontSize: 12,
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
                      fontSize: 12,
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
                      fontSize: 12,
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
                      fontSize: 12,
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
                      fontSize: 12,
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
                      fontSize: 12,
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
                >
                  <Text
                    style={{
                      fontSize: 12,
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
                      fontSize: 12,
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
                      fontSize: 12,
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
                      fontSize: 12,
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
                      fontSize: 12,
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
                      fontSize: 12,
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
                      fontSize: 12,
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
                      fontSize: 12,
                      paddingVertical: 5,
                      paddingHorizontal: 10,
                      color: "grey",
                    }}
                  >
                    Toll Free: 1-800-331-2632
                  </Text>
                </View>
                <View>
                  <Text
                    style={{
                      fontSize: 12,
                      paddingVertical: 5,
                      paddingHorizontal: 10,
                      color: "grey",
                    }}
                  >
                    Tech Support:1-887-263-2638
                  </Text>
                </View>
                <View>
                  <Text
                    style={{
                      fontSize: 12,
                      paddingVertical: 5,
                      paddingHorizontal: 10,
                      color: "grey",
                    }}
                  >
                    Email: info@andanet.com
                  </Text>
                </View>
                <View style={{}}>
                  <Text
                    style={{
                      fontSize: 12,
                      paddingVertical: 5,
                      paddingHorizontal: 10,
                      color: "grey",
                    }}
                  >
                    DONNA ROCHIN
                  </Text>
                </View>
                <View style={{}}>
                  <Text
                    style={{
                      fontSize: 12,
                      paddingVertical: 5,
                      paddingHorizontal: 10,
                      color: "grey",
                    }}
                  >
                    (800) 331-2632 x75104
                  </Text>
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
    backgroundColor: "#fff",
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
    paddingBottom: 10,
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
    marginVertical: 5,
    paddingVertical: 2,
    justifyContent: "center",
  },
  productText: {
    color: "#fff",
    alignItems: "center",
    textAlign: "center",
    fontWeight: "700",
    justifyContent: "center",
  },
});
