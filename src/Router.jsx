import { Routes, Route } from "react-router-dom";
import Posts from "./Pages/Posts";
import NotFound from "./Pages/NotFound";
import Layouts from "./Layouts/Layouts";
import "./assets/css/output.css";
import Home from "./Pages/Home";

export const Router = (data) => {
    return (
        <Routes>
            <Route path="/" element={<Layouts data={data} />}>
                <Route index element={<Home data={data} />} />
                <Route path="/posts" element={<Posts data={data} />} />
                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    );
};
