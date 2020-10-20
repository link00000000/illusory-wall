import React from 'react'
import { Route } from 'react-router'
import { AddEnemy } from './AddEnemy'
import './App.css'

function App() {
    return (
        <div className='App'>
            <Route exact path='/add-enemy' component={AddEnemy} />
        </div>
    )
}

export default App
