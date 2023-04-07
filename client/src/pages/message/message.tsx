import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { useContext, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { UserContext } from '../../hooks/UserContext';
import axiosInstance from '../../utils/axios';
import './message.css';


export default function Message() {

    const { id } = useParams();
    //console.log(id)
    const currentUser = useContext(UserContext);
    const [text, setText] = useState('');
    const queryClient = useQueryClient();
    const messagesQuery = useQuery({
        queryKey: ['messages', id],
        queryFn: getMessages
    });

    const mutation = useMutation<AxiosResponse<any, any>, unknown, { conversationId: string | undefined, text: string }>({
        mutationFn: (message) => {
            return axiosInstance.post('messages', message);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['messages', id]); // invalidates the query;
                                                               // invalid queries perform their queryFn(s) again
                                                               // (re)fetching (potentially updated) data
        }
    });

    async function getMessages() {
        try {
            const response = await axiosInstance.get(`messages/${id}`);

            return response.data;
        } 
        catch(error) {
            console.log(error);
        }
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        mutation.mutate({
            conversationId: id,
            text: text
        });

        setText('');
    }

    if(messagesQuery.isLoading) return <div>Loading...</div>;
    if(messagesQuery.error) return <div>Something went wrong</div>;
    
    return (
        <div className='Message'>
            <div className='Message__container'>
                <div className='breadcrumbs'>
                    <Link to={'/'}>Messages</Link>{' '}
                    <span> {'>'} John Doe</span>
                </div>

                <div className='messages'>
                    {messagesQuery.data.map(message => (
                        <div className={message.userId === currentUser?.userId ? 'item owner' : 'item'} key={message._id}>
                            <img src={message.userImage} alt='Profile Image' />
                            <p>{message.text}</p>
                        </div>
                    ))}
                    {/* <div className='item'>
                        <img src='https://fiverr-res.cloudinary.com/q_auto,f_auto,w_320,dpr_1.0/v1/attachments/generic_asset/asset/d51cf66f8a7026eb56a8c8e6b6793b24-1617027896306/lamonastudio-img.png' alt='' />
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla rutrum ex feugiat, lobortis sapien ac, maximus odio. Ut sollicitudin, lorem id luctus malesuada, magna ipsum volutpat diam, non congue justo mi ut sapien. Sed massa mauris, eleifend et porta a, vestibulum non eros. Maecenas auctor tempus lorem. Pellentesque tincidunt risus eros, a interdum massa blandit id. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Maecenas ac velit et lectus aliquam tincidunt in a neque. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. In sed nisi ornare, pretium urna consequat, venenatis eros. Nunc interdum blandit massa, vitae scelerisque nulla dignissim nec.</p>
                    </div>

                    <div className='item owner'>
                        <img src='https://fiverr-res.cloudinary.com/q_auto,f_auto,w_320,dpr_1.0/v1/attachments/generic_asset/asset/d51cf66f8a7026eb56a8c8e6b6793b24-1617027896306/lamonastudio-img.png' alt='' />
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla rutrum ex feugiat, lobortis sapien ac, maximus odio. Ut sollicitudin, lorem id luctus malesuada, magna ipsum volutpat diam, non congue justo mi ut sapien. Sed massa mauris, eleifend et porta a, vestibulum non eros. Maecenas auctor tempus lorem. Pellentesque tincidunt risus eros, a interdum massa blandit id. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Maecenas ac velit et lectus aliquam tincidunt in a neque. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. In sed nisi ornare, pretium urna consequat, venenatis eros. Nunc interdum blandit massa, vitae scelerisque nulla dignissim nec.</p>
                    </div>
                    
                    <div className='item'>
                        <img src='https://fiverr-res.cloudinary.com/q_auto,f_auto,w_320,dpr_1.0/v1/attachments/generic_asset/asset/d51cf66f8a7026eb56a8c8e6b6793b24-1617027896306/lamonastudio-img.png' alt='' />
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla rutrum ex feugiat, lobortis sapien ac, maximus odio. Ut sollicitudin, lorem id luctus malesuada, magna ipsum volutpat diam, non congue justo mi ut sapien. Sed massa mauris, eleifend et porta a, vestibulum non eros. Maecenas auctor tempus lorem. Pellentesque tincidunt risus eros, a interdum massa blandit id. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Maecenas ac velit et lectus aliquam tincidunt in a neque. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. In sed nisi ornare, pretium urna consequat, venenatis eros. Nunc interdum blandit massa, vitae scelerisque nulla dignissim nec.</p>
                    </div>

                    <div className='item owner'>
                        <img src='https://fiverr-res.cloudinary.com/q_auto,f_auto,w_320,dpr_1.0/v1/attachments/generic_asset/asset/d51cf66f8a7026eb56a8c8e6b6793b24-1617027896306/lamonastudio-img.png' alt='' />
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla rutrum ex feugiat, lobortis sapien ac, maximus odio. Ut sollicitudin, lorem id luctus malesuada, magna ipsum volutpat diam, non congue justo mi ut sapien. Sed massa mauris, eleifend et porta a, vestibulum non eros. Maecenas auctor tempus lorem. Pellentesque tincidunt risus eros, a interdum massa blandit id. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Maecenas ac velit et lectus aliquam tincidunt in a neque. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. In sed nisi ornare, pretium urna consequat, venenatis eros. Nunc interdum blandit massa, vitae scelerisque nulla dignissim nec.</p>
                    </div> */}
                </div>

                <form className='write' onSubmit={handleSubmit}>
                    <textarea 
                        name='' 
                        placeholder='write a message' 
                        id='' 
                        cols={100} 
                        rows={10} 
                        value={text}
                        onChange={(e) => setText(e.target.value)} 
                    />

                    <button type='submit'>Send</button>
                </form>
            </div>
        </div>
    )
}