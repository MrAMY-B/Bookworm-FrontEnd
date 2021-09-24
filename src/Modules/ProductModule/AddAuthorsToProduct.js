import * as Yup from 'yup'
import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react'
import { Col, Container, Button, Image, Row, Table } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { MdDelete } from 'react-icons/md';
import AlertComponent from '../../UtilComponents/AlertComponent';
import { API } from '../../UtilComponents/API';

function AddAuthorsToProduct() {


    const [result, setResult] = useState('')
    const [authors, setAuthors] = useState([])
    const history = useHistory();


    let { prod_id } = useParams('prod_id');
    const [product, setProduct] = useState({});
    const [allAuthors, setAllAuthors] = useState([])

    useEffect(() => { fetch(API + '/author/all').then(res => res.json()).then(res => setAllAuthors(res)); }, [prod_id]);
    useEffect(() => {
        fetch('https://amol-bookworm-api.herokuapp.com/product/' + prod_id)
            .then(res => res.json())
            .then(res => { setProduct(res); console.log(res); console.log("request") })
            .catch(err => console.log("INVALID PRODUCT ID"))

    }, [prod_id])


    const initAuthor = {
        name: '',
        email: '',
        mobile: '',
        address: { address: '', city: '', pin_code: '' },
        has_beneficiary: false,
        account: { acc_number: '', bank_name: '', branch: '', ifsc: '', acc_type: '', pan_no: '' }
        // beneficiary:{ name:'', email:'', mobile:''}
    }
    const handleSubmit = (values, onSubmitProps) => {
        console.log(JSON.stringify(values));
        let a = values;
        setAuthors([...authors, a])
        console.log(authors);
        onSubmitProps.resetForm();
    }

    const authorValidation = Yup.object({
        name: Yup.string().required("Required").min(3, 'Minimum 3 characters'),
        email: Yup.string().required("Required").email('Please enter correct email'),
        mobile: Yup.string().required('Mobile Number is required'),
        address: Yup.object({
            address: Yup.string().required('Required'),
            city: Yup.string().required('Required'),
            pin_code: Yup.string().required('Required')
        }),
        account: Yup.object({
            acc_number: Yup.string().required('Required').min(8, 'Account Number should contain 8-10 digits').max(10, 'Account Number should contain 8-10 digits'),
            bank_name: Yup.string().required('Required'),
            branch: Yup.string().required('Required'),
            ifsc: Yup.string().required('Required'),
            acc_type: Yup.string().required('Required'),
            pan_no: Yup.string().required('Required')
        })
    });

    const saveAuthors = () => {
        if (authors.length === 0) {
            setResult(<AlertComponent type="warning" msg="Please Add At least one Author or make dummy one." />)
            setTimeout(() => { setResult('') }, 5000)
        }
        else {
            console.log('====GOING TO SUBMIT=======')
            let prod = product;
            prod.authors = authors;
            console.log(prod)
            fetch('https://amol-bookworm-api.herokuapp.com/product/',
                { method: "PUT", headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(prod) })
                .then(res => {
                    if (res.ok) {
                        setResult(<AlertComponent type="success" msg={'Authors Added Successfully'} />)
                        setTimeout(() => { history.push("/admin/products") }, 2000);
                        console.log("SUCCESS");
                    }
                    else {
                        setResult(<AlertComponent type="danger" msg={'Product Something went wron please try again'} />)
                        console.log(res);
                    }
                })
        }

    }

    const deleteAuthor = (index, authName) => {
        let x = prompt('Are you sure! want to delete ' + authName + '?')

        if (!x) { console.log('Not Deleting'); }
        else if (x === 'AMOL') {
            authors.splice(index, 1);
            setResult(<AlertComponent type="danger" msg="Author is deleted" />)
            setTimeout(() => { setResult('') }, 5000)
        }
        else {
            console.log("Password wrong");
            setResult(<AlertComponent type="secondary" msg="You have entered wong password." />)
            setTimeout(() => { setResult('') }, 5000)
        }

    }
    const addAuthorToList = (e) => {
        let aut = allAuthors.find((a) => a.auth_id === parseInt(e.target.value))
        setAuthors([...authors, aut])
    }

    return (
        <>


            <Container fluid className="bg-light shadow p-sm-4">

                <h4 className="text-center text-success">Product Details</h4>
                <hr />
                <Row>
                    <Col className="col-md-4  col-5 mb-2" >
                        <Image src="https://picsum.photos/200/150" thumbnail />


                    </Col>
                    <Col className=" mx-auto  col-sm-7 mb-2" >

                        <Row>
                            <Col className="">
                                <p><small>ISBN</small></p>
                                <p><b>{product.isbn}</b></p>
                            </Col>
                        </Row>

                        <Row>
                            <Col className="">
                                <p><small>Title</small></p>
                                <p><b>{product.title}</b></p>
                            </Col>
                        </Row>

                        <Row>
                            <Col className="pt-md-2">
                                <p><small>Title in english</small></p>
                                <p><b>{product.title_in_english}</b></p>

                            </Col>
                        </Row>
                    </Col>
                </Row>
                <hr />

                <Row>
                    <Col>

                        <h1>Existing Authors ?</h1>
                        <div className="form-group">
                            <lable className="form-label">Select Already Exist</lable>
                            <select className="form-select" name="allAuth" onChange={(e) => addAuthorToList(e)} >
                                <option >Select One</option>
                                {allAuthors?.map((a, i) => <option key={i} value={a.auth_id}>[ID:{a.auth_id}] &nbsp;&nbsp;&nbsp;&nbsp; {a.name}</option>)}
                            </select>
                        </div>


                    </Col>
                </Row>
                <hr />


                <Formik initialValues={initAuthor} onSubmit={handleSubmit} validationSchema={authorValidation} >
                    <Form className="mb-3 pb-3">

                        <Row >
                            <h4>Add Author Detail</h4>
                            <Col className="col-md-4 col-6">
                                <div className="form-group input-group-sm">
                                    <div className="form-label">Name</div>
                                    <Field className="form-control" type="text" name="name" />
                                    <ErrorMessage name="name">
                                         { m => <div className="text-danger">{m}</div> }
                                    </ErrorMessage>
                                </div>
                            </Col>

                            <Col className="col-md-4 col-6">
                                <div className="form-group input-group-sm">
                                    <div className="form-label">Email</div>
                                    <Field className="form-control" type="text" name="email" />
                                    <ErrorMessage  name="email">
                                         { m => <div className="text-danger">{m}</div> }
                                    </ErrorMessage>
                                </div>
                            </Col>

                            <Col className="col-md-4 col-6">
                                <div className="form-group input-group-sm">
                                    <div className="form-label">Mobile</div>
                                    <Field className="form-control" type="text" name="mobile" />
                                    <ErrorMessage name="mobile" >
                                         { m => <div className="text-danger">{m}</div> }
                                    </ErrorMessage>
                                </div>
                            </Col>
                            <Col className="col-md-4 col-6">
                                <div className="form-group input-group-sm">
                                    <div className="form-label">Address</div>
                                    <Field className="form-control" type="text" name='address.address' />
                                    <ErrorMessage name="address.address" >
                                         { m => <div className="text-danger">{m}</div> }
                                    </ErrorMessage>
                                </div>
                            </Col>

                            <Col className="col-md-4 col-6">
                                <div className="form-group input-group-sm">
                                    <div className="form-label">City</div>
                                    <Field className="form-control" type="text" name="address.city" />
                                    <ErrorMessage name="address.city">
                                         { m => <div className="text-danger">{m}</div> }
                                    </ErrorMessage>
                                </div>
                            </Col>

                            <Col className="col-md-4 col-6">
                                <div className="form-group input-group-sm">
                                    <div className="form-label">Pincode</div>
                                    <Field className="form-control" type="text" name="address.pin_code" />
                                    <ErrorMessage name="address.pin_code" >
                                         { m => <div className="text-danger">{m}</div> }
                                    </ErrorMessage>
                                </div>
                            </Col>
                        </Row>
                       
                        <Row>
                            <h4>Authors Account Info</h4>
                            {/* account:{ acc_number:'334455667',bank_name:'Bank of india',branch:'Amrawati Road',ifsc:'957500',acc_type:'Saving',pan_no:'678955AB' } */}

                            <Col className="col-md-4 col-6">
                                <div className="form-group input-group-sm">
                                    <div className="form-label">Account No.</div>
                                    <Field className="form-control" type="text" name="account.acc_number" />
                                    <ErrorMessage name="account.acc_number" >
                                         { m => <div className="text-danger">{m}</div> }
                                    </ErrorMessage>
                                </div>
                            </Col>
                            <Col className="col-md-4 col-6">
                                <div className="form-group input-group-sm">
                                    <div className="form-label">Bank Name</div>
                                    <Field className="form-control" type="text" name="account.bank_name" />
                                    <ErrorMessage  name="account.bank_name">
                                         { m => <div className="text-danger">{m}</div> }
                                    </ErrorMessage>
                                </div>
                            </Col>
                            <Col className="col-md-4 col-6">
                                <div className="form-group input-group-sm">
                                    <div className="form-label">Branch Name.</div>
                                    <Field className="form-control" type="text" name="account.branch" />
                                    <ErrorMessage name="account.branch" >
                                         { m => <div className="text-danger">{m}</div> }
                                    </ErrorMessage>
                                </div>
                            </Col>
                            <Col className="col-md-4 col-6">
                                <div className="form-group input-group-sm">
                                    <div className="form-label">IFSC.</div>
                                    <Field className="form-control" type="text" name="account.ifsc" />
                                    <ErrorMessage name="account.ifsc" >
                                         { m => <div className="text-danger">{m}</div> }
                                    </ErrorMessage>
                                </div>
                            </Col>

                            <Col className="col-md-4 col-6">
                                <div className="form-group input-group-sm">
                                    <div className="form-label">Account Type.</div>
                                    <Field className="form-control" as='select' name="account.acc_type">
                                        <option>--- Select One ---</option>
                                        <option>Saving</option>
                                        <option>Current</option>
                                        <option>Business</option>

                                    </Field>
                                    <ErrorMessage name="account.acc_type">
                                         { m => <div className="text-danger">{m}</div> }
                                    </ErrorMessage>
                                </div>
                            </Col>
                            <Col className="col-md-4 col-6">
                                <div className="form-group input-group-sm">
                                    <div className="form-label">Authors PAN no.</div>
                                    <Field className="form-control" type="text" name="account.pan_no" />
                                    <ErrorMessage name="account.pan_no" >
                                         { m => <div className="text-danger">{m}</div> }
                                    </ErrorMessage>
                                </div>
                            </Col>



                        </Row>


                        <Button variant="success" className="mt-4" type="submit" >Add Author</Button>


                    </Form>
                </Formik>

                {result}
                <Table bordered hover responsive className="text-center">
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Mobile</th>
                            <th>Address</th>
                            <th>City</th>
                            <th>PinCode</th>
                            <th>Remove</th>
                        </tr>
                    </thead>


                    <tbody>

                        {authors.length < 1 ? null : authors.map((aut, i) =>
                            <tr key={i}>
                                <td> {i + 1}  </td>
                                <td>{aut.name}</td>
                                <td>{aut.email}</td>
                                <td>{aut.mobile}</td>
                                <td>{aut.address?.address}</td>
                                <td>{aut.address?.city}</td>
                                <td>{aut.address?.pin_code}</td>
                                <td>
                                    <Button variant="outline-danger" onClick={() => deleteAuthor(i, aut.name)}>
                                        <MdDelete size={20} />
                                    </Button>
                                </td>
                            </tr>
                        )}

                    </tbody>

                </Table>
                <small><small><b>Note:</b> You can delete the record if you want</small></small><hr />
                <Button onClick={saveAuthors} size="sm" variant="outline-success" >&nbsp;&nbsp;&nbsp;Save All Authors&nbsp;&nbsp;&nbsp;</Button>

            </Container>


        </>
    )
}

export default AddAuthorsToProduct
