/**
 * Make sure to create an admin account before hand
 * Default credentials: username=demo, password=demo
 * DEMO_USERNAME and DEMO_PASSWORD environment variables can be used to override defaults
 */

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

import { FetchUrls } from './Fandom'
import { login } from '../IllusoryWall/IllusoryWall/Client/src/API/Auth'
import { fetch as scrape } from '../IllusoryWall/IllusoryWall/Client/src/API/WebScraper'
import { commit as addEnemy } from '../IllusoryWall/IllusoryWall/Client/src/API/AddEnemy'
import { blue, red, green } from 'chalk'
;(async () => {
    const baseURL = 'https://localhost:5001'

    const urls = await FetchUrls()
    console.log(blue(`Fetched ${urls.length} urls from Fandom`))

    const username = process.env.DEMO_USERNAME || 'demo'
    const password = process.env.DEMO_PASSWORD || 'demo'
    console.log(`Authenticating as ${username}`)

    let successes = 0
    let failures: string[] = []

    let token: string
    try {
        token = await login({ username, password }, baseURL)
    } catch (error) {
        console.log(red('Unable to authenticate'))
        console.log(red(error.message))
        process.exit(1)
    }
    console.log(blue('Authenitcated successfully'))

    for await (const url of urls) {
        console.log(`Scraping: ${url}`)
        try {
            const enemy = await scrape(url, baseURL)

            console.log(`Adding: ${enemy.name}`)
            const error = await addEnemy(enemy, token, baseURL)
            if (error) {
                console.log(red(`Error adding ${enemy.name}`))
                console.log(red(error.message))
                failures.push(url)
            } else {
                console.log(green(`Added ${enemy.name} successfully`))
                ++successes
            }
        } catch (error) {
            console.log(red(`Error scraping ${url}`))
            console.log(red(error.message))
            failures.push(url)
        }
    }

    console.log()
    if (successes > 0) {
        console.log(green(`Added ${successes} new enemies to database`))
    }

    if (failures.length > 0) {
        console.log(
            red(
                `Failed to added ${failures.length} enemies\n${failures.join(
                    '\n'
                )}}`
            )
        )
    }
})()
