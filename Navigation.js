import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect, useContext } from "react";
import { View, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/native-stack";
import { useDispatch, useSelector } from "react-redux";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Cart from "./components/Cart";
import CheckOut from "./components/CheckOut";
import LoginScreen from "./components/Login";
import HomePage from "./components/Home";
import SubmitCart from "./components/SubmitCart";
import YourTopPurchase from "./components/YourTopPurchase";
import CustomerLikeYou from "./components/CustomerLikeYou";
import Account from "./components/Account";
import MoreDetails from "./components/MoreDetails";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Badge, withBadge } from "react-native-elements";
import Dashboard from "./components/Dashboard";
import _ from "lodash";
import { cartInfo } from "./redux/features/productApi";
//import Torch from "./components/Torch";
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
function MyTabs() {
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  useEffect(() => {
    dispatch(cartInfo());
  }, [dispatch]);
  const { cartLength } = useSelector((state) => ({
    ...state.products,
  }));
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Auth"
        options={{
          headerShown: false,
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <Image
              style={{ height: 35, width: 50 }}
              source={require("./assets/icon.png")}
            />
          ),
        }}
        component={AuthenticatedStack}
      />
      <Tab.Screen
        name="Cart"
        options={{
          headerShown: false,
          tabBarLabel: "Cart",
          tabBarIcon: ({ color, size }) => (
            <View style={{ flexDirection: "row" }}>
              <MaterialCommunityIcons name="cart" color={color} size={size} />
              {cartLength > 0 && <Badge value={cartLength} />}
            </View>
          ),
        }}
        component={Cart}
      />
      <Tab.Screen
        name="Account"
        options={{
          headerShown: false,
          tabBarLabel: "Account",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
        component={Account}
      />
      <Tab.Screen
        name="More"
        options={{
          headerShown: false,
          tabBarLabel: "More",
          tabBarIcon: ({ color, size }) => (
            <View>
              <Dashboard
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
              />
              <MaterialCommunityIcons
                name="more"
                color={color}
                size={size}
                onPress={() => setModalVisible(true)}
              />
            </View>
          ),
        }}
        component={MoreDetails}
      />
    </Tab.Navigator>
  );
}

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        animation: "none",
        headerStyle: { backgroundColor: "white" },
        headerTintColor: "white",
        contentStyle: { backgroundColor: "white" },
      }}
    >
      <Stack.Screen
        screenOptions={{
          backgroundColor: "white",
        }}
        options={{
          headerShown: false,
        }}
        name="Log"
        component={LoginScreen}
      />
    </Stack.Navigator>
  );
}

function AuthenticatedStack() {
  return (
    <>
      <Stack.Navigator screenOptions={{ animation: "none" }}>
        <>
          <Stack.Screen
            name="HomePage"
            component={HomePage}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="TopPurchase"
            component={YourTopPurchase}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="SubmitCart"
            component={SubmitCart}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="CheckOut"
            component={CheckOut}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="CustomerLikeYou"
            component={CustomerLikeYou}
            options={{
              headerShown: false,
            }}
          />
        </>
      </Stack.Navigator>
    </>
  );
}

export default function Navigation() {
  const { isAuthenticated } = useSelector((state) => ({
    ...state.auth,
  }));

  return (
    <NavigationContainer>
      {!isAuthenticated && <AuthStack />}
      {isAuthenticated && <MyTabs />}
    </NavigationContainer>
  );
}
