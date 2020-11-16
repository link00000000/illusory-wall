import { Form, Modal, Button, Input, notification } from 'antd'
import { FormInstance } from 'antd/lib/form'
import React, { FunctionComponent } from 'react'
import * as WebScraper from '../API/WebScraper'
import { IWEnemy } from '../Utils/Models'

interface IProps {
    onSubmit: (model: IWEnemy) => void
}

export const WebScraperModal: FunctionComponent<IProps> = (props: IProps) => {
    WebScraperModal.displayName = WebScraperModal.name

    const [showModal, setShowModal] = React.useState<boolean>(false)
    const [loading, setLoading] = React.useState<boolean>(false)

    let formRef = React.createRef<FormInstance>()

    const handleCancel = () => {
        formRef.current?.resetFields()
        setShowModal(false)
    }

    const handleSubmit = async () => {
        if (formRef.current == null) return

        setLoading(true)

        try {
            let formData: any
            try {
                formData = await formRef.current.validateFields()
            } catch (_e) {
                setLoading(false)
                return
            }

            if (formData === undefined) {
                setLoading(false)
                return
            }

            const { url }: { [key: string]: string } = formData

            formRef.current?.resetFields()

            const model = await WebScraper.fetch(url)
            props.onSubmit(model)
        } catch (error) {
            notification.error({ message: error.message })
        }

        setLoading(false)
        setShowModal(false)
    }

    return (
        <>
            <Modal
                visible={showModal}
                title='Fandom.com Web Scraper'
                okText='Scrape'
                onCancel={handleCancel}
                onOk={handleSubmit}
                confirmLoading={loading}
            >
                <Form
                    layout='horizontal'
                    ref={formRef}
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 16 }}
                >
                    <Form.Item
                        label='Url'
                        name='url'
                        rules={[{ required: true }]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
            <Button
                onClick={() => {
                    setShowModal(true)
                }}
            >
                Scrape from Fandom.com
            </Button>
        </>
    )
}
