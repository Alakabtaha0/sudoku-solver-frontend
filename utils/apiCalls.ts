import axios from "axios";


/**
 * Sends a post request to the specified URL with the provided data
 * @param {string} url - Enter the URL to send the post request to
 * @param { any } data - Enter the object to send to the server. No need to convert to JSON, it does it for you
 * @param { id } id - Optional ID parameter to add to the URL  
 * @returns {Promise<any>} - Returns a promise with the response data or an error
 */
export const postData = (url: string, data: any, id?: number) => {
    // Add the id to the URL if it exists
    if (id) url += id;

    // Convert the data to a JSON string
    JSON.stringify(data);
   
    // Send information to the server
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
        return response.data;
    }).catch(err => {
        console.error("Error: ", err);
        return err;
    })
}

export const patchData = (url: string, data: any, id: number) => {
    // Add the id to the URL
    url += id;

    // Convert the data to a JSON string
    JSON.stringify(data);

    // Send information to the server
    return axios.patch(url, data, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': '*/*',
            'Aceept-Encoding': 'gzip, deflate, br',
            'Connection': 'keep-alive',
        }
    }).then(response => {
        // Finally this works
        // Returns id, name, description, puzzle
        return response.data;
    }).catch(err => {
        console.error("Error: ", err);
        return err;
    })
}