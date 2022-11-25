import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Pressable,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ForgotScreen from "../components/Ui/ForgotScreen";

const ForgotPassword = (props) => {
  const [password, setPassword] = useState();

  const submitHandler = () => {
    console.log(password);
    alert(password);
  };
  return (
    <ForgotScreen
      heading="Forgot Username"
      message=" Enter you email address to retrieve your username."
      subHeading="Eamil Address"
      onPress={() => submitHandler()}
      onChangeText={(value) => setPassword(value)}
      placeholder="Enter Email Address"
    />
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({});
