import './breadcrumbs.css';
import { Link } from 'react-router-dom';
import { AiOutlineHome, AiOutlineCheck } from 'react-icons/ai';


export default function Breadcrumbs(props: { category: string | undefined }) {

    return (
        <ul className='breadcrumbs'>
            <li>
                <Link to={'/'} className='home-crumb'>
                    <AiOutlineHome />
                </Link>
            </li>

           {props.category && (
                <li>
                    <span className='divider'>/</span>
                    <Link to={`/category/${props.category}`}>{props.category}</Link>
                </li>
            )}
        </ul>
    )
}