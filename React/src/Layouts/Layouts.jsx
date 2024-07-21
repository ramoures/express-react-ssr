import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { useEffect } from "react";


const Layouts = () => {
    useEffect(() => {
        const storage = localStorage.getItem('myshop-basket');
        if (!storage)
            localStorage.setItem('myshop-basket', JSON.stringify({ items: [], prices: [] }));
    }, [])
    return (
        <>
            <div key="layouts" className="flex flex-col min-h-svh justify-between items-center place-content-stretch place-items-stretch">
                <Header />
                <div className="flex flex-col justify-between w-full px-4 xl:px-0 xl:w-10/12 2xl:w-8/12 py-2 xl:py-6">
                    <Outlet />
                </div>
                <div className="flex my-auto"></div>
                <Footer />
            </div>
        </>
    );
};

export default Layouts;
