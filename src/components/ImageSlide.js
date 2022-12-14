import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import Slideshow from "react-native-image-slider-show";

const dataSource = [
  {
    url: "https://www.andanet.com/cmsstatic/quicklinks-img-customer-resources.jpg",
  },
  { url: "https://www.andanet.com/cmsstatic/quicklinks-img-promooffers1.jpg" },
  {
    url: "https://www.andanet.com/cmsstatic/quicklinks-img-shortdates-small.jpg",
  },
];

const ImageSlider = () => {
  const [position, setPosition] = useState(1);

  useEffect(() => {
    const toggle = setInterval(() => {
      setPosition(position === dataSource.length - 1 ? 0 : position + 1);
    }, 3000);

    return () => clearInterval(toggle);
  }, [position]);

  const setState = () => {
    ({
      interval: setInterval(() => {
        setState({
          position: position === dataSource.length ? 0 : position + 1,
        });
      }, 2000),
    });
  };
  return (
    <View style={{ borderRadius: 5 }}>
      <Slideshow
        position={position}
        dataSource={dataSource}
        arrowSize={14}
        onPositionChanged={(position) => setState({ position })}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default ImageSlider;
