import React, { useState, useEffect, useContext } from "react";
import { View, Platform, Alert, StatusBar } from "react-native";
import { enableFreeze } from "react-native-screens";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { SafeAreaView } from "react-native-safe-area-context";
import { Provider, useDispatch, useSelector } from "react-redux";
import store from "./redux/store/store";
import { getToken } from "./utils";
import { logout, authenticate } from "./redux/features/authUser";
import Navigation from "./Navigation";
import * as Notifications from "expo-notifications";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function Root() {
  // const navigation = useNavigation();
  const [isTryingLogin, setIsTryingLogin] = useState(true);
  const [token, setToken] = useState();
  const dispatch = useDispatch();
  const { isAuthenticated, loading } = useSelector((state) => ({
    ...state.auth,
  }));

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
