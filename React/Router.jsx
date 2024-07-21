import { Routes, Route, useLocation } from "react-router-dom";
import { useState } from "react";
import { basketContext } from './src/core/Context';

import NotFound from "./src/Pages/NotFound";
import Layouts from "./src/Layouts/Layouts";
import Home from "./src/Pages/Home";
import Checkout from "./src/Pages/Checkout";
import Basket from "./src/Pages/Basket";
import Category from "./src/Pages/Category";
import Post from "./src/Pages/Post";

import "./src/assets/css/output.css";
export const Router = (data) => {
    const location = useLocation()

    const [basket, setBasket] = useState([]);
    const [prices, setPrices] = useState([]);
    return (
        <basketContext.Provider value={{ basket, setBasket, prices, setPrices }}>

            <Routes>
                <Route path="/" element={<Layouts />}>
                    <Route index element={<Home data={data} />} />
                    <Route path="/checkout" element={<Checkout data={data} />} />
                    <Route path="/basket" element={<Basket data={data} />} />
                    <Route path="/category/:name" element={<Category data={data} />} />
                    <Route path="/category/:name/products/:slug" element={<Post data={data} />} key={location} />
                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>

        </basketContext.Provider>
    );
};
