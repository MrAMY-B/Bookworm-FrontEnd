import { useFormik } from 'formik'
import * as Yup  from 'yup'
import React, {useState} from 'react'
import { useEffect } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { useHistory } from 'react-router-dom';
import AlertComponent from '../../UtilComponents/AlertComponent'

function AddProduct() {

    const [result, setResult] =useState('')
    const history = useHistory();

    const [cate, setCate] = useState([])
    const [lang, setLang] = useState([])
    const [gen, setGen] = useState([])

    useEffect(()=>{fetch('https://amol-bookworm-api.herokuapp.com/category/all').then(res=>res.json()).then(res=>setCate(res)); },[result]);
    useEffect(()=>{ fetch('https://amol-bookworm-api.herokuapp.com/language/all').then(res=>res.json()).then(res=>setLang(res));},[cate]);
    useEffect(()=>{fetch('https://amol-bookworm-api.herokuapp.com/genre/all').then(res=>res.json()).then(res=>setGen(res));},[lang]);

    const initialPro = {
        isbn:Number,
        title:'Thor',
        title_in_english:'Thor the God of Thunder',
        base_price:'',
        sale_price:'',
        offer_price:'',
        short_desc:'Short Desc',
        long_desc:'Long Desc',
        front_image_link:'',
        product_link:'',
        is_rentable:false,
        is_library:false,
        length:Number,
        category:{cate_id:0},
        language:{lang_id:0},
        genre:{gen_id:0},
        publisher:{ name:'',
                    email:'',
                    mobile:'',
                    address:{ address:'',city:'',pin_code:''},
                    account:{ acc_number:'', bank_name:'',branch:'',acc_type:'',pan_no:'',ifsc:'' } 
                }
        }

    const prodValidation = Yup.object({
        isbn:Yup.string().required('required').max(10,'Max 10').min(8,'Min 8     digit is allowed').matches(/^[1-9]+[0-9]$/,'ISBN must have numbers only'),
        title:Yup.string().required('required').min(4,'Titile should have minimum 4 characters'),
        title_in_english:Yup.string().required('required').matches(/^[a-zA-Z]/,'Please enter valid name').min(4,'Titile should have minimum 4 characters'),
        base_price:Yup.string().required('Required').matches(/^[1-9][0-9][.]{0,}[0-9]{0,}$/,'Price Should have numbers only'),
        sale_price:Yup.string().required('Required').matches(/^[1-9][0-9][.]{0,}[0-9]{0,}$/,'Price Should have numbers only'),
        offer_price:Yup.string().required('Required').matches(/^[1-9][0-9][.]{0,}[0-9]{0,}$/,'Price Should have numbers only'),
        short_desc:Yup.string().required('Required').min(4,'Titile should have minimum 4 characters'),
        long_desc:Yup.string().required('Required').min(20,'Titile should have minimum 20 characters'),
        length:Yup.string().required('Required').matches(/^[1-9][0-9][.]{0,}[0-9]{0,}$/,'Page Count for e-book,Time for audio'),
        publisher:Yup.object({
            name:Yup.string().required('Required'),
            email:Yup.string().required('Required'),
            mobile:Yup.string().required('Required'),
            address:Yup.object({ address:Yup.string().required('Required'),city:Yup.string().required('Required'),pin_code:Yup.string().required('Required')}),
            account:Yup.object({ acc_number:Yup.string().required('Required').max(10,'Max 10 digit'), bank_name:Yup.string().required('Required'),branch:Yup.string().required('Required'),acc_type:Yup.string().required('Required'),pan_no:Yup.string().required('Required'),ifsc:Yup.string().required('Required') })
        })

    })

    let handleSubmit = (values) => {
        alert(JSON.stringify(values));
        console.log(JSON.stringify(values))

        fetch('https://amol-bookworm-api.herokuapp.com/product/',
            {method:"POST",headers:{'Content-Type':'application/json'},body:JSON.stringify(values)})
        .then(res => { if(res.ok){
            setResult(<AlertComponent type="success" msg={'Product Added.., Now add Authors and publisher'} />)
            setTimeout(()=>{ history.push("/admin/products") } , 2000);
            // setTimeout(()=>{ history.push("/admin/add-authors-to-product/1") } , 2000);
            console.log("SUCCESS");
        }
        else{
            setResult(<AlertComponent type="danger" msg={'Product Something went wron please try again'} />)
            console.log(res); 
        }
    })

    }

    let finPro = useFormik({initialValues:initialPro,onSubmit:handleSubmit,validationSchema:prodValidation})
    
    const setCatId = (e)=>{finPro.setFieldValue(finPro.values.category.cate_id=e.target.value) }
    const setLangId = (e)=>{finPro.setFieldValue(finPro.values.language.lang_id=e.target.value) }
    const setGenId = (e)=>{finPro.setFieldValue(finPro.values.genre.gen_id=e.target.value) }

 


    return (
        <>
            <Container  className="" >
                <Row className="justify-content-center  p-sm-4">
                    <Col xs={12} className=" justify-content-center rounded  bg-light pt-4 pb-5 border rounded   shadow-lg">
                        {result}
                        <h1 className="text-center text-success">Add Product</h1>
                        <hr />
                        <Form onSubmit={finPro.handleSubmit} onReset={finPro.handleReset}>
                            <Row>
                            <h5>Product Detail</h5>
                            <Col className="col-md-4 col-6" >
                                    <Form.Group>
                                        <Form.Label>ISBN</Form.Label>
                                        <Form.Control type="text" {...finPro.getFieldProps('isbn')} />
                                        <Form.Text>
                                            {finPro.touched.isbn && finPro.errors.isbn ?
                                                finPro.errors.isbn : null}
                                                </Form.Text>
                                    </Form.Group>   
                                </Col>
                                <Col className="col-md-4 col-6" >
                                    <Form.Group>
                                        <Form.Label>Title</Form.Label>
                                        <Form.Control type="text" {...finPro.getFieldProps('title')} />
                                        <Form.Text>
                                            {finPro.touched.title && finPro.errors.title ?
                                                finPro.errors.title : null}
                                                </Form.Text>
                                    </Form.Group>   
                                </Col>
                                <Col>
                                    <Form.Group>
                                        <Form.Label>Title In English</Form.Label>
                                        <Form.Control type="text" {...finPro.getFieldProps('title_in_english')} />
                                        <Form.Text>
                                            {finPro.touched.title_in_english && finPro.errors.title_in_english ?
                                                finPro.errors.title_in_english : null}
                                            </Form.Text>
                                    </Form.Group>
                                </Col>
                                <Col className="col-md-4 col-6" >
                                    <Form.Group>
                                        <Form.Label>Product Type</Form.Label>
                                        <Form.Select name="cate_id" onChange={setCatId} >
                                            <option>Select Type</option>
                                            {cate.map( (c , i)=> <option key={i} value={c.cate_id}>{c.category}</option> )}
                                        </Form.Select>
                                    </Form.Group>   
                                </Col>
                                <Col className="col-md-4 col-6" >
                                    <Form.Group>
                                        <Form.Label>Language</Form.Label>
                                        <Form.Select name="lang_id" onChange={setLangId} >
                                            <option>Select Type</option>
                                            {lang.map( (l , i)=> <option key={i} value={l.lang_id}>{l.language}</option> )}
                                        </Form.Select>
                                    </Form.Group>   
                                </Col>
                                <Col className="col-md-4 col-6" >
                                    <Form.Group>
                                        <Form.Label>Genre</Form.Label>
                                        <Form.Select name="gen_id" onChange={setGenId} >
                                            <option>Select Type</option>
                                            {gen.map( (g , i)=> <option key={i} value={g.gen_id}>{g.genre}</option> )}
                                        </Form.Select>
                                    </Form.Group>   
                                </Col>
                            </Row>
                            <hr />
                            <h5>Description </h5>
                            <Row>
                                
                                <Col className="col-md-6 col-12">
                                    <Form.Group>
                                        <Form.Label>Short Description</Form.Label>
                                        <Form.Control type="text" {...finPro.getFieldProps('short_desc')}  />
                                        <Form.Text>
                                            {finPro.touched.short_desc && finPro.errors.short_desc ? finPro.errors.short_desc:null}
                                        </Form.Text>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Long Description</Form.Label>
                                        <Form.Control as="textarea" rows={3} {...finPro.getFieldProps('long_desc')}  />
                                        <Form.Text>
                                            {finPro.touched.long_desc && finPro.errors.long_desc ? finPro.errors.long_desc:null}
                                        </Form.Text>
                                    </Form.Group>
                                </Col>

                                <Col className="col-md-6 col-12">
                                    <Form.Group>
                                        <Form.Label>Base Price</Form.Label>
                                        <Form.Control type="text" {...finPro.getFieldProps('base_price')} />
                                        <Form.Text>{ finPro.touched.base_price && finPro.errors.base_price ? finPro.errors.base_price: null }</Form.Text>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Saling Price</Form.Label>
                                        <Form.Control type="text" {...finPro.getFieldProps('sale_price')} />
                                        <Form.Text>{ finPro.touched.sale_price && finPro.errors.sale_price ? finPro.errors.sale_price: null }</Form.Text>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Offer Price</Form.Label>
                                        <Form.Control type="text" {...finPro.getFieldProps('offer_price')} />
                                        <Form.Text>{ finPro.touched.offer_price && finPro.errors.offer_price ? finPro.errors.offer_price: null }</Form.Text>
                                    </Form.Group>
                                </Col>

                                <Col className="col-4 pt-2" >
                                    <Form.Check inline label="Is Rentable"  {...finPro.getFieldProps('is_rentable')} type="checkbox"/>
                               
                                    <Form.Check inline label="Is Library" {...finPro.getFieldProps('is_library')} type="checkbox"/>
                               </Col>
                                <Col className="col-4">
                                    <Form.Group>
                                        <Form.Label>Length</Form.Label>
                                        <Form.Control type="text" {...finPro.getFieldProps('length')} />
                                        <Form.Text>{ finPro.touched.length && finPro.errors.length ? finPro.errors.length: null }</Form.Text>
                                    </Form.Group>
                                
                                </Col>
                            </Row>


                            {/* ================================================================ */}
                            <Row >
                                <h4>Add Publisher Detail</h4>
                                <Col className="col-md-4 col-6">
                                    <Form.Group>
                                            <Form.Label>Publisher Name</Form.Label>
                                            <Form.Control type="text" {...finPro.getFieldProps('publisher.name')} />
                                            <Form.Text>{ finPro.touched.publisher?.name && finPro.errors.publisher?.name ? finPro.errors.publisher?.name: null }</Form.Text>
                                        </Form.Group>
                                </Col>

                                <Col className="col-md-4 col-6">
                                    <Form.Group>
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control type="text" {...finPro.getFieldProps('publisher.email')} />
                                        <Form.Text>{ finPro.touched.publisher?.email && finPro.errors.publisher?.email ? finPro.errors.publisher?.email: null }</Form.Text>
                                    </Form.Group>
                                </Col>

                                <Col className="col-md-4 col-6">
                                <Form.Group>
                                        <Form.Label>Mobile</Form.Label>
                                        <Form.Control type="text" {...finPro.getFieldProps('publisher.mobile')} />
                                        <Form.Text>{ finPro.touched.publisher?.mobile && finPro.errors.publisher?.mobile ? finPro.errors.publisher?.mobile: null }</Form.Text>
                                    </Form.Group>
                                    
                                </Col>
                            <Col className="col-md-4 col-6">
                                    <Form.Group>
                                        <Form.Label>Address</Form.Label>
                                        <Form.Control type="text" {...finPro.getFieldProps('publisher.address.address')} />
                                        <Form.Text>{ finPro.touched.publisher?.address?.address 
                                                        &&
                                                    finPro.errors.publisher?.address?.address 
                                                        ? 
                                                    finPro.errors.publisher?.address?.address
                                                    : 
                                                    null }</Form.Text>
                                    </Form.Group>
                                
                                        
                                    
                                </Col>

                                <Col className="col-md-4 col-6">
                                    
                                <Form.Group>
                                        <Form.Label>City</Form.Label>
                                        <Form.Control type="text" {...finPro.getFieldProps('publisher.address.city')} />
                                        <Form.Text>{ finPro.touched.publisher?.address?.city 
                                                        &&
                                                    finPro.errors.publisher?.address?.city 
                                                        ? 
                                                    finPro.errors.publisher?.address?.city
                                                    : 
                                                    null }</Form.Text>
                                    </Form.Group>
                                    
                                </Col>

                                <Col className="col-md-4 col-6">
                                    <Form.Group>
                                            <Form.Label>Pin_code</Form.Label>
                                            <Form.Control type="text" {...finPro.getFieldProps('publisher.address.pin_code')} />
                                            <Form.Text>{ finPro.touched.publisher?.address?.pin_code 
                                                        &&
                                                    finPro.errors.publisher?.address?.pin_code 
                                                        ? 
                                                    finPro.errors.publisher?.address?.pin_code
                                                    : 
                                                    null }</Form.Text>
                                    </Form.Group>
                                        
                                </Col>
                            </Row>
                        
                            <Row>
                                <h4> Account Info</h4>
                                
                                <Col className="col-md-4 col-6">
                                <Form.Group>
                                        <Form.Label>Account Number</Form.Label>
                                        <Form.Control type="text" {...finPro.getFieldProps('publisher.account.acc_number')} />
                                        <Form.Text>{ finPro.touched.publisher?.account?.acc_number
                                                    &&
                                                finPro.errors.publisher?.account?.acc_number 
                                                    ? 
                                                finPro.errors.publisher?.account.acc_number
                                                : 
                                                null }</Form.Text>
                                </Form.Group>
                                               
                                    
                                </Col>
                                <Col className="col-md-4 col-6">
                                <Form.Group>
                                        <Form.Label>Bank</Form.Label>
                                        <Form.Control type="text" {...finPro.getFieldProps('publisher.account.bank_name')} />
                                        <Form.Text>{ finPro.touched.publisher?.account?.bank_name
                                                    &&
                                                finPro.errors.publisher?.account?.bank_name 
                                                    ? 
                                                finPro.errors.publisher?.account.bank_name
                                                : 
                                                null }</Form.Text>
                                </Form.Group>
                                    
                                        
                                </Col>
                                <Col className="col-md-4 col-6">
                                <Form.Group>
                                        <Form.Label>Branch</Form.Label>
                                        <Form.Control type="text" {...finPro.getFieldProps('publisher.account.branch')} />
                                        <Form.Text>{ finPro.touched.publisher?.account?.branch
                                                    &&
                                                finPro.errors.publisher?.account?.branch 
                                                    ? 
                                                finPro.errors.publisher?.account.branch
                                                : 
                                                null }</Form.Text>
                                </Form.Group>
                                    
                                </Col>
                                <Col className="col-md-4 col-6">
                                <Form.Group>
                                        <Form.Label>IFSC</Form.Label>
                                        <Form.Control type="text" {...finPro.getFieldProps('publisher.account.ifsc')} />
                                        <Form.Text>{ finPro.touched.publisher?.account?.ifsc
                                                    &&
                                                finPro.errors.publisher?.account?.ifsc 
                                                    ? 
                                                finPro.errors.publisher?.account.ifsc
                                                : 
                                                null }</Form.Text>
                                </Form.Group>
                                    
                                </Col>

                                <Col className="col-md-4 col-6">
                                <Form.Group>
                                        <Form.Label>Account Type</Form.Label>
                                        <Form.Control type="text" {...finPro.getFieldProps('publisher.account.acc_type')} />
                                        <Form.Text>{ finPro.touched.publisher?.account?.acc_type
                                                    &&
                                                finPro.errors.publisher?.account?.acc_type 
                                                    ? 
                                                finPro.errors.publisher?.account.acc_type
                                                : 
                                                null }</Form.Text>
                                </Form.Group>
                                    
                                </Col>
                                <Col className="col-md-4 col-6">
                                <Form.Group>
                                        <Form.Label>Pan No</Form.Label>
                                        <Form.Control type="text" {...finPro.getFieldProps('publisher.account.pan_no')} />
                                        <Form.Text>{ finPro.touched.publisher?.account?.pan_no
                                                    &&
                                                finPro.errors.publisher?.account?.pan_no 
                                                    ? 
                                                finPro.errors.publisher?.account.pan_no
                                                : 
                                                null }</Form.Text>
                                </Form.Group>
                                        
                                </Col>



                            </Row>
               

                            <Button variant="success"  className="mt-4" type="submit" >Submit  Product</Button>
                         
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default AddProduct