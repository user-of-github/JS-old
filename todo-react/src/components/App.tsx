import React from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'

import {About} from './pages/About/About'
import {Home} from './pages/Home/Home'
import {Navbar} from './navbar/Navbar'

import Style from './App.module.css'


export const App = (): JSX.Element => (
    <BrowserRouter>
        <Navbar/>
        <div className={Style.container}>
            <Switch>
                <Route path={'/'}
                       exact={true}
                       component={Home}/>
                <Route path={'/about'}
                       component={About}/>
            </Switch>
        </div>
    </BrowserRouter>
)
