import React from 'react';
import {Link} from 'react-router-dom';


const Navigation = () => (
    <ul className="navigation__list">
        <li className="navigation__item"><Link className="navigation__button" to="/">blog</Link></li>
        <li className="navigation__item"><Link className="navigation__button" to="/gallery">galeria</Link></li>
    </ul>
)

export default Navigation