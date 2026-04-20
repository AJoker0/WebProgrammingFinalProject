import logo from '../logo.svg';
import '../App.css';
import { NavLink } from 'react-router-dom';

const AboutPage = () => {
    return (
        <div>
            About Page
            <NavLink to="/">Back to home</NavLink>
        </div>
    )
}

export default AboutPage;