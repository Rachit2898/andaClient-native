"use strict";
import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect, useContext } from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { Provider, useDispatch, useSelector } from "react-redux";
import { signin, authenticate } from "../../redux/features/authUser";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";

import AsyncStorage from "@react-native-async-storage/async-storage";
import Spinner from "./Spinner";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  Alert,
  Pressable,
  TouchableOpacity,
  KeyboardAvoidingView,
  Linking,
} from "react-native";

function MyCheckbox({
  checked,
  onPress,
  onChange,
  buttonStyle = {},
  activeButtonStyle = {},
  inactiveButtonStyle = {},
}) {
  function onCheckmarkPress() {
    onChange(!checked);
    onPress();
  }

  return (
    <View>
      <Pressable
        style={[buttonStyle, checked ? activeButtonStyle : inactiveButtonStyle]}
        onPress={onCheckmarkPress}
      >
        {checked && <Ionicons name="checkmark" size={20} color="white" />}
      </Pressable>
    </View>
  );
}

export default function LoginScreen() {
  // useEffect(() => {
  //   (async () => {
  //     const compatible = await LocalAuthentication.hasHardwareAsync();
  //     await AsyncStorage.setItem(
  //       "bioMatricsAvailable",
  //       compatible === true ? JSON.stringify(true) : JSON.stringify(false)
  //     );
  //   })();
  // }, []);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [value, setValue] = useState(false);
  const [tokenValue, setToken] = useState();
  const [show, setShow] = useState(true);
  const [isChecked, setChecked] = useState(false);
  const [credentialsError, setCredentialsError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [loginError, setLoginError] = useState(false);

  const { pushToken } = useSelector((state) => ({
    ...state.auth,
  }));

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  async function Signin() {
    return dispatch(signin({ email, password }));
  }

  async function submitHandler() {
    setIsAuthenticating(true);

    const emailIsValid = email.includes("@");
    const passwordIsValid = password.length > 6;
    if (!email.length) {
      setCredentialsError(true);
      setIsAuthenticating(false);
      return;
    }
    if (!password.length) {
      setIsAuthenticating(false);
      setPasswordError(true);
      return;
    }

    // if (!value) {
    //   Alert.alert("Error!", "Please select the User Type");
    //   setIsAuthenticating(false);
    //   return;
    // }

    const token = await Signin();

    if (token.type === "signin/fulfilled") {
      setIsAuthenticating(false);
      return;
    }

    if (token.type === "signin/rejected") {
      setLoginError(true);
      setCredentialsError(false);
      setIsAuthenticating(false);
      setPasswordError(false);
      return;
    }
  }

  const checkHandler = () => {
    setChecked(!isChecked);
  };
  const showPasswordHandler = (value) => {
    setShow((pre) => !pre);
  };

  const passwordHandler = (value) => {
    setPassword(value);
    setCredentialsError(false);
    setLoginError(false);
    setPasswordError(false);
  };
  const emailHandler = (value) => {
    setEmail(value);
    setCredentialsError(false);
    setLoginError(false);
    setPasswordError(false);
  };

  return (
    <>
      <SafeAreaView
        style={{ backgroundColor: "#063e63", flex: 1 }}
        edges={["right", "left", "top"]}
      >
        <View
          style={{
            backgroundColor: "white",
            flex: 1,
          }}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: "white",
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {!isAuthenticating ? (
              <KeyboardAvoidingView style={styles.container}>
                <Image
                  style={styles.image}
                  source={require("../../assets/logo.png")}
                />
                <View
                  style={{
                    paddingLeft: 15,
                    paddingVertical: 20,
                    backgroundColor: "#ececec",
                  }}
                >
                  <Text
                    style={{
                      color: "#063e63",
                      fontWeight: "700",
                      fontSize: 20,
                    }}
                  >
                    Sign in to your account{" "}
                  </Text>
                </View>
                <View
                  style={{
                    borderLeftWidth: 3,
                    borderRightWidth: 3,
                    borderBottomWidth: 3,
                    borderColor: "#ececec",
                    paddingHorizontal: 10,
                    backgroundColor: "#f8f8f8",
                  }}
                >
                  {loginError && (
                    <View style={styles.errorView}>
                      <Image
                        style={{ height: 19, width: 18 }}
                        source={require("../../assets/errorAlert.png")}
                      />
                      <Text style={{ color: "#990909", marginHorizontal: 10 }}>
                        Bad Credentials
                      </Text>
                    </View>
                  )}
                  <Text style={styles.labelContainer}>USERNAME*</Text>
                  <View style={styles.inputView}>
                    <TextInput
                      style={styles.TextInput}
                      placeholderTextColor="#003f5c"
                      onChangeText={(email) => emailHandler(email)}
                    />
                  </View>
                  {credentialsError && (
                    <View style={styles.errorView}>
                      <Image
                        style={{ height: 19, width: 18 }}
                        source={require("../../assets/errorAlert.png")}
                      />
                      <Text style={{ color: "#990909", marginHorizontal: 10 }}>
                        Username is required.
                      </Text>
                    </View>
                  )}
                  <Text style={styles.labelContainer}>PASSWORD*</Text>
                  <View style={styles.inputView}>
                    <TextInput
                      style={styles.TextInput}
                      placeholderTextColor="#003f5c"
                      secureTextEntry={show}
                      onChangeText={(password) => passwordHandler(password)}
                    />
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
                          source={require("../../assets/eye-close.png")}
                        />
                      ) : (
                        <Image
                          style={{ height: 15, width: 18 }}
                          source={require("../../assets/eye-open.png")}
                        />
                      )}
                    </Pressable>
                  </View>
                  {passwordError && (
                    <View style={styles.errorView}>
                      <Image
                        style={{ height: 19, width: 18 }}
                        source={require("../../assets/errorAlert.png")}
                      />
                      <Text style={{ color: "#990909", marginHorizontal: 10 }}>
                        Password is required.
                      </Text>
                    </View>
                  )}
                  <View>
                    <View style={{ flexDirection: "row", marginTop: 20 }}>
                      <Pressable
                        android_ripple={{ color: "#ccc" }}
                        style={styles.loginBtn}
                        onPress={() => submitHandler()}
                      >
                        <Text style={styles.loginText}>SIGN IN</Text>
                      </Pressable>
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    marginTop: 30,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <View style={{ flexDirection: "row" }}>
                    <Text
                      style={{
                        fontWeight: "700",
                      }}
                    >
                      Forgot
                    </Text>
                    <Text
                      style={{
                        marginHorizontal: 5,
                        color: "#006ba6",
                        fontWeight: "700",
                      }}
                      onPress={() => navigation.navigate("ForgotPassword")}
                    >
                      Password
                    </Text>
                    <Text
                      style={{
                        fontWeight: "700",
                      }}
                    >
                      or
                    </Text>
                    <Text
                      style={{
                        marginHorizontal: 5,
                        color: "#006ba6",
                        fontWeight: "700",
                      }}
                      onPress={() => navigation.navigate("ForgotUser")}
                    >
                      Username
                    </Text>
                  </View>
                  <View style={{ marginTop: 15 }}>
                    <Text
                      style={{
                        color: "#006ba6",
                        fontWeight: "700",
                      }}
                      onPress={() => navigation.navigate("SignUpAccess")}
                    >
                      Sign up for online access
                    </Text>
                  </View>
                </View>
              </KeyboardAvoidingView>
            ) : (
              <View>
                <Spinner />
              </View>
            )}
          </View>
          {/* <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignSelf: "center",
            backgroundColor: "red",
          }}
        >
         
        </View> */}
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
                Linking.openURL(
                  "https://staging.andanet.com/content/terms-of-use"
                )
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
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
  },

  image: {
    width: 192,
    height: 51,
    alignSelf: "center",
    justifyContent: "center",
    marginBottom: 20,
  },

  inputView: {
    backgroundColor: "#fff",
    borderWidth: 0.3,
    borderColor: "#9d9b9b",
    width: "100%",
    height: 45,
    flexDirection: "row",
    borderRadius: 3,
    padding: 2,
    justifyContent: "space-between", //Centered horizontally
  },

  errorView: {
    backgroundColor: "#f9caca",
    borderWidth: 0.4,
    borderColor: "#990909",
    width: "100%",
    height: 45,
    marginTop: 10,
    borderRadius: 3,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
  },

  TextInput: {
    paddingHorizontal: 10,
    fontSize: 16,
    color: "#494c4c",
    backgroundColor: "#fff",
    width: "80%",
  },

  forgot_button: {
    height: 30,
    marginBottom: 30,
  },

  loginBtn: {
    backgroundColor: "#ed8b00",
    width: "100%",
    height: 40,
    marginBottom: 20,
    alignSelf: "center",
    borderRadius: 3,
    justifyContent: "center",
  },
  labelContainer: {
    marginVertical: 10,
    marginTop: 20,
    fontSize: 13,
  },
  loginText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    alignItems: "center",
  },
  checkboxBase: {
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    margin: 6,
    borderWidth: 2,
    borderColor: "#006ba6",
    backgroundColor: "transparent",
  },

  checkboxChecked: {
    backgroundColor: "#006ba6",
  },
});
