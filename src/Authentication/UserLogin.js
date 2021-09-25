import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import { Button, Col, Container, NavDropdown, Row } from 'react-bootstrap'
import { API } from '../UtilComponents/API';
import AlertComponent from '../UtilComponents/AlertComponent';
import authUser from './AuthUser';

function UserLogin({updateUser}) {

    const [msg, setMsg] = useState('');
    const history = useHistory();

    const loginUserInitial = { email: '', pass: '' }

    const handleSubmit = values => {

        alert(JSON.stringify(values))

        fetch(API + '/auth/user', { method: "POST", headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(values) })
            .then(res => res.json())
            .then(res => {
                console.log(res)
                setMsg(<AlertComponent msg="Succesfully Logged in" type="success" />);
                authUser.loginUser(res, () => { setTimeout(() => { updateUser(); history.push('/user/my-shelf'); }, 2000) })


            })
            .catch(e => {
                setMsg(<AlertComponent msg="Invalid Credential.." type="warning" />);
                setTimeout(() => { setMsg('') }, 3000);
            })


    }

    const userScemaValidation = Yup.object({
        email: Yup.string().required('Required').email('Please enter correct email').trim(),
        pass: Yup.string().required('Required').min(6, 'Minimum 6 characters').trim()
    })


    return (
        <div>

            <Container className="" >

                <Row className="justify-content-center  p-4">

                    <Col lg={6} md={8} className=" justify-content-center rounded  bg-light py-4 px-sm-4 border rounded  shadow-lg  ">
                        <h1 className="text-center text-success">USER LOGIN</h1>
                        <NavDropdown.Divider />
                        {msg}
                        <Formik initialValues={loginUserInitial} onSubmit={handleSubmit} validationSchema={userScemaValidation} >
                            <Form>
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <Field className="form-control" placeholder="Email here " type="email" name="email" />
                                    <ErrorMessage name="email">
                                         { m => <div className="text-danger">{m}</div> }
                                    </ErrorMessage>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="pass">Pass</label>
                                    <Field className="form-control" placeholder="Password here " type="password" name="pass" />
                                    <ErrorMessage name="pass">
                                         { m => <div className="text-danger">{m}</div> }
                                    </ErrorMessage>
                                </div>

                                <div className="d-grid mt-3">
                                    <Button variant="outline-success" type="submit" size="lg" >Login</Button>
                                </div>
                                <hr />
                                <p className="text-center"> New User ? <Link to="/SignUp">Register Here</Link> | Admin? <Link to="/admin-login">Admin-login</Link>  </p>
                            </Form>
                        </Formik>

                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default UserLogin
