import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import OAuth from "@/components/OAuth";
import { icons, images } from "@/constants/idex";
import { useSignIn } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";

const SignIn = () => {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const onSignInPress = useCallback(async () => {
    if (!isLoaded) return;

    // Start the sign-in process using the email and password provided
    try {
      const signInAttempt = await signIn.create({
        identifier: form.email,
        password: form.password,
      });

      // If sign-in process is complete, set the created session as active
      // and redirect the user
      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/");
      } else {
        // If the status isn't complete, check why. User might need to
        // complete further steps.
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  }, [isLoaded, signIn, form.email, form.password, setActive, router]);

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="flex-1 bg-white">
        <View className="relative w-full h-[300px]">
          <Image source={images.signupFood} className="w-full z-0 h-[280px]" />
          <Text className="absolute bottom-5 left-5 text-2xl font-JakartaExtraBold  text-[#132541]">
            {" "}
            Wel-come
          </Text>
        </View>
        <View className="p-5">
          <InputField
            label="Email"
            icon={icons.email}
            labelStyle="text-[#132541]"
            value={form.email}
            placeholder="Enter your email"
            onChangeText={(value) => setForm({ ...form, email: value })}
          />
          <InputField
            label="Password"
            icon={icons.lock}
            labelStyle="text-[#132541]"
            value={form.password}
            placeholder="Enter your password"
            secureTextEntry={true}
            onChangeText={(value) => setForm({ ...form, password: value })}
          />

          <CustomButton
            title="Sign In"
            onPress={onSignInPress}
            className="mt-6"
          />

          {/* oauth here goes */}
          <OAuth />
          <Link href="/(auth)/signUp" className="text-lg text-center mt-10">
            <Text className="text-[#132541]">Don&apos;t have an account?</Text>
            <Text className="text-[#E87A64]"> Sign Up</Text>
          </Link>
        </View>
        {/* verification modal */}
      </View>
    </ScrollView>
  );
};

export default SignIn;
