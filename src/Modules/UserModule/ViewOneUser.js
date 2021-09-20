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
            <h1>User Details : {u_id} </h1>
            <Container>
                <Row>
                    {!user.u_id ? 'Loading Data...' :  
                    <Col>
                        <h3>Details</h3>
                        <p><b>User Name : </b> {user.uname}</p>
                        <p><b>User Points : </b> {user.points}</p>
                        <p><b>Can Lent Product : </b> {user.can_lent_product}</p>
                        <h3>Contact </h3>
                        <p><b>Mobile : </b> {user.mobile}</p>
                        <p><b>Email : </b> {user.email}</p>
                        
                        <h3>Address</h3>
                        
                        <p><b>Address : </b> {user?.address?.address}</p>
                        <p><b>City : </b> {user?.address?.city}</p>
                        <p><b>Pin Code : </b> {user?.address?.pin_code}</p>
                    </Col>
                    }
                </Row>
            </Container>
        </>
    )
}

export default ViewOneUser
