import React, { FunctionComponent } from 'react'
import { Button, Form, Input, Radio, Select } from 'antd'
import { IWEnemy } from '../Utils/Models'
import { EnemyClass } from '../Utils/Types'
import EnemyClassDisplayNames from '../Utils/EnemyClassDisplayNames'
import styles from './EnemyForm.module.css'
import { LocationList } from './LocationList'
import { DropList } from './DropList'

interface IProps {
    model: Partial<IWEnemy>
    onChange: (model: Partial<IWEnemy>) => void
    onSubmit?: (model: Partial<IWEnemy>) => void
    loading?: boolean
    buttonText?: string
}

export const EnemyForm: FunctionComponent<IProps> = (props: IProps) => {
    EnemyForm.displayName = EnemyForm.name

    const [model, setModel] = React.useState<Partial<IWEnemy>>(props.model)

    const getRespawns = () => {
        switch (model.respawns) {
            case true:
                return 1

            case false:
                return 0

            default:
                return -1
        }
    }

    const setRespawns = (value: number) => {
        switch (value) {
            case 1:
                setModel({ ...model, respawns: true })
                break
            case 0:
                setModel({ ...model, respawns: false })
                break
            case -1:
                setModel({ ...model, respawns: null })
                break
        }
    }

    React.useEffect(() => {
        setModel(props.model)
    }, [props.model])

    React.useEffect(() => {
        props.onChange(model)
        console.log(model)
    }, [model])

    return (
        <Form
            onFinish={() => {
                props.onSubmit && props.onSubmit(model)
            }}
            layout='horizontal'
            labelCol={_formOffset()}
            wrapperCol={_formSpan}
        >
            <label>
                <p
                    className={`${styles['form-label-text']} ${styles['required']}`}
                >
                    Name
                </p>
                <Input
                    disabled={props.loading}
                    onChange={({ target: { value } }) =>
                        setModel({ ...model, name: value })
                    }
                    value={model.name}
                    className={styles['form-input']}
                />
            </label>

            <label>
                <p className={styles['form-label-text']}>Description</p>
                <Input.TextArea
                    disabled={props.loading}
                    onChange={({ target: { value } }) =>
                        setModel({ ...model, description: value })
                    }
                    value={model.description}
                    className={styles['form-input']}
                />
            </label>

            <label>
                <p className={styles['form-label-text']}>Respawns</p>
                <Radio.Group
                    options={[
                        { label: 'Respawns', value: 1 },
                        { label: "Doesn't Respawn", value: 0 },
                        { label: 'Disabled', value: -1 } // Sets value to undefined
                    ]}
                    optionType='button'
                    size='small'
                    disabled={props.loading}
                    onChange={({ target: { value } }) => {
                        setRespawns(value)
                    }}
                    value={getRespawns()}
                    className={styles['form-input']}
                />
            </label>

            <label>
                <p className={styles['form-label-text']}>Class</p>
                <Select
                    showSearch
                    disabled={props.loading}
                    value={model.class}
                    onChange={(value) => setModel({ class: value })}
                    className={styles['form-input']}
                    style={{ width: '100%' }}
                >
                    {Object.values(EnemyClass).map((className, index) => (
                        <Select.Option value={className} key={index}>
                            {EnemyClassDisplayNames[className]}
                        </Select.Option>
                    ))}
                </Select>
            </label>

            <label>
                <p className={styles['form-label-text']}>Image Url</p>
                <Input
                    disabled={props.loading}
                    value={model.imagePath}
                    onChange={({ target: { value } }) =>
                        setModel({ imagePath: value })
                    }
                    className={styles['form-input']}
                />
            </label>

            <LocationList
                locations={model.locations ?? []}
                onChange={(locations) => setModel({ ...model, locations })}
            />

            <DropList
                drops={model.drops ?? []}
                onChange={(drops) => setModel({ ...model, drops })}
            />

            <Button type='primary' loading={props.loading}>
                {props.buttonText ?? 'Submit'}
            </Button>
        </Form>
    )
}

const _formSpan: { [key: string]: number } = {
    sm: 24,
    md: 24,
    lg: 12,
    xl: 12,
    xxl: 8
}

const _formOffset = (): { [key: string]: number } => {
    const max = 24
    const obj: { [key: string]: number } = {}
    Object.keys(_formSpan).forEach((key) => {
        obj[key] = Math.floor((max - _formSpan[key]) / 2)
    })

    return obj
}

const _formCombined = (): { [key: string]: {} } => {
    const obj: { [key: string]: {} } = {}
    Object.keys(_formSpan).forEach((key) => {
        obj[key] = {
            span: _formSpan[key],
            offset: _formOffset()[key]
        }
    })

    return obj
}

const initialValues: Partial<IWEnemy> | any = {
    respawns: 'null'
}
