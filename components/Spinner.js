import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  Modal,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

function Spinner() {
  return (
    <View>
      <Modal
        animationType={"fade"}
        transparent={true}
        visible={true}
        onRequestClose={() => {}}
        propagateSwipe={true}
      >
        {/* <Image
            source={require("../assets/spinner.gif")}
            style={{
              height: 80,
              width: 80,
             
              alignSelf: "center",
              transparent: true,
            }}
          /> */}
        <ActivityIndicator style={{ marginVertical: 308.7 }} size="large" />
      </Modal>
    </View>
  );
}

export default Spinner;

const styles = StyleSheet.create({
  rootContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  message: {
    fontSize: 16,
    marginBottom: 12,
  },
});
