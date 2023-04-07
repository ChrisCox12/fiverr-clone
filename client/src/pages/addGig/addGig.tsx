import './addGig.css';
import { useEffect, useReducer, useState } from 'react';
import axiosInstance from '../../utils/axios';
import { useNavigate } from 'react-router-dom';


const categories = [
    'Graphics & Design',
    'Digital Marketing',
    'Writing & Translation',
    'Video & Animation',
    'Music & Audio',
    'Programming & Tech',
    'Business',
    'Lifestyle',
    'Data',
    'Photography'
]

const daysDelivery = [
    '1 day Delivery',
    '2 days Delivery',
    '3 days Delivery',
    '4 days Delivery',
    '5 days Delivery',
    '6 days Delivery',
    '7 days Delivery',
    '10 days Delivery',
    '14 days Delivery',
    '21 days Delivery',
    '30 days Delivery',
    '45 days Delivery',
    '60 days Delivery',
    '75 days Delivery',
    '90 days Delivery'
]

let featureId = 0;

type actionType = {
    type: string,
    id: number,
    text: string
};

type stateType = {
    id: number,
    text: string
}[];

function featuresReducer(state: stateType, action: actionType) {
    switch(action.type) {
        case 'add':
            return [
                ...state,
                {
                    id: action.id,
                    text: action.text
                }
            ];
        case 'delete':
            return state.filter(feature => feature.id !== action.id)
        case 'clear-all':
            return [];
        default:
            throw Error('Unknown action');
    }
}

export default function AddGig() {
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [features, dispatch] = useReducer(featuresReducer, []);
    const [description, setDescription] = useState('');
    const [deliveryTime, setDelivery] = useState('');
    const [price, setPrice] = useState(0);
    const [fText, setFText] = useState('');
    const [images, setImages] = useState<FileList | null>(null);
    const navigate = useNavigate();


    /* useEffect(() => {
        console.log(images)
    }, [images]) */
    //useEffect(() => {console.log(features)}, [features])

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        try {
            const response = await axiosInstance.post(`/`, {
                title,
                category,
                features,
                description,
                deliveryTime,
                price
            });

            navigate('/'); 
        } 
        catch(error) {
            console.log(error);    
        }
    }

    function handleAddFeature() {
        if(fText === '') return;
        
        dispatch({
            type: 'add',
            id: featureId++,
            text: fText
        });

        setFText('');
    }

    function handleDeleteFeature(id: number) {
        dispatch({
            type: 'delete',
            id: id,
            text: ''
        });
    }

    return (
        <div className='AddGig'>
            <div className='AddGig__container'>
                <form onSubmit={handleSubmit}>
                    <div className='header'>
                        <h1>Add New Gig</h1>
                    </div>

                    <div className='input-groups'>
                        <div className='group-1'>
                            <div>
                                <label htmlFor='title'>Title</label>
                                <input id='title' type='text' value={title} onChange={(e) => setTitle(e.target.value)} />
                            </div>

                            <div>
                                <label htmlFor='category'>Category</label>
                                <select name='categories' id='category' onChange={(e) => setCategory(e.target.value)}>
                                    {categories.map((category, index) => (
                                        <option key={`category-${index}`} value={category}>{category}</option>
                                    ))}
                                </select>
                            </div>

                            {/* <div>
                                <label htmlFor='cover-image'>Cover Image</label>
                                <input id='cover-image' type='file' />
                            </div> */}

                            <div>
                                <label htmlFor='images'>Images</label>
                                <input id='images' type='file' multiple required onChange={(e) => setImages(e.target.files)} />
                            </div>

                            <div>
                                <label htmlFor='description'>Description</label>
                                <textarea id='description' rows={16} cols={100} value={description} onChange={(e) => setDescription(e.target.value)} />
                            </div>
                        </div>
                    
                        <div className='group-2'>
                            <div>
                                <label htmlFor='service-title'>Service Title</label>
                                <input id='service-title' type='text' />
                            </div>

                            <div>
                                <label htmlFor='short-description'>Short Description</label>
                                <textarea id='short-description' rows={10} cols={100} />
                            </div>

                            <div>
                                <label htmlFor='delivery-times'>Delivery Time</label>
                                <select name='delivery-times' id='delivery-times' onChange={(e) => setDelivery(e.target.value)}>
                                    {daysDelivery.map((time, index) => (
                                        <option key={`time-${index}`} value={time}>{time}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label htmlFor='price'>Price</label>
                                <input type='number' min={1} step={5} id='price' onChange={(e) => setPrice(Number(e.target.value))} />
                            </div>

                            <div>
                                <label htmlFor='feature-input'>Add a Feature?</label>
                                <input type='text' id='feature-input' value={fText} onChange={(e) => setFText(e.target.value)} />
                                <button type='button' onClick={handleAddFeature}>Add</button>
                                <div>Features</div>
                    
                                <ul className='features-list'>
                                    {features.map(feature => (
                                        <li className='feature' key={feature.id}>
                                            <div>{feature.text}</div>
                                            <button type='button' onClick={() => handleDeleteFeature(feature.id)}>Delete</button>
                                        </li>
                                    ))}
                                </ul>
                    
                                {/* <label htmlFor='features'>Features</label>
                                <input type='text' placeholder='e.g. fast delivery' />
                                <input type='text' placeholder='e.g. hosting setup' />
                                <input type='text' placeholder='e.g. additional stock media' /> */}
                            </div>
                        </div>
                    </div>

                    <button type='submit'>Create</button>
                </form>
            </div>
        </div>
    )
}