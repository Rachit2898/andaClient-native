import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  ScrollView,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "./Navbar";
import Pagination from "./Pagination";
import Spinner from "./Spinner";
import Filter from "../filter/InventoryWatchFilter";
import ProductScreen from "../screens/ProductScreen";
import {
  inventoryWatch,
  addItem,
  userInfo,
} from "../redux/features/productApi";

const YourTopPurchase = () => {
  const scrollRef = useRef();
  const [itemValues, setItem] = useState([]);
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [count, setCount] = useState(1);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const { inventoryWatchData, userInfoData, loading } = useSelector(
    (state) => ({
      ...state.products,
    })
  );
  const onPressTouch = () => {
    scrollRef?.current?.scrollTo({
      y: 0,
      animated: true,
    });
  };
  const data = inventoryWatchData?.products;

  useEffect(() => {
    dispatch(inventoryWatch({ value: "", currentPage }));
    dispatch(userInfo());
  }, []);
  const result = inventoryWatchData;
  const userData = userInfoData;

  const apiCall = async (currentPage) => {
    setCurrentPage(currentPage);
    dispatch(inventoryWatch({ value: "", currentPage }));
    onPressTouch();
  };

  useEffect(() => {
    apiCall(currentPage);
  }, []);

  const checkBoxHandler = (item) => {
    setItem(item);
  };

  return (
    <SafeAreaView style={{ backgroundColor: "#005185", flex: 1 }}>
      <Filter
        checkBoxHandler={checkBoxHandler}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
      <View
        style={{
          backgroundColor: "#fff",
        }}
      >
        <Navbar />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            padding: 10,
          }}
        >
          <View style={{ justifyContent: "center" }}>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              Your Top Purchase
            </Text>
          </View>
          {loading && <Spinner />}
          <Pressable
            style={{
              borderWidth: 1,
              padding: 10,
              paddingHorizontal: 30,
              borderColor: "#c77500",
              borderRadius: 3,
            }}
            onPress={() => setModalVisible(true)}
          >
            <Text style={{ fontWeight: "bold", color: "#c77500" }}>Filter</Text>
          </Pressable>
        </View>
        <View
          style={{
            borderTopWidth: 4,
            borderColor: "#ececec",
            marginVertical: 10,
          }}
        />
        <View style={loading ? styles.mainBoxLoading : styles.mainBox}>
          {result?.totalResults > 0 ? (
            <ScrollView ref={scrollRef} showsVerticalScrollIndicator={false}>
              <View>
                {data?.map((item, i) => {
                  const values =
                    item?.defaultSku?.availabilityDetail?.quantityAvailable;

                  return (
                    <View>
                      <ProductScreen
                        url={item?.mediaMap?.primary?.url}
                        name={item?.defaultSku?.name}
                        externalId={item?.defaultSku?.externalId}
                        nationalDrugCode={item?.defaultSku?.nationalDrugCode}
                        manufacturer={item?.defaultSku?.manufacturer}
                        itemForm={item?.defaultSku?.itemForm}
                        description={item?.defaultSku?.description}
                        netPriceItem={item?.defaultSku?.netPriceItem}
                        amount={item?.defaultSku?.salePrice?.amount}
                        id={item?.defaultSku?.id}
                        values={values}
                        generic={item?.defaultSku?.generic}
                        petFriendly={item?.defaultSku?.petFriendly}
                        schedule={item?.defaultSku?.schedule}
                        rxItem={item?.defaultSku?.rxItem}
                        refrigerated={item?.defaultSku?.refrigerated}
                        hazardousMaterial={item?.defaultSku?.hazardousMaterial}
                        groundShip={item?.defaultSku?.groundShip}
                        dropShipOnly={item?.defaultSku?.dropShipOnly}
                        itemRating={item?.defaultSku?.itemRating}
                        rewardItem={item?.defaultSku?.rewardItem}
                        priceType={item?.defaultSku?.priceType}
                      />
                    </View>
                  );
                })}
              </View>
              {result?.totalResults > 25 && (
                <View style={styles.pagination}>
                  <Pagination
                    currentPage={currentPage}
                    totalCount={result?.totalResults}
                    pageSize={result?.pageSize}
                    onPageChange={(page) => apiCall(page)}
                  />
                </View>
              )}
            </ScrollView>
          ) : (
            <View style={{ flex: 1 }}>
              <Spinner />
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default YourTopPurchase;

const styles = StyleSheet.create({
  pagination: {
    marginBottom: 100,
  },
  mainBoxLoading: { opacity: 0.2 },
  mainBox: { backgroundColor: "#fff", marginBottom: 200 },
});
