import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { Button, Col, Container, Form, InputGroup, Row } from 'react-bootstrap'
import { Search } from 'react-bootstrap-icons';
import { MdClose } from 'react-icons/md';
import { useHistory } from 'react-router';
import { API } from '../UtilComponents/API';

function SearchProduct(props) {
    

    let doNotReRendor = 5;
    const history = useHistory();
    const [category,setCategory] = useState([]);
    const [cate, setCate] = useState(99999)
    const [lang, setLang] = useState(9999)
    const [gen, setGen] = useState(999)
    const [language,setLanguage] = useState([]);
    const [genre,setGenre] = useState([]);

    let llg = (t)=>console.log(t);
    useEffect(()=>{
        fetch(API+'/category/all')
            .then(res=>res.json())
            .then(res=>setCategory(res)); llg('a') 
    },[doNotReRendor]);

    

    //============== ON CHANGE/SELECT CATEGORY
    let changeCate = (e)=> { let selected=e.target.value;
        setCate(parseInt(selected))
        setGenre([])
        if(parseInt(selected)===99999){  setLang(9999); setLanguage([]); }
        else{
            
            fetch(API+'/language/by-cate-id/'+cate)
            .then((res)=>res.json())
            .then(res =>  setLanguage(res))
            .catch(err=>console.log(err))
        }
        
    }
    //============== ON CHANGE/SELECT LANGUAGE
    let changeLang = (e)=> { let selected=e.target.value;
        setLang(parseInt(selected));
        if(parseInt(selected)===9999){ 
            setGen(999); 
            setGenre([]); 
        }
        else{ 
            fetch(API+'/genre/by-lang-id/'+lang)
            .then((res)=>res.json())
            .then(res => setGenre(res))
            .catch(err=>console.log(err))
        }
    }
    //============== ON CHANGE/SELECT LANGUAGE
    let changeGen = (e)=> {setGen(e.target.value)}

    let handleSerchProduct=()=>{
        
        
        if(cate!==99999){
            if(lang!==9999){
                if(gen!==999)  history.push("/all-products-by-category/CATE/"+gen)
                else  history.push("/all-products-by-language/LANG/"+cate)
           }
           else  history.push("/all-products-by-genre/GEN/"+lang);
        }
        else console.log("NOTHING IS SELECTED");
        

        if(cate!==99999 ) console.log("cateID:"+cate+ ", | ") ;
        if(lang!==9999) console.log("langID:"+lang+" | ");
        if(gen!==999)console.log("genID:"+gen) ;
    }

    return (
        <Container fluid className={['px-sm-4 px-1 py-2','sweet-gray-bg',props.display]}>

            <Row>
                <Col md={10}>
                    <Row className="mx-0">
                        <Col md={4} xs={12} className="mb-md-0 mb-1">
                            <InputGroup size="sm" >
                                <Form.Select aria-label="Product Category" onChange={changeCate} value={cate}>
                                <option value={99999}>Choose Product Category</option>
                                    { category.length === 0 ?(<option disabled>Please Wait/Connect to Internet</option>):
                                        category.map( cate => <option value={cate.cate_id} key={cate.cate_id}>{cate.category}</option>  )
                                    }
                                </Form.Select>
                            </InputGroup>
                        </Col>
                        <Col md={4} xs={6} className="mb-md-0 mb-1">
                            <InputGroup size="sm" >
                                <Form.Select aria-label="Choose Language" onChange={changeLang} value={lang}>
                                    <option value={9999}>Choose Language</option>
                                    { language.length === 0 ?(<option disabled>Not Availible</option>):
                                        language?.map( lang => <option value={lang.lang_id} key={lang.lang_id}>{lang.language}</option>  )
                                    }
                                </Form.Select>
                            </InputGroup>
                        </Col>
                        <Col md={4} xs={6} className="mb-md-0 mb-1">
                            <InputGroup size="sm" >
                                <Form.Select aria-label="Choose Genre" onChange={changeGen} value={gen}>
                                    <option value={999}>Choose Genre</option>
                                    { genre.length === 0 ?(<option disabled>Not Availible</option>):
                                        genre.map( gen => <option value={gen.gen_id} key={gen.gen_id}>{gen.genre}</option>  )
                                    }
                                </Form.Select>
                            </InputGroup>
                        </Col>
                    </Row>
                </Col>
                <Col md={2}  className="pt-2 pt-sm-0">  
                    <Row className="mx-0 justify-content-center text-center">
                        <Col className="d-grid">
                            <Button variant="outline-success" size="sm"  ><Search onClick={handleSerchProduct} /></Button>
                        </Col> 
                        <Col className="d-grid text-center">
                            <Button variant="outline-secondary" onClick={props.closeSearchProduct} size="sm"> <MdClose size={20}/> </Button>
                           
                        </Col> 
                    </Row> 
                </Col>
            </Row>
            </Container>
    )
}

