import { View, Text, ScrollView, Image, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {BookmarkIcon, MagnifyingGlassIcon, } from 'react-native-heroicons/outline'
import Categories from '../components/categories';


import axios from 'axios';
import Recipes from '../components/recipes';
import {categoryData} from '../constants'
import {mealData} from '../constants'
import { useLikedRecipes } from '../../context/context';
import { useNavigation } from '@react-navigation/native';
// https://themealdb.com/api/json/v1/1/categories.php
// https://themealdb.com/api/json/v1/1/filter.php?c=vegeterian

const HomeScreen = () => {
  const [activeCategory, setActiveCategory] = useState('Beef');
  const [categories, setCategories] = useState([]);
  const [meals, setMeals] = useState([]);
  const navigate = useNavigation();
  const { likedRecipes } = useLikedRecipes();

  const fetchCategories = async() => {
    try {
      const response = await axios.get("https://themealdb.com/api/json/v1/1/categories.php");
      if(response && response.data){
        setCategories(response.data.categories);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const fetchRecipes = async(category="Beef") => {
    try {
      const response = await axios.get(`https://themealdb.com/api/json/v1/1/filter.php?c=${category}`);
      if(response && response.data){
        setMeals(response.data.meals);
      }
    } catch (error) {
      console.log(error);
    }
  }

  
  const handleChangeCategory = (category) => {
    setMeals([]);
    fetchRecipes(category);
    setActiveCategory(category);
  }
  useEffect(() => {
    fetchCategories();
    fetchRecipes();
  }, []);
  
  return (
    <View className="flex-1 bg-white">
      <StatusBar style="dark" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom: 50}} className="space-y-6 pt-14">
        
        {/* PROFILE */}
        <View className="mx-4 flex-row justify-between items-center mb-2">
          <Image source={require('../../assets/images/avatar.png')} style={{height: hp(5), width: hp(5.5)}} />
          <View className="relative">
            <BookmarkIcon size={hp(4)} color="gray" onPress={() => navigate.navigate('Favorites')} />
            <Text className="absolute -top-1 -right-1 bg-blue-500 h-5 w-5 px-[7px] py-[2px] rounded-full text-xs text-white">{likedRecipes.length}</Text>
          </View>
        </View> 

        {/* TEXT */}
        <View className="mx-4 space-y-1 mb-1">
          <Text style={{fontSize: hp(1.7)}} className="text-neutral-600">Hello Ashok!</Text>
            <Text style={{fontSize: hp(3.8)}} className="font-semibold text-neutral-600">Make your favourite food,</Text>
            <Text style={{fontSize: hp(3.8)}} className="font-semibold text-neutral-600">
              at <Text className="text-blue-500">home</Text>
            </Text>
        </View>

        {/* SEARCH */}
        <View className="mx-4 flex-row items-center rounded-full bg-black/5 p-[6px]">
          <TextInput placeholder='Search any recipe' placeholderTextColor={'gray'} style={{fontSize: hp(1.7)}} className="flex-1 text-base mb-1 pl-3 tracking-wider"/>
          <View className="bg-blue-500 rounded-full p-3">
            <MagnifyingGlassIcon size={hp(2.5)} strokeWidth={3} color="white" />
          </View>
        </View>

        {/* CATEGORIES */}
        <View>
          {categories.length > 0 && <Categories categories={categories} activeCategory={activeCategory} handleChangeCategory={handleChangeCategory} />}
        </View>

        {/* RECIPES */}
        <View>
          <Recipes categories={categories} meals={meals} />
        </View>
      </ScrollView>
    </View>
  )
}

export default HomeScreen