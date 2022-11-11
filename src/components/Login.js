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
  const [show, setShow] = useState(true);
  const [isChecked, setChecked] = useState(false);
  const [credentialsError, setCredentialsError] = useState(false);
  const [loginError, setLoginError] = useState(false);

  const { error } = useSelector((state) => ({
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
    if (!emailIsValid || !passwordIsValid) {
      setCredentialsError(true);
      setIsAuthenticating(false);
      return;
    }

    // if (!value) {
    //   Alert.alert("Error!", "Please select the User Type");
    //   setIsAuthenticating(false);
    //   return;
    // }

    const token = await Signin();
    console.log(token.type === "signin/fulfilled");

    if (token.type === "signin/fulfilled") {
      setIsAuthenticating(false);
    }

    if (token.type === "signin/rejected") {
      setLoginError(true);
      setCredentialsError(false);
      setIsAuthenticating(false);
      return;
    }
  }

  const checkHandler = () => {
    setChecked(!isChecked);
  };
  const showPasswordHandler = (value) => {
    setShow((pre) => !pre);
  };

  return (
    <>
      <SafeAreaView style={{ backgroundColor: "#fff", flex: 1 }}>
        <View
          style={{
            backgroundColor: "white",
            flex: 1,
          }}
        >
          {!isAuthenticating ? (
            <View style={styles.container}>
              <Image
                style={styles.image}
                source={require("../../assets/logo.png")}
              />
              <View
                style={{
                  borderWidth: 0.5,
                  borderColor: "#9d9b9b",
                  paddingLeft: 15,
                  paddingVertical: 20,
                  backgroundColor: "#ececec",
                }}
              >
                <Text
                  style={{ color: "#054278", fontWeight: "700", fontSize: 20 }}
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
                {credentialsError && (
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
                    onChangeText={(email) => setEmail(email)}
                  />
                </View>
                {loginError && (
                  <View style={styles.errorView}>
                    <Image
                      style={{ height: 19, width: 18 }}
                      source={require("../../assets/errorAlert.png")}
                    />
                    <Text style={{ color: "#990909", marginHorizontal: 10 }}>
                      Invalid Username
                    </Text>
                  </View>
                )}
                <Text style={styles.labelContainer}>PASSWORD*</Text>
                <View style={styles.inputView}>
                  <TextInput
                    style={styles.TextInput}
                    placeholderTextColor="#003f5c"
                    secureTextEntry={show}
                    onChangeText={(password) => setPassword(password)}
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
                        source={require("../../assets/closedEye.png")}
                      />
                    ) : (
                      <Image
                        style={{ height: 15, width: 18 }}
                        source={require("../../assets/eye.png")}
                      />
                    )}
                  </Pressable>
                </View>
                {loginError && (
                  <View style={styles.errorView}>
                    <Image
                      style={{ height: 19, width: 18 }}
                      source={require("../../assets/errorAlert.png")}
                    />
                    <Text style={{ color: "#990909", marginHorizontal: 10 }}>
                      Invalid Password
                    </Text>
                  </View>
                )}
                <View>
                  <View style={{ flexDirection: "row", marginTop: 20 }}>
                    <Pressable style={styles.loginBtn} onPress={submitHandler}>
                      <Text onPress={submitHandler} style={styles.loginText}>
                        SIGN IN
                      </Text>
                    </Pressable>
                  </View>
                </View>
              </View>
              <View style={{ marginTop: 30, paddingLeft: 20 }}>
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
                  >
                    Sign up for online access
                  </Text>
                </View>
              </View>
            </View>
          ) : (
            <View>
              <Spinner />
            </View>
          )}
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignSelf: "center",
            marginTop: 20,
          }}
        >
          <Text style={{ color: "#fff", fontSize: 10, fontWeight: "800" }}>
            Anda Inc. All Rights Reserved | Terms of Use | Privacy policy
          </Text>
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
    width: 150,
    height: 80,
    alignSelf: "center",
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
    backgroundColor: "#c77500",
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
