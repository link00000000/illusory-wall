import React, { Component } from 'react'
import logo from '../logo.svg'

type HelloProps = {
    title: string
}

export class Hello extends Component<HelloProps> {
    constructor(props: HelloProps) {
        super(props)
    }

    render() {
        return (
            <header className='App-header'>
                <img src={logo} className='App-logo' alt='logo' />
                <p>This is page {this.props.title}</p>
                <a
                    className='App-link'
                    href='https://reactjs.org'
                    target='_blank'
                    rel='noopener noreferrer'
                >
                    Learn React
                </a>
            </header>
        )
    }
}
