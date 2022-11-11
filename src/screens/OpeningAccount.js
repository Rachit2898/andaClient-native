import { StyleSheet, Text, View, ScrollView, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Navbar from "../components/Navbar";
import Component from "./HeadingDetail";

const OpeningAccountComponent = (props) => {
  return (
    <>
      <View style={{ paddingHorizontal: 10 }}>
        <Image
          style={{
            borderRadius: 3,
            marginVertical: 5,
            width: 110,
            height: 80,
            justifyContent: "center",
            alignSelf: "center",
            marginTop: 20,
          }}
          source={props.imageUri}
        />
        <Text
          style={{
            fontSize: 15,
            fontWeight: "bold",
            color: "#006ba6",
            paddingVertical: 15,
            alignSelf: "center",
          }}
        >
          {props.heading}
        </Text>
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Text
            style={{
              textAlign: "center",
            }}
          >
            {props.value}
          </Text>
        </View>
      </View>
    </>
  );
};

const OpeningAccount = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <Navbar />
      <View style={styles.prductListBlue}>
        <Text style={styles.productText}>Ordering Options and Hours</Text>
      </View>
      <View style={{ paddingHorizontal: 10 }}>
        <Text style={{ color: "#006ba6" }}>
          Open an Anda account and start benefeting from our reliable and
          flexible distribution services.
        </Text>
      </View>

      <ScrollView
        style={{
          borderTopWidth: 1,
          borderColor: "#006ba6",
          marginTop: 10,
          backgroundColor: "#fafbfc",
        }}
      >
        <View
          style={{
            paddingHorizontal: 10,
            borderBottomWidth: 1,
            borderColor: "#006ba6",
            paddingVertical: 15,
          }}
        >
          <Text
            style={{
              fontSize: 15,
              fontWeight: "bold",
              color: "#006ba6",
              paddingVertical: 15,
            }}
          >
            Hers's How:
          </Text>
          <View>
            <View style={{ flexDirection: "row", paddingVertical: 2 }}>
              <Text style={{ fontWeight: "bold", fontSize: 12 }}>Step 1:</Text>
              <Text style={{ fontSize: 12 }}>
                Download the New Customer Package.
              </Text>
            </View>
            <View style={{ flexDirection: "row", paddingVertical: 2 }}>
              <Text style={{ fontWeight: "bold", fontSize: 12 }}>Step 2:</Text>
              <Text style={{ fontSize: 12 }}>
                Complete and save the documents.
              </Text>
            </View>
            <View style={{ flexDirection: "row", paddingVertical: 2 }}>
              <Text style={{ fontWeight: "bold", fontSize: 12 }}>Step 3:</Text>
              <Text style={{ fontSize: 12 }}>
                Print & fax the completed form to 866-600-3860.
              </Text>
            </View>
            <View style={{ flexDirection: "row", paddingVertical: 2 }}>
              <Text>
                <Text style={{ fontWeight: "bold", fontSize: 12 }}>
                  Step 4:
                </Text>
                <Text style={{ fontSize: 12 }}>
                  Recieve call from a friendly Anda representative confirming
                  your account setup.
                </Text>
              </Text>
            </View>
            <View style={{ flexDirection: "row", paddingVertical: 2 }}>
              <Text style={{ fontWeight: "bold", fontSize: 12 }}>Step 5:</Text>
              <Text style={{ fontSize: 12 }}>Begin ordering!</Text>
            </View>
            <View
              style={{
                backgroundColor: "#006ba6",
                justifyContent: "center",
                width: "40%",
                alignItems: "center",
                borderRadius: 3,
                marginTop: 20,
              }}
            >
              <Text style={{ padding: 5, color: "#fff" }}>
                Download Package
              </Text>
            </View>
          </View>
        </View>
        <Component
          heading={"Speak With a Representative"}
          value={
            "If you prefer, you can contact of your friendly, dedicated support representatives who can help you get set up"
          }
          phone={"1-800-331-262"}
        />
        <View style={{ paddingVertical: 10 }}>
          <View style={{ paddingHorizontal: 10 }}>
            <View>
              <Text
                style={{ fontSize: 15, fontWeight: "bold", color: "#006ba6" }}
              >
                SIGN UP TO ACCESS INDUSTRY-LEADING CLIENT BENEFITS SERVICES
              </Text>
            </View>
          </View>
          <OpeningAccountComponent
            imageUri={require("../../assets/delivery.png")}
            heading={"Next-Day Delivery"}
            value={
              "Place your order today and you’ll have it tomorrow. Let us help you reduce inventory expenses. We even offer Saturday delivery!"
            }
          />
          <OpeningAccountComponent
            imageUri={require("../../assets/watch.png")}
            heading={"Extended Order Cut-Off Times"}
            value={
              "We give you the flexibility to place orders online up to 9:30 p.m. ET and still receive next-day delivery. Spend time with your patients when they need you most."
            }
          />
          <OpeningAccountComponent
            imageUri={require("../../assets/cartLogo.png")}
            heading={"Cost-Savings Opportunities"}
            value={
              "Our extended payment terms, market-competitive pricing, online order discounts, and daily promotions provide the savings needed to grow your business."
            }
          />
          <OpeningAccountComponent
            imageUri={require("../../assets/productLogo.png")}
            heading={"Broad Product Acces"}
            value={
              "Inventory on items from nearly 400 manufacturers including generic, brand and specialty prescription pharmaceuticals, vaccines, medical/surgical supplies, OTCs and Petmeds."
            }
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default OpeningAccount;

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
