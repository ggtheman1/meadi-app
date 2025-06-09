import { useUser } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomePage() {
  const { user } = useUser();

  // Mock data for cards
  const cardData = [
    { id: "add", type: "add" },
    {
      id: "1",
      title: "Mountain View",
      image: "https://picsum.photos/id/106/300/200",
    },
    {
      id: "2",
      title: "Beach Paradise",
      image: "https://picsum.photos/id/28/300/200",
    },
    {
      id: "3",
      title: "City Lights",
      image: "https://picsum.photos/id/1018/300/200",
    },
    {
      id: "4",
      title: "Forest Trail",
      image: "https://picsum.photos/id/167/300/200",
    },
  ];

  // Mock data for Orders
  const orders = [
    {
      id: "1",
      orderTitle: "Order #101",
      orderCount: 3,
      foodName: "Margherita Pizza",
      price: 12.99,
      quantity: 2,
      image: "https://images.unsplash.com/photo-1513104890138-7c749659a591",
    },
    {
      id: "2",
      orderTitle: "Order #102",
      orderCount: 5,
      foodName: "Beef Burger",
      price: 9.99,
      quantity: 3,
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd",
    },
    {
      id: "3",
      orderTitle: "Order #103",
      orderCount: 2,
      foodName: "Caesar Salad",
      price: 8.49,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2",
    },
    {
      id: "4",
      orderTitle: "Order #104",
      orderCount: 4,
      foodName: "Sushi Platter",
      price: 24.99,
      quantity: 2,
      image: "https://images.unsplash.com/photo-1611143669185-af224c5e3252",
    },
  ];

  const handleAccept = (orderId: string | number) => {
    console.log("Accepted order:", orderId);
  };

  const handleReject = (orderId: string | number) => {
    console.log("Rejected order:", orderId);
  };

  const renderItem = ({ item }: { item: any }) => {
    if (item.type === "add") {
      return (
        <TouchableOpacity
          className="w-48 h-48 mr-4 bg-orange-100 rounded-xl flex items-center justify-center border-2 border-dashed border-orange-300"
          onPress={() => console.log("Add new Dish pressed")}
        >
          <Text className="text-5xl text-orange-500">+</Text>
          <Text className="text-lg font-bold text-orange-700 mt-2">
            Add new Dish
          </Text>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          className="w-48 h-48 mr-4 bg-white rounded-xl overflow-hidden shadow-md"
          onPress={() => console.log("Card pressed", item.id)}
        >
          <Image
            source={{ uri: item.image }}
            className="w-full h-32"
            resizeMode="cover"
          />
          <View className="p-3">
            <Text className="text-base font-bold text-gray-800">
              {item.title}
            </Text>
          </View>
        </TouchableOpacity>
      );
    }
  };

  const renderOrderItem = ({ item }: { item: any }) => (
    <View className="bg-white rounded-xl shadow-sm mx-4 my-2 overflow-hidden border border-gray-100">
      <View className="flex-row justify-between items-center bg-orange-50 px-4 py-3 border-b border-orange-100">
        <Text className="text-lg font-bold text-orange-900">
          {item.orderTitle}
        </Text>
        <View className="bg-orange-500 rounded-full px-3 py-1">
          <Text className="text-white font-semibold">
            {item.orderCount} orders
          </Text>
        </View>
      </View>

      <View className="flex-row p-4">
        <Image
          source={{ uri: item.image }}
          className="w-24 h-24 rounded-lg"
          resizeMode="cover"
        />

        <View className="ml-4 flex-1">
          <Text className="text-xl font-bold text-gray-800 mb-1">
            {item.foodName}
          </Text>

          <View className="flex-row justify-between items-center mt-2">
            <Text className="text-lg font-bold text-green-600">
              ${item.price.toFixed(2)}
            </Text>
            <Text className="text-gray-600 font-medium">
              Qty: {item.quantity}
            </Text>
          </View>
        </View>
      </View>

      <View className="flex-row border-t border-gray-100">
        <TouchableOpacity
          className="flex-1 bg-red-100 py-3 items-center justify-center border-r border-gray-100"
          onPress={() => handleReject(item.id)}
        >
          <Text className="text-red-600 font-bold text-lg">Reject</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="flex-1 bg-green-100 py-3 items-center justify-center"
          onPress={() => handleAccept(item.id)}
        >
          <Text className="text-green-600 font-bold text-lg">Accept</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Header with title and notification bell */}
      <View className="flex-row justify-between items-center px-4 py-3 bg-white border-b border-gray-200">
        <Text className="text-xl font-bold text-gray-900">
          What food do you want to add?
        </Text>

        <TouchableOpacity className="relative">
          <Ionicons name="notifications" size={28} color="#4B5563" />
          <View className="absolute -top-2 -right-2 bg-red-500 rounded-full w-6 h-6 items-center justify-center">
            <Text className="text-white text-xs font-bold">15</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Horizontal Cards FlatList */}
      <View className="py-3 bg-white shadow-sm">
        <FlatList
          data={cardData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerClassName="pl-4"
          snapToAlignment="start"
          decelerationRate="fast"
        />
      </View>

      {/* Vertical Orders FlatList with bottom padding */}
      <FlatList
        data={orders}
        renderItem={renderOrderItem}
        keyExtractor={(item) => item.id}
        contentContainerClassName="py-3 pb-32"
        showsVerticalScrollIndicator={false}
        className="mt-1"
      />
    </SafeAreaView>
  );
}
