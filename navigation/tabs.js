import React from "react";
import { View, Image } from "react-native";
import {
  createMaterialBottomTabNavigator,
  BottomTabBar,
} from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { Home } from "../screens";

const Tab = createMaterialBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      labeled={false}
      activeColor="yellow"
      inactiveColor="lightgray"
      barStyle={{ backgroundColor: "tomato" }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" size={25} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="text-search"
              size={25}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Like"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="star" size={25} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="User"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" size={25} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
