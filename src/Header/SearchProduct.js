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

                 {/* <Row className="mx-0 px-sm-5">
                    <Col md={3} xs={12} className="mb-md-0 mb-1">
                        <InputGroup size="sm" >
                            <Form.Select aria-label="Product Category">
                            <option>Select Product Category</option>
                                { category.length === 0 ?(<option>Please Wait</option>):
                                    category.map( cate => <option value={cate.cate_id} key={cate.cate_id}>{cate.category}</option>  )
                                }
                            </Form.Select>
                        </InputGroup>
                    </Col>

                    <Col md={3} xs={6} className="mb-md-0 mb-1">
                        <InputGroup size="sm" >
                            <Form.Select aria-label="Choose Language">
                                <option>Choose Language</option>
                                { language.length === 0 ?(<option>Please Wait</option>):
                                    language.map( lang => <option value={lang.lang_id} key={lang.lang_id}>{lang.language}</option>  )
                                }
                            </Form.Select>
                        </InputGroup>
                    </Col>

                    <Col md={3} xs={6} className="mb-md-0 mb-1">
                        <InputGroup size="sm" >
                            <Form.Select aria-label="Choose Genre">
                                <option>Choose Genre</option>
                                { genre.length === 0 ?(<option>Please Wait</option>):
                                    genre.map( gen => <option value={gen.gen_id} key={gen.gen_id}>{gen.genre}</option>  )
                                }
                            </Form.Select>
                        </InputGroup>
                    </Col>
                    <Col md={3} xs={12} className="mb-md-0 mb-1">
                        <Row className="justify-content-center text-center">
                            <Col>
                                <Button variant="outline-success" size="sm" ><Search /></Button>
                           </Col> 
                           <Col>
                                <CloseButton onClick={props.closeSearchProduct} />
                           </Col> 
                        </Row>
                    </Col>

                    
                </Row> */}


                {/* <Row className="mx-0 px-sm-5">
                    <Col md={3} xs={6} className="mb-md-0 mb-1">
                        <InputGroup size="sm" >
                            <Form.Select aria-label="Product Category">
                            <option>Select Product Category</option>
                                { category.length === 0 ?(<option>Please Wait</option>):
                                    category.map( cate => <option value={cate.cate_id} key={cate.cate_id}>{cate.category}</option>  )
                                }
                            </Form.Select>
                        </InputGroup>
                    </Col>

                    <Col md={3} xs={6} className="mb-md-0 mb-1">
                        <InputGroup size="sm" >
                            <Form.Select aria-label="Choose Language">
                                <option>Choose Language</option>
                                { language.length === 0 ?(<option>Please Wait</option>):
                                    language.map( lang => <option value={lang.lang_id} key={lang.lang_id}>{lang.language}</option>  )
                                }
                            </Form.Select>
                        </InputGroup>
                    </Col>

                    <Col md={3} xs={8} className="mb-md-0 mb-1">
                        <InputGroup size="sm" >
                            <Form.Select aria-label="Choose Genre">
                                <option>Choose Genre</option>
                                { genre.length === 0 ?(<option>Please Wait</option>):
                                    genre.map( gen => <option value={gen.gen_id} key={gen.gen_id}>{gen.genre}</option>  )
                                }
                            </Form.Select>
                        </InputGroup>
                    </Col>
                    <Col md={3} xs={4} className="mb-md-0 mb-1">
                        <Row className="justify-content-center text-center">
                            <Col>
                                <Search />
                           </Col> 
                           <Col>
                                <CloseButton onClick={props.closeSearchProduct} variant="primary" />
                           </Col> 
                        </Row>
                    </Col>

                    
                </Row> */}

                {/* <Row className="mx-0 px-sm-5">
                    <Col md={4} className="mb-md-0 mb-1">
                        <InputGroup size="sm" >
                            <InputGroup.Text id="inputGroup-sizing-sm">Category &nbsp;</InputGroup.Text> 
                            <Form.Select aria-label="Product Category">
                            <option>Select Product Category</option>
                                { category.length === 0 ?(<option>Please Wait</option>):
                                    category.map( cate => <option value={cate.cate_id} key={cate.cate_id}>{cate.category}</option>  )
                                }
                            </Form.Select>
                        </InputGroup>
                    </Col>

                    <Col md={4} className="mb-md-0 mb-1">
                        <InputGroup size="sm" >
                            <InputGroup.Text id="inputGroup-sizing-sm">Language</InputGroup.Text>
                            <Form.Select aria-label="Choose Language">
                                <option>Choose Language</option>
                                { language.length === 0 ?(<option>Please Wait</option>):
                                    language.map( lang => <option value={lang.lang_id} key={lang.lang_id}>{lang.language}</option>  )
                                }
                            </Form.Select>
                        </InputGroup>
                    </Col>

                    <Col md={4} className="mb-md-0 mb-1">
                        <InputGroup size="sm" >
                            <InputGroup.Text id="inputGroup-sizing-sm">Genre &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </InputGroup.Text>
                            <Form.Select aria-label="Choose Genre">
                                <option>Choose Genre</option>
                                { genre.length === 0 ?(<option>Please Wait</option>):
                                    genre.map( gen => <option value={gen.gen_id} key={gen.gen_id}>{gen.genre}</option>  )
                                }
                            </Form.Select>
                        </InputGroup>
                    </Col>
                    
                </Row> */}
            </Container>
    )
}

export default SearchProduct
