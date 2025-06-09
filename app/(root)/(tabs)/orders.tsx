import { ChevronLeft } from "lucide-react-native";
import { useState } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

const orderItems: OrderItem[] = [
  {
    id: "1",
    name: "Grilled Salmon",
    price: 96.0,
    quantity: 2,
    image:
      "https://images.pexels.com/photos/842571/pexels-photo-842571.jpeg?auto=compress&cs=tinysrgb&w=300",
  },
  {
    id: "2",
    name: "Mexican Pizza",
    price: 120.0,
    quantity: 1,
    image:
      "https://images.pexels.com/photos/2147491/pexels-photo-2147491.jpeg?auto=compress&cs=tinysrgb&w=300",
  },
  {
    id: "3",
    name: "Chicken Pasta",
    price: 50.0,
    quantity: 2,
    image:
      "https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=300",
  },
];

export default function CartTab() {
  const [activeTab, setActiveTab] = useState("Order");
  const tabs = ["Order", "Custom Order", "Delivery Pending", "Order Stat"];

  const handleAccept = (itemId: string) => {
    console.log("Accepted item:", itemId);
  };

  const handleReject = (itemId: string) => {
    console.log("Rejected item:", itemId);
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-light">
      {/* Header */}
      <View className="bg-primary px-4 py-3 flex-row items-center justify-between">
        <TouchableOpacity className="p-1">
          <ChevronLeft color="#fff" size={24} />
        </TouchableOpacity>
        <Text className="text-lg font-semibold text-white">Order Cart</Text>
        <View className="w-8" />
      </View>

      {/* Tab Navigation */}
      <View className="bg-white border-b border-gray-border">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16 }}
        >
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab}
              className={`py-4 px-2 mr-6 border-b-2 ${
                activeTab === tab ? "border-primary" : "border-transparent"
              }`}
              onPress={() => setActiveTab(tab)}
            >
              <Text
                className={`text-sm font-medium ${
                  activeTab === tab
                    ? "text-primary font-semibold"
                    : "text-gray-medium"
                }`}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Order Items */}
      <ScrollView
        className="flex-1 px-4 pt-4"
        showsVerticalScrollIndicator={false}
      >
        {orderItems.map((item) => (
          <View
            key={item.id}
            className="bg-white rounded-xl p-4 mb-3 flex-row shadow-sm"
          >
            <Image
              source={{ uri: item.image }}
              className="w-20 h-20 rounded-lg mr-4"
            />
            <View className="flex-1">
              <Text className="text-base font-semibold text-gray-800 mb-1">
                {item.name}
              </Text>
              <Text className="text-base font-bold text-primary mb-3">
                ${item.price.toFixed(2)}
              </Text>
              <View className="flex-row items-center justify-between">
                <View className="bg-gray-light rounded-md w-8 h-8 items-center justify-center">
                  <Text className="text-base font-semibold text-primary">
                    {item.quantity}
                  </Text>
                </View>
                <View className="flex-row gap-2">
                  <TouchableOpacity
                    className="bg-green-500 px-4 py-2 rounded-md"
                    onPress={() => handleAccept(item.id)}
                  >
                    <Text className="text-white text-sm font-semibold">
                      Accept
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    className="bg-red-500 px-4 py-2 rounded-md"
                    onPress={() => handleReject(item.id)}
                  >
                    <Text className="text-white text-sm font-semibold">
                      Reject
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
