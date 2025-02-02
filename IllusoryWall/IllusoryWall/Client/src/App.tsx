import 'antd/dist/antd.css'
import React from 'react'
import { Route, Switch, useLocation } from 'react-router'
import { DefaultLayout } from './Layouts/DefaultLayout'
import { _404 } from './Routes/404'
import { AddEnemy } from './Routes/AddEnemy'
import { Comparison } from './Routes/Comparison'
import { HitLists } from './Routes/HitLists'
import { ModifyEnemy } from './Routes/ModifyEnemy'
import { ModifyEnemyId } from './Routes/ModifyEnemyId'
import { RemoveEnemy } from './Routes/RemoveEnemy'
import { ViewEnemy } from './Routes/ViewEnemy'

const SearchableRoutes = ['/', '/comparison']

function App() {
    const location = useLocation()

    return (
        <div className='App'>
            <DefaultLayout
                disableSearch={!SearchableRoutes.includes(location.pathname)}
            >
                <Switch>
                    <Route exact path='/' component={ViewEnemy} />
                    <Route exact path='/comparison' component={Comparison} />
                    <Route exact path='/hitlists' component={HitLists} />
                    <Route exact path='/add' component={AddEnemy} />
                    <Route exact path='/update' component={ModifyEnemy} />
                    <Route exact path='/update/:id' component={ModifyEnemyId} />
                    <Route exact path='/remove' component={RemoveEnemy} />
                    <Route path='*' component={_404} />
                </Switch>
            </DefaultLayout>
        </div>
    )
}

export default App
