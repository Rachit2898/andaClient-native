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
    <View style={styles.modalView}>
      <View style={styles.closeButton}>
        <View style={{ flexDirection: "row" }}>
          <Image
            source={require("../../assets/icon.png")}
            style={{ height: 40, width: 40 }}
          />
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
      <View style={{ margin: 10 }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View
            style={{
              width: 25,
              justifyContent: "center",
              alignItems: "center",
              height: 25,
            }}
          >
            <Image
              source={require("../../assets/account.png")}
              style={{
                height: 20,
                width: 20,
              }}
            />
          </View>
          <View style={{ marginHorizontal: 10 }}>
            <Text style={{ fontSize: 15 }}>{userData?.username}</Text>
          </View>
        </View>
        {/* <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginVertical: 10,
          }}
        >
          <View
            style={{
              alignItems: "center",
            }}
          >
            <Image
              source={require("../../assets/notification.png")}
              style={{
                height: 25,
                width: 25,
              }}
            />
          </View>
          <View style={{ marginHorizontal: 10 }}>
            <Text style={{ fontSize: 15 }}>Notifications</Text>
          </View>
        </View> */}
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ marginBottom: 150 }}>
          <View>
            <View style={styles.prductListBlue}>
              <Text style={styles.productText}>Product Lists</Text>
            </View>
            <View style={{ marginHorizontal: 10, paddingVertical: 5 }}>
              <Pressable
                onPress={() => {
                  favoritesOpen();
                }}
              >
                <Text
                  style={{
                    fontSize: 15,
                    paddingVertical: 5,
                    textDecorationLine: "underline",
                  }}
                >
                  Favorites
                </Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  inventoryOpen();
                }}
              >
                <Text
                  style={{
                    fontSize: 15,
                    paddingVertical: 5,
                    textDecorationLine: "underline",
                  }}
                >
                  Inventory Watch List
                </Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  topPurchseOpen();
                }}
              >
                <Text
                  style={{
                    fontSize: 15,
                    paddingVertical: 5,
                    textDecorationLine: "underline",
                  }}
                >
                  Your Top Purchases
                </Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  preNegotiatedOpen();
                }}
              >
                <Text
                  style={{
                    fontSize: 15,
                    paddingVertical: 5,
                    textDecorationLine: "underline",
                  }}
                >
                  Pre-Negotiated items
                </Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  customerLikeYouOpen();
                }}
              >
                <Text
                  style={{
                    fontSize: 15,
                    paddingVertical: 5,
                    textDecorationLine: "underline",
                  }}
                >
                  Customers Like You
                </Text>
              </Pressable>
            </View>
          </View>
          <View style={{ marginVertical: 10 }}>
            <View style={styles.prductListBlue}>
              <Text style={styles.productText}>Savings</Text>
            </View>
            <View style={{ marginHorizontal: 10, paddingVertical: 5 }}>
              <Pressable
                onPress={() => {
                  savingsOpen();
                }}
              >
                <Text
                  style={{
                    fontSize: 15,
                    paddingVertical: 5,
                    textDecorationLine: "underline",
                  }}
                >
                  Savings
                </Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  closeOutsOpen();
                }}
              >
                <Text
                  style={{
                    fontSize: 15,
                    paddingVertical: 5,
                    textDecorationLine: "underline",
                  }}
                >
                  Close Outs
                </Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  priceReductionOpen();
                }}
              >
                <Text
                  style={{
                    fontSize: 15,
                    paddingVertical: 5,
                    textDecorationLine: "underline",
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
                    fontSize: 15,
                    paddingVertical: 5,
                    textDecorationLine: "underline",
                  }}
                >
                  Short Dates
                </Text>
              </Pressable>
            </View>
          </View>
          <View style={{ marginVertical: 10 }}>
            <View style={styles.prductListBlue}>
              <Text style={styles.productText}>Support</Text>
            </View>
            <View style={{ marginHorizontal: 10, paddingVertical: 5 }}>
              <Pressable
                onPress={() => {
                  OrderingOptionsOpen();
                }}
              >
                <Text
                  style={{
                    fontSize: 15,
                    paddingVertical: 5,
                    textDecorationLine: "underline",
                  }}
                >
                  Ordering Options and Hours
                </Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  OpeningAccountOpen();
                }}
              >
                <Text
                  style={{
                    fontSize: 15,
                    paddingVertical: 5,
                    textDecorationLine: "underline",
                  }}
                >
                  Opening an Account
                </Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  PaymentOpen();
                }}
              >
                <Text
                  style={{
                    fontSize: 15,
                    paddingVertical: 5,
                    textDecorationLine: "underline",
                  }}
                >
                  Payment Options
                </Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  ReturnOpen();
                }}
              >
                <Text
                  style={{
                    fontSize: 15,
                    paddingVertical: 5,
                    textDecorationLine: "underline",
                  }}
                >
                  Return Policy
                </Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  FaqOpen();
                }}
              >
                <Text
                  style={{
                    fontSize: 15,
                    paddingVertical: 5,
                    textDecorationLine: "underline",
                  }}
                >
                  FAQs
                </Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  SettingOpen();
                }}
              >
                <Text
                  style={{
                    fontSize: 15,
                    paddingVertical: 5,
                    textDecorationLine: "underline",
                  }}
                >
                  Settings
                </Text>
              </Pressable>
              <Text style={{ fontSize: 15, paddingVertical: 5 }}>
                Toll Free: 1-800-331-2632
              </Text>
              <Text style={{ fontSize: 15, paddingVertical: 5 }}>
                Tech Support:1-887-263-2638
              </Text>
              <Text style={{ fontSize: 15, paddingVertical: 5 }}>
                Email: info@andanet.com
              </Text>
              <Text style={{ fontSize: 15, paddingVertical: 5 }}>
                DONNA ROCHIN
              </Text>
              <Text style={{ fontSize: 15, paddingVertical: 5 }}>
                (800) 331-2632 x75104
              </Text>
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
    </View>
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
    borderBottomWidth: 0.3,
    borderColor: "#005185",
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
    height: 30,
    marginBottom: 10,
  },
  productText: {
    color: "#fff",
    alignItems: "center",
    textAlign: "center",
    paddingTop: 5,
    fontWeight: "800",
  },
});
