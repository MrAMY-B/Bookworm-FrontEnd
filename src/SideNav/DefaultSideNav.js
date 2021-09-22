import {  Collapse, Nav } from 'react-bootstrap'
import React, { useEffect, useState } from 'react'
import { MdArrowDropDown } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { API } from '../UtilComponents/API';

function DefaultSideNav() {
    let x= 10;
    const [openProdCate, setOpenProdCate] = useState(false);
    const [openProdLang, setOpenProdLang] = useState(false);
    const [openProdGen, setOpenProdGen] = useState(false);


    const [ cATE,setCATE] = useState([])
    const [ lANG,setLANG] = useState([])
    const [ gEN,setGEN] = useState([])

    useEffect(() => {
        fetch(API+'/category/all')
        .then(res=> res.json())
        .then(res=> setCATE(res))
    }, [x])

    useEffect(() => {
        fetch(API+'/language/all')
        .then(res=> res.json())
        .then(res=> setLANG(res))
    }, [x])

    useEffect(() => {
        fetch(API+'/genre/all')
        .then(res=> res.json())
        .then(res=> setGEN(res))
    }, [x])

    return (
        <>


                <h4 className="text-success">
                    Quick Nav
                </h4>
                <hr />
          
            <Nav style={{display:'block'}}>
                    <div>
                        <Nav.Link>
                            <h6 onClick={() => setOpenProdCate(!openProdCate)} aria-controls="productCategory">
                                <MdArrowDropDown/> Product Category
                            </h6>
                        </Nav.Link>
                        <Collapse in={openProdCate}>
                                <ul className=" list-group-flush" id="productCategory">
                                    { cATE?.length===0 ? 
                                    <li className="list-group-item"><Link to="/">Wait</Link>  </li>
                                    : 
                                    cATE.map( (c,i)=> <li key={i} className="list-group-item"><Link to={`/all-products-by-category/${c?.category}/${c?.cate_id}`}>{c?.category}</Link></li>)}
                                    
                                 </ul>
                        </Collapse>
                    </div>
                

                <div>
                    <Nav.Link>
                        <h6 onClick={() => setOpenProdLang(!openProdLang)} aria-controls="productLang">
                            <MdArrowDropDown/> Product Language
                        </h6>
                    </Nav.Link>
                    <Collapse in={openProdLang}>
                            <ul className=" list-group-flush" id="productLang">
                            { lANG?.length===0 ? 
                                    <li className="list-group-item"><Link to="/">Wait</Link>  </li>
                                    : 
                                    lANG.map( (l,i)=> <li key={i} className="list-group-item"><Link to={`/all-products-by-category/${l?.language}/${l?.lang_id}`}>{l?.language}</Link></li>)}
                            </ul>
                    </Collapse>
                </div>
                <div>
                    <Nav.Link>
                        <h6 onClick={() => setOpenProdGen(!openProdGen)} aria-controls="productGenre">
                            <MdArrowDropDown/> Product Genre
                        </h6>
                    </Nav.Link>
                    <Collapse in={openProdGen}>
                            <ul className=" list-group-flush" id="productGenre">
                            { gEN?.length===0 ? 
                                    <li className="list-group-item"><Link to="/">Wait</Link>  </li>
                                    : 
                                    gEN.map( (g,i)=> <li key={i} className="list-group-item"><Link to={`/all-products-by-category/${g?.genre}/${g?.gen_id}`}>{g?.genre}</Link> </li>)}
                            </ul>
                    </Collapse>
                </div>
                

                <Nav.Link>
                    
                </Nav.Link>

               
            </Nav>
                
           
                
        </>
    )
}
export default DefaultSideNav
