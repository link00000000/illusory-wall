import 'antd/dist/antd.css'
import React from 'react'
import { Route, Switch, useHistory, useLocation } from 'react-router'
import { DefaultLayout } from './Layouts/DefaultLayout'
import { _404 } from './Routes/404'
import { AddEnemy } from './Routes/AddEnemy'
import { ModifyEnemy } from './Routes/ModifyEnemy'
import { ModifyEnemyId } from './Routes/ModifyEnemyId'
import { RemoveEnemy } from './Routes/RemoveEnemy'
import { ViewEnemy } from './Routes/ViewEnemy'
import { ViewEnemiesStore } from './Store/ViewEnemiesStore'

function App() {
    const location = useLocation()
    const history = useHistory()

    /**
     * Update query string when the viewed enemies changes
     */
    ViewEnemiesStore.subscribe(
        (s) => s.enemies,
        (enemies) => {
            const ids = Object.keys(enemies)
            const queryString = '?id=' + ids.join('&id=')
            history.push({ search: queryString })
        }
    )

    return (
        <div className='App'>
            <DefaultLayout disableSearch={location.pathname != '/'}>
                <Switch>
                    <Route exact path='/' component={ViewEnemy} />
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
