import 'antd/dist/antd.css'
import React from 'react'
import { Route } from 'react-router'
import { AddEnemy } from './Routes/AddEnemy'

function App() {
    return (
        <div className='App'>
            <Route exact path='/add-enemy' component={AddEnemy} />
        </div>
    )
}

export default App
