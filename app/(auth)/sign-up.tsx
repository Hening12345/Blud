import { View, Text, ScrollView, Image, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import { CustomButton, FormField } from "../../components";
import { Link, router } from "expo-router";
import { createUser } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";

const signUp = () => {
  const [form, setForm] = useState({
    userName: "",
    email: "",
    password: "",
  });

    const context = useGlobalContext();
  
    if (!context) {
      return null;
    }
  
    const { setUser, setIsLoggedIn } = context;

  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async () => {
    console.log('singup function called');
    if (!form.email || !form.password || !form.userName) {
      Alert.alert("Error", "Please fill all fields");
    }
    setIsSubmitting(true);
    try {
      const result = await createUser(
        form.email,
        form.password,
        form.userName
      );

      setIsLoggedIn(true);
      setUser(result);

      router.replace("/home");
    } catch (err: any) {
      Alert.alert("Error", err.message);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[85vh] px-4 my-6">
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[115px] h-[35px]"
          />
          <Text className="text-2xl text-white text-semibold mt-10 font-psemibold">
            Sign up to Aora
          </Text>

          <FormField
            title="Username"
            value={form.userName}
            handleChangeText={(e) => setForm({ ...form, userName: e })}
            otherStyles="mt-10"
          />

          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />

          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
          />

          <CustomButton
            title="Sign Up"
            handlePress={submit}
            containerStyles="w-full mt-7"
            isLoading={isSubmitting}
          />

          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Already have an account?
            </Text>
            <Link
              href="/sign-in"
              className="text-lg font-psemibold text-secondary"
            >
              Sign In
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default signUp;
