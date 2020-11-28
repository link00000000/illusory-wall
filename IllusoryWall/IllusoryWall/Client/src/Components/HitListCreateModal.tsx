import { Form, InputNumber, Modal } from 'antd'
import React, { FunctionComponent } from 'react'

interface IProps {
    visible: boolean
    onSubmit?: (length: number) => Promise<void>
    onCancel?: () => void
}

export const HitListCreateModal: FunctionComponent<IProps> = (
    props: IProps
) => {
    const [visible, setVisible] = React.useState<boolean>(props.visible)
    const [form] = Form.useForm<{ length: number }>()

    React.useEffect(() => {
        setVisible(props.visible)
    }, [props.visible])

    const handleSubmit = async () => {
        const { length } = await form.validateFields()
        form.resetFields()
        if (props.onSubmit) {
            await props.onSubmit(length)
        }
    }

    const handleCancel = () => {
        form.resetFields()
        props.onCancel && props.onCancel()
    }

    return (
        <Modal
            title='Create new Hitlist'
            visible={visible}
            okText='Create'
            onOk={handleSubmit}
            onCancel={handleCancel}
        >
            <Form form={form} layout='vertical'>
                <Form.Item name='length' label='Hitlist Length'>
                    <InputNumber min={1} placeholder={'8'}></InputNumber>
                </Form.Item>
            </Form>
        </Modal>
    )
}
