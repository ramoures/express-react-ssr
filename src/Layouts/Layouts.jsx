import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";


const Layouts = (data) => {

    return (
        <>
            <div key="layouts" className="flex flex-col min-h-screen justify-between items-center place-content-stretch place-items-stretch">
                <Header />
                <div className="flex flex-col justify-between  w-11/12 lg:w-8/12">
                    <Outlet />
                </div>
                <Footer />
            </div>
        </>
    );
};

export default Layouts;
