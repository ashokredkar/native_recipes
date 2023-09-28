import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import {categoryData} from '../constants'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { CachedImage } from '../helpers/image';

const categories = ({categories, activeCategory, handleChangeCategory}) => {
  return (
    <Animated.View entering={FadeInDown.duration(400).springify()}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} className="space-x-4" contentContainerStyle={{paddingHorizontal: 15}}>
        {categories.map((cat, index) => (
          <TouchableOpacity key={index} onPress={()=> handleChangeCategory(cat.strCategory)} className="flex items-center space-y-1">
            <View className={`rounded-full p-2 ${activeCategory === cat.strCategory ? "bg-blue-500" : "bg-black/10"}`}>
                {/* <Image source={{uri: cat?.strCategoryThumb}} style={{width: hp(6), height: hp(6)}} className="rounded-full"/> */}
                <CachedImage uri={cat.strCategoryThumb} style={{width: hp(6), height: hp(6)}} className="rounded-full"/>
            </View>
            <Text className="text-neutral-600" style={{fontSize: hp(1.6)}}>
                {/* {cat.strCategory} */}
                {cat?.strCategory}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </Animated.View>
  )
}

export default categories