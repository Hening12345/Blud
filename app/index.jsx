import { StatusBar } from 'expo-status-bar';
import { Text, View, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../constants';
import { Redirect, router } from 'expo-router';
import CustomButton from '../components/CustomButton';
import "../global.css";
import { useGlobalContext } from '../context/GlobalProvider';

export default function App() {
  const {isLoading, isLogged} = useGlobalContext();

  if(!isLoading && isLogged) return <Redirect href='/home'/>;

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'center', 
          alignItems: 'center',    
          paddingBottom: 40,       
        }}
      >
        {/* Gambar Logo */}
        <Image
          source={images.logo}
          style={{
            width: 130,
            height: 84,
            resizeMode: 'contain',
            marginBottom: 5, 
          }}
        />

        {/* Gambar Cards */}
        <Image
          source={images.cards}
          className="max-w-[380px] w-full h-[300px]"
          resizeMode="contain"
          style={{
            marginBottom: 10, 
          }}
        />

        {/* Teks Utama */}
        <View style={{ alignItems: 'center', marginBottom: 20 }}>
          <Text className="text-3xl text-white font-bold text-center">
            Discover Endless{"\n"}
            Possibilities with{" "}
            <Text className="text-secondary-200">Blud</Text>
          </Text>

          {/* Garis Dekorasi */}
          <Image
            source={images.path}
            style={{
              width: 136,
              height: 15,
              position: 'absolute',
              bottom: -8,
              right: -40,
              resizeMode: 'contain',
            }}
          />
        </View>

        {/* Teks Deskripsi */}
        <Text className="text-sm font-pregular text-gray-100 text-center" style={{ marginBottom: 20 }}>
          Where Creativity Meets Innovation: Embark on a Journey of Limitless
          Exploration with Blud
        </Text>

        {/* Tombol */}
        <CustomButton
          title="Continue with Email"
          handlePress={() => router.push('/sign-in')}
          containerStyles="w-full mt-5"
        />
      </ScrollView>

      <StatusBar backgroundColor='#161622' style='light' />
    </SafeAreaView>
  );
}
