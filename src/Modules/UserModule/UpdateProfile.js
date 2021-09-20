import { useFormik } from 'formik';
import * as Yup from 'yup';
import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import AlertComponent from '../../UtilComponents/AlertComponent';
import { API } from '../../UtilComponents/API';

function UpdateProfile() {

    let u_id = 2;

    const [user, setUser] = useState({ uname:'',email:'', mobile:'', pass:'',  confpass:'',
                                    address:{ address:'', city:'', pin_code:''}})

  
    const [res,setRes] = useState({})
    const history = useHistory();


    useEffect(() => {
        fetch(API+'/user/'+u_id).then(res => res.json()).then(res=>setUser(res))
        .catch(err=> console.log(err))
     }, [u_id])
   
    
    
    const validationSchema = Yup.object({
        uname:Yup.string().required('Required').min(4,"Name Shoud have at least 4 characters"),
        pass:Yup.string().required('Password is required').min(6,'Minimum 6 character'),  
        confpass:Yup.string().required('Password is required').oneOf([Yup.ref('pass'), null], 'Passwords must match')  ,
        email:Yup.string().required('Email is required').email('Please Enter Valid Email'),
        mobile:Yup.string().required('Mobile Number is required').length(10,"Mobile should have 10 digits").matches(/^[6-9]{1}[0-9]{9}$/,'Please enter valid mobile number'),
        address:Yup.object({
            address:Yup.string().required('Required').min(4,'Minimum 4 charcter'),
            city:Yup.string().required('Required'),
            pin_code:Yup.string().required('Required')
        })

    })
    let handleSubmit = (values) => { 
         alert(JSON.stringify(values)) 

         fetch('https://amol-bookworm-api.herokuapp.com/user/',{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify(values)})
        .then(res => { console.log(res); setRes({res:<AlertComponent type="success" msg={'User Added'} />});  formik.resetForm(); setTimeout(()=>{history.push("/User-Login")} ,2000) })
        .catch(err=> { console.log(err); setRes({res: <AlertComponent type="danger" msg={'User NOT Added'} />}) })
    }
    let formik = useFormik({initialValues:user,onSubmit:handleSubmit,validationSchema,enableReinitialize:true})
    

    return (
        <div>
            
           


            

            

            <Container  className="" >
                
                <Row className="justify-content-center  p-4">
                    <Col md={10} xs={11} className=" justify-content-center rounded  bg-light p-sm-4 border rounded  shadow-lg  ">
                        {res.res}
                     <h1 className="text-center text-success">Update My rofile</h1>

                        <Form onSubmit={formik.handleSubmit}>
                            <Row>
                                <Col md={6}>
                                    <Form.Group className="mb-2">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control type="text" {...formik.getFieldProps('uname')} placeholder="Enter your name" />
                                        <Form.Text className="text-muted ">
                                            { formik.touched.uname && formik.errors.uname ? formik.errors.uname : null }
                                        </Form.Text>
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="mb-2">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control type="email" {...formik.getFieldProps('email')} placeholder="Enter email here" />
                                        <Form.Text className="text-muted ">
                                            { formik.touched.email && formik.errors.email ? formik.errors.email : null }
                                        </Form.Text>
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="mb-2">
                                        <Form.Label>Mobile</Form.Label>
                                        <Form.Control type="text" {...formik.getFieldProps('mobile')} placeholder="Enter Mobile number here" />
                                        <Form.Text className="text-muted ">
                                            { formik.touched.mobile && formik.errors.mobile ? formik.errors.mobile : null }
                                        </Form.Text>
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="mb-2">
                                        <Form.Label>Address</Form.Label>
                                        <Form.Control type="text"  {...formik.getFieldProps('address.address')} placeholder="Enter Address here" />
                                        <Form.Text className="text-muted ">
                                            { formik.touched.address?.address && formik.errors.address?.address ? formik.errors.address?.address : null }
                                        </Form.Text>
                                    </Form.Group>
                                </Col>
                                <Col md={6}>  
                                    <Form.Group className="mb-2">
                                        <Form.Label>City</Form.Label>
                                        <Form.Control type="text"  {...formik.getFieldProps('address.city')} placeholder="Enter City here" />
                                        <Form.Text className="text-muted ">
                                            { formik.touched.city && formik.errors.address?.city ? formik.errors.address?.city : null }
                                        </Form.Text>
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="mb-2">
                                        <Form.Label>Pin Code</Form.Label>
                                        <Form.Control type="number" {...formik.getFieldProps('address.pin_code')} placeholder="Enter city code here" />
                                        <Form.Text className="text-muted ">
                                            { formik.touched.ress?.pin_code && formik.errors.ress?.pin_code ? formik.errors.address?.pin_code : null }
                                        </Form.Text>
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="mb-2">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type="password" {...formik.getFieldProps('pass')}  placeholder="Password here" />
                                        <Form.Text className="text-muted ">
                                            { formik.touched.pass && formik.errors.pass ? formik.errors.pass : null }
                                        </Form.Text>
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="mb-2">
                                        <Form.Label>Confirm Password</Form.Label>
                                        <Form.Control type="password" {...formik.getFieldProps('confpass')}  placeholder="Re-enter password here" />
                                        <Form.Text className="text-muted ">
                                            { formik.touched.confpass && formik.errors.confpass ? formik.errors.confpass    : null }
                                        </Form.Text>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row className="justify-content-center text-center mt-3">
                                <Col md={6} className="d-grid">
                                    <Button variant="outline-success" type="submit"  >Sign up</Button>
                                   <p> Already Signed up? <Link to="/User-login">Login</Link></p>
                                </Col>    
                            </Row>                            

                        </Form>


                    </Col>
                </Row>
            </Container>

            

        </div>
    )
}

export default UpdateProfile
