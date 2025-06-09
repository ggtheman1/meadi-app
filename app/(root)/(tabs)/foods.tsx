import {
  ArrowLeft,
  ChevronDown,
  Clock,
  CreditCard as Edit3,
  Heart,
  Star,
} from "lucide-react-native";
import { useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface FoodItem {
  id: number;
  name: string;
  rating: number;
  reviews: number;
  deliveryTime: string;
  image: string;
  available: boolean;
  isFavorite: boolean;
}

export default function MenuScreen() {
  const [foodItems, setFoodItems] = useState<FoodItem[]>([
    {
      id: 1,
      name: "Mexican Pizza",
      rating: 4.3,
      reviews: 200,
      deliveryTime: "15-20 min",
      image:
        "https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=400",
      available: true,
      isFavorite: false,
    },
    {
      id: 2,
      name: "Chicken Pasta",
      rating: 4.5,
      reviews: 200,
      deliveryTime: "25-30 min",
      image:
        "https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=400",
      available: true,
      isFavorite: false,
    },
    {
      id: 3,
      name: "Grilled Salmon",
      rating: 4.9,
      reviews: 200,
      deliveryTime: "15-20 min",
      image:
        "https://images.pexels.com/photos/1516415/pexels-photo-1516415.jpeg?auto=compress&cs=tinysrgb&w=400",
      available: true,
      isFavorite: false,
    },
    {
      id: 4,
      name: "Chicken Biryani",
      rating: 5.0,
      reviews: 200,
      deliveryTime: "15-20 min",
      image:
        "https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      available: true,
      isFavorite: false,
    },
    {
      id: 5,
      name: "Ice Coffee",
      rating: 4.8,
      reviews: 200,
      deliveryTime: "10-15 min",
      image:
        "https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=400",
      available: true,
      isFavorite: false,
    },
    {
      id: 6,
      name: "Beef Burger",
      rating: 4.3,
      reviews: 200,
      deliveryTime: "15-20 min",
      image:
        "https://images.pexels.com/photos/1556698/pexels-photo-1556698.jpeg?auto=compress&cs=tinysrgb&w=400",
      available: true,
      isFavorite: false,
    },
    {
      id: 7,
      name: "Dero wet",
      rating: 4.3,
      reviews: 120,
      deliveryTime: "30-40 min",
      image:
        "https://images.pexels.com/photos/17486827/pexels-photo-17486827/free-photo-of-breakfast-meals-on-plates.jpeg?auto=compress&cs=tinysrgb&w=600",
      available: true,
      isFavorite: false,
    },
    {
      id: 8,
      name: "Shiro",
      rating: 4.3,
      reviews: 120,
      deliveryTime: "20-25 min",
      image:
        "https://images.pexels.com/photos/17486827/pexels-photo-17486827/free-photo-of-breakfast-meals-on-plates.jpeg?auto=compress&cs=tinysrgb&w=600",
      available: true,
      isFavorite: false,
    },
  ]);

  const toggleFavorite = (id: number) => {
    setFoodItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, isFavorite: !item.isFavorite } : item
      )
    );
  };

  const renderFoodItem = (item: FoodItem) => (
    <View
      key={item.id}
      className="w-[47%] h-[200px] bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
    >
      <View className="relative h-[75%]">
        <Image source={{ uri: item.image }} className="w-full h-full" />

        {/* Availability Badge */}
        <View className="absolute top-0 right-0 flex-row items-center bg-green-100 px-2 py-1 rounded-xl">
          <Text className="text-xs font-medium text-green-700 mr-1">
            Available
          </Text>
          <ChevronDown size={16} color="#059669" />
        </View>

        {/* Action Buttons */}
        <View className="absolute bottom-2 left-2 right-2 flex-row justify-between items-center">
          <TouchableOpacity className="flex-row items-center bg-white/90 px-2 py-1 rounded-xl">
            <Edit3 size={14} color="#6B7280" />
            <Text className="text-xs text-gray-600 ml-1 font-medium">
              Edit Post
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-white/90 p-1.5 rounded-full"
            onPress={() => toggleFavorite(item.id)}
          >
            <Heart
              size={18}
              color={item.isFavorite ? "#E53E3E" : "#6B7280"}
              fill={item.isFavorite ? "#E53E3E" : "transparent"}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View className="h-[25%] p-3 justify-center">
        <Text className="text-base font-semibold text-gray-900 mb-2">
          {item.name}
        </Text>

        <View className="flex-row justify-between items-center">
          <View className="flex-row items-center">
            <Star size={14} color="#FCD34D" fill="#FCD34D" />
            <Text className="text-sm font-medium text-gray-900 ml-1">
              {item.rating}
            </Text>
            <Text className="text-xs text-gray-600 ml-0.5">
              ({item.reviews})
            </Text>
          </View>

          <View className="flex-row items-center ">
            <Clock size={14} color="#6B7280" />
            <Text className="text-xs text-gray-600 ml-1 mr-2">
              {item.deliveryTime}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-brand flex-row items-center justify-between px-4 py-3 shadow-sm">
        <TouchableOpacity className="p-1">
          <ArrowLeft size={24} color="#132541" />
        </TouchableOpacity>
        <Text className="text-lg font-semibold text-[#132541]">Food Menu</Text>
        <View className="w-8" />
      </View>

      {/* Menu Grid */}
      <ScrollView
        className="bg-general-500 "
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-row items-center justify-center flex-wrap p-4 gap-4">
          {foodItems.map(renderFoodItem)}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
