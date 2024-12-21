import { StyleSheet, View, Text, Image } from 'react-native'
import { Slot, Stack, SplashScreen } from 'expo-router';
import { Tabs, Redirect } from 'expo-router';
import { icons } from '../../constants';
import "../../global.css";

const TabIcon = ({ icon, color, name, focused}) => {
  return (
    <View 
      style={{ 
        alignItems: 'center', 
        justifyContent: 'center', 
        gap: 2, 
        paddingTop: 22,
      }}
    >
      <Image 
        source={icon}
        resizeMode="contain"
        tintColor={color}
        style={{
          width: 28, 
          height: 28,
          marginBottom: 1, 
        }}
      />
      <Text 
        style={{
          color: color,
          fontSize: 12, 
          fontWeight: focused ? '600' : '400', 
          textAlign: 'center',
        }}
      >
        {name}
      </Text>
    </View>
  )
}

const TabsLayout = () => {
  return (
    <>
      <Tabs screenOptions={{ 
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#FFA001',
        tabBarInactiveTintColor: '#CDCDE0',
        tabBarStyle: {
          backgroundColor: '#161622',
          borderTopWidth: -1,
          height: 68,
        }
       }}>
        <Tabs.Screen 
          name="home" 
          options={{ 
            title: 'Home',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon 
                icon={icons.home}
                color={color}
                name="Main"
                focused={focused}
              />
            )
          }}
         />
         <Tabs.Screen 
          name="bookmark" 
          options={{ 
            title: 'Bookmark',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon 
                icon={icons.bookmark}
                color={color}
                name="Save"
                focused={focused}
              />
            )
          }}
         />
         <Tabs.Screen 
            name="create" 
            options={{ 
              title: 'Create',
              headerShown: false,
              tabBarIcon: ({ color, focused }) => (
                <TabIcon 
                  icon={icons.plus}
                  color={color}
                  name="Add"
                  focused={focused}
                />
              )
            }}
         />
         <Tabs.Screen 
          name="profile" 
          options={{ 
            title: 'Profile',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon 
                icon={icons.profile}
                color={color}
                name="Profil"
                focused={focused}
              />
            )
          }}
         />
      </Tabs>
    </>
  )
}

export default TabsLayout

const styles = StyleSheet.create({})