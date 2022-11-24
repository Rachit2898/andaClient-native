import { StyleSheet, Text, View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import Navbar from "../components/Navbar";
import Component from "./HeadingDetail";
import TabBar from "../components/TabBar";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const OrderingAndOptions = () => {
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "#fff" }}
      edges={["right", "left"]}
    >
      <Navbar />
      <View style={{ flex: 1, backgroundColor: "#fff" }}>
        <View style={styles.prductListBlue}>
          <Text style={styles.productText}>Ordering Options and Hours</Text>
        </View>

        <ScrollView>
          <Component
            heading={"Order Your Way"}
            value={
              "We provide extended cut-off times up to 9:30 p.m. ET for overnight shipping; giving you added flexibility of having extra time to meet your business needs."
            }
          />
          <Component
            heading={"Online"}
            value={
              "Access our user-friendly website to help you support the needs of your patients and business by making ordering the easiest part of your day."
            }
          />
          <Component
            heading={"Phone"}
            value={
              "One of our specially trained, dedicated support team members will be available to provide you with a personalized approach to managing all of your needs"
            }
            phone={"1-800-331-2632"}
          />

          <View
            style={{
              paddingVertical: 10,
              borderColor: "#006ba6",
              borderBottomWidth: 1,
            }}
          >
            <View style={{ paddingHorizontal: 10 }}>
              <View>
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: "bold",
                    color: "#006ba6",
                  }}
                >
                  Electronic Data Interchange (EDI)
                </Text>
              </View>
              <View style={{ marginTop: 15 }}>
                <Text>Common EDI Transmissions:</Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginLeft: 15,
                  }}
                >
                  <MaterialCommunityIcons
                    name="circle"
                    color="black"
                    size={5}
                  />
                  <Text> Purchase Order Processing (850)</Text>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginLeft: 15,
                  }}
                >
                  <MaterialCommunityIcons
                    name="circle"
                    color="black"
                    size={5}
                  />
                  <Text> Purchasing Order Acknowledgment (855)</Text>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginLeft: 15,
                  }}
                >
                  <MaterialCommunityIcons
                    name="circle"
                    color="black"
                    size={5}
                  />
                  <Text> Ship Notice/Manifest (856)</Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginLeft: 15,
                  }}
                >
                  <MaterialCommunityIcons
                    name="circle"
                    color="black"
                    size={5}
                  />
                  <Text> Ship Notice/Manifest (856)</Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginLeft: 15,
                  }}
                >
                  <MaterialCommunityIcons
                    name="circle"
                    color="black"
                    size={5}
                  />
                  <Text> Invoice (810)</Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginLeft: 15,
                  }}
                >
                  <MaterialCommunityIcons
                    name="circle"
                    color="black"
                    size={5}
                  />
                  <Text> Price Catalog (832)</Text>
                </View>
              </View>
            </View>
          </View>

          <Component
            heading={"Fax"}
            value={
              "One of our specially trained, dedicated support team members will be available to provide you with a personalized approach to managing all of your needs."
            }
            phone={"1-866-600-3860"}
          />

          <View
            style={{
              paddingVertical: 10,
              borderColor: "#006ba6",
              borderBottomWidth: 1,
            }}
          >
            <View style={{ paddingHorizontal: 10 }}>
              <View>
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: "bold",
                    color: "#006ba6",
                  }}
                >
                  Ordering Hours
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    fontWeight: "700",
                    marginTop: 10,
                    color: "#006ba6",
                  }}
                >
                  Phone & Fax Hours:
                </Text>
                <View style={{ flexDirection: "row" }}>
                  <Text>
                    <Text style={{ fontWeight: "700" }}>Monday - Friday:</Text>
                    <Text style={{ flex: 1, flexWrap: "wrap" }}>
                      9:00 a.m. to 9:00 p.m. ET for next-day delivery*.
                    </Text>
                  </Text>
                </View>
                <View>
                  <Text>
                    <Text style={{ fontWeight: "700" }}>Saturday:</Text>
                    <Text style={{ flex: 1, flexWrap: "wrap" }}>
                      from 10:00 a.m. to 3:00 p.m. ET for Monday delivery.
                    </Text>
                  </Text>
                </View>
              </View>
              <View>
                <Text
                  style={{
                    fontWeight: "700",
                    marginTop: 10,
                    color: "#006ba6",
                  }}
                >
                  Online Ordering Hours:
                </Text>
                <View style={{ flexDirection: "row" }}>
                  <Text>
                    <Text style={{ fontWeight: "700" }}>Monday - Friday:</Text>
                    <Text style={{ flex: 1, flexWrap: "wrap" }}>
                      Orders placed by 9:30 p.m. ET will be shipped for next-day
                      delivery
                    </Text>
                  </Text>
                </View>
                <View>
                  <Text>
                    <Text style={{ fontWeight: "700" }}>Saturday:</Text>
                    <Text style={{ flex: 1, flexWrap: "wrap" }}>
                      Orders placed by 5:30 p.m. ET will be shipped for Monday
                      delivery
                    </Text>
                  </Text>
                </View>
              </View>
              <Text
                style={{
                  flex: 1,
                  flexWrap: "wrap",
                  fontSize: 10,
                  marginTop: 10,
                }}
              >
                * Refrigerated items ordered on Friday or Saturday will ship
                Monday for Tuesday delivery
              </Text>
            </View>
          </View>
          <View
            style={{
              paddingVertical: 10,
              borderColor: "#006ba6",
              borderBottomWidth: 1,
            }}
          >
            <View style={{ paddingHorizontal: 10 }}>
              <View>
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: "bold",
                    color: "#006ba6",
                  }}
                >
                  Shipping & Delivery
                </Text>
              </View>
              <View>
                <Text
                  style={{ fontSize: 15, fontWeight: "600", marginTop: 10 }}
                >
                  Anda offers next-day overnight shipping on most orders.
                </Text>
              </View>
              <View>
                <Text
                  style={{ fontSize: 15, fontWeight: "600", marginTop: 10 }}
                >
                  Orders of $100 or more qualify for free shipping.
                </Text>
              </View>
              <View>
                <Text
                  style={{ fontSize: 15, fontWeight: "600", marginTop: 10 }}
                >
                  Orders below $100 are subject to a $10.50 shipping and
                  processing fee. Some exceptions apply.
                </Text>
              </View>
              <View style={{ marginTop: 15 }}>
                <View
                  style={{
                    flexDirection: "row",
                    marginLeft: 15,
                  }}
                >
                  <Text>
                    Some locations, such as in rural areas, may be in 2 day
                    delivery zones
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginLeft: 15,
                  }}
                >
                  <Text>Hazardous Materials must ship ground delivery</Text>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginLeft: 15,
                  }}
                >
                  <Text>
                    Drop-ships are subject to manufacturer shipping policy
                  </Text>
                </View>
              </View>
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

export default OrderingAndOptions;

const styles = StyleSheet.create({
  prductListBlue: {
    backgroundColor: "#006ba6",
    height: 30,
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  productText: {
    color: "#fff",
    alignItems: "center",
    textAlign: "center",
    justifyContent: "center",
    fontWeight: "800",
  },
});
