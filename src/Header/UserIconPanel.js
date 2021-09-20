import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import {  Book, ListNested, Pen, Shop, Type } from 'react-bootstrap-icons'
import {  FiGitMerge, FiUsers } from 'react-icons/fi'

function UserIconPanel() {
    return (
        <Container>
            <Row className="text-center d-flex justify-content-center">
                <Col>
                    <FiGitMerge />
                </Col>
                <Col>
                    <Type/>
                </Col>
                <Col>
                    <ListNested />
                </Col>
               
                <Col>
                    <Book/>
                </Col>
                <Col>
                    <FiUsers/>
                </Col>
                <Col>
                    <Pen/>
                </Col>
                <Col>
                    <Shop/>
                </Col>
            </Row>
            
        </Container>
    )
}

export default UserIconPanel
