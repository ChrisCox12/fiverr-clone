import Carousel from '../carousel/carousel';
import './popularServices.css';
import popularServicesData from '../../data/popularServices.json';


export default function PopularServices() {

    return (
        <div className='PopularServices'>
            <h2>Popular professional services</h2>

            <Carousel services={popularServicesData} />
        </div>
    )
}