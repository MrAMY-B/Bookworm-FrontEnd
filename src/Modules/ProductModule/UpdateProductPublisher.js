import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { Col, Row,Button, Container } from 'react-bootstrap';
import AlertComponent from '../../UtilComponents/AlertComponent';
import { API } from '../../UtilComponents/API';

const UpdateProductPublisher = () => {

    let {prod_id} = useParams('prod_id');
    const history = useHistory();
    const [result, setResult] =useState('')
    const [product, setProduct] = useState({});
    const [pub,setPub] = useState({ name:'',
                                    email:'',
                                    mobile:'',
                                    address:{ address:'',city:'',pin_code:''},
                                    account:{ acc_number:'', bank_name:'',branch:'',acc_type:'',pan_no:'',ifsc:'' } })

    
    useEffect(()=>{
        fetch(API+'/product/'+prod_id)
        .then(res => res.json())
        .then(res=> {
            setProduct(res); 
            setPub(res.publisher); 

            fetch(API+'/account/'+res.publisher?.account?.acc_id)
                .then(res2 => res2.json())
                .then(res2=> {pub.account=res2; console.log(res2); console.log("request")})
                .catch( err => console.log(err) ) 

            console.log(res); 
            console.log("request")})
        .catch( err => console.log(err) )

        
        
    },[prod_id])

    
        let publisherValidator = Yup.object({
            name:Yup.string().required('Required'),
            email:Yup.string().required('Required').email('Enter valid email'),
            mobile:Yup.string().required('Required'),
            address:Yup.object({ address:Yup.string().required('Required'),city:Yup.string().required('Required'),pin_code:Yup.string().required('Required')}),
            account:Yup.object({ acc_number:Yup.string().required('Required').max(10,'Max 10 digit'), bank_name:Yup.string().required('Required'),branch:Yup.string().required('Required'),acc_type:Yup.string().required('Required'),pan_no:Yup.string().required('Required'),ifsc:Yup.string().required('Required') })
        })

        let submitHandle = (values) => {
            let x = JSON.stringify({...product,publisher:values})
            fetch(API+'/product/',
            {method:"PUT",headers:{'Content-Type':'application/json'},body:x})
        .then(res => { if(res.ok){
            setResult(<AlertComponent type="success" msg={'Publisher updated Successfully..'} />)
            setTimeout(()=>{ history.push("/admin/update-product/"+product.prod_id) } , 2000);
            console.log("SUCCESS");
        }
        else{
            setResult(<AlertComponent type="danger" msg={'Product Something went wron please try again'} />)
            setTimeout(()=> { setResult('') },4000)
            console.log(res); 
        }
    })
            

            console.log(x);
        }


    return (
        <Container fluid className="bg-light shadow pt-4 pb-4">
            <Formik initialValues={pub} onSubmit={submitHandle} validationSchema={publisherValidator} enableReinitialize={true}>
                <Form>
                    
                {/* ================================================================================================================= */}
                <Row >
                    <h4>Update Publisher Detail</h4> {result}
                    <Col className="col-md-4 col-6">
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <Field className="form-control" type="text" name="name" />
                            <ErrorMessage  name="name" >
                                         { m => <div className="text-danger">{m}</div> }
                                    </ErrorMessage>
                        </div>
                    </Col>

                    <Col className="col-md-4 col-6">
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <Field className="form-control" type="text"  id="email" name="email" />
                            <ErrorMessage   name="email" >
                                         { m => <div className="text-danger">{m}</div> }
                                    </ErrorMessage>
                        </div>
                    </Col>

                    <Col className="col-md-4 col-6">
                        <div className="form-group">
                                <label htmlFor="mobile">Mobile</label>
                                <Field className="form-control" type="text" id="mobile" name="mobile" />
                                <ErrorMessage name="mobile" >
                                         { m => <div className="text-danger">{m}</div> }
                                    </ErrorMessage>
                        </div>
                    </Col>
                    <Col className="col-md-4 col-6">
                        <div className="form-group">
                            <label htmlFor="address">Addres</label>
                            <Field className="form-control" type="text"  id="address" name="address.address" />
                            <ErrorMessage  name="address.address" >
                                         { m => <div className="text-danger">{m}</div> }
                                    </ErrorMessage>
                        </div>
                    </Col>

                    <Col className="col-md-4 col-6">
                        <div className="form-group">
                            <label htmlFor="city">City</label>
                            <Field className="form-control" type="text" id="city" name="address.city" />
                            <ErrorMessage name="address.city" >
                                         { m => <div className="text-danger">{m}</div> }
                                    </ErrorMessage>
                        </div>
                    </Col>
    
                    <Col className="col-md-4 col-6">
                        <div className="form-group">
                            <label htmlFor="pin_code">Pin Code</label>
                            <Field className="form-control" type="text" id="pin_code" name="address.pin_code" />
                            <ErrorMessage  name="address.pin_code" >
                                         { m => <div className="text-danger">{m}</div> }
                                    </ErrorMessage>
                        </div>     
                    </Col>
                </Row>
                <hr />
                {/* ============================ ACCOUNT DETAIL ============================ */}
                <Row>
                    <h6>Account Detail</h6>
                    <Col className="col-md-4 col-6">
                        <div className="form-group">
                            <label htmlFor="acc_number">Account Number</label>
                            <Field className="form-control" type="text" id="acc_number" name="account.acc_number" />
                            <ErrorMessage  name="account.acc_number" >
                                         { m => <div className="text-danger">{m}</div> }
                                    </ErrorMessage>
                        </div>     
                    </Col>

                    <Col className="col-md-4 col-6">
                        <div className="form-group">
                            <label htmlFor="bank_name">Bank Name</label>
                            <Field className="form-control" type="text" id="bank_name" name="account.bank_name" />
                            <ErrorMessage  name="account.bank_name" >
                                         { m => <div className="text-danger">{m}</div> }
                                    </ErrorMessage>
                        </div>     
                    </Col>

                    <Col className="col-md-4 col-6">
                        <div className="form-group">
                            <label htmlFor="branch">Branch</label>
                            <Field className="form-control" type="text" id="branch" name="account.branch" />
                            <ErrorMessage  name="account.branch" >
                                         { m => <div className="text-danger">{m}</div> }
                                    </ErrorMessage>
                        </div>     
                    </Col>

                    <Col className="col-md-4 col-6">
                        <div className="form-group">
                            <label htmlFor="acc_type">Account Type</label>
                            <Field className="form-control" type="text" id="acc_type" name="account.acc_type" />
                            <ErrorMessage name="account.acc_type" >
                                         { m => <div className="text-danger">{m}</div> }
                                    </ErrorMessage>
                        </div>     
                    </Col>

                    <Col className="col-md-4 col-6">
                        <div className="form-group">
                            <label htmlFor="ifsc">IFSC</label>
                            <Field className="form-control" type="text" id="ifsc" name="account.ifsc" />
                            <ErrorMessage name="account.ifsc" >
                                         { m => <div className="text-danger">{m}</div> }
                                    </ErrorMessage>
                        </div>     
                    </Col>

                    <Col className="col-md-4 col-6">
                        <div className="form-group">
                            <label htmlFor="pan_no">PAN Number</label>
                            <Field className="form-control" type="text" id="pan_no" name="account.pan_no" />
                            <ErrorMessage name="account.pan_no" >
                                         { m => <div className="text-danger">{m}</div> }
                                    </ErrorMessage>
                        </div>     
                    </Col>


                </Row>
                    <Button className="mt-4" type="submit" variant="outline-success">Submit</Button>
                {/* ================================================================================================================= */}
                </Form>
            </Formik>
        </Container>
    )
}

export default UpdateProductPublisher
