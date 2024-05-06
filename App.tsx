import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CameraScreen from './screens/CameraScreen';
import ConfirmScreen from './screens/ConfirmScreen';
import ResultsScreen from './screens/ResultsScreen';
import { store } from './redux/store';
import { Provider } from 'react-redux';

const Stack = createStackNavigator();

export default function App() {

	const options = {
		headerShown: false
	}

	return (
		<Provider store={store} >
			<NavigationContainer>
				<Stack.Navigator initialRouteName='Camera'>
					<Stack.Screen name='Camera'
					component={CameraScreen}
					options={options} />
					<Stack.Screen name="Confirm"
						component={ConfirmScreen}
						options={options} />
					<Stack.Screen name="Results"
						component={ResultsScreen}
						options={options} />
					
				</Stack.Navigator>
			</NavigationContainer>
		</Provider>
	);
}
