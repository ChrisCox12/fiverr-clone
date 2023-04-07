import './home.css';
import { Featured, TrustedBy, Carousel, Proposition, MainCategories, BusinessBanner, PopularServices, GetInspiredBy } from '../../components';


export default function Home() {
    return (
        <div className='Home'>
            <Featured />
            <TrustedBy />
            <PopularServices />
            <Proposition />
            <MainCategories />
            <BusinessBanner />
            {/* Go back to later
                <GetInspiredBy /> 
            */}
        </div>
    )
}