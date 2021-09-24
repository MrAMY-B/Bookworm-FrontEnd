import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import { InfoCircleFill } from 'react-bootstrap-icons';

function AlertComponent({type,msg}) {

        let [show, setShow] = useState(true);
        

        

    return (
        <>

            {/* <Alert variant={type}  show={show} onClose={() => setShow(false)} dismissible > 
                 {msg} 
            </Alert> */}
             <Modal show={show} onHide={()=>setShow(false)}>
                <Modal.Header closeButton>
                <Modal.Title> <InfoCircleFill/> Message</Modal.Title>
                </Modal.Header>
                <Modal.Body>{msg} </Modal.Body>
                <Modal.Footer className="text-center">

                <div className="d-grid mt-3">
                    <Button variant={type} onClick={()=>setShow(false)}>
                            Close
                        </Button>
                </div>
                   
               </Modal.Footer>
            </Modal>
            
        </>
    )
}

export default AlertComponent
