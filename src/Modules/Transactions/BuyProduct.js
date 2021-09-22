import React, { useEffect, useState } from 'react'
import { Col, NavDropdown, Row, Button, Image } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router';
import AlertComponent  from '../../UtilComponents/AlertComponent'
import { API } from '../../UtilComponents/API';

function BuyProduct() {

    let {prod_id} = useParams('prod_id');
    const [product, setProduct] = useState({});
    const [msg, setMsg] = useState('')
    const history = useHistory();

  
    useEffect(()=>{
        fetch('https://amol-bookworm-api.herokuapp.com/product/'+prod_id)
        .then(res => res.json())
        .then(res=> {setProduct(res); console.log("request")})
        .catch( err => console.log("INVALID PRODUCT ID") )
        
    },[prod_id])

    let purchase = ()=>{
        console.log("PURCHASING");
        console.log(new Date().toJSON());
        
        let shelfObj = {
            tr_type:"PURCHASED",
            prod_expiry:new Date().toJSON(),
           user:{ u_id:2 },
           amt:product?.offer_price,
           product:{prod_id }
        }

        shelfObj=JSON.stringify(shelfObj)
        alert(shelfObj);

        fetch(API+'/trans/purchase/',{method:"POST",headers:{'Content-Type':'application/json'},body:shelfObj})
        .then(res=>res.text())
        .then(res=>{
            console.log(res)
            if(res==='SUCCESSFULL'){
                setMsg(<AlertComponent type="success"  msg="Successfully Purchased" />)
                setTimeout(()=>{setMsg(''); history.push("/user/my-shelf")},2000)
            }else
            setMsg(<AlertComponent type="danger"  msg="Something went Wrong try again leter" />)
        })
        .catch(err=>console.log(err))

       

    }

    return (
        <>
        <Row className="justify-content-center  py-4 px-md-4 px-2">
            <Col md={8} sm={10} xs={11} className="justify-content-center rounded  bg-light pt-sm-4 pb-5 border rounded   shadow-lg">
            
            <h1 className="text-center text-success"> Puchase Product </h1>
            <NavDropdown.Divider />
            {msg}
            <Row>
                <Col className="col-sm-4 col-12"> <Image src="https://picsum.photos/200/150" thumbnail /> </Col>
                <Col> 
                    <p>ISBN :<br/> <b>{product?.isbn}</b></p>
                    <p>Name :<br/> <b> {product?.title}</b> </p>
                    <p>Price :<br/><b> Rs.{product?.sale_price}/-</b></p>
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

export default BuyProduct
