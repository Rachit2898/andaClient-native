import { Text, View, Image, Pressable } from "react-native";

import React, { useState, useEffect } from "react";

import { MaterialCommunityIcons } from "@expo/vector-icons";
const LikeButton = (props) => {
  const [liked, setLiked] = useState(false);

  const LikeHandler = () => {
    setLiked((isLiked) => !isLiked);
    props.onPress();
  };

  return (
    <Pressable onPress={() => LikeHandler()}>
      <MaterialCommunityIcons
        name={props.value === "FAVORITE" ? "heart" : "heart-outline"}
        size={15}
        color={props.value === "FAVORITE" ? "red" : "grey"}
      />
    </Pressable>
  );
};

export default LikeButton;
