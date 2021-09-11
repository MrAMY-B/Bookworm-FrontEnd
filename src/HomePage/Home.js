import React, { useEffect, useState } from 'react'
import { API } from '../UtilComponents/API';
import SaperatorByCategory from './SaperatorByCategory'

function Home() {
    // const prodlist = ['prod1','prod2','prod3','prod4','prod5','prod6'];
    // let productCategories = ['E-Book','Audio-Book','Music'];


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
            <h1 className="text-center text-success">Trending Products</h1>
            { categories?.length===0 ? null :
            categories.map( (oneCate,index) => <SaperatorByCategory key={index} oneCate={oneCate} prodlist={products} /> )}
        </>
    )
}

export default Home
