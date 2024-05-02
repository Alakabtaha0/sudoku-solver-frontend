import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CameraScreen from './screens/CameraScreen';
import ConfirmScreen from './screens/ConfirmScreen';


const Stack = createStackNavigator();

export default function App() {

	const options = {
		headerShown: false
	}

	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName='Camera'>
				{/* <Stack.Screen name='Camera'
					component={CameraScreen}
					options={options} /> */}
				<Stack.Screen name="Confirm"
					component={ConfirmScreen}
					options={options} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}
