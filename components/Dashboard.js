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
import { logout } from "../redux/features/authUser";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationContainer, useNavigation } from "@react-navigation/native";

const Dashboard = ({ modalVisible, setModalVisible }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const logoutHandler = () => {
    dispatch(logout(false));
  };
  const favoritesOpen = async () => {
    navigation.navigate("Auth", { screen: "Favorites" });
    setModalVisible(!modalVisible);
  };
  const topPurchseOpen = async () => {
    navigation.navigate("Auth", { screen: "TopPurchase" });
    setModalVisible(!modalVisible);
  };
  const customerLikeYouOpen = async () => {
    navigation.navigate("Auth", { screen: "CustomerLikeYou" });
    setModalVisible(!modalVisible);
  };
  const preNegotiatedOpen = async () => {
    navigation.navigate("Auth", { screen: "PreNegotiated" });
    setModalVisible(!modalVisible);
  };
  const inventoryOpen = async () => {
    navigation.navigate("Auth", { screen: "Inventory" });
    setModalVisible(!modalVisible);
  };
  const savingsOpen = async () => {
    navigation.navigate("Auth", { screen: "Savings" });
    setModalVisible(!modalVisible);
  };
  const closeOutsOpen = async () => {
    navigation.navigate("Auth", { screen: "CloseOuts" });
    setModalVisible(!modalVisible);
  };
  const priceReductionOpen = async () => {
    navigation.navigate("Auth", { screen: "PriceReduction" });
    setModalVisible(!modalVisible);
  };
  const shortDateOpen = async () => {
    navigation.navigate("Auth", { screen: "ShortDate" });
    setModalVisible(!modalVisible);
  };
  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
        propagateSwipe={true}
        swipeDirection="down"
      >
        <View style={styles.modalView}>
          <View style={styles.closeButton}>
            <View style={{ flexDirection: "row" }}>
              <Image
                source={require("../assets/icon.png")}
                style={{ height: 40, width: 40 }}
              />
              <View style={{ justifyContent: "center", alignSelf: "center" }}>
                <Text style={{ fontSize: 18, fontWeight: "600" }}>
                  Dashboard
                </Text>
              </View>
            </View>

            <Pressable
              onPress={() => setModalVisible(false)}
              style={{ justifyContent: "center", alignSelf: "center" }}
            >
              <Image
                source={require("../assets/close.png")}
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
                  backgroundColor: "#006ba6",
                  width: 25,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 50,
                  height: 25,
                }}
              >
                <MaterialCommunityIcons name="account" size="20" color="#fff" />
              </View>
              <View style={{ marginHorizontal: 10 }}>
                <Text style={{ fontSize: 15 }}>Account</Text>
              </View>
            </View>
            <View
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
                <MaterialCommunityIcons
                  name="bell-badge"
                  size="25"
                  color="#006ba6"
                />
              </View>
              <View style={{ marginHorizontal: 10 }}>
                <Text style={{ fontSize: 15 }}>Notifications</Text>
              </View>
            </View>
          </View>
          <ScrollView>
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
                    <Text style={{ fontSize: 15, paddingVertical: 5 }}>
                      Favorites
                    </Text>
                  </Pressable>
                  <Pressable
                    onPress={() => {
                      inventoryOpen();
                    }}
                  >
                    <Text style={{ fontSize: 15, paddingVertical: 5 }}>
                      Inventory Watch List
                    </Text>
                  </Pressable>
                  <Pressable
                    onPress={() => {
                      topPurchseOpen();
                    }}
                  >
                    <Text style={{ fontSize: 15, paddingVertical: 5 }}>
                      Your Top Purchases
                    </Text>
                  </Pressable>
                  <Pressable
                    onPress={() => {
                      preNegotiatedOpen();
                    }}
                  >
                    <Text style={{ fontSize: 15, paddingVertical: 5 }}>
                      Pre-Negotiated items
                    </Text>
                  </Pressable>
                  <Pressable
                    onPress={() => {
                      customerLikeYouOpen();
                    }}
                  >
                    <Text style={{ fontSize: 15, paddingVertical: 5 }}>
                      Customer Like You
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
                    <Text style={{ fontSize: 15, paddingVertical: 5 }}>
                      Savings
                    </Text>
                  </Pressable>
                  <Pressable
                    onPress={() => {
                      closeOutsOpen();
                    }}
                  >
                    <Text style={{ fontSize: 15, paddingVertical: 5 }}>
                      Close Outs
                    </Text>
                  </Pressable>
                  <Pressable
                    onPress={() => {
                      priceReductionOpen();
                    }}
                  >
                    <Text style={{ fontSize: 15, paddingVertical: 5 }}>
                      Price Reductions
                    </Text>
                  </Pressable>
                  <Pressable
                    onPress={() => {
                      shortDateOpen();
                    }}
                  >
                    <Text style={{ fontSize: 15, paddingVertical: 5 }}>
                      Short Dates
                    </Text>
                  </Pressable>
                  <Text style={{ fontSize: 15, paddingVertical: 5 }}>
                    Volume Discounts
                  </Text>
                </View>
              </View>
              <View style={{ marginVertical: 10 }}>
                <View style={styles.prductListBlue}>
                  <Text style={styles.productText}>Support</Text>
                </View>
                <View style={{ marginHorizontal: 10, paddingVertical: 5 }}>
                  <Text style={{ fontSize: 15, paddingVertical: 5 }}>
                    Ordering Options and Hours
                  </Text>
                  <Text style={{ fontSize: 15, paddingVertical: 5 }}>
                    Opening an Account
                  </Text>
                  <Text style={{ fontSize: 15, paddingVertical: 5 }}>
                    Payment Options
                  </Text>
                  <Text style={{ fontSize: 15, paddingVertical: 5 }}>
                    Return Policy
                  </Text>
                  <Text style={{ fontSize: 15, paddingVertical: 5 }}>
                    FAQ'S
                  </Text>
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
      </Modal>
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
    paddingVertical: 10,
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 2,
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