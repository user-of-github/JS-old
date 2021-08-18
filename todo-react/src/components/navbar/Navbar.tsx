import {NavLink} from 'react-router-dom'

import Style from './Navbar.module.css'


export const Navbar = (): JSX.Element => (
    <nav className={Style.navbar}>
        <div className={Style.container}>
            <h1 className={Style.brand}>Note App</h1>
            <ul className={Style.links}>
                <NavLink to={'/'} className={Style.linkItem} exact={true}>
                    Home
                </NavLink>
                <NavLink to={'/about'} className={Style.linkItem}>
                    About
                </NavLink>
            </ul>
        </div>
    </nav>
)