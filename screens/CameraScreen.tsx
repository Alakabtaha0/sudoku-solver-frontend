import { Camera, CameraType } from 'expo-camera';
import { useState, useRef } from 'react';
import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

type CameraScreenProps = {
	navigation: any;

}

const CameraScreen: React.FC<CameraScreenProps> = ({ navigation }) => {
	const [type, setType] = useState<CameraType>(CameraType.back);
	const [permission, requestPermission] = Camera.useCameraPermissions();
	const [name, setName] = useState<string>('');
	const [description, setDescription] = useState<string>('');
	const cameraRef = useRef<Camera | null>(null);


	const takePicture = async () => {
		// Options for the picture
		let options = {
			quality: 1,
			base64: true,
			exif: false
		};
		// Creates a base64 encoded image - a string representation of the image
		let newPhoto = await cameraRef.current?.takePictureAsync(options);
		// Send the image to the server in multipart media
		const formData: FormData = new FormData();
		formData.append('image', `${newPhoto?.base64}`);
		formData.append('name', name);
		formData.append('description', description);

		// Send the image to the server
		const x = fetch("http://192.168.1.23:8000/sudokus/", {
			method: 'POST',
			body: formData,
			headers: {
				'Content-Type': 'multipart/form-data',
				'Accept': '*/*',
				'Aceept-Encoding': 'gzip, deflate, br',
				'Connection': 'keep-alive',

			}
		}).then(blob => {
			// Convert the blob to JSON
			// Need to store the response in redux
			const reader = new FileReader();
			reader.onload = () => {
				console.log("Response JSON:: ", reader.result);
			}
			// Switch screens
			navigation.navigate('Confirm');
		}).catch(err => console.error(err));
		console.log(x);
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
		<>
			<View style={styles.textContainer}>
				<TextInput value={name} onChangeText={setName} style={styles.textBox} placeholder='Enter the name of this sudoku' returnKeyType='done' />
				<TextInput value={description} onChangeText={setDescription} style={styles.textBox} placeholder='Enter the description' returnKeyType='done' />
			</View>
			<View style={styles.container}>
				<Camera style={styles.camera} type={type} ref={cameraRef} autoFocus={Camera.Constants.AutoFocus} focusDepth={0.5}>
					<View style={styles.buttonContainer}>
						<TouchableOpacity style={styles.button} onPress={takePicture}>
						</TouchableOpacity>
					</View>
				</Camera>
			</View>
		</>

	);
}

const styles = StyleSheet.create({
	textContainer: {
		position: 'absolute',
		backgroundColor: 'transparent',
		zIndex: 100,
		marginTop: 50,
		width: '80%'
	},
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
	textBox: {
		borderWidth: 1,
		borderColor: 'black',
		borderRadius: 5,
		padding: 10,
		margin: 5,
		backgroundColor: 'white',
	}
});



export default CameraScreen;
