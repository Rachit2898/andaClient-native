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
} from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { searchProducsts } from "../../redux/features/productApi";

export default function Barcode() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = async ({ type, data }) => {
    // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    try {
      const result = await dispatch(searchProducsts(data));
      if (result?.meta?.requestStatus === "fulfilled") {
        navigation.navigate("Auth", { screen: "searchProducts" });
        setScanned(true);
      }
      //
    } catch (e) {
      Alert.alert(e.message);
      setScanned(true);
    }
    // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Pressable
        onPress={() => {
          navigation.navigate("Auth", { screen: "HomePage" });
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
        {console.log({ scanned })}
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
          <Button
            title={"Tap to Scan Again"}
            onPress={() => setScanned(false)}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 50,
    backgroundColor: "#fff",
  },
});