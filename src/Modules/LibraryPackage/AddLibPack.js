import { Formik,Form,Field,ErrorMessage } from 'formik';
import React, { useState } from 'react'
import { Button, Col, NavDropdown, Row } from 'react-bootstrap'
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup'
import AlertComponent from '../../UtilComponents/AlertComponent';
import { API } from '../../UtilComponents/API';

function AddLibPack() {

    const history = useHistory();
    const [msg, setMsg] = useState()
    const pack = { duration:'',amount:'',no_prod:'' };

    
    const submitHandler = (values)=>{
        console.log(values);
        console.log("SUBMITTING");
        let x = JSON.stringify(values);
        console.log(x);
        
        fetch(API+'/lib-pack/', { method:'POST',headers:{ 'Content-Type':'application/json' },body: x}  )
            .then( res=>  {
                if(res.ok ){

                    setMsg( <AlertComponent type="success" msg="Success" /> )
                   setTimeout(()=>{ history.push('/library-package/'); },2000);
                }
            })
            .catch(err=> console.log(err))


    }
    let validateFeedback = Yup.object({
        duration:Yup.string().required('Required'),
        amount:Yup.string().required('Required'),
        no_prod:Yup.string().required('Required')
    })
    


    

    return (
        <>
        {msg}
        <Row className="justify-content-center  p-4">
            <Col md={6} sm={8} xs={11} className=" justify-content-center rounded  bg-light pt-4 pb-5 border rounded   shadow-lg">
            <h1 className="text-center text-success"> Add New Package </h1>
                <NavDropdown.Divider />
                <Formik initialValues={pack} onSubmit={submitHandler} validationSchema={validateFeedback} >
                            <Form>

                                    
                                    <Row>
                                        <Col>
                                            <div className="form-group">
                                            <label className="form-label" ><small>Duration in Days</small></label>
                                            <Field className="form-control" type="text" name="duration" />
                                            <ErrorMessage  name="duration">
                                                { m => <div className="text-danger">{m}</div> }
                                            </ErrorMessage>
                                                
                                            </div>
                                        </Col>
                                        <Col>
                                            <div className="form-group">
                                            <label className="form-label" ><small>Number of Products</small></label>
                                            <Field className="form-control" type="text" name="no_prod" />
                                            <ErrorMessage  name="no_prod">
                                                { m => <div className="text-danger">{m}</div> }
                                            </ErrorMessage>
                                            
                                        </div>
                                        </Col>
                                        <Col>
                                            <div className="form-group">
                                            <label className="form-label" ><small>Amount</small></label>
                                            <Field className="form-control" type="text" name="amount" />
                                            <ErrorMessage  name="amount">
                                                { m => <div className="text-danger">{m}</div> }
                                            </ErrorMessage>
                                                
                                            </div>
                                        </Col>
                                    </Row>
                                    
                                  
                                    <div className="my-4 d-grid">
                                        <Button variant="outline-success" type="submit">SUBMIT</Button>
                                    </div>
                            </Form>
                        </Formik>
            </Col>
        </Row>
    </>
    )
}
export default AddLibPack
