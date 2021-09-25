import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useState } from 'react'
import { Col, Button,Container, Row } from 'react-bootstrap'
import { useHistory } from 'react-router';
import * as Yup from 'yup'
import AlertComponent from '../UtilComponents/AlertComponent';
import { API } from '../UtilComponents/API';



function Feedback() {

    const [st, setSt] = useState('')
    const history = useHistory();

    let feedback ={
        name:'',
        email:'',
        query:''
    }
    const submitHandler = (values)=>{
        console.log(values);
        console.log("SUBMITTING");
        let x = JSON.stringify(values);
        console.log(x);
        
        fetch(API+'/feedback/save', { method:'POST',headers:{ 'Content-Type':'application/json' },body: x}  )
            .then( res=>  {
                if(res.ok ){

                    setSt( <AlertComponent type="success" msg="Success" /> )
                   setTimeout(()=>{ history.push('/home'); },2000);
                }
            })
            .catch(err=> console.log(err))


    }
    let validateFeedback = Yup.object({
        name:Yup.string().required('Required').min(4,'Should be greter then 4 Characters'),
        email:Yup.string().required('Required').email('Please enter valid email'),
        query:Yup.string().required('Required').min(10,'Should be greater then 10')
    })


    return (
        <Container className="p-5 ">
            {st}
            <Row className=" p-sm-5 bg-light border shadow-lg justify-content-center">
                    <Col className="col-md-6 col-sm-10 ">
                        <h1 className="text-center text-success"> Feedback form </h1>
                        <Formik initialValues={feedback} onSubmit={submitHandler} validationSchema={validateFeedback} >
                            <Form>

                                    <div className="form-group">
                                        <label className="form-label" ><small>Name</small></label>
                                        <Field className="form-control" type="text" name="name" />
                                        <ErrorMessage  name="name">
                                            { m => <div className="text-danger">{m}</div> }
                                        </ErrorMessage>
                                            
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label" ><small>Email</small></label>
                                        <Field className="form-control" type="text" name="email" />
                                        <ErrorMessage  name="email">
                                            { m => <div className="text-danger">{m}</div> }
                                        </ErrorMessage>
                                            
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label" ><small>Query</small></label>
                                        <Field className="form-control" as="textarea" name="query" />
                                        <ErrorMessage  name="query">
                                            { m => <div className="text-danger">{m}</div> }
                                        </ErrorMessage>
                                            
                                    </div>
                                    <div className="my-4 d-grid">
                                        <Button variant="outline-success" type="submit">SUBMIT</Button>
                                    </div>
                            </Form>
                        </Formik>
                    </Col>
                    <hr />
            </Row>
        </Container>
    )
}

export default Feedback
