import './trustedBy.css';
import trustedByCompanies from '../../data/trustedBy.json';

/* const images = [
    { src: 'https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/meta.12b5e5c.png', alt: 'meta' },
    { src: 'https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/google.61e78c8.png', alt: 'google' },
    { src: 'https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/netflix.96c5e3f.png', alt: 'netflix' },
    { src: 'https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/pandg.0f4cfc2.png', alt: 'p&g' },
    { src: 'https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/paypal.305e264.png', alt: 'paypal' }
] */

export default function TrustedBy() {

    return (
        <div className='TrustedBy'>
            <span>Trusted By:</span>

            <ul>
                {trustedByCompanies.map((company, index) => (
                    <li key={`trustedby-${index}`}>
                        <img 
                            src={company.src} 
                            alt={company.alt} 
                            key={`tb-image-${index}`} 
                        />
                    </li>
                ))}
            </ul>
        </div>
    )
}