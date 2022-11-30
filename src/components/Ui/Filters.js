import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React, { useState, useEffect } from "react";

const Filters = (props) => {
  const [filterOpen, setFilterOpen] = useState(false);
  const [isChecked, setChecked] = useState(false);
  const checkHandler = () => {
    setChecked(!isChecked);
  };
  const openHandler = () => {
    setFilterOpen((pre) => !pre);
  };

  return (
    <View>
      {props.values?.length > 0 && (
        <View key={props.label}>
          <Pressable
            style={styles.headingAvailability}
            onPress={() => {
              openHandler();
            }}
          >
            <Text style={styles.headingAvalText}>
              {props.label}
              {props.active && <Text style={{ fontSize: 22 }}> &bull;</Text>}
            </Text>

            <View>
              {filterOpen ? (
                <Image
                  style={{ height: 15, width: 15 }}
                  source={require("../../../assets/down.png")}
                />
              ) : (
                <Image
                  style={{ height: 15, width: 15 }}
                  source={require("../../../assets/right.png")}
                />
              )}
            </View>
          </Pressable>
          {filterOpen && (
            <View>
              <View
                style={{
                  flexDirection: "row",
                  marginTop: 5,
                }}
              >
                {props.MyFilter}
              </View>
            </View>
          )}
        </View>
      )}
    </View>
  );
};

export default Filters;

const styles = StyleSheet.create({
  textInput: {
    width: 70,
    height: 35,
    borderWidth: 1,
    borderColor: "#209bd6",
    textAlign: "center",
  },
  modalView: {
    backgroundColor: "#fff",
    height: 100,
    paddingHorizontal: 10,
    marginHorizontal: 10,
    paddingVertical: 20,
    zIndex: 1,
    shadowColor: "#000",
    textAlign: "center",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  headingSrting: {
    marginVertical: 8,
  },
  headingAvailability: {
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingTop: 20,
    paddingBottom: 10,
    width: 350,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  heading: {
    alignItems: "center",
    textAlign: "center",
    backgroundColor: "#ddd",
    paddingVertical: 6,
  },
  headingSortingText: {
    paddingLeft: 10,
    fontWeight: "bold",
    fontSize: 18,
    color: "#494c4c",
  },
  headingAvalText: {
    paddingLeft: 5,
    fontWeight: "bold",
    fontSize: 14,
    color: "#494c4c",
  },

  modalView: {
    backgroundColor: "#fff",
    padding: 35,
    zIndex: 3000,
    zIndexInverse: 1000,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },

  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  closeButton: {
    paddingVertical: 10,
    paddingHorizontal: 30,
    width: 400,
    borderBottomWidth: 2,
    borderColor: "#005185",
  },
  sortingInput: {
    width: 300,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,.2)",
    height: 35,
    borderRadius: 6,
  },
  checkboxBase: {
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    margin: 6,
    borderWidth: 2,
    borderColor: "#006ba6",
    backgroundColor: "transparent",
  },

  checkboxChecked: {
    backgroundColor: "#006ba6",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  checkboxLabel: {
    marginLeft: 8,
    fontWeight: 500,
    fontSize: 18,
  },
});
