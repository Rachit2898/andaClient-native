import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Pressable,
  ScrollView,
  Linking,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import Spinner from "./Spinner";
import TabBar from "./TabBar";
import Moment from "moment";

import {
  userInfo,
  cartInfo,
  searchItems,
  searchProducsts,
} from "../../redux/features/productApi";
import { changeUserPassword } from "../../redux/features/authUser";

const InputComponent = (props) => {
  const [value, setValue] = useState(false);
  const [isChecked, setChecked] = useState(false);

  const isFocused = useIsFocused();
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
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholderTextColor="#003f5c"
          secureTextEntry={show}
          onChangeText={props.onChangeText}
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
              source={require("../../assets/eye-open.png")}
            />
          ) : (
            <Image
              style={{ height: 15, width: 18 }}
              source={require("../../assets/eye-close.png")}
            />
          )}
        </Pressable>
      </View>
    </View>
  );
};

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

const Account = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState(false);
  const [isChecked, setChecked] = useState(true);
  const isFocused = useIsFocused();
  const [cmeaDate, setCmeaDate] = useState();
  const [cmeaCertificationDate, setCmeaCertificationDate] = useState();
  const [show, setShow] = useState(true);
  const [error, setError] = useState(false);
  const [nullValue, setNullValue] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(-1);
  const [formattedNumber, setFormattedNumber] = useState("");
  const [phoneFaxNumber, setPhoneFaxNumber] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const {
    userInfoData,
    cartInfoData,
    cartLength,
    loading,
    searchItem,
    searchProducstsData,
  } = useSelector((state) => ({
    ...state.products,
  }));
  const { changeUserPasswordData, changePasswordValue } = useSelector(
    (state) => ({
      ...state.auth,
    })
  );
  const userData = userInfoData;
  useEffect(() => {
    dispatch(userInfo());
    dispatch(cartInfo());
    setShow(true);
  }, [dispatch, isFocused]);

  const checkHandler = () => {
    setChecked(!isChecked);
  };

  const myCheckHandler = async (andanet) => {
    setValue(true);
  };
  function onChange(value) {
    console.log("Captcha value:", value);
  }

  const showPasswordHandler = (value) => {
    setShow((pre) => !pre);
    setShowPassword(value);
  };
  const updatePasswordHandler = (value) => {
    if (!newPassword) {
      setNullValue(true);
      return;
    }
    if (!currentPassword) {
      setNullValue(true);
      return;
    }
    if (!confirmPassword) {
      setNullValue(true);
      return;
    }
    if (newPassword != confirmPassword) {
      setError(true);
      return;
    } else {
      setError(false);
      dispatch(changeUserPassword({ currentPassword, newPassword }));
    }
  };

  useEffect(() => {
    setCmeaDate(
      Moment(userData?.selectedAccount?.cmeaCertificationExpiration).format(
        "MM/DD/YYYY hh:mmA"
      )
    );
    let stringNumber =
      userData?.selectedAccount?.accountDetail?.accountRep.number;
    if (stringNumber.length === 10) {
      setFormattedNumber(
        stringNumber.replace(/(\d{3})(\d{3})(\d{4})/gi, "($1) $2-$3")
      );
    }
    let phoneFax =
      userData?.selectedAccount.addresses[0]?.phoneFax?.phoneNumber;
    if (phoneFax.length === 10) {
      setPhoneFaxNumber(
        phoneFax.replace(/(\d{3})(\d{3})(\d{4})/gi, "($1) $2-$3")
      );
    }
    let phoneNumbers =
      userData?.selectedAccount.addresses[0]?.phonePrimary?.phoneNumber;
    if (phoneNumbers.length === 10) {
      setPhoneNumber(
        phoneNumbers.replace(/(\d{3})(\d{3})(\d{4})/gi, "($1) $2-$3")
      );
    }
  }, [userData]);

  return (
    <SafeAreaView
      style={{ backgroundColor: "#063e63", flex: 1 }}
      edges={["right", "left", "top"]}
    >
      <View style={{ flex: 1, backgroundColor: "#fff" }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingHorizontal: 10,
              paddingVertical: 10,
              flex: 1,
            }}
          >
            <View
              style={{
                width: 25,
                justifyContent: "center",
                alignItems: "center",
                height: 25,
                paddingHorizontal: 10,
              }}
            >
              <Image
                source={require("../../assets/account.png")}
                style={{
                  height: 20,
                  width: 20,
                }}
              />
            </View>
            <Text
              style={{ color: "#006ba6", fontWeight: "700", marginLeft: 10 }}
            >
              {userData?.selectedAccount?.id} |{" "}
              {userData?.selectedAccount?.name}
            </Text>
          </View>
          {loading && <Spinner />}
          <View style={loading ? styles.mainBoxLoading : styles.mainBox}>
            <View
              style={{
                borderTopWidth: 4,
                borderColor: "#fafafa",
              }}
            />
            <View
              style={{
                padding: 10,
                borderBottomWidth: 0.3,
                borderColor: "#006ba6",
              }}
            >
              <Text
                style={{ fontSize: 15, fontWeight: "bold", color: "#494c4c" }}
              >
                Change Username / Email
              </Text>
            </View>
            <View style={{ paddingHorizontal: 10 }}>
              <Text style={styles.labelContainer}>USERNAME*</Text>
              <View style={styles.inputView}>
                <TextInput
                  style={styles.TextInput}
                  placeholderTextColor="#494c4c"
                  placeholder={`${userData?.username}`}
                />
              </View>
              <Text style={styles.labelContainer}>EMAIL ADDRESS*</Text>
              <View style={styles.inputView}>
                <TextInput
                  style={styles.TextInput}
                  placeholderTextColor="#494c4c"
                  placeholder={`${userData?.emailAddress}`}
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View style={{ flexDirection: "row" }}>
                  <MyCheckbox
                    style={styles.checkbox}
                    checked={isChecked}
                    onChange={checkHandler}
                    onPress={() => {
                      myCheckHandler("andanet");
                    }}
                    buttonStyle={styles.checkboxBase}
                    activeButtonStyle={[
                      isChecked ? styles.checkboxChecked : "",
                    ]}
                  />
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      marginLeft: 10,
                    }}
                  >
                    <Text style={{ color: "#494c4c" }}>
                      Receive marketings emails
                    </Text>
                  </View>
                </View>
                <Pressable
                  style={{
                    borderColor: "#006ba6",
                    borderWidth: 1,
                    width: 80,
                    height: 35,
                    borderRadius: 4,
                    justifyContent: "center",
                    alignItems: "center",
                    alignSelf: "flex-end",
                  }}
                  android_ripple={{ color: "#ccc" }}
                >
                  <View>
                    <Text style={styles.emptyText}>UPDATE</Text>
                  </View>
                </Pressable>
              </View>
            </View>
            <View
              style={{
                borderTopWidth: 4,
                borderColor: "#fafafa",
                marginVertical: 10,
              }}
            />

            <View
              style={{
                paddingHorizontal: 10,
                borderBottomWidth: 0.3,
                borderColor: "#006ba6",
                paddingBottom: 10,
              }}
            >
              <Text
                style={{ fontSize: 15, fontWeight: "bold", color: "#494c4c" }}
              >
                Change Password
              </Text>
            </View>
            <View style={{ padding: 10 }}>
              <Text style={styles.labelContainer}>CURRENT PASSWORD*</Text>
              <InputComponent
                onChangeText={(password) => setCurrentPassword(password)}
              />
              {error && (
                <View style={styles.errorView}>
                  <Image
                    style={{ height: 19, width: 18 }}
                    source={require("../../assets/errorAlert.png")}
                  />
                  <Text style={{ color: "#990909", marginHorizontal: 10 }}>
                    password does not match
                  </Text>
                </View>
              )}
              {nullValue && (
                <View style={styles.errorView}>
                  <Image
                    style={{ height: 19, width: 18 }}
                    source={require("../../assets/errorAlert.png")}
                  />
                  <Text style={{ color: "#990909", marginHorizontal: 10 }}>
                    Fields Cannot Be Empty!!
                  </Text>
                </View>
              )}
              <Text style={styles.labelContainer}>NEW PASSWORD*</Text>
              <InputComponent
                onChangeText={(password) => setNewPassword(password)}
              />
              {error && (
                <View style={styles.errorView}>
                  <Image
                    style={{ height: 19, width: 18 }}
                    source={require("../../assets/errorAlert.png")}
                  />
                  <Text style={{ color: "#990909", marginHorizontal: 10 }}>
                    password does not match
                  </Text>
                </View>
              )}
              {nullValue && (
                <View style={styles.errorView}>
                  <Image
                    style={{ height: 19, width: 18 }}
                    source={require("../../assets/errorAlert.png")}
                  />
                  <Text style={{ color: "#990909", marginHorizontal: 10 }}>
                    Fields Cannot Be Empty!!
                  </Text>
                </View>
              )}
              <Text style={styles.labelContainer}>CONFIRM PASSWORD*</Text>
              <InputComponent
                onChangeText={(password) => setConfirmPassword(password)}
              />
              {error && (
                <View style={styles.errorView}>
                  <Image
                    style={{ height: 19, width: 18 }}
                    source={require("../../assets/errorAlert.png")}
                  />
                  <Text style={{ color: "#990909", marginHorizontal: 10 }}>
                    password does not match
                  </Text>
                </View>
              )}
              {nullValue && (
                <View style={styles.errorView}>
                  <Image
                    style={{ height: 19, width: 18 }}
                    source={require("../../assets/errorAlert.png")}
                  />
                  <Text style={{ color: "#990909", marginHorizontal: 10 }}>
                    Fields Cannot Be Empty!!
                  </Text>
                </View>
              )}
              {error && (
                <View style={styles.errorView}>
                  <Image
                    style={{ height: 19, width: 18 }}
                    source={require("../../assets/errorAlert.png")}
                  />
                  <Text style={{ color: "#990909", marginHorizontal: 10 }}>
                    password does not match
                  </Text>
                </View>
              )}

              {changePasswordValue && (
                <View style={styles.errorView}>
                  <Image
                    style={{ height: 19, width: 18 }}
                    source={require("../../assets/errorAlert.png")}
                  />
                  <Text style={{ color: "#990909", marginHorizontal: 10 }}>
                    The password you entered does not match the existing
                    password.
                  </Text>
                </View>
              )}
              <Pressable
                style={{
                  borderColor: "#006ba6",
                  borderWidth: 1,
                  width: 80,
                  height: 35,
                  marginTop: 10,
                  borderRadius: 4,
                  justifyContent: "center",
                  alignSelf: "flex-end",
                  alignItems: "center",
                }}
                android_ripple={{ color: "#ccc" }}
                onPress={() => updatePasswordHandler()}
              >
                <View>
                  <Text style={styles.emptyText}>UPDATE</Text>
                </View>
              </Pressable>
              <View
                style={{
                  borderTopWidth: 4,
                  borderColor: "#fafafa",
                  marginTop: 10,
                }}
              />
            </View>
            <View
              style={{
                paddingHorizontal: 10,
                borderBottomWidth: 0.3,
                borderColor: "#006ba6",
                paddingBottom: 10,
              }}
            >
              <Text
                style={{ fontSize: 15, fontWeight: "bold", color: "#494c4c" }}
              >
                Account
              </Text>
            </View>
            <View style={{ padding: 10 }}>
              <View style={{ flexDirection: "row" }}>
                <Text style={{ color: "#494c4c" }}>Account Number:</Text>
                <Text style={{ marginLeft: 5, color: "#494c4c" }}>
                  {userData?.selectedAccount?.id}
                </Text>
              </View>
              <View style={{ flexDirection: "row", marginTop: 5 }}>
                <Text style={{ color: "#494c4c" }}>
                  Billing Account Number:
                </Text>
                <Text style={{ marginLeft: 5, color: "#494c4c" }}>
                  {userData?.selectedAccount?.jdeNumber}
                </Text>
              </View>
              <View style={{ flexDirection: "row", marginTop: 5 }}>
                <Text style={{ color: "#494c4c" }}>DEA Number:</Text>
                <Text style={{ marginLeft: 5, color: "#494c4c" }}>
                  {userData?.selectedAccount?.deaNumber}
                </Text>
              </View>
              <View style={{ flexDirection: "row", marginTop: 5 }}>
                <Text style={{ color: "#494c4c" }}>DEA Expiration:</Text>
                <Text style={{ marginLeft: 5, color: "#494c4c" }}>
                  {Moment(userData?.selectedAccount?.deaExpiration).format(
                    "MM/DD/YYYY hh:mmA"
                  )}
                </Text>
              </View>
              <View style={{ flexDirection: "row", marginTop: 5 }}>
                <Text style={{ color: "#494c4c" }}>State License:</Text>
                <Text style={{ marginLeft: 5, color: "#494c4c" }}>
                  {userData?.selectedAccount?.accountDetail?.stateLicense}
                </Text>
              </View>
              <View style={{ flexDirection: "row", marginTop: 5 }}>
                <Text>
                  <Text style={{ color: "#494c4c" }}>
                    State License Expiration:
                  </Text>
                  <Text style={{ marginLeft: 5, color: "#494c4c" }}>
                    {Moment(
                      userData?.selectedAccount?.accountDetail
                        ?.stateLicenseExpiration
                    ).format("MM/DD/YYYY hh:mmA")}
                  </Text>
                </Text>
              </View>
              <View style={{ flexDirection: "row", marginTop: 5 }}>
                <Text>
                  <Text style={{ marginLeft: 5, color: "#494c4c" }}>
                    State Control License:
                  </Text>
                  <Text style={{ color: "#494c4c" }}>
                    {
                      userData?.selectedAccount?.accountDetail
                        ?.stateControlLicense
                    }
                  </Text>
                </Text>
              </View>
              <View style={{ flexDirection: "row", marginTop: 5 }}>
                <Text>
                  <Text style={{ color: "#494c4c" }}>
                    State Control License Expiration:
                  </Text>
                  <Text style={{ marginLeft: 5, color: "#494c4c" }}>
                    {Moment(
                      userData?.selectedAccount?.accountDetail
                        ?.stateControlLicenseExpiration
                    ).format("MM/DD/YYYY hh:mmA")}
                  </Text>
                </Text>
              </View>
              <View style={{ flexDirection: "row", marginTop: 5 }}>
                <Text style={{ color: "#494c4c" }}>
                  CMEA Certification Date:
                </Text>
                <Text style={{ marginLeft: 5, color: "#494c4c" }}>
                  {Moment(
                    userData?.selectedAccount?.cmeaCertificationDate
                  ).format("MM/DD/YYYY")}
                </Text>
              </View>
              <View style={{ flexDirection: "row", marginTop: 5 }}>
                <Text>
                  <Text style={{ color: "#494c4c" }}>
                    CMEA Certification Expiration:
                  </Text>
                  <Text style={{ marginLeft: 5, color: "#494c4c" }}>
                    {Moment(
                      userData?.selectedAccount?.cmeaCertificationExpiration
                    ).format("MM/DD/YYYY hh:mmA")}
                  </Text>
                </Text>
              </View>
              <View style={{ flexDirection: "row", marginTop: 5 }}>
                <Text style={{ color: "#494c4c" }}>Sales Rep:</Text>
                <Text style={{ marginLeft: 5, color: "#494c4c" }}>
                  {userData?.selectedAccount?.accountDetail?.accountRep.name}
                </Text>
              </View>
              <View style={{ flexDirection: "row", marginTop: 5 }}>
                <Text style={{ color: "#494c4c" }}>Phone:</Text>
                <Text
                  style={{ marginLeft: 5, color: "#006ba6" }}
                  onPress={() => Linking.openURL(`tel:${formattedNumber}`)}
                >
                  {formattedNumber}
                  <Text> EXT: </Text>
                  {
                    userData?.selectedAccount?.accountDetail?.accountRep
                      .extension
                  }
                </Text>
              </View>
              <View style={{ flexDirection: "row", marginTop: 5 }}>
                <Text>
                  <Text style={{ color: "#494c4c" }}>Sales Rep Email:</Text>
                  <Text
                    onPress={() =>
                      Linking.openURL(
                        `mailto:${userData?.selectedAccount?.accountDetail?.accountRep.salesRepEmail}`
                      )
                    }
                    style={{ marginLeft: 5, color: "#006ba6" }}
                  >
                    {
                      userData?.selectedAccount?.accountDetail?.accountRep
                        .salesRepEmail
                    }
                  </Text>
                </Text>
              </View>
              <View style={{ flexDirection: "row", marginTop: 5 }}>
                <Text style={{ fontSize: 10, color: "#494c4c" }}>
                  For changes to your account information, please call your
                  Sales Rep
                </Text>
              </View>
            </View>
            <View
              style={{
                borderTopWidth: 4,
                borderColor: "#fafafa",
                marginVertical: 10,
              }}
            />
            <View
              style={{
                paddingHorizontal: 10,
                borderBottomWidth: 0.3,
                borderColor: "#006ba6",
                paddingBottom: 10,
              }}
            >
              <Text
                style={{ fontSize: 15, fontWeight: "bold", color: "#494c4c" }}
              >
                Location
              </Text>
            </View>
            <View style={{ padding: 10 }}>
              <View style={{ flexDirection: "row", marginTop: 5 }}>
                <Text style={{ color: "#494c4c" }}>
                  {userData?.selectedAccount.addresses[0]?.companyName}
                </Text>
              </View>
              <View style={{ flexDirection: "row", marginTop: 5 }}>
                <Text style={{ color: "#494c4c" }}>
                  {userData?.selectedAccount.addresses[0]?.addressLine1}
                </Text>
              </View>
              <View style={{ flexDirection: "row", marginTop: 5 }}>
                <Text style={{ color: "#494c4c" }}>
                  {userData?.selectedAccount.addresses[0]?.addressLine2}
                </Text>
              </View>
              <View style={{ flexDirection: "row", marginTop: 5 }}>
                <Text style={{ color: "#494c4c" }}>
                  {userData?.selectedAccount.addresses[0]?.city},{" "}
                  {
                    userData?.selectedAccount.addresses[0]?.countrySubdivision
                      ?.abbreviation
                  }{" "}
                  {userData?.selectedAccount.addresses[0]?.postalCode}
                </Text>
              </View>
              <View style={{ marginTop: 5 }}>
                <View style={{ flexDirection: "row", marginTop: 5 }}>
                  <Text style={{ color: "#494c4c" }}>Phone:</Text>
                  <Text
                    onPress={() => Linking.openURL(`tel:${phoneNumber}`)}
                    style={{ marginLeft: 5, color: "#006ba6" }}
                  >
                    {phoneNumber}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    marginTop: 5,
                  }}
                >
                  <Text style={{ color: "#494c4c" }}>Phone:</Text>

                  <Text
                    onPress={() => Linking.openURL(`tel:${phoneFaxNumber}`)}
                    style={{ marginLeft: 5, color: "#006ba6" }}
                  >
                    {phoneFaxNumber}
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

export default Account;

const styles = StyleSheet.create({
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
    color: "#494c4c",
  },
  checkboxBase: {
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    marginVertical: 10,
    borderWidth: 0.5,
    borderColor: "#9d9b9b",
    backgroundColor: "transparent",
  },

  checkboxChecked: {
    backgroundColor: "#006ba6",
    justifyContent: "center",
    alignItems: "center",
    width: 20,
    height: 20,
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
  mainBoxLoading: { opacity: 0.2 },
  mainBox: { backgroundColor: "#fff" },
  emptyText: {
    color: "#006ba6",
    fontSize: 15,
    fontWeight: "bold",
  },
});
