// LikedRecipesContext.js

import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LikedRecipesContext = createContext();

export const LikedRecipesProvider = ({ children }) => {
  const [likedRecipes, setLikedRecipes] = useState([]);

  useEffect(() => {
    // Load liked recipes from AsyncStorage when the component mounts
    const loadLikedRecipes = async () => {
      try {
        const savedLikedRecipes = await AsyncStorage.getItem('likedRecipes');
        if (savedLikedRecipes !== null) {
          setLikedRecipes(JSON.parse(savedLikedRecipes));
        }
      } catch (e) {
        console.error('Error loading liked recipes from AsyncStorage:', e);
      }
    };
    
    loadLikedRecipes();
  }, []);

  const likeRecipe = (recipe) => {
    // likedRecipes.forEach((r) => )
    setLikedRecipes([...likedRecipes, recipe]);
    saveLikedRecipes([...likedRecipes, recipe]);
  };

  const unlikeRecipe = (recipeId) => {
    const updatedLikedRecipes = likedRecipes.filter(recipe => recipe.idMeal !== recipeId);
    setLikedRecipes(updatedLikedRecipes);
    saveLikedRecipes(updatedLikedRecipes);
  };

  const saveLikedRecipes = async (recipes) => {
    try {
      await AsyncStorage.setItem('likedRecipes', JSON.stringify(recipes));
    } catch (e) {
      console.error('Error saving liked recipes to AsyncStorage:', e);
    }
  };

  const clearLikedRecipes = async () => {
    setLikedRecipes([]);
    try {
      await AsyncStorage.removeItem('likedRecipes');
    } catch (e) {
      console.error('Error clearing liked recipes from AsyncStorage:', e);
    }
  };

  return (
    <LikedRecipesContext.Provider value={{ likedRecipes, likeRecipe, unlikeRecipe, clearLikedRecipes }}>
      {children}
    </LikedRecipesContext.Provider>
  );
};

export const useLikedRecipes = () => {
  const context = useContext(LikedRecipesContext);
  if (!context) {
    throw new Error('useLikedRecipes must be used within a LikedRecipesProvider');
  }
  return context;
};
