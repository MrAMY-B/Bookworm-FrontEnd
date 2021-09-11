import React, { useState } from 'react'
import { useParams } from 'react-router'

function OneAuthor() {

    let {auth_id} = useParams('auth_id');
    const [author, setAuthor] = useState({})

    

    return (
        <div>
            
        </div>
    )
}

export default OneAuthor
