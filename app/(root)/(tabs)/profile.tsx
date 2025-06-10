import {
  ArrowLeft,
  ChefHat,
  CreditCard,
  Chrome as Home,
  MapPin,
  RefreshCw,
  ShoppingCart,
  TrendingUp,
  User,
} from "lucide-react-native";
import React, { useState } from "react";
import {
  Image,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileScreen() {
  const [userRole, setUserRole] = useState("customer");
  const [activeTab, setActiveTab] = useState("My Profile");

  const isChef = userRole === "chef";

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <StatusBar backgroundColor="#E30022" barStyle="light-content" />

      {/* Header */}
      <View className="bg-primary px-4 py-3">
        <View className="flex-row items-center justify-between">
          <TouchableOpacity className="p-2">
            <ArrowLeft size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-lg font-inter-semibold">
            Profile
          </Text>
          <View className="w-8" />
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Profile Section */}
        <View className="items-center py-8 bg-white">
          <View className="relative">
            <Image
              source={{
                uri: "https://images.pexels.com/photos/8629092/pexels-photo-8629092.jpeg",
              }}
              className="w-32 h-32 rounded-full"
            />
            <View className="absolute bottom-2 right-2 bg-primary w-8 h-8 rounded-full items-center justify-center">
              <Text className="text-white text-lg font-bold">✓</Text>
            </View>
          </View>

          <Text className="text-2xl font-playfair-bold text-gray-900 mt-4">
            Rio Cheffy
          </Text>

          <View className="flex-row items-center mt-2">
            <MapPin size={16} color="#808080" />
            <Text className="text-gray-500 ml-1 font-inter-regular">
              2179 Brooklyn Street
            </Text>
          </View>
        </View>

        {/* Tab Navigation */}
        <View className="bg-white border-b border-gray-200">
          <View className="flex-row">
            <TouchableOpacity
              className={`flex-1 py-4 items-center border-b-2 ${
                activeTab === "My Profile"
                  ? "border-primary"
                  : "border-transparent"
              }`}
              onPress={() => setActiveTab("My Profile")}
            >
              <Text
                className={`font-inter-medium ${
                  activeTab === "My Profile" ? "text-primary" : "text-gray-500"
                }`}
              >
                My Profile
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className={`flex-1 py-4 items-center border-b-2 ${
                activeTab === "Account Setting"
                  ? "border-primary"
                  : "border-transparent"
              }`}
              onPress={() => setActiveTab("Account Setting")}
            >
              <Text
                className={`font-inter-medium ${
                  activeTab === "Account Setting"
                    ? "text-primary"
                    : "text-gray-500"
                }`}
              >
                Account Setting
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Menu Items */}
        <View className="bg-white mt-2">
          {/* Status */}
          <TouchableOpacity className="flex-row items-center px-6 py-4 border-b border-gray-100">
            <TrendingUp size={24} color="#404040" />
            <Text className="flex-1 ml-4 text-gray-900 font-inter-regular text-base">
              Status
            </Text>
          </TouchableOpacity>

          {/* Payment */}
          <TouchableOpacity className="flex-row items-center px-6 py-4 border-b border-gray-100">
            <CreditCard size={24} color="#404040" />
            <Text className="flex-1 ml-4 text-gray-900 font-inter-regular text-base">
              Payment
            </Text>
          </TouchableOpacity>

          {/* Cheffy Profile Edit */}
          <TouchableOpacity className="flex-row items-center px-6 py-4 border-b border-gray-100">
            <User size={24} color="#404040" />
            <Text className="flex-1 ml-4 text-gray-900 font-inter-regular text-base">
              {isChef ? "Cheffy Profile Edit" : "Profile Edit"}
            </Text>
          </TouchableOpacity>

          {/* Switch to Driver */}
          <TouchableOpacity className="flex-row items-center px-6 py-4">
            <RefreshCw size={24} color="#E30022" />
            <Text className="flex-1 ml-4 text-primary font-inter-regular text-base">
              {isChef ? "Switch to Driver" : "Switch to Chef"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View className="bg-white border-t border-gray-200 px-6 py-4">
        <View className="flex-row justify-around items-center">
          <TouchableOpacity className="items-center">
            <Home size={24} color="#C0C0C0" />
          </TouchableOpacity>

          <TouchableOpacity className="items-center">
            <ChefHat size={24} color="#C0C0C0" />
          </TouchableOpacity>

          <TouchableOpacity className="items-center">
            <ShoppingCart size={24} color="#C0C0C0" />
          </TouchableOpacity>

          <TouchableOpacity className="items-center">
            <User size={24} color="#E30022" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Bottom Navigation Indicator */}
      <View className="bg-black h-1 mx-auto w-32 rounded-full mb-2" />
    </SafeAreaView>
  );
}
