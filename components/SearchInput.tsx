import { View, Text, TextInput, TouchableOpacity, Image, Alert } from "react-native";
import React, { useState } from "react";
import { icons } from "../constants";
import { router, usePathname } from "expo-router";
interface SearchInputProps {
  title?: string;
  value?: string;
  keyboardType?: string;
  handleChangeText?: (text: string) => void;
  otherStyles?: string;
  initialQuery?:string
}

const SearchInput: React.FC<SearchInputProps> = ({
  title,
  value,
  handleChangeText,
  otherStyles,
  initialQuery,
  ...props
}) => {

  const pathname = usePathname()
  const [query, setQuery] = useState(initialQuery || '')
  return (
    <View
      className="border-2 border-black-200 focus:border-red-200 w-full h-16 px-4 bg-black-100
      rounded-2xl 
      items-center
      flex-row space-x-4
      "
    >
      <TextInput
        className="text-white mt-0.5 flex-1 font-pregular"
        value={query}
        placeholder="Search for a video topic"
        placeholderTextColor="#CDCDE0"
        onChangeText={(e)=>setQuery(e)}
      />
    
        <TouchableOpacity
        onPress={()=>{
          if(!query){
            return Alert.alert('Missing Query', "Please input something to search result accross database")
          }

          if (pathname.startsWith('/start'))router
          .setParams({query})
          else router.push(`/search/${query}`)
        }}
        >
          <Image
            source={icons.search}
            className="w-6 h-6"
            resizeMode="contain"
          />
        </TouchableOpacity>
   
    </View>
  );
};

export default SearchInput;
