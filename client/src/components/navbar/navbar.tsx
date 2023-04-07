import './navbar.css';
import { useState, useEffect, useContext } from 'react';
import { FaBars } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axios';
import { UserContext, UserDispatchContext } from '../../hooks/UserContext';
import { menuItem } from '../../data/navbarData';
/* const menuItem = [
    'Graphics & Design',
    'Digital Marketing',
    'Writing & Translation',
    'Video & Animation',
    'Music & Audio',
    'Programming & Tech',
    'Business',
    'Lifestyle',
    'AI Services'
]; */


export default function Navbar() {
    const [active, setActive] = useState(false); // for the pop-in menu underneath the navbar
    const [open, setOpen] = useState(false); // for a pop-up menu with user actions when a user is logged in
    const { pathname } = useLocation();
    /* const currentUser = {
        id: 1,
        username: 'John',
        isSeller: true
    }; */
    //const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const navigate = useNavigate();
    const currentUser = useContext(UserContext);
    const dispatch = useContext(UserDispatchContext)

    //console.log(currentUser)

    function isActive() {
        window.scrollY > 0 ? setActive(true) : setActive(false);
    }

    useEffect(() => {
        // we add an event listener that monitors how far a user has scrolled on a page;
        // if they've scrolled far enough, then we want to display a menu underneath the navbar
        window.addEventListener('scroll', isActive);

        return () => {
            window.removeEventListener('scroll', isActive);
        }
    }, []);
    
    useEffect(() => {
        if(localStorage.getItem('currentUser') && !currentUser) {
            const user = JSON.parse(localStorage.getItem('currentUser') || '');
            //console.log(user)
            if(dispatch) {
                dispatch({
                    type: 'login',
                    username: user?.username,
                    userId: user?._id,
                    image: user?.image,
                    country: user?.country,
                    isSeller: user?.isSeller
                });
            }
        }
    }, []);

    async function handleLogout() {
        try {
            await axiosInstance.post('auth/logout');
            localStorage.removeItem('currentUser');
            // hacky way to get around typing problems for dispatch object;
            // Typescript would say "Cannot invoke an object which is possibly 'null'"
            if(dispatch) dispatch({ type: 'logout' });
            navigate('/');
        } 
        catch(error) {
            console.log(error);
        }
    }
    

    return (
        <div className={`Navbar ${(active || pathname !== '/') ? 'nav-active': ''}`}>
            <div className='Navbar__container'>
                <div className='Navbar__container__head'>
                    <div className='Navbar__container__bars'>
                        <FaBars />
                    </div>

                    <div className='Navbar__container__logo'>
                        <Link to={'/'}>
                            <span className='logo-text'>fiverr</span>
                            <span className='logo-dot'>.</span>
                        </Link>    
                    </div>
                </div>
                
                <div className='Navbar__container__tail'>
                    <div className='Navbar__container__links'>
                        <Link to={'/'} className='link-text'>Fiverr Business</Link>
                        <Link to={'/'} className='link-text'>Explore</Link>

                        {!currentUser?.isSeller && ( 
                            <Link to={'/'} className='link-text'>Become a Seller</Link> 
                        )}

                        {!currentUser && <Link to={'/login'} className='link-text sign-in'>Sign In</Link>}

                        {!currentUser && ( 
                            <Link to={'/register'} className='link-text join'>Join</Link> 
                        )}

                        {currentUser && (
                            <div className='user' onClick={() => setOpen(prev => !prev)}>
                                <img src={currentUser?.image || ''} alt='user-image' />
                                <span>{currentUser?.username}</span>

                                {open && (
                                    <div className='user__actions'>
                                        {currentUser?.isSeller && (
                                            <>
                                                <Link to={'/mygigs'}>Gigs</Link>
                                                <Link to={'/add-gig'}>Add New Gig</Link>
                                            </>
                                        )}

                                        <Link to={'/orders'}>Orders</Link>
                                        <Link to={'/messages'}>Messages</Link>
                                        <Link to={'/'} onClick={handleLogout}>Logout</Link>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            
            {(active || pathname !== '/') && (
                <>
                    <hr />
                    <div className='Navbar__categories-menu'>
                        <ul className='categories'>
                            {menuItem.map((item, index) => (
                                <li className='category-item' key={index}>
                                    <Link to={`/categories/${item}`}>{item}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <hr />
                </>
            )}
        </div>
    )
}