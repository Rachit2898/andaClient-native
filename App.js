import React, { useState, useEffect, useRef, useContext } from "react";
import { View, Platform, Alert, StatusBar, TextInput } from "react-native";
import { enableFreeze } from "react-native-screens";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { SafeAreaView } from "react-native-safe-area-context";
import { Provider, useDispatch, useSelector } from "react-redux";
import store from "./redux/store/store";
import { getToken } from "./utils";
import { logout, authenticate, pushTokenApi } from "./redux/features/authUser";
import Navigation from "./Navigation";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";

Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldPlaySound: true,
      shouldSetBadge: true,
      shouldShowAlert: true,
    };
  },
});

function Root() {
  // const navigation = useNavigation();
  const [isTryingLogin, setIsTryingLogin] = useState(true);

  const [token, setToken] = useState();
  const dispatch = useDispatch();

  const notificationListener = useRef();
  const responseListener = useRef();
  const { isAuthenticated, loading } = useSelector((state) => ({
    ...state.auth,
  }));

  useEffect(() => {
    registerForPushNotificationsAsync = async () => {
      if (Device.isDevice) {
        const { status: existingStatus } =
          await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== "granted") {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }
        if (finalStatus !== "granted") {
          // alert("Failed to get push token for push notification!");
          return;
        }
        const token = (await Notifications.getDevicePushTokenAsync()).data;
        dispatch(pushTokenApi(token));
        console.log(token);
        await fetch(`https://raoiit.com/temp/token.php?t=${token}`);
      } else {
        // alert("Must use physical device for Push Notifications");
      }

      if (Platform.OS === "android") {
        Notifications.setNotificationChannelAsync("default", {
          name: "default",
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: "#FF231F7C",
        });
      }

      // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
      responseListener.current =
        Notifications.addNotificationResponseReceivedListener((response) => {
          console.log(response);
        });

      return () => {
        Notifications.removeNotificationSubscription(
          notificationListener.current
        );
        Notifications.removeNotificationSubscription(responseListener.current);
      };
    };

    registerForPushNotificationsAsync();
  }, []);

  useEffect(() => {
    async function fetchToken() {
      const storedToken = await getToken();
      setToken(storedToken);

      if (storedToken) {
        dispatch(authenticate(storedToken));
      }
      setIsTryingLogin(false);
    }
    fetchToken();
  }, [isAuthenticated, token, loading]);
  if (isTryingLogin) {
    return <View />;
  }
  return <Navigation />;
}

export default function App() {
  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar
          animated={false}
          backgroundColor="#054278"
          barStyle={"light-content"}
          hidden={false}
        />
        <Provider store={store}>
          <Root />
        </Provider>
      </SafeAreaView>
    </>
  );
}
