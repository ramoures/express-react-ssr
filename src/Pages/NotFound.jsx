import { useEffect } from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
    useEffect(() => {
        if (typeof window !== 'undefined' && document.getElementById('headerSingIn')?.classList.contains('hidden'))
            document.getElementById('headerSingIn')?.classList.remove('hidden');
    });
    return <>
        <div className="w-full flex items-center justify-center pt-20">
            <div className="flex flex-col items-center gap-20">
                <h2 className="bg-gray-500 rounded p-3 text-xl xl:text-4xl rotate-6 text-white">404, Page not found!</h2>
                <Link to={`/`}>- Back to home -</Link >
            </div>
        </div>
    </>
}
export default NotFound;