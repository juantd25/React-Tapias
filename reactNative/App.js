import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import UsersList from './View/screens/UsersList';
import CreateUserScreen from './View/screens/CreateUserScreen';
import UserDetailScreen from './View/screens/UserDetailScreen';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="UsersList" component={UsersList} options={{ title: 'users list' }} />
      <Stack.Screen name="CreateUserScreen" component={CreateUserScreen} options={{ title: 'Create a New User' }} />
      <Stack.Screen name="UserDetailScreen" component={UserDetailScreen} options={{ title: 'User Detail' }} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
