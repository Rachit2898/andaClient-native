import { StyleSheet, Text, View } from "react-native";
import React from "react";

const Component = (props) => {
  return (
    <>
      <View
        style={{
          paddingVertical: 10,
          borderColor: "#006ba6",
          borderBottomWidth: 1,
        }}
      >
        <View style={{ paddingHorizontal: 10 }}>
          <View>
            <Text
              style={{ fontSize: 15, fontWeight: "bold", color: "#006ba6" }}
            >
              {props.heading}
            </Text>
          </View>
          <View style={{ marginTop: 15 }}>
            <Text>{props.value}</Text>
          </View>
          {props.phone && (
            <View style={{ flexDirection: "row", marginTop: 3 }}>
              <Text style={{ fontWeight: "700" }}>Call</Text>
              <Text
                style={{ fontWeight: "700", marginLeft: 5, color: "#006ba6" }}
              >
                {props.phone}
              </Text>
            </View>
          )}
        </View>
      </View>
    </>
  );
};

export default Component;

const styles = StyleSheet.create({});
