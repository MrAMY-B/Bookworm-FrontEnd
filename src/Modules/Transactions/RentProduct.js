import React, { useEffect, useState } from 'react'
import { Col, NavDropdown, Row, Button, Image, Form } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router';
import AlertComponent  from '../../UtilComponents/AlertComponent'
import { API } from '../../UtilComponents/API';

function RentProduct() {

    let {prod_id} = useParams('prod_id');
    const [product, setProduct] = useState({});
    const [msg, setMsg] = useState('')
    const history = useHistory();
    const [amt, setAmt] = useState(5)

  
    useEffect(()=>{
        fetch('https://amol-bookworm-api.herokuapp.com/product/'+prod_id)
        .then(res => res.json())
        .then(res=> {setProduct(res); console.log("request")})
        .catch( err => console.log("INVALID PRODUCT ID") )
        
    },[prod_id])

    let purchase = ()=>{
        console.log("RENTED");
        console.log(new Date().toJSON());
        let shelfObj = {
            tr_type:"RENTED",
            prod_expiry:new Date().toJSON(),
           user:{ u_id:2 },
           amt,
           product:{prod_id }
        }
        shelfObj=JSON.stringify(shelfObj)
        alert(shelfObj);

        fetch(API+'/trans/purchase/',{method:"POST",headers:{'Content-Type':'application/json'},body:shelfObj})
        .then(res=>res.text())
        .then(res=>{
            console.log(res)
            if(res==='SUCCESSFULL'){
                setMsg(<AlertComponent type="success"  msg="Successfully Rented" />)
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
            
            <h1 className="text-center text-success"> Rent Product </h1>
            <NavDropdown.Divider />
            {msg}
            <Row>
                <Col className="col-sm-4 col-12"> <Image src="https://picsum.photos/200/150" thumbnail /> </Col>
                <Col> 
                    <p>ISBN :<br/> <b>{product?.isbn}</b></p>
                    <p>Name :<br/> <b> {product?.title}</b> </p>
                    <p>Rent : Rs.5/Day <br/><b> Rs.{amt}/-</b></p>
                </Col>
            </Row>

            <Row>
                <Col>
                <Form.Label>Number of Days</Form.Label>
                <Form.Select onChange={ (e)=>{setAmt(e.target.value*5)} }>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                    <option>6</option>
                    <option>7</option>
                    <option>8</option>
                    <option>10</option>
                    <option>11</option>
                    <option>12</option>
                    <option>13</option>
                    <option>14</option>
                    <option>15</option>
                    <option>20</option>
                    <option>30</option>
                    
                </Form.Select>
                </Col>
            </Row>
            
            <div className="mt-4 d-grid">
                <Button variant="outline-success" onClick={purchase} type="submit" size="lg" >Rent</Button>
            </div>
            </Col>
        </Row>
    </>
    )
}

export default RentProduct
