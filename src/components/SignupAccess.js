import {
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  Pressable,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ForgotScreen from "../components/Ui/ForgotScreen";
import { useNavigation } from "@react-navigation/native";

const InputComponent = (props) => {
  const [value, setValue] = useState(false);
  const [isChecked, setChecked] = useState(false);

  const [show, setShow] = useState(true);
  const [error, setError] = useState(false);
  const [nullValue, setNullValue] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(-1);

  const showPasswordHandler = (value) => {
    setShow((pre) => !pre);
    setShowPassword(value);
  };
  return (
    <View>
      <Text style={styles.labelContainer}>{props.label}</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholderTextColor="#003f5c"
          secureTextEntry={show}
          onChangeText={props.onChangeText}
        />
        {props.eye && (
          <Pressable
            style={{
              justifyContent: "center",
              margin: 10,
              paddingHorizontal: 10,
              borderRadius: 3,
            }}
            onPress={() => showPasswordHandler(2)}
          >
            {show ? (
              <Image
                style={{ height: 15, width: 18 }}
                source={require("../../assets/eye-open.png")}
              />
            ) : (
              <Image
                style={{ height: 15, width: 18 }}
                source={require("../../assets/eye-close.png")}
              />
            )}
          </Pressable>
        )}
      </View>
    </View>
  );
};

const SignUpAccess = (props) => {
  const [password, setPassword] = useState();
  const navigation = useNavigation();
  const submitHandler = () => {
    navigation.navigate("ResetPassword");
  };
  return (
    <SafeAreaView
      style={{ backgroundColor: "#063e63", flex: 1 }}
      edges={["right", "left", "top"]}
    >
      <View style={{ flex: 1, backgroundColor: "#fff" }}>
        <View style={{ marginTop: 20 }}>
          <Pressable onPress={() => navigation.navigate("Login")}>
            <Image
              style={styles.image}
              source={require("../../assets/logo.png")}
            />
          </Pressable>
          <View
            style={{
              marginTop: 20,
              justifyContent: "center",
              alignSelf: "center",
            }}
          >
            <Text
              style={{ fontSize: 35, fontWeight: "bold", color: "#494c4c" }}
            >
              Online User Registration
            </Text>
          </View>
          <View
            style={{
              marginTop: 20,
              justifyContent: "center",
              alignSelf: "center",
            }}
          >
            <Text
              style={{
                textAlign: "center",
                color: "#494c4c",
                fontWeight: "bold",
              }}
            >
              Complete the form below to register for online access. If your
              account already has active online users please call 1-800-331-2632
              for assistance registering new users.
            </Text>
          </View>

          <ScrollView style={{ marginVertical: 20 }}>
            <View style={{ flex: 1 }}>
              <View>
                <InputComponent
                  eye={false}
                  label="ANDA ACCOUNT NUMBER / SHIP-TO NUMBER*"
                />
              </View>
              <View>
                <InputComponent eye={false} label="FIRST NAME AND LAST NAME*" />
              </View>
              <View>
                <InputComponent eye={false} label="EMAIL ADDRESS*" />
              </View>
              <View>
                <InputComponent eye={false} label="STATE LICENSE NUMBER*" />
              </View>
              <View>
                <InputComponent eye={false} label="USERNAME*" />
              </View>
              <View>
                <InputComponent eye={true} label="PASSWORD*" />
              </View>
              <View>
                <InputComponent eye={true} label="CONFIRM PASSWORD*" />
              </View>
              <View>
                <View
                  style={{
                    flexDirection: "row",
                    marginTop: 20,
                    alignSelf: "center",
                  }}
                >
                  <Pressable
                    android_ripple={{ color: "#ccc" }}
                    style={styles.loginBtn}
                    // onPress={() => submitHandler()}
                  >
                    <Text style={styles.loginText}>SIGN IN</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </ScrollView>
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

export default SignUpAccess;

const styles = StyleSheet.create({
  inputView: {
    backgroundColor: "#fff",
    borderWidth: 0.3,
    borderColor: "#9d9b9b",
    width: "90%",
    height: 45,
    flexDirection: "row",
    borderRadius: 3,
    padding: 2,
    alignSelf: "center",
    justifyContent: "space-between", //Centered horizontally
  },
  TextInput: {
    paddingHorizontal: 10,
    fontSize: 16,
    color: "#494c4c",
    backgroundColor: "#fff",
    width: "80%",
  },
  labelContainer: {
    marginVertical: 10,
    marginTop: 10,
    fontSize: 13,
    marginHorizontal: "5%",
  },
  image: {
    width: 192,
    height: 51,
    alignSelf: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  loginBtn: {
    backgroundColor: "#ed8b00",
    width: "40%",
    height: 40,
    marginBottom: 20,
    alignSelf: "center",
    borderRadius: 3,
    justifyContent: "center",
  },

  loginText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    alignItems: "center",
  },
});
