import Style from './Navbar.module.css'
import {
    ArrowDropDown,
    LocalMovies,
    Notifications,
    Person,
    Search
} from '@material-ui/icons'
import React from 'react'


export const Navbar = (): JSX.Element => {
    const [isScrolled, setIsScrolled] = React.useState(false)

    const scrollingDetector = (): (() => void) => {
        isScrolled !== (window.pageYOffset !== 0) && setIsScrolled(window.pageYOffset !== 0)
        return () => window.removeEventListener('scroll', scrollingDetector)
    }

    window.addEventListener('scroll', scrollingDetector)

    return (
        <div className={`${Style.wrapper} ${isScrolled ? Style.scrolled : Style.notScrolled}`}>
            <div className={Style.container}>
                <div className={Style.left}>
                <span className={Style.logo}>
                    <LocalMovies fontSize={'inherit'} style={{color: '#E82525'}}/>
                </span>
                    <div className={Style.links}>
                        <span className={Style.link}>Homepage</span>
                        <span className={Style.link}>Series</span>
                        <span className={Style.link}>Movies</span>
                        <span className={Style.link}>New & popular</span>
                        <span className={Style.link}>My list</span>
                    </div>
                </div>
                <div className={Style.right}>
                    <div className={Style.icon}>
                        <Search fontSize={'inherit'}/>
                    </div>
                    <div className={Style.icon}>
                        <Notifications fontSize={'inherit'}/>
                    </div>
                    <div className={Style.icon}>
                        <Person fontSize={'inherit'}/>
                    </div>
                    <div className={Style.profile}>
                        <div className={Style.icon}>
                            <ArrowDropDown fontSize={'inherit'}/>
                        </div>
                        <div className={Style.options}>
                            <span className={Style.option}>Settings</span>
                            <span className={Style.option}>Log out</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}