import { StyleSheet, Text, View, Pressable } from "react-native";
import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getBioMatricsDetails } from "../../utils";
const Settings = () => {
  const [isChecked, setChecked] = useState(false);

  const [values, setValue] = useState();
  const bioMatrics = async () => {
    const bioMatrics = await getBioMatricsDetails();
    if (!bioMatrics) {
      setValue(false);
    } else {
      setValue(bioMatrics);
    }

    return bioMatrics;
  };
  bioMatrics();

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
          style={[
            buttonStyle,
            checked ? activeButtonStyle : inactiveButtonStyle,
          ]}
          onPress={onCheckmarkPress}
        >
          {checked && <Ionicons name="checkmark" size={20} color="white" />}
        </Pressable>
      </View>
    );
  }

  const myCheckHandler = async (value) => {
    setChecked(!isChecked);
    AsyncStorage.setItem("bioMatrics", JSON.stringify(value));
    setValue(value);
  };

  return (
    <SafeAreaView style={{ backgroundColor: "#fff", flex: 1 }}>
      <Navbar />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 10,
        }}
      >
        <View style={{ justifyContent: "center" }}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>Settings</Text>
        </View>
      </View>
      <View style={{ flexDirection: "row", marginLeft: 10 }}>
        <MyCheckbox
          style={styles.checkbox}
          checked={values === true}
          onChange={myCheckHandler}
          onPress={() => {
            values === false ? myCheckHandler(true) : myCheckHandler(false);
          }}
          buttonStyle={styles.checkboxBase}
          activeButtonStyle={styles.checkboxChecked}
        />
        <View style={{ marginVertical: 7 }}>
          <Text style={{ color: "#494c4c", fontWeight: "bold" }}>
            Biometrics Enabled?
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Settings;

const styles = StyleSheet.create({
  heading: {
    alignItems: "center",
    textAlign: "center",
    backgroundColor: "#ddd",
    paddingVertical: 6,
  },
  headingText: {
    paddingLeft: 10,
    fontWeight: "bold",
    fontSize: 20,
    color: "#494c4c",
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
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  checkboxLabel: {
    marginLeft: 8,
    fontWeight: 500,
    fontSize: 18,
  },
});
