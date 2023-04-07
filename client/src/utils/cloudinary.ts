import axios from 'axios';

const instance = axios.create(); // was running into a CORS error due to some unwanted headers being set on requests,
                                 // to avoid, we created a new axios instance, (default) without headers, to process requests

export default async function uploadProfileImage(file: File | string) {
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'fiverr');

    //console.log('data: ', data)

    try {
        const response = await instance.post('https://api.cloudinary.com/v1_1/dbixnvh4h/image/upload', data)

        //console.log('response: ', response)
        const { url } = response.data;
        //console.log(url)
        //console.log(response)
        return url;
    } 
    catch(error) {
        console.log(error);
    }
}