import { View, Text, ImageSourcePropType, Image } from "react-native";
import React from "react";
import { Tabs, Redirect } from "expo-router";
import { icons } from "../../constants";
import "../../global.css";
import { StatusBar } from "expo-status-bar";

interface TabIconProps {
  icon?: ImageSourcePropType;
  color?: string;
  name?: string;
  focused?: boolean;
}

const TabIcon: React.FC<TabIconProps> = ({ icon, color, name, focused }) => {
  return (
    <View className="items-center justify-center gap-2">
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        style={{ width: 20, height: 20 }}
      />
      {/* <Text className={`${focused? 'font-psemibold' : 'font-pregular'} text-xs`}>
                {name}
            </Text> */}
    </View>
  );
};

const TabsLayout = () => {
  return (
    <>
     <StatusBar backgroundColor="#161622" style="light" />
      <Tabs

        screenOptions={
          {
            // tabBarShowLabel:false
            tabBarActiveTintColor: '#FFA001',
            tabBarInactiveTintColor: '#CDCDE0',
            tabBarStyle: {
              backgroundColor: '#161622',
              borderTopWidth: 1,
              borderColor: '#232533',
              height: 84,
              paddingTop:5
            }
            
          }
        }
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.home}
                color={color}
                name="Home"
                focused={focused}
              />
            ),
          }}
        />

  

        <Tabs.Screen
          name="create"
          options={{
            title: "Create",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.plus}
                color={color}
                name="Create"
                focused={focused}
              />
            ),
          }}
        />

      <Tabs.Screen
          name="bookmark"
          options={{
            title: "Saved",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.bookmark}
                color={color}
                name="Bookmark"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.profile}
                color={color}
                name="Profile"
                focused={focused}
              />
            ),
          }}
        />
      </Tabs>
    </>
  );
};

export default TabsLayout;
