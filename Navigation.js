import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect, useContext } from "react";
import { View, Image, Pressable } from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
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
import AndaContractItems from "./src/components/AndaContractItems";
import Inventory from "./src/components/InventoryWatchList";
import Savings from "./src/components/Savings";
import CloseOuts from "./src/components/CloseOuts";
import PriceReduction from "./src/components/PriceReduction";
import ShortDate from "./src/components/ShortDate";
import ProductDetails from "./src/components/ProductDetails";
import SearchProduct from "./src/components/SearchProduct";
import OrderingOptions from "./src/screens/OrderingAndOptions.js";
import OpeningAccount from "./src/screens/OpeningAccount.js";
import PaymentOptions from "./src/screens/Payment.js";
import ReturnPolicy from "./src/screens/ReturnPolicy.js";
import Settings from "./src/screens/Settings";
import FingerPrint from "./src/screens/FingerPrints";
import Spinner from "./src/components/Spinner";
import TabBar from "./src/components/TabBar";
import Faq from "./src/screens/Faq.js";
import Barcode from "./src/components/Barcode";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Badge, withBadge } from "react-native-elements";
import Dashboard from "./src/components/Dashboard";
import _ from "lodash";
import { cartInfo } from "./redux/features/productApi";
import { getBioMatricsDetails } from "./utils";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

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
            name="Spinner"
            component={Spinner}
            options={{
              headerShown: false,
            }}
          />
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
              headerShown: true,
              title: null,
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
              headerShown: true,
              title: null,
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
          <Stack.Screen
            name="OrderingOptions"
            component={OrderingOptions}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="OpeningAccount"
            component={OpeningAccount}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Payment"
            component={PaymentOptions}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="ReturnPolicy"
            component={ReturnPolicy}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Faq"
            component={Faq}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Cart"
            component={Cart}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Settings"
            component={Settings}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="TabBar"
            component={TabBar}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Dashboard"
            component={Dashboard}
            options={{
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="Account"
            component={Account}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="AndaContractItems"
            component={AndaContractItems}
            options={{
              headerShown: false,
            }}
          />
        </>
      </Stack.Navigator>
    </>
  );
}

function BiometricsAuth() {
  const [finger, setFinger] = useState(false);
  const bioMatrics = async () => {
    const bioMatrics = await getBioMatricsDetails();
    setFinger(bioMatrics);
  };
  useEffect(() => {
    bioMatrics();
  }, [finger]);
  const { cartLength } = useSelector((state) => ({
    ...state.products,
  }));
  return <>{finger ? <MyAuth /> : <AuthenticatedStack />}</>;
}

function MyAuth() {
  const { isFinger } = useSelector((state) => ({
    ...state.auth,
  }));
  return <>{isFinger ? <AuthenticatedStack /> : <FingerPrint />}</>;
}

export default function Navigation() {
  const { isAuthenticated } = useSelector((state) => ({
    ...state.auth,
  }));

  return (
    <NavigationContainer>
      {isAuthenticated ? <BiometricsAuth /> : <AuthStack />}
    </NavigationContainer>
  );
}
