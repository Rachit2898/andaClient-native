import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Pressable,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";

import {
  userInfo,
  cartInfo,
  searchItems,
  searchProducsts,
} from "../../redux/features/productApi";

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
  const [isChecked, setChecked] = useState(false);
  const {
    userInfoData,
    cartInfoData,
    cartLength,
    searchItem,
    searchProducstsData,
  } = useSelector((state) => ({
    ...state.products,
  }));
  const userData = userInfoData;
  useEffect(() => {
    dispatch(userInfo());
    dispatch(cartInfo());
  }, [dispatch]);

  const checkHandler = () => {
    setChecked(!isChecked);
  };

  const myCheckHandler = async (andanet) => {
    setValue(true);
  };
  function onChange(value) {
    console.log("Captcha value:", value);
  }

  return (
    <SafeAreaView style={{ backgroundColor: "#fff", flex: 1 }}>
      <ScrollView>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 10,
          }}
        >
          <View
            style={{
              backgroundColor: "#006ba6",
              width: 25,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 50,
              height: 25,
              paddingHorizontal: 10,
            }}
          >
            <Image
              source={require("../../assets/account.png")}
              style={{
                height: 20,
                width: 20,
                borderRadius: 50,
              }}
            />
          </View>
          <Text style={{ color: "#006ba6", fontWeight: "700", marginLeft: 10 }}>
            {userData?.selectedAccount?.id} | {userData?.selectedAccount?.name}
          </Text>
        </View>
        <View
          style={{
            borderTopWidth: 4,
            borderColor: "#fafafa",
            marginVertical: 10,
          }}
        />
        <View style={{ paddingHorizontal: 10 }}>
          <Text style={styles.labelContainer}>USERNAME*</Text>
          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              placeholderTextColor="#003f5c"
            />
          </View>
          <Text style={styles.labelContainer}>EMAIL ADDRESS*</Text>
          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              placeholderTextColor="#003f5c"
            />
          </View>
          <View style={{ flexDirection: "row" }}>
            <MyCheckbox
              style={styles.checkbox}
              checked={isChecked}
              onChange={checkHandler}
              onPress={() => {
                myCheckHandler("andanet");
              }}
              buttonStyle={styles.checkboxBase}
              activeButtonStyle={[isChecked ? styles.checkboxChecked : ""]}
            />
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginLeft: 10,
              }}
            >
              <Text style={{ color: "#494c4c" }}>
                I would like to receive marketings emails
              </Text>
            </View>
          </View>
          <Pressable
            style={{
              borderColor: "#006ba6",
              borderWidth: 1,
              width: 100,
              height: 45,

              justifyContent: "center",
              alignItems: "center",
            }}
            android_ripple={{ color: "#ccc" }}
          >
            <View>
              <Text
                style={{ color: "#006ba6", fontSize: 12, fontWeight: "bold" }}
              >
                UPDATE
              </Text>
            </View>
          </Pressable>
        </View>
        <View
          style={{
            borderTopWidth: 4,
            borderColor: "#fafafa",
            marginVertical: 10,
          }}
        />
        <View
          style={{ padding: 10, borderBottomWidth: 1, borderColor: "#006ba6" }}
        >
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>
            Change Password
          </Text>
        </View>
        <View style={{ padding: 10 }}>
          <Text style={styles.labelContainer}>CURRENT PASSWORD*</Text>
          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              placeholderTextColor="#003f5c"
            />
          </View>
          <Text style={styles.labelContainer}>NEW PASSWORD*</Text>
          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              placeholderTextColor="#003f5c"
            />
          </View>
          <Text style={styles.labelContainer}>CONFIRM PASSWORD*</Text>
          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              placeholderTextColor="#003f5c"
            />
          </View>
          <View style={{ flexDirection: "row" }}>
            <MyCheckbox
              style={styles.checkbox}
              checked={isChecked}
              onChange={checkHandler}
              onPress={() => {
                myCheckHandler("andanet");
              }}
              buttonStyle={styles.checkboxBase}
              activeButtonStyle={[isChecked ? styles.checkboxChecked : ""]}
            />
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginLeft: 10,
              }}
            >
              <Text style={{ color: "#494c4c" }}>
                I would like to receive marketings emails
              </Text>
            </View>
          </View>
          <Pressable
            style={{
              borderColor: "#006ba6",
              borderWidth: 1,
              width: 100,
              height: 45,

              justifyContent: "center",
              alignItems: "center",
            }}
            android_ripple={{ color: "#ccc" }}
          >
            <View>
              <Text
                style={{ color: "#006ba6", fontSize: 12, fontWeight: "bold" }}
              >
                UPDATE
              </Text>
            </View>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Account;

const styles = StyleSheet.create({
  inputView: {
    backgroundColor: "#fff",
    borderWidth: 0.4,
    borderColor: "#9d9b9b",
    width: "100%",
    height: 45,
    borderRadius: 3,
    justifyContent: "center", //Centered horizontally
  },
  TextInput: {
    paddingHorizontal: 10,
    fontSize: 16,
    color: "#494c4c",
    backgroundColor: "#fff",
  },
  labelContainer: {
    marginVertical: 10,
    marginTop: 10,
    fontSize: 13,
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
});
