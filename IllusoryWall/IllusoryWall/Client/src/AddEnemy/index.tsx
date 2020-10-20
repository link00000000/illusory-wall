import React, { Component } from 'react'
import { AddEnemyForm } from './AddEnemyForm'
import { AddEnemyLayout as Layout } from './AddEnemyLayout'

type IProps = {}
type IState = {}

export class AddEnemy extends Component<IProps, IState> {
    static displayName = AddEnemy.name

    render() {
        return (
            <Layout>
                <AddEnemyForm />
            </Layout>
        )
    }
}
