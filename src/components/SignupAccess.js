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
import { registerUser } from "../../redux/features/authUser";
import { Provider, useDispatch, useSelector } from "react-redux";

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
        {props.passwordValue ? (
          <TextInput
            style={styles.TextInput}
            placeholderTextColor="#003f5c"
            secureTextEntry={show}
            onChangeText={props.onChangeText}
          />
        ) : (
          <TextInput
            style={styles.TextInput}
            placeholderTextColor="#003f5c"
            onChangeText={props.onChangeText}
          />
        )}
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
      {props.error && (
        <View style={styles.errorView}>
          <Image
            style={{ height: 19, width: 18 }}
            source={require("../../assets/errorAlert.png")}
          />
          <Text style={{ color: "#990909", marginHorizontal: 10 }}>
            {props.errorMessage}
          </Text>
        </View>
      )}
    </View>
  );
};

const SignUpAccess = (props) => {
  const [password, setPassword] = useState();
  const dispatch = useDispatch();
  const [confirmPassword, setConfirmPassword] = useState();
  const [accountNumber, setAccountNumber] = useState("");
  const [license, setLicense] = useState("");
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [nameLastName, setNameLastName] = useState("");
  const navigation = useNavigation();

  const [isAccountNumberError, setIsAccountNumberError] = useState(false);
  const [isPasswordError, setIsPasswordError] = useState(false);
  const [isConfirmPasswordError, setIsConfirmPasswordError] = useState(false);
  const [isLicenseError, setIsLicenseError] = useState(false);
  const [isEmailError, setIsEmailError] = useState(false);
  const [isUserNameError, setUserNameError] = useState(false);
  const [isNameLastNameError, setIsNameLastNameError] = useState(false);

  const submitHandler = () => {
    if (!accountNumber.length) {
      setIsAccountNumberError(true);
    }
    if (!password?.length) {
      setIsPasswordError(true);
    }

    if (!confirmPassword?.length) {
      setIsConfirmPasswordError(true);
    }
    // if (!license.length) {
    //   setIsLicenseError(true);
    // }
    if (!email.length) {
      setIsEmailError(true);
    }
    if (!userName.length) {
      setUserNameError(true);
    }
    if (!nameLastName.length) {
      setIsNameLastNameError(true);
    }
    dispatch(
      registerUser({
        accountNumber: accountNumber,
        password: password,
        confirmPassword: confirmPassword,
        license: license,
        email: email,
        userName: userName,
        nameLastName: nameLastName,
      })
    );
    // alert("You have been registered successfully.", [
    //   { text: "OK", onPress: () => navigation.navigate("Login") },
    // ]);
  };
  const accountNumberHandler = async (value) => {
    setAccountNumber(value);
    setIsAccountNumberError(false);
    setIsPasswordError(false);
    setIsConfirmPasswordError(false);
    setIsLicenseError(false);
    setIsEmailError(false);
    setUserNameError(false);
    setIsNameLastNameError(false);
  };

  const emailHandler = async (value) => {
    setEmail(value);
    setIsAccountNumberError(false);
    setIsPasswordError(false);
    setIsConfirmPasswordError(false);
    setIsLicenseError(false);
    setIsEmailError(false);
    setUserNameError(false);
    setIsNameLastNameError(false);
  };
  const licenseHandler = async (value) => {
    setLicense(value);
    setIsAccountNumberError(false);
    setIsPasswordError(false);
    setIsConfirmPasswordError(false);
    setIsLicenseError(false);
    setIsEmailError(false);
    setUserNameError(false);
    setIsNameLastNameError(false);
  };
  const userNameHandler = async (value) => {
    setUserName(value);
    setIsAccountNumberError(false);
    setIsPasswordError(false);
    setIsConfirmPasswordError(false);
    setIsLicenseError(false);
    setIsEmailError(false);
    setUserNameError(false);
    setIsNameLastNameError(false);
  };
  const passwordHandler = (value) => {
    setPassword(value);
    setIsAccountNumberError(false);
    setIsPasswordError(false);
    setIsConfirmPasswordError(false);
    setIsLicenseError(false);
    setIsEmailError(false);
    setUserNameError(false);
    setIsNameLastNameError(false);
  };
  const confirmPasswordHandler = (value) => {
    setConfirmPassword(value);
    setIsAccountNumberError(false);
    setIsPasswordError(false);
    setIsConfirmPasswordError(false);
    setIsLicenseError(false);
    setIsEmailError(false);
    setUserNameError(false);
    setIsNameLastNameError(false);
  };

  const accountNameHandler = (value) => {
    setNameLastName(value);
    setIsAccountNumberError(false);
    setIsPasswordError(false);
    setIsConfirmPasswordError(false);
    setIsLicenseError(false);
    setIsEmailError(false);
    setUserNameError(false);
    setIsNameLastNameError(false);
  };
  return (
    <SafeAreaView
      style={{ backgroundColor: "#063e63", flex: 1 }}
      edges={["right", "left"]}
    >
      <View style={{ flex: 1, backgroundColor: "#fff" }}>
        <View style={{ paddingVertical: 20 }}>
          <Pressable onPress={() => navigation.navigate("Login")}>
            <Image
              style={styles.image}
              source={require("../../assets/logo.png")}
            />
          </Pressable>
          <View
            style={{
              marginTop: 10,
              justifyContent: "center",
              alignSelf: "center",
            }}
          >
            <Text
              style={{ fontSize: 25, fontWeight: "bold", color: "#494c4c" }}
            >
              User Registration
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
              }}
            >
              Complete the form below to register for online access. If your
              account already has active online users please call 1-800-331-2632
              for assistance registering new users.
            </Text>
          </View>
        </View>

        <ScrollView>
          <View>
            <View>
              <InputComponent
                eye={false}
                label="ANDA ACCOUNT NUMBER / SHIP-TO NUMBER*"
                onChangeText={(value) => {
                  accountNumberHandler(value);
                }}
                error={isAccountNumberError}
                errorMessage={
                  "Anda Account Number / Ship-To Number is required."
                }
              />
            </View>
            <View>
              <InputComponent
                onChangeText={(value) => {
                  accountNameHandler(value);
                }}
                eye={false}
                label="FIRST NAME AND LAST NAME*"
                error={isAccountNumberError}
                errorMessage={" First Name and Last Name is required."}
              />
            </View>
            <View>
              <InputComponent
                onChangeText={(value) => {
                  emailHandler(value);
                }}
                eye={false}
                label="EMAIL ADDRESS*"
                error={isEmailError}
                errorMessage={" Email Address is required."}
              />
            </View>
            <View>
              <InputComponent
                onChangeText={(value) => {
                  licenseHandler(value);
                }}
                eye={false}
                label="STATE LICENSE NUMBER"
              />
            </View>
            <View>
              <InputComponent
                onChangeText={(value) => {
                  userNameHandler(value);
                }}
                eye={false}
                label="USERNAME*"
                error={isNameLastNameError}
                errorMessage={"Username is required."}
              />
            </View>
            <View>
              <InputComponent
                onChangeText={(value) => {
                  passwordHandler(value);
                }}
                eye={true}
                label="PASSWORD*"
                passwordValue={true}
                error={isPasswordError}
                errorMessage={"Password is required."}
              />
            </View>
            <View>
              <InputComponent
                onChangeText={(value) => {
                  confirmPasswordHandler(value);
                }}
                eye={true}
                label="CONFIRM PASSWORD*"
                passwordValue={true}
                error={isConfirmPasswordError}
                errorMessage={"Confirm Password is required."}
              />
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
                  onPress={() => submitHandler()}
                >
                  <Text style={styles.loginText}>REGISTER</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </ScrollView>

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
    width: 150,
    height: 40,
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
  errorView: {
    backgroundColor: "#f9caca",
    borderWidth: 0.4,
    borderColor: "#990909",
    width: "90%",
    height: 45,
    marginTop: 10,
    borderRadius: 3,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
  },
});
