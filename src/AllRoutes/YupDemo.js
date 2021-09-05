import { useFormik } from 'formik'
import React from 'react'
import { Button,Col, Container, Form, Row } from 'react-bootstrap'
import * as Yup from 'yup'

function YupDemo() {

    const validationSchema = Yup.object({
        uname:Yup.string()
                .required('Required').min(4,"Name Shoud have at least 4 characters"),
        page:Yup.string()
                .required('Required'),
        changes:Yup.string()
                .required('Please suggest'),
        email:Yup.string()
                .required('Email is required')
                .email('Please Enter Valid Email')
    })

    const initialValues = {
        uname:'',
        page:'',
        changes:'',
        email:''
    }

    const onSubmit = values => {
        console.log(JSON.stringify(values))
    }

    const formik = useFormik({ initialValues,onSubmit,validationSchema })

    return (
        <>
             <h1 className="text-center text-success">Feedback Form</h1>
            <Container >
                
                <Row className="justify-content-center  p-4">
                    <p>  </p>
                    <Col lg={6} md={8} xs={11} className=" justify-content-center rounded  bg-light pt-4 pb-5 border rounded   shadow-lg">
                        <Form onSubmit={formik.handleSubmit}>
                            <Form.Group>
                                <Form.Label>Name</Form.Label>
                                <Form.Control typr="text" placeholder="Your name" {...formik.getFieldProps('uname')}  />
                                <Form.Text className="text-muted ">
                                    { formik.touched.uname && formik.errors.uname ? formik.errors.uname : null }
                                </Form.Text>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Page Name</Form.Label>
                                <Form.Control typr="text" placeholder="Enter here" {...formik.getFieldProps('page')}  />
                                <Form.Text className="text-muted ">
                                    { formik.touched.page && formik.errors.page ? formik.errors.page : null }
                                </Form.Text>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Changes need to be done</Form.Label>
                                <Form.Control typr="text" placeholder="Enter here" {...formik.getFieldProps('changes')}  />
                                <Form.Text className="text-muted ">
                                    { formik.touched.changes && formik.errors.changes ? formik.errors.changes : null }
                                </Form.Text>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Your email</Form.Label>
                                <Form.Control typr="text" placeholder="Enter here" {...formik.getFieldProps('email')}  />
                                <Form.Text className="text-muted ">
                                    { formik.touched.email && formik.errors.email ? formik.errors.email : null }
                                </Form.Text>
                            </Form.Group>

                            <Form.Group className="mt-4 d-grid">
                                <Button variant="outline-success" type="submit" size="lg" >Submit</Button>
                            </Form.Group>

                            
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default YupDemo
