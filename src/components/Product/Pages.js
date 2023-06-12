import React from 'react'
import { Switch, Route } from "react-router-dom"
import { productdetail } from '../ProductDetail/ProductDetail'

const Pages = () => {
    return (
        <div>
            <Switch>
                <Route path="/Product/:id" exact component={productdetail} />
            </Switch>
        </div>
    )
}

export default Pages