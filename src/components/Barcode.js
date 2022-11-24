import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  Image,
  Pressable,
  SafeAreaView,
  Alert,
  Platform,
} from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import {
  searchProducts,
  productDetails,
} from "../../redux/features/productApi";
import { searchValues } from "../../redux/features/authUser";

function Barcode() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  const { searchProducstsData } = useSelector((state) => ({
    ...state.products,
  }));

  const [searchData, setSearchData] = useState(searchProducstsData);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };
    getBarCodeScannerPermissions();
  }, [isFocused]);

  // if (searchProducstsData?.totalResults>=0) {
  //   if (searchProducstsData?.totalResults === 1) {
  //     productDetailHandler(searchProducstsData?.products[0]?.defaultSku?.id);
  //     return;
  //   }
  //   if (searchProducstsData?.totalResults > 1) {
  //     navigation.navigate("SearchProduct");
  //     return;
  //   }
  //   if (searchProducstsData?.totalResults == 0) {
  //     navigation.navigate("SearchProduct");
  //     return;
  //   }
  // }

  const handleBarCodeScanned = async ({ type, data }) => {
    // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    setScanned(true);
    (async () => {
      try {
        if (Platform.OS === "android") {
          if (data.length === 12) {
            dispatch(searchProducts(data));
            dispatch(searchValues(data));
            setScanned(true);
            navigation.navigate("SearchProduct");
            return;
          } else {
            Alert.alert(`Invalid Barcode ${data}, Please Try Again!`);
            setScanned(true);
          }
        }
        if (Platform.OS === "ios") {
          if (data.length === 13) {
            if (data.substring(0, 1) === "0") {
              dispatch(searchProducts(data.substring(1)));
              dispatch(searchValues(data.substring(1)));
              navigation.navigate("SearchProduct");
              setScanned(true);
            } else {
              Alert.alert(`Invalid Barcode ${data}, Please Try Again!`);
              setScanned(true);
            }
          } else {
            Alert.alert(`Invalid Barcode ${data}, Please Try Again!`);
            setScanned(true);
          }
          return;
        }
      } catch (e) {
        Alert.alert(e.message);
        setScanned(true);
      }
    })();
  };

  const productDetailHandler = async (Id) => {
    navigation.navigate("ProductDetails");
    dispatch(productDetails(Id));
  };

  if (hasPermission === null) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Requesting for camera permission</Text>
      </SafeAreaView>
    );
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Pressable
        onPress={() => {
          navigation.goBack();
        }}
        style={{ marginLeft: "auto", marginTop: "5%", marginRight: "5%" }}
      >
        <Image
          source={require("../../assets/close.png")}
          style={{ height: 25, width: 25 }}
        />
      </Pressable>
      <View
        style={{ flex: 1, flexDirection: "column", justifyContent: "center" }}
      >
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={{
            position: "absolute",
            top: 50,
            left: 0,
            bottom: 50,
            right: 0,
          }}
        />
      </View>

      <View
        style={{ width: 200, justifyContent: "center", alignSelf: "center" }}
      >
        {scanned && (
          <Button title={"Scan Again"} onPress={() => setScanned(false)} />
        )}
      </View>
    </SafeAreaView>
  );
}

export default Barcode;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 50,
    backgroundColor: "#fff",
  },
});
