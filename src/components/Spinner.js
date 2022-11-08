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
        <ActivityIndicator
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
          size="large"
        />
      </Modal>
    </View>
  );
}

export default Spinner;

const styles = StyleSheet.create({});
