import React, { useEffect, useState } from 'react'
import { Alert, Button, Col, Form, NavDropdown, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { API } from '../../UtilComponents/API';


function AddGenre(){

    let doNotReRendor=10;
    const [showDangerAlert, setShowDangerAlert] = useState(false);
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const history = useHistory();
    const [gen , setGen] = useState({genre:''});


    const [category,setCategory] = useState([]);
    const [language,setLanguage] = useState([]);
    const [cate, setCate] = useState(99999)
    const [lang, setLang] = useState(9999)
    



    useEffect(()=>{
        fetch(API+'/category/all')
            .then(res=>res.json())
            .then(res=>setCategory(res)) 
    },[doNotReRendor]);

    

    //============== ON CHANGE/SELECT CATEGORY
    let changeCate = (e)=> { let selected=e.target.value;
        setCate(parseInt(selected))
        if(parseInt(selected)===99999){  setLang(9999); setLanguage([]); setGen({ genre:gen.genre}) }
        else{
           
            fetch(API+'/language/by-cate-id/'+selected)
            .then((res)=>res.json())
            .then(res =>  setLanguage(res))
            .catch(err=>console.log(err))
        }
        
    }
    let changeLang = (e)=> { let selected=e.target.value;
        setLang(selected)
        setGen({...gen,language:{ lang_id:selected }})
        console.log(selected);
    }


    let handleOnSubmit = (e)=> { e.preventDefault()
        if(lang===9999 || lang==='9999'){
            alert("Please Choose Language First")
            
        }else{
            
            fetch(API+'/genre/',
            {method:"POST",headers:{'Content-Type':'application/json'},body:JSON.stringify(gen)})
        .then(res => { if(res.ok){
            setShowSuccessAlert(true)
            setTimeout(()=>{ history.push("/admin/genres") } , 2000);
            console.log("SUCCESS");
        }
        else{
            setShowDangerAlert(true); 
            console.log(res); 
        }
    })
        
    }

}
    

    return (
        <>
        <Row className="justify-content-center  p-4">
            <Col md={6} sm={8} xs={11} className=" justify-content-center rounded  bg-light pt-4 pb-5 border rounded   shadow-lg">
            <Alert variant={'danger'} show={showDangerAlert} onClose={() => setShowDangerAlert(false)} dismissible> Please try again.! </Alert>
            <Alert variant={'success'} show={showSuccessAlert} onClose={() => setShowSuccessAlert(false)} dismissible> Genre added successfully. </Alert>
            <h1 className="text-center text-success"> Add New Genre </h1>
                <NavDropdown.Divider />
                <Form onSubmit={handleOnSubmit}>

                <Form.Group>
                    <Form.Label>Product Type</Form.Label>
                    <Form.Select name={cate} value={cate} onChange={changeCate}>
                        <option value={99999}>Select Type</option>
                        {category.map( (c , i)=> <option key={i} value={c.cate_id}>{c.category}</option> )}
                    </Form.Select>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Product Language</Form.Label>
                    <Form.Select name={lang} value={lang} onChange={changeLang}>
                        <option value={9999}>Select Type</option>
                        {language?.map( (l , i)=> <option key={i} value={l.lang_id}>{l.language}</option> )}
                    </Form.Select>
                </Form.Group>

                    <Form.Group>
                        <Form.Label>Genre</Form.Label>
                        <Form.Control type="text" name="genre" value={gen.genre} onChange={(e)=> setGen({...gen,genre:e.target.value})} placeholder="Genre" />
                        <Form.Text> </Form.Text>
                     </Form.Group>
                    <Form.Group className="mt-4 d-grid">
                            <Button variant="outline-success" type="submit" size="lg" >Submit</Button>
                        </Form.Group>
                </Form>
            </Col>
        </Row>
    </>
    )
}

export default AddGenre
