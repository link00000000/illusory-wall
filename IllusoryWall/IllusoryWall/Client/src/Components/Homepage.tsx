import {
    AimOutlined,
    FileSearchOutlined,
    LineChartOutlined
} from '@ant-design/icons'
import { blue } from '@ant-design/colors'
import { Col, Row, Typography } from 'antd'
import React, { FunctionComponent } from 'react'

interface IProps {}

export const Homepage: FunctionComponent<IProps> = (props: IProps) => {
    return (
        <div>
            <Row
                justify='center'
                style={{ marginBottom: '64px', marginTop: '64px' }}
            >
                <Col xs={24}>
                    <Typography.Title
                        style={{
                            fontFamily:
                                "'Optimus', 'Times New Roman', Times, serif",
                            color: 'rgba(0, 0, 0, 0.7)',
                            fontSize: '64px',
                            textAlign: 'center',
                            filter: 'drop-shadow(2px 4px 6px rgba(0, 0, 0, .5))'
                        }}
                    >
                        Illusory Wall
                    </Typography.Title>
                </Col>
            </Row>
            <Row justify='center'>
                <Col
                    xs={{ span: 20 }}
                    lg={{ span: 8 }}
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        flexDirection: 'column',
                        marginBottom: '48px',
                        marginTop: '48px'
                    }}
                >
                    <FileSearchOutlined
                        style={{
                            fontSize: '88px',
                            color: blue.primary,
                            filter: 'drop-shadow(2px 4px 6px rgba(0, 0, 0, .2))'
                        }}
                    />
                    <Typography.Title
                        style={{
                            marginTop: '32px',
                            filter: 'drop-shadow(2px 4px 6px rgba(0, 0, 0, .4))'
                        }}
                    >
                        Explore
                    </Typography.Title>
                    <Typography.Paragraph style={{ textAlign: 'center' }}>
                        View detailed reports on the the enemies of Dark Souls
                        3.
                    </Typography.Paragraph>
                </Col>
                <Col
                    xs={{ span: 20 }}
                    lg={{ span: 8 }}
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        flexDirection: 'column',
                        marginBottom: '48px',
                        marginTop: '48px'
                    }}
                >
                    <LineChartOutlined
                        style={{
                            fontSize: '88px',
                            color: blue.primary,
                            filter: 'drop-shadow(2px 4px 6px rgba(0, 0, 0, .2))'
                        }}
                    />
                    <Typography.Title
                        style={{
                            marginTop: '32px',
                            filter: 'drop-shadow(2px 4px 6px rgba(0, 0, 0, .4))'
                        }}
                    >
                        Compare
                    </Typography.Title>
                    <Typography.Paragraph style={{ textAlign: 'center' }}>
                        Compare statistics between enemies with charts, graphs,
                        and other visualizations.
                    </Typography.Paragraph>
                </Col>
                <Col
                    xs={{ span: 20 }}
                    lg={{ span: 8 }}
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        flexDirection: 'column',
                        marginBottom: '48px',
                        marginTop: '48px'
                    }}
                >
                    <AimOutlined
                        style={{
                            fontSize: '88px',
                            color: blue.primary,
                            filter: 'drop-shadow(2px 4px 6px rgba(0, 0, 0, .2))'
                        }}
                    />
                    <Typography.Title
                        style={{
                            marginTop: '32px',
                            filter: 'drop-shadow(2px 4px 6px rgba(0, 0, 0, .4))'
                        }}
                    >
                        Attack
                    </Typography.Title>
                    <Typography.Paragraph style={{ textAlign: 'center' }}>
                        Get a custom created Hitlist to track and huntdown
                        enemies in-game.
                    </Typography.Paragraph>
                </Col>
            </Row>
            <Row>
                <Col xs={24}>
                    <Typography.Title
                        level={3}
                        style={{
                            textAlign: 'center',
                            marginTop: '128px',
                            fontWeight: 'normal',
                            width: '100%'
                        }}
                    >
                        Start <Typography.Link>searching</Typography.Link> for
                        enemies to add them to your view!
                    </Typography.Title>
                </Col>
            </Row>
        </div>
    )
}
