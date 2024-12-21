import { View, Text, ScrollView, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import "../../global.css";
import { images } from '../../constants';
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton'
import { Link, router } from 'expo-router';
import { getCurrentUser, signIn } from '../../lib/appwrite';
import { useGlobalContext } from '../../context/GlobalProvider';

const SignIn = () => {
  const { setUser, setIsLogged } = useGlobalContext();
  const [form, setForm] = useState({
    email: '',
    password: ''
  })

  const [isSubmitting, setisSubmitting] = useState(false)

  const submit = async () => {
      if(!form.email || !form.password){
        Alert.alert('Error', 'Please fill in the fields')
      }
  
      setisSubmitting(true);
  
      try{
        await signIn(form.email, form.password)
        
        const result = await getCurrentUser();
        setUser(result);
        setIsLogged(true);

        Alert.alert("Succes", "User signed in successfully")
        router.replace('/home')
      } catch (error){
        Alert.alert('Error', error.message)
      } finally {
        setisSubmitting(false)
      }
    }

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[85vh] px-4 my-6">
          <Link href='/home'>  
            <Image 
              source={images.logo}
              resizeMode='contain' className="w-[115px] h-[35px]"
            />
          </Link>

          <Text className="text-2xl text-white text-semibold mt-10 font-psemibold">
            Log In to Blud
          </Text>

          <FormField
            title="Email"
            value= {form.email}
            handleChangeText={(e) => setForm({ ...form, email: e})}
            otherStyles="mt-7"
            keyboardType="email-address"
          />

          <FormField
            title="Password"
            value= {form.password}
            handleChangeText={(e) => setForm({ ...form, password: e})}
            otherStyles="mt-7"
          />

          <CustomButton 
            title="Sign In"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />

          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Don't have account?
            </Text>
            <Link href="/sign-up" className='text-lg font-psemibold text-secondary'>
              Sign Up Now!
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn