import React, { FunctionComponent } from 'react'
import { Doughnut } from 'react-chartjs-2'
import { IWDrop, IWEnemy } from '../Utils/Models'
import { IWLocation } from '../Utils/Models'

interface IProps {
    enemies: IWEnemy[]
}

export const ChartDropsPerLocation: FunctionComponent<IProps> = (props: IProps) => {
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

        var distinctlocs = locations
            .filter((loc, i, arr) => arr.findIndex((c) => c.name === loc.name) === i)
            .map((l) => l.name)

        newData['labels'] = distinctlocs

        let counts: number[] = []
        for (var item of distinctlocs) {
            counts.push(drops.map((d) => d.location).filter((d) => d === item).length)
        }

        let backcolors: string[] = []
        let bordcolors: string[] = []
        let r: number
        let g: number
        let b: number
        for (let i = 0; i < counts.length; ++i) {
            r = Math.floor(Math.random() * 200)
            g = Math.floor(Math.random() * 200)
            b = Math.floor(Math.random() * 200)
            backcolors.push(('rgba(' + r + ', ' + g + ', ' + b + ', ' + '0.5)'))
            bordcolors.push(('rgba(' + r + ', ' + g + ', ' + b + ', ' + '1)'))
        }

        newData['datasets'] = []

        newData['datasets'].push({
            key: '0',
            label: 'Drops',
            data: counts,
            backgroundColor: backcolors,
            borderColor: bordcolors,
            borderWidth: 1
        })


        setData(newData)
    }

    return (
        <Doughnut
            data={data}
            options={{
                legend: { display: false },
            }}
            datasetKeyProvider={({ key }) => key}
        />
    )

}