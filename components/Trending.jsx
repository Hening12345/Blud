import React, { useState, useCallback, useRef, useEffect } from "react";
import { StyleSheet, Button, TouchableWithoutFeedback } from "react-native";
import { useVideoPlayer, VideoView } from "expo-video";
import * as Animatable from "react-native-animatable";
import {
  FlatList,
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { icons } from "../constants";

const zoomIn = {
  0: {
    scale: 0.9,
  },
  1: {
    scale: 1,
  },
};

const zoomOut = {
  0: {
    scale: 1,
  },
  1: {
    scale: 0.9,
  },
};


const TrendingItem = ({ activeItem, item,  activeVideoId, setActiveVideoId  }) => {

  const isPlaying = activeVideoId === item.$id;
  const player = useVideoPlayer(item.video);

  useEffect(() => {
    if (isPlaying) {
      player.play(); 
    } else {
      player.pause(); 
    }
  }, [isPlaying, player]);


  return (

    <Animatable.View
      className="mr-5"
      animation={activeItem === item.$id ? zoomIn : zoomOut}
      duration={500}
    >
      {isPlaying  ? (
        <>

          <View style={{ width: "200px", height: "300px", borderRadius: 20 }}>
            <VideoView
              style={styles.video}
              player={player}
              allowsFullscreen
              allowsPictureInPicture
              resizeMode="contain"
            />
          </View>
        </>
      ) : (
        <TouchableOpacity
          className="relative flex justify-center items-center"
          activeOpacity={0.7}
          onPress={() => setActiveVideoId(item.$id)}
        >
          <ImageBackground
            source={{
              uri: item.thumbnail,
            }}
            className="w-52 h-72 rounded-[33px] my-5 overflow-hidden shadow-lg shadow-black/40"
            resizeMode="cover"
          />

          <Image
            source={icons.play}
            className="w-12 h-12 absolute"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </Animatable.View>
  );
};

const Trending = ({ posts }) => {
  const [activeItem, setActiveItem] = useState(posts[0]);
  const [activeVideoId, setActiveVideoId] = useState(null); 
  // Use useCallback to avoid re-creation of the function on every render
  const viewableItemsChanged = useCallback(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0].item.$id); // Updated to match item structure
    }
  }, []);

  const handleOutsideClick = () => {
    if (activeVideoId) {
      setActiveVideoId(null); // Stop any active video
    }
  };
  return (
    <TouchableWithoutFeedback onPress={handleOutsideClick}>
    <FlatList
    onPress={handleOutsideClick}
      data={posts}
      horizontal
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => (
        <TrendingItem activeItem={activeItem}
        activeVideoId={activeVideoId} // Pass active video ID
        setActiveVideoId={setActiveVideoId} // Pass setter to update active video
         item={item} />
      )}
      onViewableItemsChanged={viewableItemsChanged}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 70,
      }}
      contentOffset={{ x: 170 }}
    />
    </TouchableWithoutFeedback>
  );
};

export default Trending;

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 50,
  },
  video: {
    width: 200,
    height: 300,
    borderRadius: 20,
  },
});
