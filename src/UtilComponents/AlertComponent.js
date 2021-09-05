import React, { useState } from 'react'
import { Alert } from 'react-bootstrap';

function AlertComponent({type,msg}) {

        let [show, setShow] = useState(true);

        

    return (
        <>

            <Alert variant={type}  show={show} onClose={() => setShow(false)} dismissible > 
                 {msg} 
            </Alert>
            
        </>
    )
}

export default AlertComponent
