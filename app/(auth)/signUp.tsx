import CustomButton from "@/components/CustomButton";
import Dropdown from "@/components/Dropdown";
import InputField from "@/components/InputField";
import OAuth from "@/components/OAuth";
import { icons, images } from "@/constants/idex";
import { useSignUp } from "@clerk/clerk-expo";
import { Link, router } from "expo-router";
import React, { useState } from "react";
import { Alert, Image, ScrollView, Text, View } from "react-native";
import { ReactNativeModal } from "react-native-modal";

const SignUp = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [role, setRole] = useState({
    customer: "",
    chef: "",
  });
  const [verification, setVerification] = useState({
    state: "",
    error: "",
    code: "",
  });
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const onSignUpPress = async () => {
    if (!isLoaded) return;

    console.log("Email: ", form.email, "Password: ", form.password);

    // Start sign-up process using email and password provided
    try {
      await signUp.create({
        emailAddress: form.email,
        password: form.password,
      });

      // Send user an email with verification code
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      // Set 'pendingVerification' to true to display second form
      // and capture OTP code
      setVerification({ ...verification, state: "pending" });
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      // Add alert here
      Alert.alert("Error", err.errors[0].longMessage);
      console.error(JSON.stringify(err, null, 2));
    }
  };

  // Handle submission of verification form
  const onPressVerify = async () => {
    if (!isLoaded) return;

    try {
      // Use the code the user provided to attempt verification
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: verification.code,
      });

      // If verification was completed, set the session to active
      // and redirect the user
      if (completeSignUp.status === "complete") {
        //TODO cerate a user onto database
        await fetch("/(api)/user", {
          method: "POST",
          body: JSON.stringify({
            name: form.name,
            email: form.email,
            clerkId: completeSignUp.createdUserId,
          }),
        });
        await setActive({ session: completeSignUp.createdSessionId });
        setVerification({ ...verification, state: "success" });
        setShowSuccessModal(true);
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        setVerification({
          ...verification,
          error: "Verification Failed",
          state: "failed",
        });
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      setVerification({
        ...verification,
        error: "err.errors[0].longMessage",
        state: "failed",
      });
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="flex-1 bg-white">
        <View className="relative w-full h-[300px]">
          <Image source={images.signupFood} className="w-full z-0 h-[280px]" />
          <Text className="absolute bottom-5 left-5 text-2xl font-JakartaExtraBold  text-[#132541]">
            {" "}
            Create Your Account
          </Text>
        </View>
        <View className="p-5">
          <InputField
            label="Name"
            icon={icons.person}
            labelStyle="text-[#132541]"
            value={form.name}
            placeholder="Enter your name"
            onChangeText={(value) => setForm({ ...form, name: value })}
          />

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
          {/* Add role selector drop down with chef and customer here */}

          <Dropdown />
          <CustomButton
            title="Sign Up"
            onPress={onSignUpPress}
            className="mt-4 w-full shadow-none"
          />

          {/* oauth here goes */}
          <OAuth />
          <Link href="/(auth)/signIn" className="text-lg text-center mt-3">
            <Text className="text-[#132541]">Already have an account?</Text>
            <Text className="text-[#E87A64]"> Sign In</Text>
          </Link>
        </View>
        {/* verification modal */}

        <ReactNativeModal
          isVisible={verification.state === "pending"}
          onModalHide={() => {
            if (verification.state === "success") {
              setShowSuccessModal(true);
            }
          }}
        >
          <View className=" bg-white px-7 py-9 rounded-2xl min-h-[300px]">
            <Text className="text-3xl font-JakartaExtraBold text-[#132541] mb-2">
              Verification
            </Text>
            <Text className="text-base text-gray-400 font-Jakarta text-center mt-5">
              we&apos;ve sent a verification code to {form.email}
            </Text>
            <InputField
              label="code"
              icon={icons.lock}
              placeholder="12345"
              value={verification.code}
              keyboardType="numeric"
              onChangeText={(code) =>
                setVerification({ ...verification, code: code })
              }
            />
            {verification.error && (
              <Text className="text-sm text-red-500 font-Jakarta text-center mt-1">
                {verification.error}
              </Text>
            )}
            <CustomButton
              title="Verify Email"
              onPress={onPressVerify}
              className="mt-5"
            />
          </View>
        </ReactNativeModal>

        <ReactNativeModal isVisible={showSuccessModal}>
          <View className=" bg-white px-7 py-9 rounded-2xl min-h-[300px]">
            <Image
              source={images.check}
              className="w-[110px] h-[110px] mx-auto my-5"
            />
            <Text className="text-3xl font-JakartaExtraBold text-[#132541] text-center">
              Verified
            </Text>
            <Text className="text-base text-gray-400 font-Jakarta text-center mt-2">
              You have successfully verified your account
            </Text>
            <CustomButton
              title="Browse Home"
              onPress={() => {
                router.push("/(root)/(tabs)/home");
                setShowSuccessModal(false);
              }}
              className="mt-5"
            />
          </View>
        </ReactNativeModal>
      </View>
    </ScrollView>
  );
};

export default SignUp;
