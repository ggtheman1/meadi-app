import { icons } from "@/constants/idex";
import { Image, Text, View } from "react-native";
import CustomButton from "./CustomButton";

const OAuth = () => {
  const handleGoogleSignIn = async () => {};
  return (
    <View>
      <View className="flex flex-row justify-between items-center mt-4 gap-x-3">
        <View className="flex-1 h-[1px] bg-[#123541]" />
        <Text className="text-lg font-JakartaSemiBold text-[#E87A64]">Or</Text>
        <View className="flex-1 h-[1px] bg-[#123541]" />
      </View>
      <CustomButton
        title="Continue with Google"
        className="mt-3 w-full shadow-none"
        IconLeft={() => (
          <Image source={icons.google} className="w-5 h-5 mx-2" />
        )}
        bgVariant="outline"
        textVariant="primary"
        onPress={handleGoogleSignIn}
      />
    </View>
  );
};
export default OAuth;
