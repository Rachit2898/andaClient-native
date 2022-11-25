import { StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ForgotScreen from "../components/Ui/ForgotScreen";
import { useNavigation } from "@react-navigation/native";

const ForgotPassword = (props) => {
  const [password, setPassword] = useState();
  const navigation = useNavigation();
  const submitHandler = () => {
    navigation.navigate("ResetPassword");
  };
  return (
    <ForgotScreen
      heading="Forgot Password"
      message=" Enter you username to reset your password. An email will be sent
                address on file."
      subHeading="Username"
      onPress={() => submitHandler()}
      onChangeText={(value) => setPassword(value)}
      placeholder="Enter Username"
    />
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({});
