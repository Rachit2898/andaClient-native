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
      <Pressable onPress={() => onPrevious()} disabled={currentPage === 1}>
        <Image
          source={require("../../assets/back.png")}
          style={{ width: 20, height: 20, marginTop: 10 }}
        />
      </Pressable>
      {paginationRange?.map((pageNumber) => {
        const myValue = pageNumber === currentPage;

        if (pageNumber === DOTS) {
          return (
            <View>
              <Text>&#8230;</Text>
            </View>
          );
        }

        return (
          <Pressable
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
            <Text style={styles.paginationNumber}>{pageNumber}</Text>
          </Pressable>
        );
      })}
      <Pressable
        android_ripple={{ color: "#ccc" }}
        onPress={() => onNext()}
        disabled={currentPage === paginationRange.slice(-1)[0]}
      >
        <Image
          source={require("../../assets/forward.png")}
          style={{ width: 20, height: 20, marginTop: 10 }}
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
    marginTop: 20,
    marginBottom: 20,
  },
  paginationNumber: {
    fontWeight: "800",
    color: "rgba(0, 0, 0, 0.87)",
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
});
