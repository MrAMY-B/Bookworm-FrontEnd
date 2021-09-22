import React, { useEffect, useState } from 'react'
import SaperatorByCategory from '../HomePage/SaperatorByCategory';
import { API } from '../UtilComponents/API';

function LibraryProducts() {
    
    let x = 10;
    const [ categories,setCategories] = useState([])
    const [products, setProducts] = useState([])

    useEffect(() => {
        fetch(API+'/category/all')
            .then(res=> res.json())
            .then(res=> setCategories(res))
            .catch(err=> console.log(err))
    }, [x])

    useEffect(()=>{
        fetch(API+'/product/all')
        .then( res=> res.json())
        .then( res=> setProducts(res) )
        .catch( err=> console.log(err) )
    },[x])
    
    return (
        <>
            <h1 className="text-center text-success">Library Products</h1>
            { categories?.length===0 ? null :
            categories.map( (oneCate,index) => <SaperatorByCategory key={index} oneCate={oneCate} prodlist={products.filter(p=>p.is_rentable)} /> )}
        </>
    )
}

export default LibraryProducts
