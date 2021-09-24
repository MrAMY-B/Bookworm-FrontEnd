import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { Col, Row, Button, Container } from 'react-bootstrap';
import AlertComponent from '../../UtilComponents/AlertComponent';
import { API } from '../../UtilComponents/API';

const UpdateBeneficiary = () => {

    let {ban_id} = useParams('ban_id')
    const history = useHistory();
    const [result, setResult] = useState('')
    const [beneficiary , setBeneficiary] = useState({
        name: '',
        email: '',
        mobile: '',
        address: { address: '', city: '', pin_code: '' },
        account: { acc_number: '', bank_name: '', branch: '', acc_type: '', pan_no: '', ifsc: '' }
    })

    useEffect(() => {
        fetch(API+'/beneficiary/'+ban_id).then(res => res.json()).then(res=>setBeneficiary(res))
        .catch(err=> console.log(err))
     } ,[ban_id])

    





    let publisherValidator = Yup.object({
        name: Yup.string().required('Required'),
        email: Yup.string().required('Required'),
        mobile: Yup.string().required('Required'),
        address: Yup.object({ address: Yup.string().required('Required'), city: Yup.string().required('Required'), pin_code: Yup.string().required('Required') }),
        account: Yup.object({ acc_number: Yup.string().required('Required').max(10, 'Max 10 digit'), bank_name: Yup.string().required('Required'), branch: Yup.string().required('Required'), acc_type: Yup.string().required('Required'), pan_no: Yup.string().required('Required'), ifsc: Yup.string().required('Required') })
    })

    let submitHandle = (values) => {
        
        let x = JSON.stringify(values)
        alert(x)
        fetch(API + '/beneficiary/',
            { method: "PUT", headers: { 'Content-Type': 'application/json' }, body: x })
            .then(res => {
                if (res.ok) {
                    setResult(<AlertComponent type="success" msg={'Beneficiary Added Successfully..'} />)
                    setTimeout(() => { history.push("/admin/baneficiaries") }, 2000);
                    console.log("SUCCESS");
                }
                else {
                    setResult(<AlertComponent type="danger" msg={'Something went wrong please try again'} />)
                    setTimeout(() => { setResult('') }, 4000)
                    console.log(res);
                }
            })


        console.log(x);
    }


    return (
        <Container fluid className="bg-light shadow pt-4 pb-4 mt-4">
            <Formik initialValues={beneficiary} onSubmit={submitHandle} validationSchema={publisherValidator} enableReinitialize={true}>
                <Form>

                    {/* ================================================================================================================= */}
                    <Row >
                        <h4>Update Beneficiary Detail</h4> {result}
                        <Col className="col-md-4 col-6">
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <Field className="form-control" type="text" name="name" />
                                <ErrorMessage className="form-text text-muted" name="name" />
                            </div>
                        </Col>

                        <Col className="col-md-4 col-6">
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <Field className="form-control" type="text" id="email" name="email" />
                                <ErrorMessage className="form-text text-muted" name="email" />
                            </div>
                        </Col>

                        <Col className="col-md-4 col-6">
                            <div className="form-group">
                                <label htmlFor="mobile">Mobile</label>
                                <Field className="form-control" type="text" id="mobile" name="mobile" />
                                <ErrorMessage className="form-text text-muted" name="mobile" />
                            </div>
                        </Col>
                        <Col className="col-md-4 col-6">
                            <div className="form-group">
                                <label htmlFor="address">Addres</label>
                                <Field className="form-control" type="text" id="address" name="address.address" />
                                <ErrorMessage className="form-text text-muted" name="address.address" />
                            </div>
                        </Col>

                        <Col className="col-md-4 col-6">
                            <div className="form-group">
                                <label htmlFor="city">City</label>
                                <Field className="form-control" type="text" id="city" name="address.city" />
                                <ErrorMessage className="form-text text-muted" name="address.city" />
                            </div>
                        </Col>

                        <Col className="col-md-4 col-6">
                            <div className="form-group">
                                <label htmlFor="pin_code">Pin Code</label>
                                <Field className="form-control" type="text" id="pin_code" name="address.pin_code" />
                                <ErrorMessage className="form-text text-muted" name="address.pin_code" />
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
                                <ErrorMessage className="form-text text-muted" name="account.acc_number" />
                            </div>
                        </Col>

                        <Col className="col-md-4 col-6">
                            <div className="form-group">
                                <label htmlFor="bank_name">Bank Name</label>
                                <Field className="form-control" type="text" id="bank_name" name="account.bank_name" />
                                <ErrorMessage className="form-text text-muted" name="account.bank_name" />
                            </div>
                        </Col>

                        <Col className="col-md-4 col-6">
                            <div className="form-group">
                                <label htmlFor="branch">Branch</label>
                                <Field className="form-control" type="text" id="branch" name="account.branch" />
                                <ErrorMessage className="form-text text-muted" name="account.branch" />
                            </div>
                        </Col>

                        <Col className="col-md-4 col-6">
                            <div className="form-group">
                                <label htmlFor="acc_type">Account Type</label>
                                <Field className="form-control" type="text" id="acc_type" name="account.acc_type" />
                                <ErrorMessage className="form-text text-muted" name="account.acc_type" />
                            </div>
                        </Col>

                        <Col className="col-md-4 col-6">
                            <div className="form-group">
                                <label htmlFor="ifsc">IFSC</label>
                                <Field className="form-control" type="text" id="ifsc" name="account.ifsc" />
                                <ErrorMessage className="form-text text-muted" name="account.ifsc" />
                            </div>
                        </Col>

                        <Col className="col-md-4 col-6">
                            <div className="form-group">
                                <label htmlFor="pan_no">PAN Number</label>
                                <Field className="form-control" type="text" id="pan_no" name="account.pan_no" />
                                <ErrorMessage className="form-text text-muted" name="account.pan_no" />
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
export default UpdateBeneficiary
