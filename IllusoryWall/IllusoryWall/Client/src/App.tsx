import 'antd/dist/antd.css'
import React from 'react'
import { Route, Switch } from 'react-router'
import { _404 } from './Routes/404'
import { AddEnemy } from './Routes/AddEnemy'
import { ModifyEnemy } from './Routes/ModifyEnemy'
import { ViewEnemy } from './Routes/ViewEnemy'

function App() {
    return (
        <div className='App'>
            <Switch>
                <Route path='/add' component={AddEnemy} />
                <Route path='/update/:id' component={ModifyEnemy} />
                <Route path='/' component={ViewEnemy} />
                <Route path='*' component={_404} />
            </Switch>
        </div>
    )
}

export default App
