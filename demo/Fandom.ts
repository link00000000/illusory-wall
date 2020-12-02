import { JSDOM } from 'jsdom'

export const FetchUrls = async () => {
    const {
        window: { document }
    } = await JSDOM.fromURL(
        'https://darksouls.fandom.com/wiki/Category:Dark_Souls_III:_Enemies'
    )

    return Array.from<HTMLAnchorElement>(
        document.body.querySelectorAll(
            '.category-page__member-link:not([title^="Category:"]):not([title^="User blog:"])'
        )
    ).map((a) => a.href)
}
