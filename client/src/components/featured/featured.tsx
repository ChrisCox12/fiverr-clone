import './featured.css';
import { Link, useNavigate } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';
import { useState } from 'react';

const popularSearches = [
    'Website Design',
    'WordPress',
    'Logo Design',
    'AI Services'
];

export default function Featured() {
    const [search, setSearch] = useState('');
    const navigate = useNavigate();

    function handleClick() {
        navigate(`/categories/search?search=${search}`)
    }

    return (
        <div className='Featured'>
            <div className='Featured__container'>
                <div className='Featured__container__left'>
                    <h1>Find the perfect <span>freelance</span> services for your business</h1>

                    <div className='search'>
                        <div className='search__input'>
                            <FiSearch />
                            <input type='text' placeholder='Try "building mobile app"' onChange={(e) => setSearch(e.target.value)} />
                        </div>
                        
                        <button className='search__button' onClick={handleClick}>Search</button>
                    </div>

                    <div className='popular'>
                        <span>Popular:</span>

                        {popularSearches.map((searchItem, index) => (
                            <Link to={`/categories/search?search=${searchItem}`} key={`popSearch-${index}`}>{searchItem}</Link>
                        ))}
                    </div>
                </div>

                <div className='Featured__container__right'>
                    {/** for an image */}
                </div>
            </div>
        </div>
    )
}