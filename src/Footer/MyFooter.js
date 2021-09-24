import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import GroupMembers from './GroupMembers'
import SiteFooterLogo from './SiteFooterLogo';
import Technologies from './Technologies';

function MyFooter() {

    return (
        <>
        <Container fluid="true" className="mt-5 doNotPrint">
          <Row className="pt-4 bg-dark text-center text-light mx-0 pb-sm-0 mb-sm-0">
            <Col md={4}  className='rounded my-1 mb-sm-4 col-6'>
                <GroupMembers/>
            </Col>
            <Col md={{order:'last'}}   className='rounded my-1 mb-sm-4 col-6'>
                <Technologies />
            </Col>
            <Col md={4}  className='rounded m-md-1 mb-0 mb-sm-0' >
                <SiteFooterLogo />
            </Col>
          </Row>
          <div className="text-light text-center bg-dark pb-2 mb-0 text-small">
              <p> All rights reserved to SMVITA. &copy; 2021 <br /><small>Developed By Amol Bharsakle</small></p>
          </div>
        </Container> 
        </> 
    )
}

export default MyFooter
