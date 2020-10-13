import React, { Component } from 'react'
import styles from './NavMenu.module.css'

export class NavMenu extends Component {
    static displayName = NavMenu.name

    static pages: string[] = ['1', '2', '3', '4', '5']

    render() {
        return (
            <header>
                <ul className={styles.list}>
                    {NavMenu.pages.map((page) => (
                        <li className={styles.item}>
                            <a href={page}>Page {page}</a>
                        </li>
                    ))}
                </ul>
            </header>
        )
    }
}
