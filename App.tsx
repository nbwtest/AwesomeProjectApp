/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import * as React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import LoginScreen from './app/pages/login/Login';
import SignScreen from './app/pages/sign/Sign';
import HomeScreen from './app/pages/home/Home';
import WebScreen from './app/pages/web/Web';

const Stack = createStackNavigator();
// 创建底部 Tab 导航器
const Tab = createBottomTabNavigator();

// 创建 Tab 导航器
const HomeTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
    </Tab.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        {/* 登录 */}
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{title: '登录'}}
        />
        {/* 首页 */}
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{title: '首页'}}
        />
        {/* 注册 */}
        <Stack.Screen
          name="Sign"
          component={SignScreen}
          options={{title: '注册'}}
        />
        {/* 内嵌h5 */}
        <Stack.Screen
          name="Web"
          component={WebScreen}
          options={{title: '开播'}}
        />
        {/* 首页和底部导航 */}
        <Stack.Screen
          name="HomeTab"
          component={HomeTabNavigator} // 使用封装的 Tab 导航器
          options={{headerShown: false}} // 隐藏顶部导航栏
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
