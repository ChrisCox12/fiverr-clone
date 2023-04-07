import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axios';
import { UserContext, UserDispatchContext } from '../../hooks/UserContext';

import './login.css';


export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const dispatch = useContext(UserDispatchContext);
    

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        //console.log('Submit button works')
        try {
            const response = await axiosInstance.post('auth/login', { username, password });
            console.log(response)
            localStorage.setItem('currentUser', JSON.stringify(response.data));
            
            // hacky way to get around typing problems for dispatch object;
            // Typescript would say "Cannot invoke an object which is possibly 'null'"
            if(dispatch) {
                dispatch({
                    type: 'login',
                    username: response.data.username,
                    userId: response.data._id,
                    image: response.data.image,
                    isSeller: response.data.isSeller
                });
            }
            navigate('/');
            
            
            //navigate('/');
        } 
        catch(error: any) {
            //console.log(error.response);
            setError(error.response.data.msg);
        }
    }

    return (
        <div className='Login'>
            <div className='Login__container'>
                <form className='login-form' onSubmit={handleSubmit}>
                    <h1>Sign In To Fiverr</h1>

                    {error && <div>{error}</div>}

                    <input
                        type='text'
                        name='username'
                        placeholder='Email / Username'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        type='password'
                        name='password'
                        placeholder='Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type='submit'>Continue</button>
                </form>
            </div>
        </div>
    )
}

