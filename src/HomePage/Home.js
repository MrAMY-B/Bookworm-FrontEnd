import React, { useEffect, useState } from 'react'
import AllProductByAllCategory from './AllProductByAllCategory'

function Home() {
    const prodlist = ['prod1','prod2','prod3','prod4','prod5','prod6'];
    let productCategories = ['E-Book','Audio-Book','Music'];
    
    const [products, setProducts] = useState([])

    useEffect(()=>{
        fetch('https://amol-bookworm-api.herokuapp.com/product/all')
        .then( res=> res.json())
        .then( res=> setProducts(res) )
        .catch( err=> console.log(err) )
    },[prodlist])

    return (
        <>
            <h1 className="text-center text-success">Trending Products</h1>
            {productCategories.map( (category,index) => <AllProductByAllCategory key={index} category={category} prodlist={products} /> )}
        </>
    )
}

export default Home
