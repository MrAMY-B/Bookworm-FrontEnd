
import React from 'react'
import { Button, Col, Container, Form, NavDropdown, Row } from 'react-bootstrap'

function AdminLogin() {
    return (
        <div>
            
            <Container  className="" >
                
                <Row className="justify-content-center  p-4">
                <Col lg={6} md={8} xs={11} className=" justify-content-center rounded  bg-light p-sm-4 border rounded  shadow-lg  ">
                       <h1 className="text-center text-success">Admin Login</h1>
                        <NavDropdown.Divider />
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>Email </Form.Label>
                                <Form.Control type="email" placeholder="Enter email here" />
                            </Form.Group>

                            <Form.Group className="mb-4">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Enter Password Here" />
                            </Form.Group>
                            <div className="d-grid ">
                                <Button variant="outline-success" type="submit" size="lg" >Login</Button>
                            </div>
                        </Form>

                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default AdminLogin
