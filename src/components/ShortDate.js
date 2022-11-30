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
import TabBar from "./TabBar";
import Spinner from "./Spinner";
import Filter from "../filter/ShortDateFilter";
import PriceReductionScreen from "../screens/ShortDateScreen";
import { shortDate, addItem, userInfo } from "../../redux/features/productApi";

const ShortDate = () => {
  const scrollRef = useRef();
  const [itemValues, setItem] = useState([]);
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const { shortDateData, userInfoData, loading, favResponse } = useSelector(
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
  const data = shortDateData?.products;

  useEffect(() => {
    dispatch(shortDate({ value: "", currentPage }));
    dispatch(userInfo());
  }, [favResponse]);
  const result = shortDateData;
  const userData = userInfoData;

  const apiCall = async (currentPage) => {
    setCurrentPage(currentPage);
    dispatch(shortDate({ value: "", currentPage }));
    onPressTouch();
  };

  useEffect(() => {
    apiCall(currentPage);
  }, []);

  const checkBoxHandler = (item) => {
    setItem(item);
  };

  const currentFirst = (currentPage) => {
    return (currentPage - 1) * result?.pageSize + 1;
  };
  const pageFirst = currentFirst(currentPage);
  const currentLast = (currentPage) => {
    if (currentPage == 1 && result?.totalResults >= result?.pageSize) {
      const lastPageValue = pageFirst + result?.pageSize - 1;
      return lastPageValue;
    } else if (result?.totalResults <= result?.pageSize) {
      return result?.totalResults;
    } else if (result?.totalResults <= pageFirst + result?.pageSize) {
      return result?.totalResults;
    } else {
      const lastPageValue = pageFirst + result?.pageSize - 1;
      return lastPageValue;
    }
  };
  const pageLast = currentLast(currentPage);

  return (
    <SafeAreaView
      style={{ backgroundColor: "#063e63", flex: 1 }}
      edges={["right", "left", "top"]}
    >
      <Filter
        checkBoxHandler={checkBoxHandler}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
      <View
        style={{
          backgroundColor: "#fff",
          flex: 1,
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
            <Text
              style={{ fontSize: 20, fontWeight: "bold", color: "#494c4c" }}
            >
              Short Dates
            </Text>
          </View>
          {result.totalResults > 0 && (
            <Pressable
              style={{
                borderWidth: 1,
                width: 60,
                height: 25,
                borderColor: "#ed8b00",
                borderRadius: 3,
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={() => setModalVisible(true)}
            >
              <Text
                style={{ fontWeight: "bold", color: "#ed8b00", fontSize: 12 }}
              >
                Filter
              </Text>
            </Pressable>
          )}
        </View>
        <View
          style={{
            borderTopWidth: 4,
            borderColor: "#fafafa",
            marginVertical: 10,
          }}
        />
        {result.totalResults > 0 && (
          <Text style={styles.pageText}>
            Showing {pageFirst} - {pageLast} of {result.totalResults} results
          </Text>
        )}
        {!!data ? (
          <View style={loading ? styles.mainBoxLoading : styles.mainBox}>
            {result.totalResults > 0 ? (
              <ScrollView ref={scrollRef} showsVerticalScrollIndicator={false}>
                <View>
                  {data?.map((item) => {
                    const values =
                      item?.defaultSku?.availabilityDetail?.quantityAvailable;

                    return (
                      <View key={item?.defaultSku?.id}>
                        <PriceReductionScreen
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
                          hazardousMaterial={
                            item?.defaultSku?.hazardousMaterial
                          }
                          groundShip={item?.defaultSku?.groundShip}
                          dropShipOnly={item?.defaultSku?.dropShipOnly}
                          itemRating={item?.defaultSku?.itemRating}
                          rewardItem={item?.defaultSku?.rewardItem}
                          priceType={item?.defaultSku?.priceType}
                          shortOrCloseOutDate={
                            item?.defaultSku?.shortOrCloseOutDate
                          }
                          inventoryClassKey={
                            item?.defaultSku?.inventoryClassKey
                          }
                          orderLimit={item?.defaultSku?.dailyOrderLimit}
                          accountId={userData?.selectedAccount?.id}
                          type={item?.defaultSku?.productLists[0]?.type}
                          itemReturnable={item?.defaultSku?.returnable}
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
        ) : (
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Text style={{ fontWeight: "bold" }}>Not Found!!</Text>
          </View>
        )}
        <View style={{ position: "absolute", left: 0, right: 0, bottom: 0 }}>
          <TabBar />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ShortDate;

const styles = StyleSheet.create({
  pagination: {
    marginBottom: 100,
  },
  mainBoxLoading: { opacity: 0.2 },
  mainBox: { backgroundColor: "#fff", marginBottom: 200 },
  pageText: {
    color: "#494c4c",
    fontWeight: "600",
    fontSize: 18,
    paddingHorizontal: 10,
  },
});
