import React from 'react'
import { useFormik } from 'formik'
import { Button, Col, Container, Form, NavDropdown, Row } from 'react-bootstrap'

function Temp() {

    const initialValues = {uname:'',upass:''};

    const onSubmit = values => { alert(JSON.stringify(values))};

    const validate = values => {
        let errors = {}
        
        if(!values.uname && formik.touched.uname){
            errors.uname ="Required";
        }else if(values.uname.length<4 && formik.touched.uname){
            errors.uname="Name should be greater then 4 letter";
        }
        if(!values.upass && formik.touched.upass){
            errors.upass ="Required";
        }else if(values.upass.length<4 && formik.touched.upass){
            errors.upass="Password should be greater then 4 letter";
        }
            

        return errors;
    }
    

    const formik = useFormik({ initialValues, onSubmit,validate })

    // console.log(formik.errors);


    // const validateUser = (user)=>{
    //     const error={};
    //     console.log(user)
    //     return error; 
    //}


    return (
        <>  





            <h1 className="text-center">Formik Example</h1>
            <Container  className="" >
                
                <Row className="justify-content-center  p-4">
                    <p> {formik.values.uname} | {formik.values.upass} </p>
                    <Col lg={6} md={8} xs={11} className=" justify-content-center rounded  bg-light pt-4 pb-5 border rounded   shadow-lg">
                        <h1>Login Form</h1>
                        <NavDropdown.Divider />
                        <Form onSubmit={formik.handleSubmit}>
                            <Form.Group className="mb-3">
                                <Form.Label>Email </Form.Label>
                                <Form.Control type="email" name="uname" 
                                    value={formik.values.uname} 
                                    onChange={formik.handleChange} 
                                    onBlur={formik.handleBlur}
                                    placeholder="Enter email here" />
                                <Form.Text className="text-muted">
                               { formik.touched.uname && formik.errors.uname ? formik.errors.uname : null }
                                </Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-4">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="text" name="upass" value={formik.values.upass} onBlur={formik.handleBlur}    onChange={formik.handleChange} placeholder="Enter Password Here" />
                                <Form.Text className="text-muted">
                               { formik.touched.upass && formik.errors.upass ? formik.errors.upass : null }
                                </Form.Text>
                            </Form.Group>
                            <div className="d-grid ">
                                <Button variant="outline-success"size="lg" type="submit">Login</Button>
                            </div>
                        </Form>

                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Temp
