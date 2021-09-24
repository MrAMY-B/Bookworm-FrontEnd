
import React, { useEffect, useState } from 'react'
import { Col, Row,Button } from 'react-bootstrap';
import { Printer } from 'react-bootstrap-icons';
import {  useParams } from 'react-router';
import { API } from '../../UtilComponents/API';

function GenerateInvoice() {

    
    let {u_id} = useParams('u_id')
    // const history = useHistory();
    const [orders, setOrders] = useState([])
    const [ oneTrans, setOneTrans ] = useState()

    useEffect(() => {
        fetch(API+'/trans/all').then(r => r.json()).then(r=>setOrders(r))
        .catch(err=> console.log(err))
     } ,[u_id])

    const authChnageHandler = (e)=>{
        let x = orders.find(o => o.tr_id===parseInt(e.target.value) )
        setOneTrans(x);
    }
    return (
        <>
            {/* ==============================EXISTING AUTHORS=============================== */}
            <h1 className="text-center text-success">PRODUCT INVOICE </h1>
            
            <Row className="justify-content-center  p-4">
                <Col md={10}  className=" justify-content-center rounded  bg-light pt-4 pb-5 border rounded   shadow-lg">

                        <div className="form-group">
                            <label className="form-label"><small>Select to generate invoice</small></label>
                            <select className="form-select" name="allAuth" onChange={(e) => authChnageHandler(e)} >
                                <option >Select One</option>
                                {orders?.map((o, i) => <option key={i} value={o.tr_id}>
                                                        [Tx_ID:{o.tr_id}]&nbsp;&nbsp;&nbsp;&nbsp;
                                                        [Date:{o.date}] &nbsp;&nbsp;&nbsp;&nbsp; 
                                                        {o.product?.title}</option>)}
                            </select>
                        </div>


                    
                

                {
                    !oneTrans ? null : 
                    <>
                    <hr />
                    
                        {/* {oneTrans?.product?.title} */}
                        <Row>
                        <small><b>Transaction No.{oneTrans?.tr_id}</b></small> <br />

                        <Row>
                            <h6 className="text-center">Cutomer Detail</h6>
                            <Col className="col-sm-4">
                              
                               <p>Name: {oneTrans?.user?.uname}</p>
                               <p>Contact No:{oneTrans?.user?.mobile}</p>
                               <p>Email: {oneTrans?.user?.email}</p>
                         
                               
                               
                            </Col>
                            <hr />
                        </Row>
                       
                        <Row>
                            
                            <Col>
                            <h6 className="text-center">Prouct Detail</h6>
                            <small><small>Product Name</small></small>
                            <p><b>{oneTrans?.product?.title}</b></p>
                            <p>Category: {oneTrans?.product?.genre?.language?.category?.category} </p>
                            <p>Language: {oneTrans?.product?.genre?.language?.language} </p>
                            <p>Genre: {oneTrans?.product?.genre?.genre} </p>
                           
                            </Col>
                            <hr />
                        </Row>
                        
                        <Row className="text-center mb-4">
                         <h6 className="text-center mb-3">Transaction Detail</h6>
                            <Col>
                                <p><b>Type : {oneTrans?.tr_type} </b></p>
                            </Col>
                            <Col>
                                <p><b>Status : {oneTrans?.status} </b></p>
                            </Col> 
                            <Col>
                                <p><b>Amount : {oneTrans?.amt} </b></p>
                            </Col>
                        </Row>
                        <hr />
                        <Row>
                            <Col className="col-4 mx-auto text-center">
                                <Button variant="success" onClick={window.print}>
                                    <Printer/>
                                </Button>
                            </Col>
                        </Row>
                       
                            
                        </Row>
                    </>
                }

            </Col>
                </Row>

        </>
    )
}

export default GenerateInvoice
