import 'antd/dist/antd.css'
import React from 'react'
import { Route } from 'react-router'
import { AddEnemy } from './Routes/AddEnemy'
import { TestRoute } from './Routes/TestRoute'
import KebabToCamelCase from './Utils/KebabToCamelCase'

const Routes = [AddEnemy, TestRoute]

function PopulateRoutes(routes: React.ComponentClass[] = Routes) {
    return routes.map((component) => {
        const basename = component.name
        const path = '/' + KebabToCamelCase(basename)

        return <Route exact path={path} component={component} key={path} />
    })
}

function App() {
    return <div className='App'>{PopulateRoutes()}</div>
}

export default App