export default SearchProduct



// =================================================================WORKING FIND WITH OLD============================
/*
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { Button, Col, Container, Form, InputGroup, Row } from 'react-bootstrap'
import { Search } from 'react-bootstrap-icons';
import { MdClose } from 'react-icons/md';

function SearchProduct(props) {

    const [category,setCategory] = useState([]);
    const [cate, setCate] = useState(99999)
    const [lang, setLang] = useState(9999)
    const [gen, setGen] = useState(999)
    const [language,setLanguage] = useState([]);
    const [genre,setGenre] = useState([]);

    let llg = (t)=>console.log(t);
    useEffect(()=>{fetch('https://amol-bookworm-api.herokuapp.com/category/all').then(res=>res.json()).then(res=>setCategory(res)); llg('a') },[]);
    useEffect(()=>{ fetch('https://amol-bookworm-api.herokuapp.com/language/all').then(res=>res.json()).then(res=>setLanguage(res)); llg('b')},[cate]);
    useEffect(()=>{fetch('https://amol-bookworm-api.herokuapp.com/genre/all').then(res=>res.json()).then(res=>setGenre(res)); llg('c')},[lang]);

    let changeCate = (e)=> {setCate(e.target.value)}
    let changeLang = (e)=> {setLang(e.target.value)}
    let changeGen = (e)=> {setGen(e.target.value)}

    let handleSerchProduct=()=>{
        if(cate!==99999) console.log("cateID:"+cate+ ", | ") ;
        if(lang!==9999) console.log("langID:"+lang+" | ");
        if(gen!==999)console.log("genID:"+gen) ;
    }

    return (
        <Container fluid className={['px-sm-4 px-1 py-2','sweet-gray-bg',props.display]}>

            <Row>
                <Col md={10}>
                    <Row className="mx-0">
                        <Col md={4} xs={12} className="mb-md-0 mb-1">
                            <InputGroup size="sm" >
                                <Form.Select aria-label="Product Category" onChange={changeCate} value={cate}>
                                <option value={99999}>Select Product Category</option>
                                    { category.length === 0 ?(<option>Please Wait</option>):
                                        category.map( cate => <option value={cate.cate_id} key={cate.cate_id}>{cate.category}</option>  )
                                    }
                                </Form.Select>
                            </InputGroup>
                        </Col>
                        <Col md={4} xs={6} className="mb-md-0 mb-1">
                            <InputGroup size="sm" >
                                <Form.Select aria-label="Choose Language" onChange={changeLang} value={lang}>
                                    <option value={9999}>Choose Language</option>
                                    { language.length === 0 ?(<option>Please Wait</option>):
                                        language.map( lang => <option value={lang.lang_id} key={lang.lang_id}>{lang.language}</option>  )
                                    }
                                </Form.Select>
                            </InputGroup>
                        </Col>
                        <Col md={4} xs={6} className="mb-md-0 mb-1">
                            <InputGroup size="sm" >
                                <Form.Select aria-label="Choose Genre" onChange={changeGen} value={gen}>
                                    <option value={999}>Choose Genre</option>
                                    { genre.length === 0 ?(<option>Please Wait</option>):
                                        genre.map( gen => <option value={gen.gen_id} key={gen.gen_id}>{gen.genre}</option>  )
                                    }
                                </Form.Select>
                            </InputGroup>
                        </Col>
                    </Row>
                </Col>
                <Col md={2}  className="pt-2 pt-sm-0">  
                    <Row className="mx-0 justify-content-center text-center">
                        <Col className="d-grid">
                            <Button variant="outline-success" size="sm"  ><Search onClick={handleSerchProduct} /></Button>
                        </Col> 
                        <Col className="d-grid text-center">
                            <Button variant="outline-secondary" onClick={props.closeSearchProduct} size="sm"> <MdClose size={20}/> </Button>
                           
                        </Col> 
                    </Row> 
                </Col>
            </Row>
            </Container>
    )
}

export default SearchProduct

*/