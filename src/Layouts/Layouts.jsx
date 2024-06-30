import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
const Layouts = (data) => {

    return (
        <>
            <div key="layouts" className="flex flex-col min-h-screen justify-between dark:bg-neutral-800">
                <Header data={data} />
                <Outlet />
                <Footer data={data} />
            </div>
        </>
    );
};

export default Layouts;
