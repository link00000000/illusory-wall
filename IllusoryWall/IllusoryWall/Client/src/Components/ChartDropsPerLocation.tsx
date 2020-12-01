import React, { FunctionComponent } from 'react'
import { Doughnut } from 'react-chartjs-2'
import { Color } from '../Utils/Color'
import { IWEnemy } from '../Utils/Models'

interface IProps {
    enemies: IWEnemy[]
}

export const ChartDropsPerLocation: FunctionComponent<IProps> = (
    props: IProps
) => {
    const [data, setData] = React.useState<{}>({})

    React.useEffect(() => {
        if (props.enemies.length > 0) {
            mapData(props.enemies)
        }
    }, [props.enemies])

    const mapData = (enemies: IWEnemy[]) => {
        const newData: { [key: string]: any } = {}

        var locations = enemies.flatMap((e) => e.locations)
        var drops = enemies.flatMap((d) => d.drops)

        var distinctLocations = Array.from(
            new Set(locations.map((l) => l.name))
        )

        newData['labels'] = distinctLocations

        let counts: number[] = []
        for (var item of distinctLocations) {
            counts.push(
                drops.map((d) => d.location).filter((d) => d === item).length
            )
        }
        counts = counts.filter((value) => value !== 0)

        let borderColors: string[] = []
        let backgroundColors: string[] = []

        for (let i = 0; i < counts.length; ++i) {
            const color = Color.random()
            const borderColor = color.rgba()

            color.a = 0.5
            const backgroundColor = color.rgba()

            borderColors.push(borderColor)
            backgroundColors.push(backgroundColor)
        }

        newData['datasets'] = [
            {
                key: '0',
                label: 'Drops',
                data: counts,
                backgroundColor: backgroundColors,
                borderColor: borderColors,
                borderWidth: 1
            }
        ]

        setData(newData)
    }

    return (
        <Doughnut
            data={data}
            options={{
                legend: { display: false }
            }}
            datasetKeyProvider={({ key }) => key}
        />
    )
}
