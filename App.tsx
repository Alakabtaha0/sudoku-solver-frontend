import { Camera, CameraType } from 'expo-camera';
import { useState, useRef } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CameraScreen from './screens/CameraScreen';
import ConfirmScreen from './screens/ConfirmScreen';


const Stack = createStackNavigator();

export default function App() {
	
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen name='Camera' component={CameraScreen} />
				<Stack.Screen name="Confirm" component={ConfirmScreen} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}

const styles = StyleSheet.create({
});
