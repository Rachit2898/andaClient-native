import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import React, { useState, useEffect } from "react";

const AddButton = (props) => {
  const [isChecked, setChecked] = useState(false);
  const openHandler = () => {
    setChecked(true);
    {
      props.onPress();
    }
  };
  return (
    <View>
      <Pressable
        style={{
          backgroundColor: "#ed8b00",
          width: 60,
          height: 25,
          borderRadius: 3,
          borderRadius: 4,
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row",
        }}
        onPress={openHandler}
      >
        <Text
          style={{
            color: "#fff",
            fontWeight: "bold",
            fontSize: 12,
          }}
        >
          ADD
        </Text>
        {isChecked && (
          <View>
            <Image
              style={{
                width: 12,
                height: 12,
              }}
              source={require("../../../assets/check.png")}
            />
          </View>
        )}
      </Pressable>
    </View>
  );
};

export default AddButton;

const styles = StyleSheet.create({});
