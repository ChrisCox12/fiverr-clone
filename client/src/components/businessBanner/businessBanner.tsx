import './businessBanner.css';
import { FiCheckCircle } from 'react-icons/fi';
import { Link } from 'react-router-dom';


export default function BusinessBanner() {

    return (
        <div className='BusinessBanner'>
            <div className='BusinessBanner__container'>
                <div className='container-text'>
                    <h2>A business solution designed for <span>teams</span></h2>
                    
                    <p>Upgrade to a curated experience packed with tools and benefits, dedicated to businesses</p>

                    <ul>
                        <li>
                            <span><FiCheckCircle /></span>
                            Connect to freelancers with proven business experience
                        </li>
                        <li>
                            <span><FiCheckCircle /></span>
                            Get matched with the perfect talent by a customer success manager
                        </li>
                        <li>
                            <span><FiCheckCircle /></span>
                            Manage teamwork and boost productivity with one powerful workspace
                        </li>
                    </ul>

                    <Link to={'/'}>Explore Fiverr Business</Link>
                </div>

                <div className='container-image'>
                    <img 
                        src='https://fiverr-res.cloudinary.com/q_auto,f_auto,w_870,dpr_1.0/v1/attachments/generic_asset/asset/d9c17ceebda44764b591a8074a898e63-1599597624757/business-desktop-870-x1.png' 
                        alt='Fiverr Business' 
                    />
                </div>
            </div>
        </div>
    )
}