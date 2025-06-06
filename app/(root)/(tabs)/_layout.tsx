import { icons } from "@/constants/idex";
import { Tabs } from "expo-router";
import type { ImageSourcePropType } from "react-native";
import { Image, View } from "react-native";

const TabIcon = ({
  focused,
  source,
}: {
  focused: boolean;
  source: ImageSourcePropType;
}) => (
  <View
    className={`flex flex-row items-center justify-center ${
      focused ? "bg-general-300" : ""
    }`}
  >
    <View
      className={`w-12 h-12  items-center justify-center ${
        focused ? "bg-white" : ""
      }`}
    >
      <Image
        source={source}
        tintColor={focused ? "red" : "black"}
        resizeMode="contain"
        className="w-7 h-7"
      />
    </View>
  </View>
);

const Layout = () => (
  <Tabs
    initialRouteName="home"
    screenOptions={{
      tabBarActiveTintColor: "red",
      tabBarInactiveTintColor: "black",
      headerShown: false,
      tabBarStyle: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        elevation: 0,
        backgroundColor: "white",
        borderTopColor: "transparent",
        paddingTop: 5,
        overflow: "hidden",
      },
    }}
  >
    <Tabs.Screen
      name="home"
      options={{
        title: "Home",
        headerShown: false,
        tabBarIcon: ({ focused }) => (
          <TabIcon focused={focused} source={icons.home} />
        ),
      }}
    />
    <Tabs.Screen
      name="foods"
      options={{
        title: "Menu",
        headerShown: false,
        tabBarIcon: ({ focused }) => (
          <TabIcon focused={focused} source={icons.dish} />
        ),
      }}
    />
    <Tabs.Screen
      name="orders"
      options={{
        title: "Orders",
        headerShown: false,
        tabBarIcon: ({ focused }) => (
          <TabIcon focused={focused} source={icons.list} />
        ),
      }}
    />
    <Tabs.Screen
      name="profile"
      options={{
        title: "Profile",
        headerShown: false,
        tabBarIcon: ({ focused }) => (
          <TabIcon focused={focused} source={icons.profile} />
        ),
      }}
    />
  </Tabs>
);
export default Layout;
