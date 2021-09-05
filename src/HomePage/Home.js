import React from 'react'
import ProducsByCategory from './ProducsByCategory'

function Home() {
    const prodlist = ['prod1','prod2','prod3','prod4','prod5','prod6'];
    let productCategories = ['E-Book','Audio-Book','Music'];
    

    return (
        <>
            <h1 className="text-center text-success">Trending Products</h1>
            {productCategories.map( (category,index) => <ProducsByCategory key={index} category={category} prodlist={prodlist} /> )}
        </>
    )
}

export default Home
