import { Link } from 'react-router-dom';
import './mainCategories.css';
import graphicDesign from '../../assets/categoryImages/graphicsDesign.svg';
import digitalMarketing from '../../assets/categoryImages/digitalMarketing.svg';
import writingTranslation from '../../assets/categoryImages/writingTranslation.svg';
import videoAnimation from '../../assets/categoryImages/videoAnimation.svg';
import musicAudio from '../../assets/categoryImages/musicAudio.svg';
import programmingTech from '../../assets/categoryImages/programmingTech.svg';
import business from '../../assets/categoryImages/business.svg';
import lifestyle from '../../assets/categoryImages/lifestyle.svg';
import dataImage from '../../assets/categoryImages/data.svg';
import photography from '../../assets/categoryImages/photography.svg';


export default function MainCategories() {

    return (
        <div className='MainCategories'>
            <div className='MainCategories__container'>
                <h2>Explore the marketplace</h2>

                <ul>
                    <li>
                        <Link to={'/categories/Graphics & Design'}>
                            <img src={graphicDesign} alt='Graphics & Design' />
                            <span>Graphics & Design</span>
                        </Link>
                    </li>

                    <li>
                        <Link to={'/categories/Digital Marketing'}>
                            <img src={digitalMarketing} alt='Digital Marketing' />
                            <span>Digital Marketing</span>
                        </Link>
                    </li>

                    <li>
                        <Link to={'/categories/Writing & Translation'}>
                            <img src={writingTranslation} alt='Writing & Translation' />
                            <span>Writing & Translation</span>
                        </Link>
                    </li>

                    <li>
                        <Link to={'/categories/Video & Animation'}>
                            <img src={videoAnimation} alt='Video & Animation' />
                            <span>Video & Animation</span>
                        </Link>
                    </li>

                    <li>
                        <Link to={'/categories/Music & Audio'}>
                            <img src={musicAudio} alt='Music & Audio' />
                            <span>Music & Audio</span>
                        </Link>
                    </li>

                    <li>
                        <Link to={'/categories/Programming & Tech'}>
                            <img src={programmingTech} alt='Programming & Tech' />
                            <span>Programming & Tech</span>
                        </Link>
                    </li>

                    <li>
                        <Link to={'/categories/Business'}>
                            <img src={business} alt='Business' />
                            <span>Business</span>
                        </Link>
                    </li>

                    <li>
                        <Link to={'/categories/Lifestyle'}>
                            <img src={lifestyle} alt='Lifestyle' />
                            <span>Lifestyle</span>
                        </Link>
                    </li>

                    <li>
                        <Link to={'/categories/Data'}>
                            <img src={dataImage} alt='Data' />
                            <span>Data</span>
                        </Link>
                    </li>
                    
                    <li>
                        <Link to={'/categories/Photography'}>
                            <img src={photography} alt='Photography' />
                            <span>Photography</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}