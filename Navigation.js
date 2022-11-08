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
import Cart from "./src/components/Cart";
import CheckOut from "./src/components/CheckOut";
import LoginScreen from "./src/components/Login";
import HomePage from "./src/components/Home";
import SubmitCart from "./src/components/SubmitCart";
import YourTopPurchase from "./src/components/YourTopPurchase";
import CustomerLikeYou from "./src/components/CustomerLikeYou";
import PreNegotiatedItems from "./src/components/PreNegotiatedItems";
import Favorites from "./src/components/Favorites";
import Account from "./src/components/Account";
import Inventory from "./src/components/InventoryWatchList";
import Savings from "./src/components/Savings";
import CloseOuts from "./src/components/CloseOuts";
import PriceReduction from "./src/components/PriceReduction";
import ShortDate from "./src/components/ShortDate";
import ProductDetails from "./src/components/ProductDetails";
import SearchProduct from "./src/components/SearchProduct";
import Barcode from "./src/components/Barcode";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Badge, withBadge } from "react-native-elements";
import Dashboard from "./src/components/Dashboard";
import _ from "lodash";
import { cartInfo } from "./redux/features/productApi";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
function MyTabs() {
  const dispatch = useDispatch();
  const [size, setSize] = useState();
  useEffect(() => {
    dispatch(cartInfo());
  }, [dispatch]);
  const { cartLength } = useSelector((state) => ({
    ...state.products,
  }));
  return (
    <Tab.Navigator initialRouteName={"Auth"}>
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
            <MaterialCommunityIcons name="more" color={color} size={size} />
          ),
        }}
        component={Dashboard}
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
        name="Login"
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
      <Stack.Navigator
        initialRouteName={"HomePage"}
        screenOptions={{ animation: "none" }}
      >
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
          <Stack.Screen
            name="PreNegotiated"
            component={PreNegotiatedItems}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Favorites"
            component={Favorites}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Inventory"
            component={Inventory}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Savings"
            component={Savings}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="CloseOuts"
            component={CloseOuts}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="PriceReduction"
            component={PriceReduction}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="ShortDate"
            component={ShortDate}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="ProductDetails"
            component={ProductDetails}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="SearchProduct"
            component={SearchProduct}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Barcode"
            component={Barcode}
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
