const Footer = () => {
    return (
        <>
            <footer className="w-full flex gap-2 justify-center items-center p-4 bg-gradient-to-r from-slate-200 from-60% via-80% to-100% via-teal-100 to-slate-200  border-t-[6px] border-neutral-200">
                <div className="w-11/12 lg:w-8/12 flex justify-center gap-2">
                    <span>Express React SSR 1.0</span>
                    .
                    <span>
                        Under MIT license
                    </span>
                    .
                    <a className="text-blue-700" href="https://github.com/ramoures/express-react-ssr">Github</a>
                </div>
            </footer>
        </>
    );
};
export default Footer;
