import 'antd/dist/antd.css'
import React from 'react'
import { Route, Switch } from 'react-router'
import { DefaultLayout } from './Layouts/DefaultLayout'
import { _404 } from './Routes/404'
import { AddEnemy } from './Routes/AddEnemy'
import { ModifyEnemy } from './Routes/ModifyEnemy'
import { RemoveEnemy } from './Routes/RemoveEnemy'
import { ViewEnemy } from './Routes/ViewEnemy'

function App() {
    return (
        <div className='App'>
            <DefaultLayout>
                <Switch>
                    <Route exact path='/' component={ViewEnemy} />
                    <Route exact path='/add' component={AddEnemy} />
                    <Route exact path='/update/:id' component={ModifyEnemy} />
                    <Route exact path='/remove' component={RemoveEnemy} />
                    <Route path='*' component={_404} />
                </Switch>
            </DefaultLayout>
        </div>
    )
}

export default App
