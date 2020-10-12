import React from 'react'
import { Route } from 'react-router'
import './App.css'
import { Hello } from './Components/Hello'
import { Layout } from './Components/Layout'

function App() {
    return (
        <div className='App'>
            <Layout>
                <Route exact path='/' component={Hello} />
                <Route exact path='/1' render={() => <Hello title='1' />} />
                <Route exact path='/2' render={() => <Hello title='2' />} />
                <Route exact path='/3' render={() => <Hello title='3' />} />
                <Route exact path='/4' render={() => <Hello title='4' />} />
                <Route exact path='/5' render={() => <Hello title='5' />} />
            </Layout>
        </div>
    )
}

export default App
