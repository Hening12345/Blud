import {
  View,
  Text,
  Image,
  FlatList,
  RefreshControl,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import { EmptyState, Trending, SearchInput, VideoCard } from "../../components";
import { useGlobalContext } from "../../context/GlobalProvider";
import { Config, getAllPosts, getTrendingPosts } from "../../lib/appwrite";
import useAppwrite from "../../lib/useAppwrite";
import { Databases, Client } from "react-native-appwrite";

const Home = () => {
  const { data: posts, refetch } = useAppwrite(getAllPosts);

  const { data: trending,refetch:trendingFetch } = useAppwrite(getTrendingPosts);

  const context = useGlobalContext();

  if (!context) {
    return null;
  }

  const { user } = context;

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    // fetch data
    await refetch();
    await trendingFetch()
    setRefreshing(false);
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

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          //<Text className="text-3xl text-white">{item.title}</Text>
           <VideoCard video={item} onDelete={deleteVideo}/>
        )}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 space-y-6">
            <View className="justify-between items-start flex-row mb-6">
              <View>
                <Text className="font-pmedium text-sm text-gray-100">
                  Welcome Back
                </Text>
                <Text className="text-2xl text-white font-psemibold">
                  {user?.username}
                </Text>
              </View>
              <View className="mt-1.5">
                <Image
                  source={images.logoSmall}
                  resizeMode="contain"
                  className="w-9 h-10"
                />
              </View>
            </View>

            <SearchInput />

            <View className="w-full flex-1 pt-10 pb-8">
              <Text className="text-gray-100 text-lg font-pregular mb-3">
                Trending Videos
              </Text>

              <Trending posts={trending?? []} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No videos found"
            description="Be the first one to upload videos"
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

export default Home;
