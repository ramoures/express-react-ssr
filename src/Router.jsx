import { Routes, Route } from "react-router-dom";
import Posts from "./Pages/Posts";
import NotFound from "./Pages/NotFound";
import Layouts from "./Layouts/Layouts";
import "./assets/css/output.css";
import Home from "./Pages/Home";
import { useState } from "react";
import { basketContext } from './core/Basket';
import Checkout from "./Pages/Checkout";
import Basket from "./Pages/Basket";

export const Router = (data) => {
    const [basket, setBasket] = useState([])
    const [sum, setSum] = useState([])
    return (
        <basketContext.Provider value={{ basket, setBasket, sum, setSum }}>
            <Routes>
                <Route path="/" element={<Layouts data={data} />}>
                    <Route index element={<Home data={data} />} />
                    <Route path="/checkout" element={<Checkout data={data} />} />
                    <Route path="/basket" element={<Basket data={data} />} />
                    <Route path="/posts" element={<Posts data={data} />} />
                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
        </basketContext.Provider>
    );
};
