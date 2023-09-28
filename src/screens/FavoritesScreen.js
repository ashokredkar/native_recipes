import { View, Text, Image, Pressable, ScrollView, TouchableOpacity, Button } from 'react-native'
import React from 'react'
import { useLikedRecipes } from '../../context/context';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';

const FavoritesScreen = () => {
    const { clearLikedRecipes, likedRecipes } = useLikedRecipes();
    const navigate = useNavigation();

    if(likedRecipes.length > 0){
        return (
            <View className="space-y-6 pt-14 px-5">
                <Animated.View entering={FadeIn.delay(200).duration(1000)} className="w-full absolute flex-row justify-between items-center pt-14 px-5">
                    <TouchableOpacity onPress={()=> navigate.goBack()} className="p-2 rounded-full bg-white">
                        <ChevronLeftIcon size={hp(3.5)} strokeWidth={4.5} color="rgb(59 130 246)" />
                    </TouchableOpacity>
                </Animated.View>
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom: 50}} className="space-y-2 pt-8">
                    <View className="flex-row justify-between items-end pb-2 mb-2 border-b border-black/20">
                        <Text style={{fontSize: hp(3)}} className="font-semibold text-neutral-600">Favorites</Text>
                        <TouchableOpacity className="bg-blue-500 py-2 px-4 rounded-lg" onPress={clearLikedRecipes}><Text className="text-md text-white">Clear All</Text></TouchableOpacity>
                    </View>
                    {likedRecipes.map(recipe => (
                        <TouchableOpacity key={recipe?.idMeal} className="flex-row items-start space-x-2 bg-white rounded-[8px] p-2" onPress={() => navigate.navigate('RecipeDetail', {...recipe})}>
                            <Image source={{uri: recipe?.strMealThumb}} style={{width: hp(12), height: hp(12), borderRadius: 8}} />
                            <View className="flex-col">
                                <Text className="text-lg font-semibold">{recipe?.strMeal.length>22 ? recipe.strMeal.slice(0,22)+'...' : recipe?.strMeal}</Text>
                                <Text>Category: <Text className="font-semibold">{recipe?.strCategory}</Text></Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>
        )
    }else{
        return (
            <View className="space-y-6 pt-14 px-4">
                <Animated.View entering={FadeIn.delay(200).duration(1000)} className="w-full absolute flex-row justify-between items-center pt-14 px-5">
                    <TouchableOpacity onPress={()=> navigate.goBack()} className="p-2 rounded-full bg-white">
                        <ChevronLeftIcon size={hp(3.5)} strokeWidth={4.5} color="rgb(59 130 246)" />
                    </TouchableOpacity>
                </Animated.View>
                <Text style={{fontSize: hp(3)}} className="font-semibold text-neutral-600 text-center mt-[40%]">No favorites added</Text>
            </View>
        )
    }
}

export default FavoritesScreen