import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router';
import { API } from '../../UtilComponents/API';

function OnePublisher() {

    
    let {pub_id} = useParams('pub_id')
    const [user,setUser] = useState({})
    
    useEffect(() => {
       fetch(API+'/publisher/'+pub_id).then(res => res.json()).then(res=>setUser(res))
       .catch(err=> console.log(err))
    }, [pub_id])

 
    return (
        <>
            <h1 className="text-center text-success">Publisher Details : {pub_id} </h1>
            
           <Row className="justify-content-center  p-4">
            <Col md={10}  className=" justify-content-center rounded  bg-light pt-4 pb-5 border rounded   shadow-lg">
            <Container>
                <Row>
                    {!user.pub_id ? 'Loading Data...' :  
                    <>
                    <Col>
                        <h3>Details</h3>
                        <p><b> Name : </b> {user.name}</p>
                         <p><b>Mobile : </b> {user.mobile}</p>
                        <p><b>Email : </b> {user.email}</p>
                        <br />
                        <p><b>Address : </b> {user.address?.address}</p>
                        <p><b>City : </b>  {user.address?.city}</p>
                        <p><b>Pin Code : </b>  {user.address?.pin_code}</p>
                    </Col>
                    <Col>
                        <h3>Bank Details</h3>
                        <p><b> Account Number : </b> {user.account?.acc_number}</p>
                        <p><b>Pan Number : </b> {user.account?.pan_no}</p>
                        <p><b>Account Type : </b> {user.account?.acc_type}</p>
                        <p><b>IFSC Code : </b> {user.account?.ifsc}</p>
                        <p><b>Branch Name : </b> {user.account?.branch}</p>
                        <p><b> Bank Name : </b> {user.account?.bank_name}</p> 
                  </Col>
                    
                    </>
                    }
                </Row>
            </Container>
            </Col>
        </Row>      
           
        </>
    )
}


export default OnePublisher
