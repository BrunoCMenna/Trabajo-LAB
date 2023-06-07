import React from 'react'
import PhoneItem from '../PhoneItem/PhoneItem'
import NavBar from '../NavBar/NavBar'
import Footer from '../Footer/Footer'
import ProductDetail from '../ProductDetail/ProductDetail'

const Product = ({ id, brand, model, price, image }) => {

    

    return (
        <div>
            <NavBar/>
            <ProductDetail/>
            <Footer/>
        </div>
    )
}

export default Product