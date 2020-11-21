import React, { FunctionComponent } from 'react'
import { Bar } from 'react-chartjs-2'
import { IWEnemy } from '../Utils/Models'

interface IProps {
    enemies: IWEnemy[]
}

export const ChartHP: FunctionComponent<IProps> = (props: IProps) => {
    const [data, setData] = React.useState<{}>({})

    React.useEffect(() => {
        if (props.enemies.length > 0) {
            mapData(props.enemies)
        }
    }, [props.enemies])

    const mapData = (enemies: IWEnemy[]) => {
        const newData: { [key: string]: any } = {}

        const maxAmountLocations = enemies
            .map(
                (e) =>
                    e.locations.filter(
                        (l) => l.hp !== undefined && l.hp !== null
                    ).length
            )
            .reduce((prev, cur) => Math.max(prev, cur))

        newData['labels'] = enemies.map((e) => e.name)
        newData['datasets'] = []

        for (let i = 0; i < maxAmountLocations; ++i) {
            newData['datasets'].push({
                key: i.toString(),
                label: 'HP',
                data: enemies.map((e) =>
                    e.locations?.length > i ? e.locations[i].hp : 0
                ),
                backgroundColor: 'rgba(207, 19, 34, 0.5)',
                borderColor: 'rgba(207, 19, 34, 1)',
                borderWidth: 1
            })
        }

        setData(newData)
    }

    return (
        <Bar
            data={data}
            options={{
                legend: { display: false },
                scales: { yAxes: [{ ticks: { beginAtZero: true } }] }
            }}
            datasetKeyProvider={({ key }) => key}
        />
    )
}
