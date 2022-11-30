import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Pressable,
  Linking,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

const ForgotScreen = (props) => {
  const navigation = useNavigation();
  return (
    <SafeAreaView
      style={{ backgroundColor: "#063e63", flex: 1 }}
      edges={["right", "left"]}
    >
      <View style={{ backgroundColor: "#fff", flex: 1 }}>
        <View style={{ marginTop: 20 }}>
          <Pressable onPress={() => navigation.navigate("Login")}>
            <Image
              style={styles.image}
              source={require("../../../assets/logo.png")}
            />
          </Pressable>
          <View
            style={{
              marginTop: 15,
              justifyContent: "center",
              alignSelf: "center",
            }}
          >
            <Text
              style={{ fontSize: 25, fontWeight: "bold", color: "#494c4c" }}
            >
              {props.heading}
            </Text>
          </View>
          <View
            style={{
              marginTop: 20,
              justifyContent: "center",
              alignSelf: "center",
              paddingHorizontal: 10,
            }}
          >
            <Text
              style={{
                textAlign: "center",
                color: "#494c4c",
              }}
            >
              {props.message}
            </Text>
          </View>
          {props.subHeading && (
            <View
              style={{
                backgroundColor: "#063e63",
                marginTop: 20,
                paddingVertical: 15,
              }}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  color: "#fff",
                  fontSize: 15,
                  marginLeft: 20,
                }}
              >
                {props.subHeading}
              </Text>
            </View>
          )}
          {props.placeholder && (
            <View style={styles.inputView}>
              <TextInput
                style={styles.TextInput}
                placeholderTextColor="#9d9b9b"
                placeholder={props.placeholder}
                onChangeText={props.onChangeText}
              />
            </View>
          )}
          {props.placeholder2 && (
            <View style={styles.inputView}>
              <TextInput
                style={styles.TextInput}
                placeholderTextColor="#9d9b9b"
                placeholder={props.placeholder2}
                onChangeText={props.onChangeText}
              />
            </View>
          )}
          {props.placeholder3 && (
            <View style={styles.inputView}>
              <TextInput
                style={styles.TextInput}
                placeholderTextColor="#9d9b9b"
                placeholder={props.placeholder3}
                onChangeText={props.onChangeText}
              />
            </View>
          )}
          {props.onPress && (
            <Pressable
              onPress={props.onPress}
              style={{
                backgroundColor: "#006ba6",
                width: "40%",
                justifyContent: "center",
                alignSelf: "center",
                marginVertical: 30,
                borderRadius: 5,
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  textAlign: "center",
                  paddingVertical: 10,
                  fontWeight: "bold",
                }}
              >
                Submit
              </Text>
            </Pressable>
          )}
        </View>
      </View>

      <View
        style={{
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "#063e63",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <Text
          style={{
            color: "#fff",
            fontSize: 10,
            fontWeight: "800",
            paddingBottom: 20,
            paddingTop: 10,
          }}
        >
          Anda Inc. All Rights Reserved |{" "}
        </Text>
        <Text
          style={{
            color: "#fff",
            fontSize: 10,
            fontWeight: "800",
            paddingBottom: 20,
            paddingTop: 10,
          }}
          onPress={() =>
            Linking.openURL("https://staging.andanet.com/content/terms-of-use")
          }
        >
          Terms of Use |{" "}
        </Text>
        <Text
          style={{
            color: "#fff",
            fontSize: 10,
            fontWeight: "800",
            paddingBottom: 20,
            paddingTop: 10,
          }}
          onPress={() =>
            Linking.openURL(
              "https://staging.andanet.com/content/privacy-policy"
            )
          }
        >
          Privacy Policy
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default ForgotScreen;

const styles = StyleSheet.create({
  image: {
    width: 150,
    height: 40,
    alignSelf: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  TextInput: {
    paddingHorizontal: 10,
    fontSize: 16,
    color: "#494c4c",
    backgroundColor: "#fff",
    width: "80%",
  },
  inputView: {
    backgroundColor: "#fff",
    borderWidth: 0.3,
    borderColor: "#9d9b9b",
    width: "80%",
    height: 45,
    flexDirection: "row",
    borderRadius: 3,
    padding: 2,
    marginTop: 20,
    justifyContent: "space-between", //Centered horizontally
    alignSelf: "center",
  },
});
