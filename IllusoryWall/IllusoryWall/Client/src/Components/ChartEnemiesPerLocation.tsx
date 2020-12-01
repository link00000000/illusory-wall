import React, { FunctionComponent } from 'react'
import { Doughnut } from 'react-chartjs-2'
import { Color } from '../Utils/Color'
import { IWEnemy } from '../Utils/Models'
import { IWLocation } from '../Utils/Models'

interface IProps {
    enemies: IWEnemy[]
}

export const ChartEnemiesPerLocation: FunctionComponent<IProps> = (
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

        var distinctlocs = locations
            .filter(
                (loc, i, arr) => arr.findIndex((c) => c.name === loc.name) === i
            )
            .map((l) => l.name)
        newData['labels'] = distinctlocs

        let counts: number[] = []
        for (var item of distinctlocs) {
            counts.push(
                locations.map((l) => l.name).filter((l) => l === item).length
            )
        }

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

        newData['datasets'] = []

        newData['datasets'].push({
            key: '0',
            label: 'Enemies',
            data: counts,
            backgroundColor: backgroundColors,
            borderColor: borderColors,
            borderWidth: 1
        })

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
