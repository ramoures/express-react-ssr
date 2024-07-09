import Defined from "../core/Defined";

const Footer = () => {
    const website = Defined.website;
    return (
        <footer className="w-full flex flex-col gap-2 justify-center items-center">
            <div className="text-xs text-pink-900 opacity-50">[ API from <a target="_blank" href="https://fakestoreapi.com">fakestoreapi.com</a> ]</div>
            <div className="w-full flex gap-2 justify-center items-center p-4 bg-gradient-to-r from-slate-200 from-60% via-80% to-100% via-teal-100 to-slate-200  border-t-[6px] border-neutral-200">
                <div className="w-11/12 lg:w-8/12 flex justify-between gap-2">
                    <div className="flex gap-2">
                        <span>Express React SSR 0.1 (SEO Friendly)</span>
                        .
                        <span>
                            Under <a href="https://github.com/ramoures/express-react-ssr/LICENSE">MIT license</a>
                        </span>
                        .
                        <a className="text-blue-700" href="https://github.com/ramoures/express-react-ssr">Github</a>
                    </div>
                    <a className="text-sm text-sky-700" href={`${website}/sitemap`}>XML Sitemap</a>
                </div>
            </div>
        </footer>

    );
};
export default Footer;
