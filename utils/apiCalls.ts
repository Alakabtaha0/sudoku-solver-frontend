import { setUser } from "../redux/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import axios from "axios";


// // make api call to fetch data (POST)
// export const postData = (url: string, data: any, id?: number) => {
//     // const user = useSelector((state: RootState) => state.user);
//     // const dispatch = useDispatch<AppDispatch>();

//     // Add the id to the URL if it exists
//     if (id) url += id;

//     // Send information to the server
//     return fetch(url, {
//         method: 'POST',
//         body: data,
//         headers: {
//             // 'Content-Type': 'multipart/form-data',
//             'Accept': '*/*',
//             'Aceept-Encoding': 'gzip, deflate, br',
//             'Connection': 'keep-alive',
//         }
//     }).then(blob => {
//         // Convert the blob to JSON
//         // Need to store the response in redux
//         const reader = new FileReader();
//         reader.onload = () => {
//             console.log("Response JSON:: ", reader.result);
//             // // Set the user in the redux store
//             // dispatch(setUser(reader.result));
//             return reader.result;        
//         }
//     }).catch(err => {
//         console.error("Error: ", err);
//     });
// }

// Send the image to the server
// const x = fetch("http://192.168.1.23:8000/sudokus/", {
// 	method: 'POST',
// 	body: formData,
// 	headers: {
// 		'Content-Type': 'multipart/form-data',
// 		'Accept': '*/*',
// 		'Aceept-Encoding': 'gzip, deflate, br',
// 		'Connection': 'keep-alive',

// 	}
// }).then(blob => {
// 	// Convert the blob to JSON
// 	// Need to store the response in redux
// 	const reader = new FileReader();
// 	reader.onload = () => {
// 		console.log("Response JSON:: ", reader.result);
// 	}
// 	// Switch screens
// 	navigation.navigate('Confirm');
// }).catch(err => console.error(err));
// console.log(x);

// POST data to the server
export const postData = (url: string, data: any, id?: number) => {
    // Add the id to the URL if it exists
    if (id) url += id;

    // // Send information to the server
    // return fetch(url, {
    //     method: 'POST',
    //     body: data,
    //     headers: {
    //         // 'Content-Type': 'multipart/form-data',
    //         'Accept': '*/*',
    //         'Aceept-Encoding': 'gzip, deflate, br',
    //         'Connection': 'keep-alive',
    //     }
    // }).then(response => {
    //     console.log('Headers: ', response.headers);
    //     console.log('Response: ', response);
    // }).catch(err => {
    //     console.error("Error: ", err);
    //     return err;
    // });
    return axios.post(url, data, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': '*/*',
            'Aceept-Encoding': 'gzip, deflate, br',
            'Connection': 'keep-alive',
        }
    }).then(response => {
        // Finally this works
        // Returns id, name, description, puzzle, solution
        // Now we just need to store this in the redux store
        console.log('Response: ', response.data);
    }).catch(err => {
        console.error("Error: ", err);
        return err;
    })
}