import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Animated,
  Dimensions,
} from "react-native";
import { set } from "react-native-reanimated";
const { width, height } = Dimensions.get("window");

import { icons } from "../constants";

const Restaurant = ({ route, navigation }) => {
  const scrollX = new Animated.Value(0);
  const [restaurant, setRestaurant] = useState();
  const [currentLocation, setCurrentLocation] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [orderItems, setOrderItems] = React.useState([]);

  useEffect(() => {
    (async () => {
      let { item, currentLocation } = await route.params;
      setRestaurant(item);
      setCurrentLocation(currentLocation);
      setIsLoading(false);
    })();
  }, [restaurant, currentLocation]);

  function editOrder(action, menuId, price) {
    let orderList = orderItems.slice();
    let item = orderList.filter((a) => a.menuId == menuId);
    if (action == "+") {
      if (item.length > 0) {
        let newQty = item[0].qty + 1;
        item[0].qty = newQty;
        item[0].total = item[0].qty * price;
      } else {
        const newItem = {
          menuId: menuId,
          qty: 1,
          price: price,
          total: price,
        };
        orderList.push(newItem);
      }
      setOrderItems(orderList);
    } else {
      if (item.length > 0) {
        if (item[0]?.qty > 0) {
          let newQty = item[0].qty - 1;
          item[0].qty = newQty;
          item[0].total = item[0].qty * price;
        }
      }
      setOrderItems(orderList);
    }
  }

  function getOrderQty(menuId) {
    let orderItem = orderItems.filter((a) => a.menuId == menuId);
    if (orderItem.length > 0) {
      return orderItem[0].qty;
    }
    return 0;
  }

  function getBasketItemCount(menuId) {
    let itemCount = orderItems.reduce((a, b) => a + (b.qty || 0), 0);
    return itemCount;
  }

  function sumOrder() {
    let total = orderItems.reduce((a, b) => a + (b.total || 0), 0);
    return total.toFixed(2);
  }

  function renderHeader() {
    return (
      <View style={{ flexDirection: "row", paddingTop: 10, paddingBottom: 10 }}>
        <TouchableOpacity
          style={{
            width: 50,
            height: 50,
            paddingLeft: 10,
            justifyContent: "center",
          }}
          onPress={() => navigation.goBack()}
        >
          <Image
            source={icons.back}
            resizeMode="contain"
            style={{
              width: 30,
              height: 30,
            }}
          />
        </TouchableOpacity>
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <View
            style={{
              width: "70%",
              height: "100%",
              backgroundColor: "lightgray",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 5,
            }}
          >
            <Text>{restaurant?.name}</Text>
          </View>
        </View>
        <TouchableOpacity
          style={{
            width: 50,
            height: 50,
            paddingRight: 10,
            justifyContent: "center",
          }}
        >
          <Image
            source={icons.list}
            resizeMode="contain"
            style={{
              width: 30,
              height: 30,
            }}
          />
        </TouchableOpacity>
      </View>
    );
  }

  function renderFoodInfo() {
    return (
      <Animated.ScrollView
        horizontal
        pagingEnabled
        scrollEventThrottle={16}
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
      >
        {restaurant?.menu.map((item, index) => {
          return (
            <View key={`menu-${index}`} style={{ alignItems: "center" }}>
              <View
                style={{
                  height: height * 0.35,
                }}
              >
                <Image
                  source={item.photo}
                  resizeMode="cover"
                  style={{
                    width: width,
                    height: 300,
                  }}
                />
                {/* Quantity button */}
                <View
                  style={{
                    position: "absolute",
                    bottom: 35,
                    width: width,
                    height: 50,
                    justifyContent: "center",
                    flexDirection: "row",
                  }}
                >
                  <TouchableOpacity
                    style={{
                      width: 50,
                      backgroundColor: "white",
                      alignItems: "center",
                      justifyContent: "center",
                      borderTopLeftRadius: 25,
                      borderBottomLeftRadius: 25,
                    }}
                    onPress={() => editOrder("-", item.menuId, item.price)}
                  >
                    <Text style={{ fontWeight: "bold" }}>-</Text>
                  </TouchableOpacity>

                  <View
                    style={{
                      width: 50,
                      backgroundColor: "white",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                      {getOrderQty(item.menuId)}
                    </Text>
                  </View>

                  <TouchableOpacity
                    style={{
                      width: 50,
                      backgroundColor: "white",
                      alignItems: "center",
                      justifyContent: "center",
                      borderTopRightRadius: 25,
                      borderBottomRightRadius: 25,
                    }}
                    onPress={() => editOrder("+", item.menuId, item.price)}
                  >
                    <Text style={{ fontWeight: "bold" }}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
              {/* Name and Description */}
              <View
                style={{
                  width: width,
                  alignItems: "center",
                  marginTop: 15,
                  paddingHorizontal: 10,
                }}
              >
                <Text
                  style={{ fontWeight: "bold", fontSize: 16, marginBottom: 5 }}
                >
                  {item.name} - {item.price.toFixed(2)}
                </Text>
                <Text style={{ fontSize: 14 }}>{item.description}</Text>
              </View>
              {/* Calories */}
              <View
                style={{
                  flexDirection: "row",
                  marginTop: 10,
                }}
              >
                <Image
                  source={icons.fire}
                  style={{
                    width: 20,
                    height: 20,
                    marginRight: 10,
                  }}
                />
                <Text style={{ fontSize: 14, color: "darkgray" }}>
                  {item.calories.toFixed(2)} cal
                </Text>
              </View>
            </View>
          );
        })}
      </Animated.ScrollView>
    );
  }

  function renderDots() {
    const dotPosition = Animated.divide(scrollX, width);
    return (
      <View style={{ height: 30 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            height: 20,
          }}
        >
          {restaurant?.menu.map((item, index) => {
            const opacity = dotPosition.interpolate({
              inputRange: [index - 1, index, index + 1],
              outputRange: [0.3, 1, 0.3],
              extrapolate: "clamp",
            });
            const dotSize = dotPosition.interpolate({
              inputRange: [index - 1, index, index + 1],
              outputRange: [6, 10, 6],
              extrapolate: "clamp",
            });
            const dotColor = dotPosition.interpolate({
              inputRange: [index - 1, index, index + 1],
              outputRange: ["darkgray", "tomato", "darkgray"],
              extrapolate: "clamp",
            });
            return (
              <Animated.View
                key={`dot-${index}`}
                opacity={opacity}
                style={{
                  borderRadius: 50,
                  marginHorizontal: 6,
                  width: dotSize,
                  height: dotSize,
                  backgroundColor: dotColor,
                }}
              />
            );
          })}
        </View>
      </View>
    );
  }

  function renderOrder() {
    return (
      <View>
        {renderDots()}
        <View
          style={{
            backgroundColor: "white",
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingVertical: 10,
              paddingHorizontal: 15,
              borderBottomColor: "gray",
              borderBottomWidth: 1,
            }}
          >
            <Text style={{ fontSize: 14, fontWeight: "bold" }}>
              {getBasketItemCount()} items in Cart
            </Text>
            <Text style={{ fontSize: 14, fontWeight: "bold" }}>
              RM{sumOrder()}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingVertical: 10,
              paddingHorizontal: 15,
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <Image
                source={icons.pin}
                resizeMode="contain"
                style={{
                  width: 20,
                  height: 20,
                  tintColor: "darkgray",
                }}
              />
              <Text
                style={{ fontSize: 13, marginLeft: 10, fontWeight: "bold" }}
              >
                Location
              </Text>
            </View>

            <View style={{ flexDirection: "row" }}>
              <Image
                source={icons.master_card}
                resizeMode="contain"
                style={{
                  width: 20,
                  height: 20,
                  tintColor: "darkgray",
                }}
              />
              <Text
                style={{ fontSize: 13, marginLeft: 10, fontWeight: "bold" }}
              >
                ... 1234
              </Text>
            </View>
          </View>
          {/* Order Button */}
          <View
            style={{
              paddingHorizontal: 20,
              paddingVertical: 10,
              alighItems: "center",
              justifyContent: "center",
            }}
          >
            <TouchableOpacity
              style={{
                width: width * 0.9,
                padding: 10,
                backgroundColor: "tomato",
                alignItems: "center",
                borderRadius: 20,
              }}
              onPress={() =>
                navigation.navigate("OrderDelivery", {
                  restaurant: restaurant,
                  currentLocation: currentLocation,
                })
              }
            >
              <Text
                style={{ fontSize: 16, color: "white", fontWeight: "bold" }}
              >
                Order
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  if (!isLoading)
    return (
      <SafeAreaView style={styles.container}>
        {renderHeader()}
        {renderFoodInfo()}
        {renderOrder()}
      </SafeAreaView>
    );
  return null;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "ghostwhite",
  },
});

export default Restaurant;
