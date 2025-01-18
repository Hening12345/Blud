import { View, Text, ScrollView, Image, Alert, Pressable } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import { FormField, CustomButton } from "../../components";
import { Link, router } from "expo-router";
import { getCurrentUser, signInUser } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";

const signIn = () => {
  const [form, setForm] = useState({
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
    console.log('Submit function called');
    if (!form.email || !form.password) {
      Alert.alert("Error", "Please fill all fields");
    }
    setIsSubmitting(true);
    try {
      await signInUser(form.email, form.password);

      const result = await getCurrentUser();
      setUser(result);
      setIsLoggedIn(true);

      Alert.alert("Success", "Logged in successfully");
      router.replace("/home");
    } catch (err: any) {
      // Alert.alert("Error", err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[85vh] px-4 my-6">
        <Pressable onPress={()=>router.replace("/")} >
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[115px] h-[35px]"
          />
           </Pressable>
          <Text className="text-2xl text-white text-semibold mt-10 font-psemibold">
            Log in to Aora
          </Text>

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
            title="Sign In"
            handlePress={submit}
            containerStyles="w-full mt-7"
            isLoading={isSubmitting}
          />

          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Don't have account?
            </Text>
            <Link
              href="/sign-up"
              className="text-lg font-psemibold text-secondary"
            >
              Sign Up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default signIn;
