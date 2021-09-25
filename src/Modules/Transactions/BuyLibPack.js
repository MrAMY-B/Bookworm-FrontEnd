import React, { useEffect, useState } from 'react'
import { Col, NavDropdown, Row, Button, Image } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router';
import AlertComponent  from '../../UtilComponents/AlertComponent'
import { API } from '../../UtilComponents/API';

function BuyLibPack() {

    let {p_id} = useParams('p_id');
    const [pack, setPack] = useState({});
    const [msg, setMsg] = useState('')
    const history = useHistory();

  
    useEffect(()=>{
        fetch(API+'/lib-pack/'+p_id)
        .then(res => res.json())
        .then(res=> {setPack(res); console.log("request")})
        .catch( err => console.log("INVALID PACK ID") )
        
    },[p_id])

    let purchase = ()=>{

        let x = {user:{ u_id : 2 },lib_pack:{ pack_id : p_id }}
        x=JSON.stringify(x);
        alert(x)
        fetch(API+'/pack-tx/',{ method:"POST" , headers:{'Content-Type':'application/json'},body:x  })
        .then(res => console.log(res))
        .then(res=> {setPack(res); console.log("request"); setMsg(<AlertComponent type="success" msg="Successfully added to your account" />); setTimeout(()=>{ history.push('/user/my-profile/'); },2000)  }  )
        .catch( err => {console.log("INVALID PACK ID"); setMsg(<AlertComponent type="warning" msg="Something went wrong" />);setTimeout(()=>{ setMsg('') } ,2000);} )

        

    }



       

    

    return (
        <>
        <Row className="justify-content-center  py-4 px-md-4 px-2">
            <Col md={8} sm={10} xs={11} className="justify-content-center rounded  bg-light pt-sm-4 pb-5 border rounded   shadow-lg">
            
            <h1 className="text-center text-success"> Puchase Library Package </h1>
            <NavDropdown.Divider />
            {msg}
            <Row>
                <Col className="col-sm-4 col-12"> <Image src="https://picsum.photos/200/150" thumbnail /> </Col>
                <Col> 
                    <p>Products :<br/> <b> {pack?.no_prod}</b> </p> 
                    <p>Days :<br/> <b>{pack?.duration}</b></p>
                    <p>Price :<br/><b> Rs.{pack?.amount}/-</b></p>
                </Col>
            </Row>
            
            <div className="mt-4 d-grid">
                <Button variant="outline-success" onClick={purchase} type="submit" size="lg" >Buy</Button>
            </div>
            </Col>
        </Row>
    </>
    )
}
export default BuyLibPack
