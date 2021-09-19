import Style from './Login.module.css'
import {LocalMovies} from '@material-ui/icons'
import React from 'react'


export const Login = (): JSX.Element => {
    return (
        <div className={Style.container}>
            <div className={Style.top}>
                <LocalMovies fontSize={'inherit'} style={{color: '#E82525'}}/>
                <button className={Style.logInButton}>Sign In</button>
            </div>
            <div className={Style.body}>
                <form>
                    <h2>Sign In</h2>
                    <input type="email" placeholder={'Email or phone number'}/>
                    <input type="password" placeholder={'Password'}/>
                    <button className={Style.logInButton}>Sign In</button>
                    <span>New to MovieApp?   <b>  Sign up now!</b></span>
                </form>
            </div>
        </div>
    )
}