import { View, Text, Image } from 'react-native'
import React, { useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';

const WelcomeScreen = () => {
  const ringPadding1 = useSharedValue(0);
  const ringPadding2 = useSharedValue(0);
  const ringPadding3 = useSharedValue(0);
  const navigate = useNavigation();

  useEffect(() => {
    ringPadding1.value = ringPadding2.value = ringPadding3.value = 0;
    setTimeout(() => {ringPadding1.value = withSpring(ringPadding1.value+hp(5))}, 200);
    setTimeout(() => {ringPadding2.value = withSpring(ringPadding1.value+hp(4.5))}, 200);
    setTimeout(() => {ringPadding3.value = withSpring(ringPadding1.value+hp(4))}, 200);
    setTimeout(() => navigate.navigate('Home'), 2500);
  }, []);

  return (
    <View className="flex-1 justify-center items-center space-y-10 bg-blue-500">
      <StatusBar style='light' />
      
      {/* LOGO */}
      <Animated.View className="bg-white/20 rounded-full" style={{padding: ringPadding1}}>
        <Animated.View className="bg-white/20 rounded-full" style={{padding: ringPadding2}}>
          <Animated.View className="bg-white/20 rounded-full" style={{padding: ringPadding3}}>
            <Image source={require('../../assets/images/welcome.png')} style={{width: hp(20), height: hp(20)}} />
          </Animated.View>
        </Animated.View>
      </Animated.View>

      {/* TEXT */}
      <View className="flex items-center space-y-1">
        <Text style={{fontSize: hp(7)}} className="font-bold text-white tracking-widest">
          Foody!
        </Text>
        <Text style={{fontSize: hp(2)}} className="font-medium text-white tracking-widest">
          Food is always right
        </Text>
      </View>
    </View>
  )
}

export default WelcomeScreen