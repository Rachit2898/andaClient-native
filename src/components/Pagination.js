import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import { usePagination, DOTS } from "../../utils";
const Pagination = (props) => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
    className,
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });
  // let { currentPage, totalCount, pageSize } = this.props;

  // If there are less than 2 times in pagination range we shall not render the component

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };
  const [leftDisable, setLeftDisable] = useState(false);
  let lastPage = totalCount;

  return (
    <View style={styles.paginationComponent}>
      <Pressable
        onPress={() => onPrevious()}
        disabled={currentPage === 1}
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={require("../../assets/back.png")}
          style={{ width: 15, height: 15 }}
        />
      </Pressable>
      {paginationRange?.map((pageNumber, i) => {
        const myValue = pageNumber === currentPage;

        if (pageNumber === DOTS) {
          return (
            <View key={i}>
              <View>
                <Text>&#8230;</Text>
              </View>
            </View>
          );
        }

        return (
          <Pressable
            key={i + "A"}
            style={
              myValue
                ? {
                    backgroundColor: "rgba(0, 0, 0, 0.08)",
                    borderRadius: 50,
                    alignItems: "center",
                    marginHorizontal: 5,
                  }
                : {
                    borderRadius: 50,
                    alignItems: "center",
                    marginHorizontal: 5,
                  }
            }
            onPress={() => onPageChange(pageNumber)}
            selected={pageNumber === currentPage}
          >
            <Text key={i + 5} style={styles.paginationNumber}>
              {pageNumber}
            </Text>
          </Pressable>
        );
      })}
      <Pressable
        android_ripple={{ color: "#ccc" }}
        onPress={() => onNext()}
        disabled={currentPage === paginationRange.slice(-1)[0]}
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={require("../../assets/forward.png")}
          style={{
            width: 15,
            height: 15,
          }}
        />
      </Pressable>
    </View>
  );
};

export default Pagination;
const styles = StyleSheet.create({
  paginationComponent: {
    flexDirection: "row",
    alignSelf: "center",
    marginBottom: 20,
    justifyContent: "center",
  },
  paginationNumber: {
    fontWeight: "800",
    color: "#494c4c",
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
});
