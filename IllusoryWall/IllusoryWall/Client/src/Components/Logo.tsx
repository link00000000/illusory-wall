import React, { Component } from 'react'
import styles from './Logo.module.css'

type IProps = {
    small?: boolean
}
type IState = {}

export class Logo extends Component<IProps, IState> {
    static displayName = Logo.name

    constructor(props: IProps) {
        super(props)

        this.state = {}
    }

    render() {
        if (this.props.small) {
            return <span className={styles['logo']}>IW</span>
        }
        return <span className={styles['logo']}>Illusory Wall</span>
    }
}
