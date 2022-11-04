import React, { useState, useEffect, useContext } from "react";
import { View, Platform } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { SafeAreaView } from "react-native-safe-area-context";
import { Provider, useDispatch, useSelector } from "react-redux";
import store from "./redux/store/store";
import { getToken } from "./utils";
import { logout, authenticate } from "./redux/features/authUser";
import Navigation from "./Navigation";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function Root() {
  // const navigation = useNavigation();
  const [isTryingLogin, setIsTryingLogin] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    async function fetchToken() {
      const storedToken = await getToken();
      console.log(storedToken);
      if (storedToken) {
        dispatch(authenticate(storedToken));
      }
      setIsTryingLogin(false);
    }

    fetchToken();
  }, []);
  if (isTryingLogin) {
    return <View />;
  }
  return <Navigation />;
}

export default function App() {
  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <Provider store={store}>
          <Root />
        </Provider>
      </SafeAreaView>
    </>
  );
}
