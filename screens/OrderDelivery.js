import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
// import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";

// import { icons, GOOGLE_API_KEY } from "../constants";

const OrderDelivery = () => {
  function renderMap() {
    return (
      <View style={{ flex: 1 }}>
        <Text>This is a map</Text>
      </View>
    );
  }

  return <View style={{ flex: 1 }}>{renderMap()}</View>;
};

export default OrderDelivery;
