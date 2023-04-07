import './footer.css';
import { Link } from 'react-router-dom';
import { 
    FaTwitter, 
    FaFacebook, 
    FaLinkedin, 
    FaPinterest, 
    FaInstagram 
} from 'react-icons/fa';
import { BsGlobe2, BsUniversalAccessCircle } from 'react-icons/bs';
import { 
    footerCategories, 
    footerAbout, 
    footerCommunity, 
    footerMore, 
    footerSupport 
} from '../../data/footerData';

/* const categories = [
    { link: '/categories/Graphics & Design', title: 'Graphics & Design' },
    { link: '/categories/Digital Marketing', title: 'Digital Marketing' },
    { link: '/categories/Writing & Translation', title: 'Writing & Translation' },
    { link: '/categories/Video & Animation', title: 'Video & Animation' },
    { link: '/categories/Music & Audio', title: 'Music & Audio' },
    { link: '/categories/Programming & Tech', title: 'Programming & Tech' },
    { link: '/categories/Data', title: 'Data' },
    { link: '/categories/Business', title: 'Business' },
    { link: '/categories/Lifestyle', title: 'Lifestyle' },
    { link: '/categories/Photography', title: 'Photography' },
]

const about = [
    { link: '/', title: 'Careers' },
    { link: '/', title: 'Press & News' },
    { link: '/', title: 'Partnerships' },
    { link: '/', title: 'Privacy Policy' },
    { link: '/', title: 'Terms of Service' },
    { link: '/', title: 'Intellectual Property Claims' },
    { link: '/', title: 'Investor Relations' },
    { link: '/', title: 'Contact Sales' },
]

const support = [
    { link: '/', title: 'Help & Support' },
    { link: '/', title: 'Trust & Safety' },
    { link: '/', title: 'Selling on Fiverr' },
    { link: '/', title: 'Buying on Fiverr' },
]

const community = [
    { link: '/', title: 'Customer Success Stories' },
    { link: '/', title: 'Community Hub' },
    { link: '/', title: 'Forum' },
    { link: '/', title: 'Events' },
    { link: '/', title: 'Blog' },
    { link: '/', title: 'Influencers' },
    { link: '/', title: 'Affiliates' },
    { link: '/', title: 'Podcast' },
    { link: '/', title: 'Invite a Friend' },
    { link: '/', title: 'Become a Seller' },
    { link: '/', title: 'Community Standards'}
]

const more = [
    { link: '/', title: 'Fiverr Business' },
    { link: '/', title: 'Fiverr Pro' },
    { link: '/', title: 'Fiverr Logo Maker' },
    { link: '/', title: 'Fiverr Guides' },
    { link: '/', title: 'Get Inspired' },
    { link: '/', title: 'Fiverr Select' },
    { link: '/', title: 'ClearVoice' },
    { link: '/', title: 'Fiverr Workspace' },
    { link: '/', title: 'Learn' },
    { link: '/', title: 'Working Not Working' }
] */


export default function Footer() {


    return (
        <div className='Footer'>
            <div className='Footer__container'>
                <div className='footer-links'>
                    <div className='footer-links__categories'>
                        <h6>Categories</h6>

                        <ul>
                            {footerCategories.map((category, index) => (
                                <li key={`footer-cat-${index}`}>
                                    <Link to={category.link}>{category.title}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className='footer-links__about'>
                        <h6>About</h6>

                        <ul>
                            {footerAbout.map((item, index) => (
                                <li key={`footer-about-${index}`}>
                                    <Link to={'/'}>{item.title}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className='foooter-links__support'>
                        <h6>Support</h6>

                        <ul>
                            {footerSupport.map((supportItem, index) => (
                                <li key={`footer-support-${index}`}>
                                    <Link to={'/'}>{supportItem.title}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className='foooter-links__community'>
                        <h6>Support</h6>

                        <ul>
                            {footerCommunity.map((communityItem, index) => (
                                <li key={`footer-community-${index}`}>
                                    <Link to={'/'}>{communityItem.title}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className='foooter-links__more'>
                        <h6>Support</h6>

                        <ul>
                            {footerMore.map((moreItem, index) => (
                                <li key={`footer-more-${index}`}>
                                    <Link to={'/'}>{moreItem.title}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className='footer-bottom'>
                    <div className='left'>
                        <h2>fiverr</h2>
                        <p>© Fiverr International Ltd. 2023</p>
                    </div>

                    <div className='right'>
                        <ul className='socials'>
                            <li>
                                <Link to={'https://twitter.com/fiverr'}><FaTwitter /></Link>
                            </li>
                            <li>
                                <Link to={'https://facebook.com/Fiverr'}><FaFacebook /></Link>
                            </li>
                            <li>
                                <Link to={'https://www.linkedin.com/company/fiverr-com/'}><FaLinkedin /></Link>
                            </li>
                            <li>
                                <Link to={'https://www.pinterest.com/fiverr/'}><FaPinterest /></Link>
                            </li>
                            <li>
                                <Link to={'https://www.instagram.com/fiverr/'}><FaInstagram /></Link>
                            </li>
                        </ul>

                        <div className='settings-buttons'>
                            <button><BsGlobe2 /> English</button>

                            <button>$ USD</button>

                            <button><BsUniversalAccessCircle /></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}