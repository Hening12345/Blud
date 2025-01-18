import {
  View,
  Text,
  Image,
  FlatList,
  RefreshControl,
  Alert,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { icons, images } from "../../constants";
import { EmptyState, InfoBox, Trending, VideoCard } from "../../components";
import { useGlobalContext } from "../../context/GlobalProvider";
import { Config, getUserPosts,signOutUser } from "../../lib/appwrite";
import useAppwrite from "../../lib/useAppwrite";
import { router, useLocalSearchParams } from "expo-router";
import { Databases, Client } from "react-native-appwrite";

const Profile = () => {
  const context = useGlobalContext();

  if (!context) {
    return null;
  }

  const { user, setUser, setIsLoggedIn } = context;
  const { query } = useLocalSearchParams();
  const { data: posts, refetch } = useAppwrite(() => getUserPosts(user.$id));

  const logout = async() => {
   await signOutUser();
   setUser(null)
   setIsLoggedIn(false)

   router.replace('/sign-in')
  };

  const client = new Client();
    
    client
        .setEndpoint(Config.endpoint) // Your Appwrite Endpoint
        .setProject(Config.projectId) // Your project ID

    const databases = new Databases(client);

  const deleteVideo = async (videoId: string) => {
      try {
        // Hapus dari database
        await databases.deleteDocument(Config.databaseId, Config.videoCollectionId, videoId);
    
        // Hapus dari storage (opsional)
        // Misalnya: await storage.deleteFile(Config.storageId, fileId);
    
        // Perbarui state
        await refetch();
        Alert.alert("Success", "Video deleted successfully!");
      } catch (err) {
        console.error("Error deleting video:", err);
        Alert.alert("Error", "Failed to delete video.");
      }
    };

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    // fetch data
    await refetch();
    setRefreshing(false);
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          //<Text className="text-3xl text-white">{item.title}</Text>
          <VideoCard video={item} onDelete={deleteVideo} />
        )}
        ListHeaderComponent={() => (
          <View className="w-full justify-center items-center mt-6 mb-12 px-4">
            <TouchableOpacity
              className="w-full items-end mb-10"
              onPress={logout}
            >
              <Image
                source={icons.logout}
                resizeMode="contain"
                className="w-5 h-5"
              />
            </TouchableOpacity>
            <View className="w-16 h-16 border border-secondary rounded-lg justify-center items-center">
              <Image
                source={{ uri: user?.avatar }}
                className="w-[90%] h-[90%] rounded-lg"
                resizeMode="cover"
              />
            </View>

            <InfoBox
              title={user?.username}
              subtitle={""}
              containerStyles="mt-5"
              titleStyles="text-lg"
            />
            <View className="mt-5 flex-row">

              <InfoBox
                title={posts.length || 0}
                subtitle={"Posts"}
                containerStyles="mr-10"
                titleStyles="text-xl"
              />

              <InfoBox
                title="0"
                subtitle={"Followers"}
                containerStyles=""
                titleStyles="text-xl"
              />
            </View>

           
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No videos found"
            description="No videos found for this users"
            buttonTitle="Create video"
            buttonAction="/create"
          />
        )}

        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default Profile;
