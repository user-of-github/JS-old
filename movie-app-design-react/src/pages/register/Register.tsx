import Style from './Register.module.css'
import {LocalMovies} from '@material-ui/icons'
import React from 'react'


export const Register = (): JSX.Element => {
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const inputEmailReference: React.MutableRefObject<HTMLInputElement | null> = React.useRef(null)
    const inputPasswordReference: React.MutableRefObject<HTMLInputElement | null> = React.useRef(null)
    const handleStart = (): void => setEmail(inputEmailReference!.current!.value.trim())
    const handleFinish = (): void => setPassword(inputPasswordReference!.current!.value.trim())


    return (
        <div className={Style.container}>
            <div className={Style.top}>
                <LocalMovies fontSize={'inherit'} style={{color: '#E82525'}}/>
                <button className={Style.logInButton}>Sign In</button>
            </div>
            <div className={Style.body}>
                <h2>Unlimited MARVEL movies, TV-shows & more...</h2>
                <h3>Watch anywhere. Cancel anytime.</h3>
                <p>
                    Ready to watch ? Enter your e-mail to create or restart your membership.
                </p>
                {
                    email === '' ?
                        <div className={Style.input}>
                            <input type="email" placeholder={'your@email.adress'} ref={inputEmailReference}/>
                            <button className={Style.registerButton} onClick={() => handleStart()}>Get started !
                            </button>
                        </div>
                        :
                        <form className={Style.input}>
                            <input type="password" placeholder={'password'} ref={inputPasswordReference}/>
                            <button className={Style.registerButton} onClick={() => handleFinish()}>Start !
                            </button>
                        </form>
                }
            </div>
        </div>
    )
}