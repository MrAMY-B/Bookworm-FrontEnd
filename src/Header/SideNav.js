import React, { useState } from 'react'
import { Button, Offcanvas } from 'react-bootstrap';

function SideNav(props) {
    // const [userType, setUserType] = useState('ADMIN')
    // const [userType, setUserType] = useState('VISITOR')
    // const [userType, setUserType] = useState('CUSTOMER')

    const [sideNavShow, setSideNavShow] = useState(false);

    const toggleSideNav = () => setSideNavShow(!sideNavShow)

        

    return (
        <>
        <Button variant="primary" onClick={toggleSideNav} className="me-2">
            {'AMOL BHARSAKLE'}
        </Button>
        <Offcanvas show={sideNavShow} onHide={toggleSideNav} {...props}>
            <Offcanvas.Header closeButton>
            <Offcanvas.Title>User Profile or SHELF</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
            necessary details
            </Offcanvas.Body>
        </Offcanvas>
        </>
    )
}

export default SideNav
