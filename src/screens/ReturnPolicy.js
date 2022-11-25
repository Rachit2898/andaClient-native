import { StyleSheet, Text, View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Navbar from "../components/Navbar";
import React from "react";
import TabBar from "../components/TabBar";

const ReturnPolicy = () => {
  return (
    <SafeAreaView
      style={{ backgroundColor: "#fff", flex: 1 }}
      edges={["right", "left"]}
    >
      <View style={{ flex: 1 }}>
        <ScrollView>
          <View style={{ padding: 10 }}>
            <View>
              <View style={{ paddingVertical: 10 }}>
                <Text style={{ fontWeight: "700" }}>
                  Need to return an item?
                </Text>
              </View>
              <View>
                <Text>
                  Depending on the item and manufacturer, there may be different
                  return policies. For that reason, we ask that you log into
                  your account, go to Orders and find the Order History tab to
                  initiate a return. You can also contact Customer Service to
                  help you with the return process. Once eligible items have
                  been given return authorization, you must digitally complete
                  and return the authorization form back to Customer Service.
                  Printable Return Authorization forms will be provided if
                  needed. Upon receipt of the authorization form, you will be
                  able to schedule a pick-up of products. A credit will be
                  processed once the item(s) are received back at Anda/AndaMEDS.
                </Text>
              </View>
            </View>
            <View style={{ marginTop: 10 }}>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  paddingVertical: 12,
                  backgroundColor: "#d9d9d9",
                }}
              >
                <Text style={{ color: "#006ba6", fontWeight: "700" }}>
                  FOR ANDA ONLINE ACCOUNTS
                </Text>
              </View>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  paddingVertical: 12,
                  backgroundColor: "#ededed",
                  flexDirection: "row",
                }}
              >
                <Text style={{ fontWeight: "700" }}>Log in to </Text>
                <Text style={{ color: "#006ba6", fontWeight: "700" }}>
                  www.andanet.com/account/orders
                </Text>
              </View>
            </View>
            <View style={{ marginTop: 10 }}>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  paddingVertical: 12,
                  backgroundColor: "#d9d9d9",
                }}
              >
                <Text style={{ color: "#48a12d", fontWeight: "700" }}>
                  FOR ANDAMEDS ONLINE ACCOUNTS
                </Text>
              </View>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  paddingVertical: 12,
                  backgroundColor: "#ededed",
                  flexDirection: "row",
                }}
              >
                <Text style={{ fontWeight: "700" }}>Log in to </Text>
                <Text style={{ color: "#006ba6", fontWeight: "700" }}>
                  www.andameds.com/account/orders
                </Text>
              </View>
            </View>
            <View style={{ marginTop: 10 }}>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  paddingVertical: 12,
                  backgroundColor: "#d9d9d9",
                }}
              >
                <Text style={{ color: "#006ba6", fontWeight: "700" }}>
                  OR CONTACT CUSTOMER SERVICE
                </Text>
              </View>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  paddingVertical: 12,
                  backgroundColor: "#ededed",
                  flexDirection: "row",
                }}
              >
                <Text style={{ fontWeight: "700" }}>Call </Text>
                <Text style={{ color: "#006ba6", fontWeight: "700" }}>
                  1-800-647-0575
                </Text>
              </View>
            </View>
            <View>
              <View style={{ paddingVertical: 10 }}>
                <Text style={{ fontWeight: "700" }}>
                  Returns Policy (As of: April 1st, 2021)
                </Text>
              </View>
              <View>
                <Text>
                  Depending on the product and manufacturer, there may be
                  different return policies. For that reason, we ask you submit
                  a request online or call our Customer Service department so we
                  can evaluate your specific return request. Eligible items
                  meeting the criteria listed below will be issued a return
                  authorization form that you must complete and return back to
                  Customer Service. Upon receipt of the signed return
                  authorization, we will schedule a pick-up and process your
                  return credit once the item(s) are received back at
                  Anda/AndaMEDS.
                </Text>
                <Text style={{ marginVertical: 3 }}>
                  All product returns require prior authorization.
                </Text>
                <Text style={{ marginVertical: 3 }}>
                  Any return requests due to errors in ordering, shipment errors
                  or damages in transit must be reported or submitted within 2
                  business days of product receipt or the product may not be
                  eligible for return or credit.
                </Text>
                <Text style={{ marginVertical: 3 }}>
                  Any issues related to Controlled Substance product shipments
                  must be reported immediately to Customer Service upon
                  discovery and/or product receipt per DEA regulations.
                </Text>
                <Text style={{ marginVertical: 3 }}>
                  Returns are subject to a 20% handling fee and an additional
                  shipping fee.
                </Text>
                <Text style={{ marginVertical: 3 }}>
                  No credit will be given for any unauthorized returns,
                  including additional items or quantities added to the box,
                  products not originally purchased from ANDA, or products
                  purchased over 1 year of invoice date. These items are not
                  eligible for return or credit and will not be returned.
                </Text>
                <Text style={{ marginVertical: 3 }}>
                  Return requests will not be accepted from closed accounts,
                  accounts with outstanding balances, and accounts in the
                  process of closing or transferring ownership.
                </Text>
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

export default ReturnPolicy;

const styles = StyleSheet.create({
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
