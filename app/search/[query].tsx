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
import { EmptyState, SearchInput, Trending } from "../../components";
import { useGlobalContext } from "../../context/GlobalProvider";
import { searchPosts } from "../../lib/appwrite";
import useAppwrite from "../../lib/useAppwrite";
import VideoCard from "../../components/VideoCard";
import { useLocalSearchParams } from "expo-router";

const Search = () => {
  const { query } = useLocalSearchParams();
  const { data: posts, refetch } = useAppwrite(() => searchPosts(query as any));

  const context = useGlobalContext();

  useEffect(() => {
    refetch();
  }, [query]);

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          //<Text className="text-3xl text-white">{item.title}</Text>
          <VideoCard video={item} />
        )}
        ListHeaderComponent={() => (
          <View className="my-6 px-4">
            <View>
              <Text className="font-pmedium text-sm text-gray-100">
                Search Results :
              </Text>
              <Text className="text-2xl text-white font-psemibold">
                {query}
              </Text>

              <View className="mt-6 mb-8">
                <SearchInput initialQuery={query as any} />
              </View>
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No videos found"
            description="No videos found for this search query"
            buttonTitle="Create video"
            buttonAction="/create"
          />
        )}
      />
    </SafeAreaView>
  );
};

export default Search;
