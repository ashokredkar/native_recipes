import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar';
import { CachedImage } from '../helpers/image';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { ChevronLeftIcon, ClockIcon, FireIcon } from 'react-native-heroicons/outline';
import {  HeartIcon, Square3Stack3DIcon, UsersIcon } from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import Loading from '../components/loading';
import YouTubeIframe from 'react-native-youtube-iframe';
import Animated, { FadeInDown, FadeIn } from 'react-native-reanimated';
import { useLikedRecipes } from '../../context/context';
// https://themealdb.com/api/json/v1/1/lookup.php?i=26424

const RecipeDetailScreen = (props) => {
  const currentItem = props.route.params;
  const navigate = useNavigation();
  // const [isFavourite, setIsFavourite] = useState(false);
  const [recipeDetails, setRecipeDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const { likeRecipe, unlikeRecipe, likedRecipes } = useLikedRecipes();
  const [isLiked, setIsLiked] = useState(false);
  
  useEffect(() => {
    setIsLiked(likedRecipes.some(r => r?.idMeal === currentItem?.idMeal));
  }, [likedRecipes, currentItem?.idMeal]);

  const fetchDetails = async(id) => {
    try {
      const response = await axios.get(`https://themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      if(response && response.data){
        setRecipeDetails(response.data.meals[0]);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleLikedRecipe = () => {
    if (isLiked) {
      // setIsFavourite(false);
      unlikeRecipe(recipeDetails?.idMeal);
    } else {
      // setIsFavourite(true);
      likeRecipe(recipeDetails);
    }
  }

  const getIngredients = (details) => {
    if(!details) return [];
    let indexes = [];
    for (let i = 1; i <= 20; i++) {      // as we know that ingredients are listed from strIngredient1 to strIngredient20
      if(details['strIngredient'+i]){    // if value is not null, then pushing that specefic index in our array
        indexes.push(i);
      }
    }
    return indexes;
  }

  const getVideoId = (videoLink) => {
    // https://www.youtube.com/watch?v=kniRGjDLFrQ    -- in this demo link, the characters after v= is the id we need. So, the below regex is checking for the same thing
    const regex = /[?&]v=([^&]+)/;
    const match = videoLink.match(regex);
    if (match && match[1]) {
      return match[1];
    }
    return null;
  }

  useEffect(() => {
    fetchDetails(currentItem?.idMeal);
  }, []);
  
  return (
    <ScrollView className="bg-white flex-1" showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom: 30}}>
      <StatusBar style={"light"} />

      <View className="flex-row justify-center">
        <Image source={{uri: currentItem.strMealThumb}} sharedTransitionTag={currentItem.strMeal} style={{width: wp(100), height: hp(50)}}/>
      </View>

      <Animated.View entering={FadeIn.delay(200).duration(1000)} className="w-full absolute flex-row justify-between items-center pt-14 px-5">
        <TouchableOpacity onPress={()=> navigate.goBack()} className="p-2 rounded-full bg-white">
            <ChevronLeftIcon size={hp(3.5)} strokeWidth={4.5} color="rgb(59 130 246)" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLikedRecipe} className="p-2 rounded-full bg-white">
            <HeartIcon size={hp(3.5)} strokeWidth={4.5} color={isLiked? "red": "gray"} />
        </TouchableOpacity>
      </Animated.View>

      {
        loading ? (
          <Loading size="large" className="mt-16" />
        ):(
          <View className="px-4 flex justify-between">
            <Animated.View entering={FadeInDown.duration(700).springify().damping(12)} className="my-4">
              <Text style={{fontSize: hp(3)}} className="font-bold flex-1 text-black">
                {recipeDetails?.strMeal}
              </Text>
              <Text style={{fontSize: hp(2)}} className="font-medium flex-1 text-neutral-500">
                {recipeDetails?.strArea}
              </Text>
            </Animated.View>

            <Animated.View entering={FadeInDown.delay(100).duration(700).springify().damping(12)} className="flex-row justify-around">
              <View className="flex rounded-full bg-blue-500 p-2">
                <View style={{height: hp(6.5), width: hp(6.5)}} className="bg-white rounded-full flex items-center justify-center">
                  <ClockIcon size={hp(4)} strokeWidth={2.5} color="#525252" />
                </View>
                <View className="flex items-center py-2 space-y-1">
                  <Text style={{fontSize: hp(2)}} className="font-bold text-white">
                      35
                  </Text>
                  <Text style={{fontSize: hp(1.3)}} className="font-bold text-white">
                      Mins
                  </Text>
                </View>
              </View>
              <View className="flex rounded-full bg-blue-500 p-2">
                <View style={{height: hp(6.5), width: hp(6.5)}} className="bg-white rounded-full flex items-center justify-center">
                  <UsersIcon size={hp(4)} strokeWidth={2.5} color="#525252" />
                </View>
                <View className="flex items-center py-2 space-y-1">
                  <Text style={{fontSize: hp(2)}} className="font-bold text-white">
                      03
                  </Text>
                  <Text style={{fontSize: hp(1.3)}} className="font-bold text-white">
                      Servings
                  </Text>
                </View>
              </View>
              <View className="flex rounded-full bg-blue-500 p-2">
                <View style={{height: hp(6.5), width: hp(6.5)}} className="bg-white rounded-full flex items-center justify-center">
                  <FireIcon size={hp(4)} strokeWidth={2.5} color="#525252" />
                </View>
                <View className="flex items-center py-2 space-y-1">
                  <Text style={{fontSize: hp(2)}} className="font-bold text-white">
                      103
                  </Text>
                  <Text style={{fontSize: hp(1.3)}} className="font-bold text-white">
                      Cals
                  </Text>
                </View>
              </View>
              <View className="flex rounded-full bg-blue-500 p-2">
                <View style={{height: hp(6.5), width: hp(6.5)}} className="bg-white rounded-full flex items-center justify-center">
                  <Square3Stack3DIcon size={hp(4)} strokeWidth={2.5} color="#525252" />
                </View>
                <View className="flex items-center py-2 space-y-1">
                  <Text style={{fontSize: hp(2)}} className="font-bold text-white">
                    Easy
                  </Text>
                  <Text style={{fontSize: hp(1.3)}} className="font-bold text-white">
                    Prep
                  </Text>
                </View>
              </View>
            </Animated.View>

            <Animated.View entering={FadeInDown.delay(200).duration(700).springify().damping(12)} className="space-y-4 mt-8">
              <Text style={{fontSize: hp(2.5)}} className="font-bold flex-1 text-neutral-700 ml-2">
                Ingredients
              </Text>
              <View className="space-y-2 ml-3">
                {
                  getIngredients(recipeDetails).map(i=>{
                    return (
                      <View key={i} className="flex-row space-x-2 items-center">
                        <View style={{height: hp(1.5), width: hp(1.5)}} className="bg-blue-500 rounded-full" />
                        <View className="flex-row space-x-2">
                          <Text style={{fontSize: hp(1.8)}} className="font-extrabold text-neutral-700">{recipeDetails['strMeasure'+i]}</Text>
                          <Text style={{fontSize: hp(1.8)}} className="font-medium text-neutral-600">{recipeDetails['strIngredient'+i]}</Text>
                        </View>
                      </View>
                    )
                  })
                }
              </View>
            </Animated.View>

            <Animated.View entering={FadeInDown.delay(300).duration(700).springify().damping(12)} className="space-y-2 mt-8">
              <Text style={{fontSize: hp(2.5)}} className="font-bold flex-1 text-neutral-700 ml-2">
                Instructions
              </Text>
              <View className="space-y-2 ml-3">
                <Text style={{fontSize: hp(1.8)}} className="font-medium text-neutral-600">{recipeDetails.strInstructions}</Text>
              </View>
            </Animated.View>

            {recipeDetails?.strYoutube && (
              <Animated.View entering={FadeInDown.delay(400).duration(700).springify().damping(12)} className="space-y-2 mt-8">
                <Text style={{fontSize: hp(2.5)}} className="font-bold flex-1 text-neutral-700 ml-2">
                  Recipe Video
                </Text>
                <View>
                  {/* <YouTubeIframe videoId="kniRGjDLFrQ" height={hp(30)} /> */}
                  <YouTubeIframe videoId={getVideoId(recipeDetails?.strYoutube)} height={hp(30)} />
                </View>
              </Animated.View>
            )}
          </View>
        )
      }
    </ScrollView>
  )
}

export default RecipeDetailScreen