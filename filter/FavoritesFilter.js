import {
  StyleSheet,
  Text,
  View,
  Modal,
  Alert,
  Pressable,
  Image,
  ScrollView,
  TextInput,
} from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../components/Spinner";
import Ionicons from "@expo/vector-icons/Ionicons";
import { updateFavoriteUrls, setSorting } from "../redux/features/authUser";
import { favoritesApi } from "../redux/features/productApi";

const Filter = ({ modalVisible, setModalVisible }) => {
  const [response, setResponse] = useState();
  const [isChecked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sortingOpen, setsortingOpen] = useState(false);
  const [sortingValue, setsortingValue] = useState(null);
  const [sorting, setsorting] = useState([
    { label: "Item Description", value: "itemName%20asc" },
    { label: "Size", value: "packSize%20asc" },
    { label: "Price", value: "retailPrice%20asc" },
  ]);
  const dispatch = useDispatch();
  const [values, setValue] = useState(-1);
  const { favoritesData, paginationLoading } = useSelector((state) => ({
    ...state.products,
  }));

  var { favoritesUrls } = useSelector((state) => ({
    ...state.auth,
  }));
  const onsortingOpen = useCallback(() => {
    setCompanyOpen(false);
  }, []);
  let urlStructure = favoritesUrls?.map((url) => {
    return `${url?.fieldName}=${encodeURIComponent(url?.item)}&`;
  });

  const url = urlStructure.join("");

  useEffect(() => {
    dispatch(
      favoritesApi({ value: url, currentPage: 1, sortValues: sortingValue })
    );
    dispatch(setSorting(sortingValue));
  }, [favoritesUrls, sortingValue]);

  useEffect(() => {
    setResponse(favoritesData);
    setLoading(false);
  }, [favoritesData]);

  const filterValues = response?.searchFacets;
  var [currentFilter, setCurrentFilter] = useState();
  const [showFilter, setShowFilter] = useState(false);

  const showFilterHandler = (lable) => {
    setCurrentFilter(lable);
    setShowFilter((pre) => !pre);
  };

  const onChange = () => {};
  function MyCheckbox({
    checked,
    onPress,
    onChange,
    buttonStyle = {},
    activeButtonStyle = {},
    inactiveButtonStyle = {},
  }) {
    function onCheckmarkPress() {
      onChange(!checked);
      onPress();
    }

    return (
      <View>
        <Pressable
          style={[
            buttonStyle,
            checked ? activeButtonStyle : inactiveButtonStyle,
          ]}
          onPress={onCheckmarkPress}
        >
          {checked && <Ionicons name="checkmark" size={20} color="white" />}
        </Pressable>
      </View>
    );
  }
  const checkHandler = () => {
    setChecked(!isChecked);
  };
  const myCheckHandler = (label, labelValue) => {
    setValue(labelValue);
    setLoading(true);
    dispatch(updateFavoriteUrls({ fieldName: label, item: labelValue }));
  };

  const data = [
    { value: "Item description" },
    { value: "Size" },
    { value: "Price" },
  ];

  return (
    <View style={styles.modelContainer}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
        propagateSwipe={true}
        swipeDirection="down"
      >
        <ScrollView>
          <View>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <View style={styles.closeButton}>
                  {(loading || paginationLoading) && <Spinner />}
                  <Pressable
                    style={{ alignItems: "flex-end" }}
                    onPress={() => setModalVisible(false)}
                  >
                    <Image
                      source={require("../assets/close.png")}
                      style={{ height: 20, width: 20 }}
                    />
                  </Pressable>
                </View>
                <View style={styles.headingSrting}>
                  <Text style={styles.headingSortingText}>Sorting</Text>
                </View>

                <View style={{ zIndex: 10 }}>
                  <DropDownPicker
                    style={styles.dropdown}
                    open={sortingOpen}
                    value={sortingValue} //sortingValue
                    items={sorting}
                    setOpen={setsortingOpen}
                    setValue={setsortingValue}
                    setItems={setsorting}
                    placeholder="Select..."
                    placeholderStyle={styles.placeholderStyles}
                    onOpen={onsortingOpen}
                    onChangeValue={onChange}
                    zIndex={1000}
                    zIndexInverse={3000}
                  />
                </View>

                <View style={styles.headingSrting}>
                  <Text style={styles.headingSortingText}>Filters</Text>
                </View>
                {filterValues?.map((item) => {
                  return (
                    <View>
                      <View style={styles.headingAvailability}>
                        <Text style={styles.headingAvalText}>
                          {item?.label}
                        </Text>
                      </View>
                      <View>
                        <View
                          style={{
                            flexDirection: "row",
                            marginTop: 5,
                          }}
                        >
                          <View>
                            {item?.values?.map((value) => {
                              return (
                                <View>
                                  {value?.quantity ? (
                                    <View
                                      style={{
                                        flexDirection: "row",
                                        marginTop: 5,
                                      }}
                                    >
                                      <MyCheckbox
                                        style={styles.checkbox}
                                        checked={value?.active}
                                        onChange={checkHandler}
                                        onPress={() => {
                                          myCheckHandler(
                                            item?.fieldName,
                                            value?.value
                                          );
                                        }}
                                        buttonStyle={styles.checkboxBase}
                                        activeButtonStyle={[
                                          value?.active
                                            ? styles.checkboxChecked
                                            : "",
                                        ]}
                                      />
                                      <Text
                                        style={{
                                          color: "#494c4c",
                                          paddingTop: 6,
                                          fontSize: 16,
                                        }}
                                      >
                                        {value?.value}
                                      </Text>
                                      <Text
                                        style={{
                                          color: "#494c4c",
                                          paddingTop: 6,
                                          fontSize: 16,
                                        }}
                                      >
                                        ({value?.quantity})
                                      </Text>
                                    </View>
                                  ) : (
                                    <></>
                                  )}
                                </View>
                              );
                            })}
                          </View>
                        </View>
                      </View>
                    </View>
                  );
                })}
              </View>
            </View>
          </View>
        </ScrollView>
      </Modal>
    </View>
  );
};

export default Filter;

const styles = StyleSheet.create({
  mainBoxLoading: { flex: 1, opacity: 0.2 },
  mainBox: { flex: 1, backgroundColor: "#fff" },
  pagination: {
    marginTop: -30,
    borderTopWidth: 1,
  },

  safeAreaContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  placeholderStyles: {
    color: "grey",
  },

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
    marginLeft: -20,
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
    fontSize: 18,
    color: "#494c4c",
  },

  modalView: {
    backgroundColor: "#fff",
    padding: 35,
    zIndex: 3000,
    zIndexInverse: 1000,
    width: 400,
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
