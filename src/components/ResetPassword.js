import { StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ForgotScreen from "../components/Ui/ForgotScreen";
import { resetPassword } from "../../redux/features/authUser";
import { Provider, useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

const ResetPassword = (props) => {
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [codeError, setCodeError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [passwordMatchError, setPasswordMatchError] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const submitHandler = () => {
    if (!code.length) {
      setCodeError(true);
      return;
    }
    if (!password.length) {
      setPasswordError(true);
      return;
    }
    if (!confirmPassword.length) {
      setConfirmPasswordError(true);
      return;
    }

    if (password != confirmPassword) {
      setPasswordMatchError(true);
      return;
    } else {
      dispatch(resetPassword({ password: password, token: code }));
      navigation.navigate("Login");
    }
  };
  const codeHandler = (value) => {
    setCode(value);
    setCodeError(false);
    setPasswordMatchError(false);
  };
  const passwordHandler = (value) => {
    setPassword(value);
    setPasswordError(false);
    setPasswordMatchError(false);
  };
  const confirmPasswordHandler = (value) => {
    setConfirmPassword(value);
    setConfirmPasswordError(false);
    setPasswordMatchError(false);
  };
  return (
    <ForgotScreen
      heading="Reset Password"
      message="Please check your email for instructions on how to reset your password"
      subHeading="Reset Password"
      onPress={() => submitHandler()}
      onChangeTextFirst={(value) => codeHandler(value)}
      onChangeTextSecond={(value) => passwordHandler(value)}
      onChangeTextThird={(value) => confirmPasswordHandler(value)}
      placeholder="Verification code*"
      placeholder2="Password"
      placeholder3="Confirm Password"
      error={codeError}
      errorMessage={"Verification Code is required."}
      passwordError={passwordError}
      passwordErrorMessage={"Password is required."}
      confirmPasswordError={confirmPasswordError}
      confirmPasswordErrorMessage={"Confirm Password is required."}
      passwordMatchError={passwordMatchError}
      passwordMatchErrorMessage={"Passwords must match."}
    />
  );
};

export default ResetPassword;

const styles = StyleSheet.create({});
