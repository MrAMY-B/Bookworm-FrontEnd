import React from 'react'
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap'
import { FiUser } from 'react-icons/fi'

function MyProfile() {

    let uid = localStorage.getItem("u_id");
    let [user ,setUser] = useState({})

     useEffect(()=>{

         fetch('https://amol-bookworm-api.herokuapp.com/user/'+uid)
        .then(res => res.json())
        .then( res=> setUser(res))
        .catch(err=> console.log(err))

    },[uid])

    return (
        <>   
            
           <Container className="p-sm-5">
         
           <Row className="py-sm-3  rounded  bg-light  border shadow-lg">
           <h1 className="text-center text-success">My Profile</h1>
           <hr />
                <Col className="col-md-2 col-sm-4 text-center">
                    <FiUser size="80%"/>
                    <Button as={Link} to="/user/update-my-profile" size="sm">Edit Profile</Button>
                </Col>

                <Col  >
                    <h3>{"id : "+user.u_id }</h3>
                    <h3>Name : {user.uname}</h3>
                    <h6>Mobile {user.mobile} </h6>
                    <h6>Email {user.email} </h6>
                    <h6> {", "} </h6>
                </Col>
                <Col>
                    <h3>Address</h3>
                    <h6>Address : {user?.address?.address}</h6>
                    <h6>City : {user?.address?.city}</h6>
                    <h6>Pin Code : {user?.address?.pin_code}</h6>
               </Col>
               <hr className="my-0"/>
           <Row className="text-center">
               <Col> <h6>Points : {user.points}</h6> </Col>
               <Col> <h6>Products can lent : {user.can_lent_product}</h6> </Col>
           </Row>
               
           </Row>
           
          
           </Container>
         
            
        </>
    )
}

export default MyProfile
