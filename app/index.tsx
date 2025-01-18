import React from "react";
import { ScrollView, StyleSheet, Text, Image, View } from "react-native";
import { Redirect, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../constants";
import { Platform } from "react-native";
import CustomButton from "../components/CustomButton";
import { StatusBar } from "expo-status-bar";
import { useGlobalContext } from "../context/GlobalProvider";

const Index = () => {
  const context = useGlobalContext();

  if (!context) {
    return null;
  }

  const { isLoggedIn, isLoading } = context;

   if (!isLoading && isLoggedIn) return <Redirect href="/home" />;
  return (
    <>
      <SafeAreaView className="bg-primary h-full">
        <ScrollView contentContainerStyle={{ height: "100%" }}>
          <View className="w-full justify-center flex items-center min-h-[85vh] px-4">
            <Image
              source={images.logo}
              style={{ width: 130, height: 84 }}
              resizeMode="contain"
            />

            <Image
              source={images.cards}
              className="w-full"
              style={{ maxWidth: 380, height: 300 }}
              resizeMode="contain"
            />

            <View className="relative mt-5">
              <Text className="text-3xl text-white font-bold text-center">
                Discover Endless{"\n"}
                Possibilities with{" "}
                <Text className="text-secondary-200">Blud</Text>
              </Text>

              <Image
                source={images.path}
                className={
                  Platform.OS === "web"
                    ? "w-[136px] h-[15px] absolute -bottom-9 -right-8"
                    : "w-[136px] h-[15px] absolute -bottom-3 -right-8"
                }
                resizeMode="contain"
              />
            </View>

            <Text className="text-sm font-pregular text-gray-100 mt-7 text-center">
              Where Creativity Meets Innovation: Embark on a Journey of
              Limitless Exploration with Blud
            </Text>

            <CustomButton
              title="Continue with Email"
              handlePress={() => router.push("/sign-in")}
              containerStyles="w-full mt-7"
            />
          </View>
        </ScrollView>

        <StatusBar backgroundColor="#161622" style="light" />
      </SafeAreaView>

      {/* <View className="flex-1 items-center justify-center bg-white">
        <Text className="text-3xl font-pblack">Hello World !</Text>
        <Link href="/home" style={{color: 'blue'}}>Go to Home</Link>
      </View> */}
    </>
  );
};

export default Index;
