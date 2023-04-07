import './register.css';
import { useContext, useState } from 'react';
import axiosInstance from '../../utils/axios';
//import axios from 'axios';
import uploadProfileImage from '../../utils/cloudinary';
import { useNavigate } from 'react-router-dom';
import { UserContext, UserDispatchContext } from '../../hooks/UserContext';


export default function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [profileImage, setProfileImage] = useState<File>();
    const [phoneNumber, setPhoneNumber] = useState('');
    const [isSeller, setIsSeller] = useState(false);
    const [country, setCountry] = useState('');
    const [description, setDescription] = useState('');
    const navigate = useNavigate();
    const dispatch = useContext(UserDispatchContext);

    //console.log(profileImage)

    async function handleRegister(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        try {
            let imageUrl;

            if(profileImage) {
                imageUrl = await uploadProfileImage(profileImage);
            }
            else {
                imageUrl = 'https://res.cloudinary.com/dbixnvh4h/image/upload/v1680029853/fiverr/Image_not_available_lgmf6l.png';
            }
            

            //console.log('imageUrl: ', imageUrl)
            const response = await axiosInstance.post('auth/register', {
                username,
                email,
                password,
                image: imageUrl,
                phoneNumber,
                isSeller,
                country,
                description
            });
            //console.log(response.data);
            localStorage.setItem('currentUser', JSON.stringify(response.data));
            // hacky way to get around typing problems for dispatch object;
            // Typescript would say "Cannot invoke an object which is possibly 'null'"
            if(dispatch) {
                dispatch({
                    type: 'login',
                    username: username,
                    isSeller: isSeller,
                    image: imageUrl,
                    userId: response.data._id
                });
            }
            navigate('/');
        } 
        catch(error) {
            console.log(error);
        }
    }


    return (
        <div className='Register'>
            <div className='Register__container'>
                <h1>Join Fiverr</h1>

                <form onSubmit={handleRegister}>
                    <div className='input-groups'>
                        <div className='group-1'>
                            <div>
                                <label htmlFor='username'>Username</label>
                                <input 
                                    type='text' 
                                    id='username' 
                                    value={username} 
                                    onChange={(e) => setUsername(e.target.value)} 
                                    required 
                                />
                            </div>
                            <div>
                                <label htmlFor='email'>Email</label>
                                <input 
                                    type='email' 
                                    id='email' 
                                    value={email} 
                                    onChange={(e) => setEmail(e.target.value)} 
                                />
                            </div>
                            <div>
                                <label htmlFor='password'>Password</label>
                                <input 
                                    type='text' 
                                    id='password' 
                                    value={password} 
                                    onChange={(e) => setPassword(e.target.value)} 
                                    required 
                                />
                            </div>
                            <div>
                                <label htmlFor='profileImage'>Profile Image</label>
                                <input 
                                    type='file' 
                                    id='profileImage' 
                                    onChange={(e) => setProfileImage(e.target.files[0])}
                                    accept='image/*'
                                />
                            </div>
                        </div>
                        <div className='group-2'>
                            <div>
                                <label htmlFor='country'>Country</label>
                                <input 
                                    type='text' 
                                    id='country' 
                                    value={country} 
                                    onChange={(e) => setCountry(e.target.value)} 
                                    required 
                                />
                            </div>
                            <div>
                                <label htmlFor='phoneNumber'>Phone Number</label>
                                <input 
                                    type='tel' 
                                    id='phoneNumber' 
                                    value={phoneNumber} 
                                    onChange={(e) => setPhoneNumber(e.target.value)} 
                                />
                            </div>
                            <div>
                                <p>Want to become a Seller?</p>
                                <div className='radio-group'>
                                    <input 
                                        type='radio' 
                                        id='sellerYes' 
                                        value='Yes' 
                                        onClick={() => setIsSeller(true)} 
                                        name='sellerChoice' 
                                    />
                                    <label htmlFor='sellerYes'>Yes</label>
                                    <input 
                                        type='radio' 
                                        id='sellerNo' 
                                        value='No' 
                                        onClick={() => setIsSeller(false)} 
                                        name='sellerChoice' 
                                    />
                                    <label htmlFor='sellerNo'>No</label>
                                </div>
                            </div>
                            <div>
                                <label htmlFor='description'>Description</label>
                                <textarea 
                                    id='description' 
                                    rows={10} 
                                    cols={30} 
                                    value={description} 
                                    onChange={(e) => setDescription(e.target.value)} 
                                />
                            </div>
                        </div>
                    </div>

                    <button type='submit'>Register</button>
                </form>
            </div>
        </div>
    )
}