import './proposition.css';
import { FiCheckCircle } from 'react-icons/fi';
import propVideo from '../../assets/videos/fiverr-prop-video.mp4';


export default function Proposition() {

    return (
        <div className='Proposition'>
            <div className='Proposition__container'>
                <div className='Proposition__container__content'>
                    <div className='proposition-text'>
                        <h2>A whole world of freelance talent at your fingertips</h2>

                        <ul>
                            <li>
                                <h6>
                                    <span><FiCheckCircle /></span>
                                    The best for every budget
                                </h6>
                                <p>Find high-quality services at every price point. No hourly rates, just project-based pricing.</p>
                            </li>

                            <li>
                                <h6>
                                    <span><FiCheckCircle /></span>
                                    Quality work done quickly
                                </h6>
                                <p>Find the right freelancer to begin working on your project within minutes.</p>
                            </li>

                            <li>
                                <h6>
                                    <span><FiCheckCircle /></span>
                                    Protected payments, every time
                                </h6>
                                <p>Always know what you'll pay upfront. Your payment isn't released until you approve the work.</p>
                            </li>

                            <li>
                                <h6>
                                    <span><FiCheckCircle /></span>
                                    24/7 support
                                </h6>
                                <p>Questions? Our round-the-clock support team is available to help anytime, anywhere.</p>
                            </li>
                        </ul>
                    </div>

                    <div className='proposition-video'>
                        <video src={propVideo} controls />
                    </div>
                </div>
            </div>
        </div>
    )
}