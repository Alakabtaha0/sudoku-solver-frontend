import { Camera, CameraType } from 'expo-camera';
import { useState, useRef } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import FileSystem from 'expo-file-system';

// URL to the server -> As im communicating from my phone to my laptop, I need to use the IP address of my laptop
// Use the command 'ifconfig' in the terminal to get the IP address of the laptop
const URL = 'http://192.168.1.23:8000/sudoku/'

export default function App() {
	const [type, setType] = useState<CameraType>(CameraType.back);
	const [permission, requestPermission] = Camera.useCameraPermissions();
	const cameraRef = useRef<Camera | null>(null);


	const takePicture = async () => {
		console.log('Taking picture');
		let options = {
			quality: 1,
			base64: true,
			exif: false
		};
		// Creates a base64 encoded image - a string representation of the image
		let newPhoto = await cameraRef.current?.takePictureAsync(options);
		// Send the image to the server in multipart media
		const formData:FormData = new FormData();
		formData.append('image', `${newPhoto?.base64}`);

		const x = fetch(URL, {
			method: 'POST',
			body: formData,
			headers: {
				'Content-Type': 'multipart/form-data',
				'Accept': '*/*',
				'Aceept-Encoding': 'gzip, deflate, br',
				'Connection': 'keep-alive',

			}
		}).then(response => {
			console.log(response.json());
		}).catch(err => console.error(err));
		// const data = response.json();
		// console.log(data);	
	};


	if (!permission) {
		// Camera permissions are still loading
		return <View />;
	}

	if (!permission.granted) {
		// Camera permissions are not granted yet
		return (
			<View style={styles.container}>
				<Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
				<Button onPress={requestPermission} title="grant permission" />
			</View>
		);
	}

	function toggleCameraType() {
		setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
	}

	return (
		<View style={styles.container}>
			<Camera style={styles.camera} type={type} ref={cameraRef} autoFocus={Camera.Constants.AutoFocus} focusDepth={0.5}>
				<View style={styles.buttonContainer}>
					<TouchableOpacity style={styles.button} onPress={takePicture}>
					</TouchableOpacity>
				</View>
			</Camera>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
	},
	camera: {
		flex: 1,
	},
	buttonContainer: {
		flex: 1,
		flexDirection: 'row',
		backgroundColor: 'transparent',
		justifyContent: 'center',
		margin: 64,
	},
	button: {
		alignSelf: 'flex-end',
		alignItems: 'center',
		width: 80,
		height: 80,
		borderWidth: 3,
		borderColor: 'yellow',
		borderRadius: 40,
		backgroundColor: 'black',
	},
	text: {
		fontSize: 24,
		fontWeight: 'bold',
		color: 'white',
	},
});
