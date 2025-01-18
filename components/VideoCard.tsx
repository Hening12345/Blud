import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { icons } from "../constants";
import { useVideoPlayer, VideoView } from "expo-video";
import { deleteVideo } from "../lib/appwrite";

interface Users {
  username: string;
  avatar: string;
}

interface VideoType {
  id: string; // Tambahkan ID video
  fileId: string; // Tambahkan ID file dari storage
  title: string;
  thumbnail: string;
  video: string;
  creator: Users;
}

interface VideoCardProps {
  video: VideoType;
  onDelete: (videoId: string) => void; // Callback untuk menghapus video
}

const VideoCard: React.FC<VideoCardProps> = ({ video, onDelete }) => {
  const {
    id: videoId,
    fileId,
    title,
    thumbnail,
    video: videoUrl,
    creator: { username, avatar },
  } = video;

  const [play, setPlay] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const player = useVideoPlayer(videoUrl);

  useEffect(() => {
    if (play) {
      player.play();
    } else {
      player.pause();
    }
  }, [play, player]);

  const toggleMenu = () => {
    setMenuVisible((prev) => !prev);
  };

  const handleDelete = async () => {
    try {
      await deleteVideo(videoId, fileId); // Panggil fungsi API
      onDelete(videoId); // Hapus dari UI
    } catch (err) {
      console.error("Gagal menghapus video:", err);
    }
  };

  return (
    <View className="flex-col items-center px-4 mb-14">
      <View className="flex-row gap-3 items-start">
        <View className="justify-center items-center flex-row flex-1">
          <View className="w-[46px] h-[46px] rounded-lg border border-secondary justify-center items-center p-0.5">
            <Image
              source={{ uri: avatar }}
              className="w-full h-full rounded-lg"
              resizeMode="cover"
            />
          </View>
          <View className="justify-center flex-1 ml-3 gap-y-1">
            <Text
              className="text-white font-psemibold text-sm"
              numberOfLines={1}
            >
              {title}
            </Text>
            <Text
              className="text-xs text-gray-100 font-pregular"
              numberOfLines={1}
            >
              {username}
            </Text>
          </View>
        </View>
        <View className="pt-2 relative">
          <TouchableOpacity onPress={toggleMenu}>
            <Image
              source={icons.menu}
              className="w-5 h-5"
              resizeMode="contain"
            />
          </TouchableOpacity>

          {menuVisible && (
            <View
              style={styles.menu}
              className="absolute top-8 right-2 bg-secondary rounded-md shadow-md py-8 px-8"
            >
              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => {
                  setMenuVisible(false);
                  console.log("Save clicked");
                }}
              >
                <Image source={icons.bookmarksmall} style={styles.menuIcon} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => {
                  setMenuVisible(false);
                  onDelete(videoId); // Memanggil fungsi delete dengan ID video
                }}
              >
                <Image source={icons.del} style={styles.menuIcon} />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>

      {play ? (
        <View className="w-full h-60 rounded-xl mt">
          <VideoView
            style={styles.video}
            player={player}
            allowsFullscreen
            allowsPictureInPicture
          />
        </View>
      ) : (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
          className="w-full h-60 rounded-xl mt-3 relative justify-center items-center"
        >
          <Image
            source={{ uri: thumbnail }}
            className="w-full h-full rounded-xl mt-3"
            resizeMode="cover"
          />
          <Image
            source={icons.play}
            className="w-12 h-12 absolute"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default VideoCard;

const styles = StyleSheet.create({
  video: {
    width: "100%",
    height: "100%",
    borderRadius: 20,
  },
  menu: {
    backgroundColor: "#333",
    borderRadius: 10,
    padding: 8,
    zIndex: 10,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
  },
  menuIcon: {
    width: 28,
    height: 28,
    marginLeft: -12,
    marginTop: -28,
    marginBottom: 26,
  }
});
