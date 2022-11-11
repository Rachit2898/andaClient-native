import { StyleSheet, Text, View, ScrollView, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import Navbar from "../components/Navbar";
import Component from "./HeadingDetail";

const PaymentComponent = (props) => {
  return (
    <>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          marginTop: 10,
        }}
      >
        <View style={{ width: "40%" }}>
          <Image
            source={props.imageUri}
            style={{
              height: 70,
              width: 100,
            }}
          />
        </View>
        <View style={{ width: "50%" }}>
          <Text style={{ fontWeight: "700" }}>{props.heading}</Text>
          <Text style={{ justifyContent: "center", marginTop: 5 }}>
            {props.value}
          </Text>
        </View>
      </View>
    </>
  );
};

const Payment = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Navbar />
      <View style={styles.prductListBlue}>
        <Text style={styles.productText}>Payment Options</Text>
      </View>
      <ScrollView>
        <View
          style={{
            paddingHorizontal: 10,
          }}
        >
          <View>
            <Text
              style={{
                fontSize: 15,
                fontWeight: "bold",
                color: "#006ba6",
                paddingVertical: 15,
              }}
            >
              Pay Your Way
            </Text>
            <Text>
              We give you the options so you can choose the payment method you
              prefer.
            </Text>
          </View>
          <View style={{ marginVertical: 15 }}>
            <PaymentComponent
              imageUri={require("../../assets/Ach.png")}
              value={"Ensure on-time payment of your bill every time."}
              heading={"ACH"}
            />
            <PaymentComponent
              imageUri={require("../../assets/check.png")}
              value={"Prefer to mail in your payment? Send us a check."}
              heading={"Check"}
            />
            <PaymentComponent
              imageUri={require("../../assets/Credit.png")}
              value={
                "Safe and secured one-time or recurring payment processing."
              }
              heading={"Credit Card"}
            />
          </View>
          <View style={{ marginBottom: 20 }}>
            <Text>We accept Visa, MasterCard and American Express.</Text>
          </View>
        </View>
        <Component
          heading={"Returned Payment Policy"}
          value={
            "If a check or other form of payment is returned for Non-Sufficient Funds (NSF), Customer agrees to pay an additional $25.00 (Twenty-Five Dollar) charge for each such returned payment. Customer agrees that Customer’s account with ANDA will be placed on “no-ship” status in such event and that pending orders will not be filled. Customer will not be able to place new orders until the replacement payment(s) and the referenced NSF charge(s) is paid to ANDA in good and available funds."
          }
        />
        <View style={{ paddingHorizontal: 10 }}>
          <Text
            style={{
              fontSize: 15,
              fontWeight: "bold",
              color: "#006ba6",
              paddingVertical: 15,
              alignSelf: "center",
            }}
          >
            Open an account
          </Text>
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <Text
              style={{
                textAlign: "center",
              }}
            >
              and start taking advantage of our extended payment terms!
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Payment;

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
