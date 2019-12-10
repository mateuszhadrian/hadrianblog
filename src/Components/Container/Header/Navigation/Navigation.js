import React from 'react';
import {Link} from 'react-router-dom';
import Brand from '../Brand/Brand'




class Navigation extends React.Component {
    state = {
        showMenu: false,
    }

    toggleMenu = () => {
        const {showMenu} = this.state;
        this.setState(()=>({showMenu: !showMenu}))
    }

    render() {
        const {showMenu} = this.state;
        return (
            <>
            <div className="header__brandAndBurger">
                <Brand />
                <button className='navigation__burger' onClick={()=>this.toggleMenu()}><i class="fas fa-bars"></i></button>
            </div>
            <ul className="navigation__list">
        <li className={ "navigation__item " + (showMenu ? "show__menu": "")}><Link className="navigation__button" to="/">blog</Link></li>
        <li className={ "navigation__item " + (showMenu ? "show__menu": "")}><Link className="navigation__button" to="/gallery">galeria</Link></li>
    </ul>
    </>
        )
    }
    
}

export default Navigation