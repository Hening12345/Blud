import { View, Text,Image } from 'react-native'
import React from 'react'
import {images} from "../constants"
import CustomButton from './CustomButton'
import { router } from 'expo-router';

interface EmptyStateProps {
    title:string;
    description:string;
    buttonTitle:string;
    buttonAction: string;
}
const EmptyState: React.FC<EmptyStateProps> = ({title,description,buttonTitle,buttonAction}) => {
  return (
    <View className='justify-center items-center px-4'>
      <Image source={images.empty} className="w-[270px] h-[215px]" resizeMode="contain"/>

        <Text className="text-xl text-center font-psemibold text-white mt-2">
          {title}
        </Text>
        <Text className="font-pmedium text-sm text-gray-100">
          {description}
        </Text>

        <CustomButton
          title={buttonTitle}
          handlePress={()=>{
            if(buttonAction==="/home"){
              router.push("/home")
            }else{
              router.push("/create")
            }
            
          
          }}
          containerStyles='w-full my-5'
        />
    </View>
  )
}

export default EmptyState