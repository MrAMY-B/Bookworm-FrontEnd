






import React, { useEffect, useState } from 'react'
import {  NavDropdown, Row } from 'react-bootstrap';
import { Link } from 'react-bootstrap-icons';
import { useParams } from 'react-router';
import { LOCAL_API } from '../../UtilComponents/API';
import SaperatorByGenre from './SaperatorByGenre';

function ProductsByCategory() {
    let {lang_id} = useParams('lang_id');

    const [products, setProducts] = useState([])
    

    let [genreList,setGenreList] = useState([]);

    useEffect(() => {
        fetch(LOCAL_API+'/genre/by-lang-id/'+lang_id)
        .then( (res)=> res.json()  )
        .then((res)=> setGenreList(res) )
        .catch( err=> console.log(err) )
    }, [lang_id])

    useEffect(()=>{
        fetch('https://amol-bookworm-api.herokuapp.com/product/all')
        .then( res=> res.json())
        .then( res=> setProducts(res) )
        .catch( err=> console.log(err) )
    },[lang_id])

    

    

    return (
        <>
           <h1 className="text-center text-success">CATEGORY-Genre List</h1>
            <Row className="mx-0 mb-4 pt-sm-4">

                {genreList.map( (oneGenre,index) => <SaperatorByGenre key={index} oneGenre={oneGenre} prodlist={products} /> )}
        
                
            </Row>
            <Link to="/products-by-category/2">  See all here... </Link>
                <NavDropdown.Divider />
        </>
    )
}

export default ProductsByCategory

































// import React, { useEffect, useState } from 'react'
// import {  NavDropdown, Row } from 'react-bootstrap';
// import { Link } from 'react-bootstrap-icons';
// import { useParams } from 'react-router';
// import { LOCAL_API } from '../../UtilComponents/API';
// import AllProductsByAllLanguage from './AllProductsByAllLanguage';

// function ProductsByLanguage() {

//     let {cate_id} = useParams('cate_id');

//     const [products, setProducts] = useState([])

//     const [languageList,setLanguageList] = useState([]);

//     useEffect(() => {
//         fetch(LOCAL_API+'/language/by-cate-id/'+cate_id)
//         .then( (res)=> res.json()  )
//         .then((res)=> setLanguageList(res) )
//         .catch( err=> console.log(err) )
//     }, [cate_id])


//     useEffect(()=>{
//         fetch('https://amol-bookworm-api.herokuapp.com/product/all')
//         .then( res=> res.json())
//         .then( res=> setProducts(res) )
//         .catch( err=> console.log(err) )
//     },[lang_id])

    

    

//     return (
//         <>
//            <h1 className="text-center text-success">CATEGORY</h1>
//             <Row className="mx-0 mb-4 pt-sm-4">

//                 {languageList.map( (oneLanguage,index) => <AllProductsByAllLanguage key={index} oneLanguage={oneLanguage} prodlist={products} /> )}
        
                
//             </Row>
//             <Link to="/product-by-language/2">  See by Likk Language all here... </Link>
//                 <NavDropdown.Divider />
//         </>
//     )
// }



// export default ProductsByLanguage
