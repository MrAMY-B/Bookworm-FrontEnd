import * as Yup from 'yup'
import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react'
import { Col, Container,Button, Image, Row, Table } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { MdDelete } from 'react-icons/md';
import AlertComponent from '../../UtilComponents/AlertComponent';

function UpdateProductAuthors() {
    
 
    const [result, setResult] = useState('')
    const [ authors,setAuthors ] = useState([])
    const history = useHistory();



    
    let {prod_id} = useParams('prod_id');
    const [product, setProduct] = useState({});

  
    useEffect(()=>{
        fetch('https://amol-bookworm-api.herokuapp.com/product/'+prod_id)
        .then(res => res.json())
        .then(res=> {setProduct(res); if(res?.authors?.length>0)setAuthors(res.authors); console.log(res); console.log("request")})
        .catch( err => console.log("INVALID PRODUCT ID"))
        
    },[prod_id])


    const initAuthor = {
        name:'',
        email:'',
        mobile:'',
        address:{ address:'', city:'', pin_code:''},
        has_beneficiary:false,
        account:{ acc_number:'',bank_name:'',branch:'',ifsc:'',acc_type:'',pan_no:'' }
        // beneficiary:{ name:'', email:'', mobile:''}
     }
     const handleSubmit = (values,onSubmitProps)=>{
         console.log(JSON.stringify(values));
         let a = values;
        setAuthors([...authors,a])
        console.log(authors);
        onSubmitProps.resetForm();

     }

     const authorValidation = Yup.object({
            name:Yup.string().required("Required").min(3,'Minimum 3 characters'),
            email:Yup.string().required("Required").email('Please enter correct email'),
            mobile:Yup.string().required('Mobile Number is required'),
            address:Yup.object({
                address:Yup.string().required('Required'),
                city:Yup.string().required('Required'),
                pin_code:Yup.string().required('Required')
            }),
            account:Yup.object({
                acc_number:Yup.string().required('Required').min(8,'Account Number should contain 8-10 digits').max(10,'Account Number should contain 8-10 digits'),
                bank_name:Yup.string().required('Required'),
                branch:Yup.string().required('Required'),
                ifsc:Yup.string().required('Required'),
                acc_type:Yup.string().required('Required'),
                pan_no:Yup.string().required('Required')
            })
     });

     const saveAuthors = ()=> {
         if(authors.length===0){
            setResult( <AlertComponent type="warning" msg="Please Add At least one Author or make dummy one."/> )
            setTimeout( ()=>{ setResult('') }, 5000)
         }
        else{
            console.log('====GOING TO SUBMIT=======')
            let prod = product;
            prod.authors=authors;
            console.log(prod)
            fetch('https://amol-bookworm-api.herokuapp.com/product/',
                    {method:"PUT",headers:{'Content-Type':'application/json'},body:JSON.stringify(prod)})
                .then(res => { if(res.ok){
                    setResult(<AlertComponent type="success" msg={'Authors Added Successfully'} />)
                    setTimeout(()=>{ history.push("/admin/products") } , 2000);
                    console.log("SUCCESS");
                }
                else{
                    setResult(<AlertComponent type="danger" msg={'Product Something went wron please try again'} />)
                    console.log(res); 
                }
            })
        }
            
     }

     const deleteAuthor = (index,authName) => {
         let x = prompt('Are you sure! want to delete '+authName+'?')
        
        if(!x){console.log('Not Deleting');}
        else if(x==='AMOL'){
            authors.splice(index,1);
            setResult( <AlertComponent type="danger" msg="Author is deleted"/> )
            setTimeout( ()=>{ setResult('') }, 5000)
        }
        else{
            console.log("Password wrong");
            setResult( <AlertComponent type="secondary" msg="You have entered wong password."/> )
            setTimeout( ()=>{ setResult('') }, 5000)
         }
            
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
                { authors.length<1 ? null :  authors.map( (aut,i)=> 
                <tr key={i}>
                    <td> {i+1}  </td>
                    <td>{aut.name}</td>
                    <td>{aut.email}</td>
                    <td>{aut.mobile}</td>
                    <td>{aut.address?.address}</td>
                    <td>{aut.address?.city}</td>
                    <td>{aut.address?.pin_code}</td>
                     <td> 
                        <Button variant="outline-danger" onClick={() => deleteAuthor(i,aut.name)}> 
                            <MdDelete size={20} /> 
                        </Button> 
                    </td>
                </tr>
                ) }
            
            </tbody>
            
            </Table>
            <small><small><b>Note:</b> You can delete the record if you want</small></small><br/><br/>  
            <Button onClick={saveAuthors}  variant="outline-success" >Save and update authors</Button>
            <hr />
            
        <Formik initialValues={initAuthor} onSubmit={handleSubmit}  validationSchema={authorValidation} >
            <Form className="mb-3 pb-3">
                
                <Row >
                    <h4 className="text-success">Add Author Detail</h4>
                    <Col className="col-md-4 col-6">
                        <div className="form-group input-group-sm">
                            <div className="form-label">Name</div>
                            <Field className="form-control" type="text" name="name" />
                            <ErrorMessage className="form-text text-muted" name="name" />
                        </div>
                    </Col>

                    <Col className="col-md-4 col-6">
                        <div className="form-group input-group-sm">
                            <div className="form-label">Email</div>
                            <Field className="form-control" type="text" name="email" />
                            <ErrorMessage className="form-text text-muted"  name="email" />
                        </div>
                    </Col>

                    <Col className="col-md-4 col-6">
                        <div className="form-group input-group-sm">
                            <div className="form-label">Mobile</div>
                            <Field className="form-control" type="text" name="mobile" />
                            <ErrorMessage className="form-text text-muted" name="mobile" />
                        </div>
                    </Col>
                   <Col className="col-md-4 col-6">
                        <div className="form-group input-group-sm">
                            <div className="form-label">Address</div>
                            <Field className="form-control" type="text" name='address.address' />
                            <ErrorMessage className="form-text text-muted" name="address.address" />
                        </div>
                    </Col>

                    <Col className="col-md-4 col-6">
                        <div className="form-group input-group-sm">
                            <div className="form-label">City</div>
                            <Field className="form-control" type="text" name="address.city" />
                            <ErrorMessage className="form-text text-muted" name="address.city" />
                        </div>
                    </Col>

                    <Col className="col-md-4 col-6">
                        <div className="form-group input-group-sm">
                            <div className="form-label">Pincode</div>
                            <Field className="form-control" type="text" name="address.pin_code" />
                            <ErrorMessage className="form-text text-muted" name="address.pin_code" />
                        </div>
                    </Col>
                </Row>
                <div className="form-check">
                    <Field className="form-check-input" type="checkbox" name="has_beneficiary" id="hasBani"/>
                        <label className="form-check-label" htmlFor="hasBani">
                            has Banificiary
                        </label>
                </div>
                <Row>
                    <h5 className="text-success">Authors Account Info</h5>
                <Col className="col-md-4 col-6">
                        <div className="form-group input-group-sm">
                            <div className="form-label">Account No.</div>
                            <Field className="form-control" type="text" name="account.acc_number" />
                            <ErrorMessage className="form-text text-muted" name="account.acc_number" />
                        </div>
                    </Col>
                    <Col className="col-md-4 col-6">
                        <div className="form-group input-group-sm">
                            <div className="form-label">Bank Name</div>
                            <Field className="form-control" type="text" name="account.bank_name" />
                            <ErrorMessage className="form-text text-muted" name="account.bank_name" />
                        </div>
                    </Col>
                    <Col className="col-md-4 col-6">
                        <div className="form-group input-group-sm">
                            <div className="form-label">Branch Name.</div>
                            <Field className="form-control" type="text" name="account.branch" />
                            <ErrorMessage className="form-text text-muted" name="account.branch" />
                        </div>
                    </Col>
                    <Col className="col-md-4 col-6">
                        <div className="form-group input-group-sm">
                            <div className="form-label">IFSC.</div>
                            <Field className="form-control" type="text" name="account.ifsc" />
                            <ErrorMessage className="form-text text-muted" name="account.ifsc" />
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
                            <ErrorMessage className="form-text text-muted" name="account.acc_type" />
                        </div>
                    </Col>
                    <Col className="col-md-4 col-6">
                        <div className="form-group input-group-sm">
                            <div className="form-label">Authors PAN no.</div>
                            <Field className="form-control" type="text" name="account.pan_no" />
                            <ErrorMessage className="form-text text-muted" name="account.pan_no" />
                        </div>
                    </Col>



                </Row>
               

               <Button variant="success"  className="mt-4" type="submit" >Add Author</Button>


            </Form>
        </Formik>
        
       

        </Container>

      
        </>
    )
}

export default UpdateProductAuthors

