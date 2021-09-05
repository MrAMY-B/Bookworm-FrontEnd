import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap'
import { FiUser } from 'react-icons/fi'

function MyProfile() {

    let uid = 1;
    let [user ,setUser] = useState({})

     useEffect(()=>{

         fetch('https://amol-bookworm-api.herokuapp.com/user/'+uid)
        .then(res => res.json())
        .then( res=> setUser(res))
        .catch(err=> console.log(err))

    },[uid])

    return (
        <>
           <Row>
           <h2 className="text-center text-success">My Profile</h2>

                <Col xs="2" >
                    <FiUser size="140" />
                </Col>

                <Col >
                    <h3>{"id : "+user.u_id }</h3>
                    <h3>{user.name}</h3>
                    <h6> {user.email} </h6>
                    <h6> {user.mobile} </h6>
                    <h6> {", "} </h6>
                </Col>

           </Row>
            
        </>
    )
}

export default MyProfile
