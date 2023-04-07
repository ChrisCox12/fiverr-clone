import './getInspiredBy.css';
import { Link } from 'react-router-dom';
import Carousel from '../carousel/carousel';
import projects from '../../data/inspirationProjects.json';


export default function GetInspiredBy() {
    /* let inspirationProjects = new Array(7);
    inspirationProjects.fill(projects);

    console.log(inspirationProjects) */

    return (
        <div className='GetInspiredBy'>
            <div className='GetInspiredBy__container'>
                <div className='container-header'>
                    <h2>Get inspired with projects made by our freelancers</h2>
                    <Link to={'/'}>See More Projects {'>'}</Link>
                </div>

                <Carousel projects={projects} />
            </div>
        </div>
    )
}