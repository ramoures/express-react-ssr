import { Routes, Route, useLocation } from "react-router-dom";
import { useState } from "react";
import { basketContext } from './core/Basket';
import NotFound from "./Pages/NotFound";
import Layouts from "./Layouts/Layouts";
import Home from "./Pages/Home";
import Checkout from "./Pages/Checkout";
import Basket from "./Pages/Basket";
import Category from "./Pages/Category";
import "./assets/css/output.css";
import Post from "./Pages/Post";
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
