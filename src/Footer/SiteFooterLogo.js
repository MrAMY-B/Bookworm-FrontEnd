import React from 'react'
import { Image } from 'react-bootstrap'
import LogoImage  from './../Images/bw-logo3.png'

function SiteFooterLogo() {
    return (
        <>
            <Image src={LogoImage}  width="50%"/>
            <h5>BOOKWORM.COM</h5>
        </>
    )
}

export default SiteFooterLogo
