import { StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ForgotScreen from "../components/Ui/ForgotScreen";

const ResetPassword = (props) => {
  const [password, setPassword] = useState();

  const submitHandler = () => {
    console.log(password);
    alert(password);
  };
  return (
    <ForgotScreen
      heading="Reset Password"
      message="Please check your email for instructions on how to reset your password"
      subHeading="Reset Password"
      onPress={() => submitHandler()}
      onChangeText={(value) => setPassword(value)}
      placeholder="Verification code*"
      placeholder2="Password"
      placeholder3="Confirm Password"
    />
  );
};

export default ResetPassword;

const styles = StyleSheet.create({});
