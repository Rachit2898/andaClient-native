import { StyleSheet, Button } from "react-native";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ForgotScreen from "../components/Ui/ForgotScreen";
import Recaptcha from "react-native-recaptcha-that-works";
import { forgotUser } from "../../redux/features/authUser";
import { Provider, useDispatch, useSelector } from "react-redux";

const ForgotPassword = (props) => {
  const [isError, setIsError] = useState(false);
  const [isValidError, setIsValidError] = useState(false);
  const [password, setPassword] = useState();
  const { message } = useSelector((state) => ({
    ...state.auth,
  }));

  const dispatch = useDispatch();

  const size = "normal";
  const [key, setKey] = useState("<none>");

  const $recaptcha = useRef();

  const handleOpenPress = useCallback(() => {
    $recaptcha.current.open();
  }, []);

  const handleClosePress = useCallback(() => {
    $recaptcha.current.close();
  }, []);

  const submitHandler = () => {
    if (!password?.length) {
      setIsError(true);
      return;
    }
    const emailIsValid = password?.includes("@");
    if (!emailIsValid) {
      setIsValidError(true);
      return;
    }

    handleOpenPress();
  };
  const changeTextHandler = (value) => {
    setPassword(value);
    setIsError(false);
    setIsValidError(false);
  };
  const submitApiHandler = (token) => {
    if (token) {
      const result = dispatch(forgotUser({ token: token, email: password }));
      console.log({ result });
    }
  };
  console.log(message);
  // if (message === "error") {
  //   alert(
  //     "The email address you entered is invalid. Try again or call Tech Support at 1-877-263-2638."
  //   );
  // }
  return (
    <>
      <ForgotScreen
        heading="Forgot Username"
        message=" Enter you email address to retrieve your username."
        subHeading="Email Address"
        onPress={() => submitHandler()}
        onChangeTextFirst={(value) => changeTextHandler(value)}
        placeholder="Enter Email Address"
        error={isError}
        errorMessage={"Email Address is required."}
        validationError={isValidError}
        validationErrorMessage={`Not a valid email address.`}
      />
      <Recaptcha
        ref={$recaptcha}
        lang="en"
        headerComponent={<Button title="Close" onPress={handleClosePress} />}
        siteKey="6LeFpDsUAAAAAEH42hEfizz1r977dUTyqdr55tPj"
        baseUrl="https://staging.andanet.com/"
        size={size}
        theme="light"
        onError={(err) => {
          console.warn("error", err);
        }}
        // onExpire={() => alert("onExpire event")}
        onVerify={(token) => {
          // alert("onVerify event");
          submitApiHandler(token);
        }}
      />
    </>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({});
