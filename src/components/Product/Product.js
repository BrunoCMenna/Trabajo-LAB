import React from 'react'
import PhoneItem from '../PhoneItem/PhoneItem'
import NavBar from '../NavBar/NavBar'
import Footer from '../Footer/Footer'

const Product = ({ id, brand, model, price, image }) => {

    return (
        <div>
            <NavBar/>
            <PhoneItem
            id={id}
            brand={brand}
            model={model}
            price={price}
            image={image}
            />
            <Footer/>
        </div>
    )
}

export default Product