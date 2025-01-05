import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import "../global.css"
import { icons } from '../constants'
import { useVideoPlayer, VideoView } from 'expo-video'

const VideoCard = ({ video }) => {
    const { title, thumbnail, video: videoUrl, creator } = video;
    const { username, avatar } = creator || {};
    const [play, setPlay] = useState(false);
    const player = useVideoPlayer(videoUrl);

    useEffect(() => {
        if (play) {
          player.play();
        } else {
          player.pause();
        }
      }, [play, player]);

    return (
        <View className="flex-col items-center px-4 mb-14">
            <View className="flex-row gap-3 items-start">
                <View className="justify-center items-center flex-row flex-1">
                    
                    <View className="w-[46px] h-[46px] rounded-lg border border-secondary justify-center items-center p-0.5">
                        <Image 
                            source={{ uri: avatar }}
                            className="w-full h-full rounded-lg"
                            resizeMode='cover'
                        />
                    </View>

                    <View className="justify-center flex-1 ml-3 gap-y-1">
                        <Text className="text-white font-psemibold text-sm" numberOfLines={1}>
                            {title}
                        </Text>

                        <Text className="text-xs text-gray-100 font-pregular" numberOfLines={1}>
                            {username}
                        </Text>
                    </View>
                    
                </View>

                <View className="pt-2">
                    <Image 
                        source={icons.menu} 
                        className="w-5 h-5"
                        resizeMode='contain'
                    />
                </View>
            </View>

            {play ? (
                <View style={styles.videoContainer}>
                    <VideoView
                        style={styles.video}
                        player={player}
                        allowsFullscreen
                        allowsPictureInPicture
                        onEnded={() => setPlay(false)}
                    />
              </View>
            ) : (
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => setPlay(true)}
                    style={styles.thumbnailContainer}
                >
                    <Image 
                        source={{ uri: thumbnail }}
                        style={styles.thumbnail}
                        resizeMode='cover'
                    />
                    <Image 
                        source={icons.play}
                        style={styles.playIcon}
                        resizeMode='contain'
                    />
                </TouchableOpacity>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    videoContainer: {
      width: '100%',
      height: 240,
      borderRadius: 20,
      overflow: 'hidden',
      marginTop: 12,
    },
    video: {
      width: '100%',
      height: '100%',
    },
    thumbnailContainer: {
      width: '100%',
      height: 240,
      borderRadius: 20,
      marginTop: 12,
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
    },
    thumbnail: {
      width: '100%',
      height: '100%',
      borderRadius: 20,
    },
    playIcon: {
      position: 'absolute',
      width: 50,
      height: 50,
    },
  });
    
export default VideoCard