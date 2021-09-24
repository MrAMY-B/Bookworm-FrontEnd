import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router'
import { API } from '../../UtilComponents/API';

function ViewOneUser() {

    let { u_id } = useParams('u_id');
    const [user,setUser] = useState({})
    
    useEffect(() => {
       fetch(API+'/user/'+u_id).then(res => res.json()).then(res=>setUser(res))
       .catch(err=> console.log(err))
    }, [u_id])

 
    return (
        <>
            <h1 className="text-center text-success">User Details : {u_id} </h1>
            
            <Row className="justify-content-center  p-4">
             <Col md={10}  className=" justify-content-center rounded  bg-light pt-4 pb-5 border rounded   shadow-lg">
             <Container>
                <Row>
                    {!user.u_id ? 'Loading Data...' :  
                    <>
                        <Col>
                            <h3>Details</h3>
                            <p><b>User Name : </b> {user.uname}</p>
                            <p><b>User Points : </b> {user.points}</p>
                            <p><b>Can Lent Product : </b> {user.can_lent_product}</p>
                            <br />
                            <h3>Contact </h3>
                            <p><b>Mobile : </b> {user.mobile}</p>
                            <p><b>Email : </b> {user.email}</p>
                        </Col>
                        <Col>
                        <h3>Address</h3>
                        <p><b>Address : </b> {user?.address?.address}</p>
                        <p><b>City : </b> {user?.address?.city}</p>
                        <p><b>Pin Code : </b> {user?.address?.pin_code}</p>
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

export default ViewOneUser
