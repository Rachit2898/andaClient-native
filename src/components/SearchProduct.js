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
import Filter from "../filter/SearchProductFilter";
import PreNegotiatedScreen from "../screens/SearchProductScreen";
import { userInfo, searchProducts } from "../../redux/features/productApi";

const SearchProduct = () => {
  const scrollRef = useRef();
  const [itemValues, setItem] = useState([]);
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const { searchProducstsData, userInfoData, loading, addLoading } =
    useSelector((state) => ({
      ...state.products,
    }));
  const onPressTouch = () => {
    scrollRef?.current?.scrollTo({
      y: 0,
      animated: true,
    });
  };
  const data = searchProducstsData?.products;

  useEffect(() => {
    dispatch(userInfo());
  }, []);
  const result = searchProducstsData;
  const userData = userInfoData;

  const apiCall = async (currentPage) => {
    setCurrentPage(currentPage);

    onPressTouch();
  };

  useEffect(() => {
    apiCall(currentPage);
  }, []);

  const checkBoxHandler = (item) => {
    setItem(item);
  };

  return (
    <SafeAreaView style={{ backgroundColor: "#fff", flex: 1 }}>
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
              Search Products
            </Text>
          </View>
        </View>

        <View
          style={{
            borderTopWidth: 4,
            borderColor: "#fafafa",
            marginVertical: 10,
          }}
        />
        {result.totalResults === 0 && (
          <View style={styles.emptyCart}>
            <Text style={styles.emptyCartText}>
              Oops!! Details are not available
            </Text>
          </View>
        )}
        {loading && <Spinner />}
        <View style={loading ? styles.mainBoxLoading : styles.mainBox}>
          {console.log("Loading", result.totalResults >= 0)}
          {result.totalResults >= 0 ? (
            <ScrollView ref={scrollRef} showsVerticalScrollIndicator={false}>
              <View>
                {data?.map((item, i) => {
                  const values =
                    item?.defaultSku?.availabilityDetail?.quantityAvailable;

                  return (
                    <View>
                      <PreNegotiatedScreen
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
                        orderLimit={item?.defaultSku?.dailyOrderLimit}
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

export default SearchProduct;

const styles = StyleSheet.create({
  pagination: {
    marginBottom: 100,
  },
  mainBoxLoading: { opacity: 0.2 },
  mainBox: { backgroundColor: "#fff", marginBottom: 200 },
  emptyCart: {
    textAlign: "center",
    alignItems: "center",
    marginVertical: 60,
  },
  emptyCartText: {
    fontWeight: "bold",
    fontSize: 15,
  },
});
