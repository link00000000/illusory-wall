import { Result, Image, Tooltip } from 'antd'
import React, { FunctionComponent } from 'react'

interface IProps {
    message?: string
    button?: JSX.Element
}

const QUOTES = [
    'Still closed... Still closed... Mmm...',
    'Mmm...mmm... Mm! Oh-hoh! Forgive me. I was absorbed in thought.',
    '...here I sit, in quite a pickle. Weighing my options, so to speak! Hah hah hah hah!',
    'Perhaps I could try some rolling... Bah, no chance. My head would spin. Mmm...',
    'Good things come to those who wait! Hah hah hah hah!',
    'Mmm... Hrmmmmm... Whatever can be done?',
    "Ah, you again! ...I'll think of something. We can overcome this together!",
    'Stranger things have happened. Sometimes one only has to give it some time.',
    'Sng...sng... Zzzzzz...',
    '...Oh, there you are.'
]

const CREDIT =
    'https://steamcommunity.com/sharedfiles/filedetails/?id=974499189'

export const ErrorMessage: FunctionComponent<IProps> = (props: IProps) => {
    const [quote, setQuote] = React.useState<string>()

    React.useEffect(() => {
        const index = Math.floor(Math.random() * Math.floor(QUOTES.length))
        setQuote(QUOTES[index])
    }, [])

    return (
        <Result
            icon={
                <Tooltip title={'Credit: ' + CREDIT}>
                    <Image src='/onion.png' preview={false} />
                </Tooltip>
            }
            title={props.message ?? 'An Error Occurred'}
            subTitle={`"${quote}" \u2015 Siegmeyer of Catarina`}
            extra={props.button}
        />
    )
}
