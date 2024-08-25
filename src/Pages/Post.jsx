import { useContext, useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { addRemoveSlash, Capitalize, checkData, logger, Lowercase } from "../Core/Utils";
import { projectContext } from "../Core/Context";
import API from "../../core/API.mjs";
import FetchData from "../../core/FetchData.mjs";
import { Colors } from "../Core/Colors";
import Defined from "../Core/Defined";
import Loading from "../Components/Loading";
import Rate from "../Components/Rate";
import NotFound from "./NotFound";
import MetaTags from "../MetaTags";

const Post = ({ dataFromServer }) => {
    const params = useParams();
    const name = params?.name;
    const slug = params?.slug;

    const apiInfo = API('single_products', slug);

    const [pageId, setPageId] = useState(name + slug);

    const [data, setData] = useState(checkData(dataFromServer['firstData']) ? dataFromServer['firstData'] : []);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(checkData(dataFromServer['firstData']) ? false : true);
    const [bgColor, setBgColor] = useState('bg-neutral-100');
    const [viaColor, setViaColor] = useState('via-neutral-100');

    /**
        * Get data from the API and Set to the data state.
        * @param {string} method
        * @param {string} url
        * @returns {Promise < void>} 1.set data or error state. 2.set pageId state. 3.set loading to false.
    */
    const pageData = async (method, url) => {
        let response;
        response = await FetchData(method, url);
        if (response instanceof Error)
            setError(logger(response))
        else {
            if (checkData(response))
                setData(response);
            else
                setData([])
        }
        setPageId(name + slug);
        setLoading(false);
    }
    //---


    const setColors = (name) => {
        switch (name) {
            case 'furniture':
                setBgColor(Colors('green')?.[0]);
                setViaColor(Colors('green')?.[1]);
                break;
            case "clothes":
                setBgColor(Colors('pink')?.[0]);
                setViaColor(Colors('pink')?.[1]);
                break;
            case "shoes":
                setBgColor(Colors('rose')?.[0]);
                setViaColor(Colors('rose')?.[1]);
                break;
            case "electronics":
                setBgColor(Colors('sky')?.[0]);
                setViaColor(Colors('sky')?.[1]);
                break;
            case "miscellaneous":
                setBgColor(Colors('gold')?.[0]);
                setViaColor(Colors('gold')?.[1]);
                break;
        }
    }

    /* If the Post Route changes to another Post Route.
     * When selecting cart items, in this same Route. */
    const initialize = useRef(true);
    const routeChangeChecker = (pageId !== (name + slug)) ? true : false;
    if (routeChangeChecker && initialize.current) {
        setColors(name);
        setLoading(true);
        pageData(apiInfo?.method, apiInfo?.url);

        initialize.current = false;
    }
    else initialize.current = true;
    //---

    useEffect(() => {
        if (typeof window !== "undefined") {
            /*
                Place your javascript DOM code here.
            */
            //ex: document.getElementById('sample')?.classList?.add('hidden');
            window.scrollTo(0, 0);
            setColors(name);
        }

        //Set new API data if is empty first API Data (dataFromServer)
        if (!checkData(dataFromServer['firstData']))
            pageData(apiInfo?.method, apiInfo?.url);

        //Clear First API data (dataFromServer)
        dataFromServer['firstData'] = {}


    }, []);

    // Constants
    const website = Defined?.website;
    const directory = Defined?.directory;
    const websiteFullUrl = website + addRemoveSlash(directory, true);
    const baseTitle = Defined?.title;
    const twitterAccount = Defined?.twitter;

    const { setCart, cart } = useContext(projectContext);
    const { prices, setPrices } = useContext(projectContext);

    const addToCart = (_v) => {
        setCart([...cart, { id: _v?.id, title: _v?.title, price: _v?.price, image: _v?.images?.[0], category: Lowercase(_v?.category?.name) }]);
        setPrices([...prices, _v?.price]);
        localStorage.setItem('erSSR-shop-cart', JSON.stringify({ items: [...cart, { id: _v?.id, title: _v?.title, price: _v?.price, image: _v?.images?.[0], category: Lowercase(_v?.category?.name) }], prices: [...prices, _v?.price] }));
        if (typeof window !== 'undefined') {
            document.getElementById('toggleCart').classList.add('animate-ping');
            document.getElementById('toggleCart').classList.remove('bg-white');
            document.getElementById('toggleCart').classList.add('bg-yellow-200');
            setTimeout(() => {
                document.getElementById('toggleCart').classList.remove('animate-ping');
                document.getElementById('toggleCart').classList.remove('bg-yellow-200');
                document.getElementById('toggleCart').classList.add('bg-white');
            }, 100);
        }
    }

    //if category is not defined:
    if (!loading && !error && checkData(data) && ((data?.category?.name) !== Capitalize(name)))
        return <NotFound />;

    if (!loading && !error && !checkData(data))
        return <NotFound />;
    if (!loading && (error !== false))
        return <p>{error}</p>;

    return (
        <>
            <MetaTags
                url={`${websiteFullUrl}/category/${name}/products/${data?.id}`}
                title={`${data.title ? data?.title + ' - ' : ''}${name ? Capitalize(name) + ' - ' : ''}Category - ${baseTitle}`}
                description={data?.description || 'This is home page of my shopping website'}
                keywords={data?.keywords || 'Shop, E-Commerce, Store'}
                image={data?.image || `${websiteFullUrl}/assets/img/icon.svg`}
                twitterAccount={data?.twitter || twitterAccount}
            />
            {loading && <Loading n={0} />}
            {!loading && !error && checkData(data) &&
                <div className="flex flex-col justify-start items-start py-0 ">
                    <div className="flex w-full justify-between items-center py-5">
                        <nav className="px-4">
                            <ul className="flex gap-2 items-center">
                                <li>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-crosshair" viewBox="0 0 16 16">
                                        <path d="M8.5.5a.5.5 0 0 0-1 0v.518A7 7 0 0 0 1.018 7.5H.5a.5.5 0 0 0 0 1h.518A7 7 0 0 0 7.5 14.982v.518a.5.5 0 0 0 1 0v-.518A7 7 0 0 0 14.982 8.5h.518a.5.5 0 0 0 0-1h-.518A7 7 0 0 0 8.5 1.018zm-6.48 7A6 6 0 0 1 7.5 2.02v.48a.5.5 0 0 0 1 0v-.48a6 6 0 0 1 5.48 5.48h-.48a.5.5 0 0 0 0 1h.48a6 6 0 0 1-5.48 5.48v-.48a.5.5 0 0 0-1 0v.48A6 6 0 0 1 2.02 8.5h.48a.5.5 0 0 0 0-1zM8 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4" />
                                    </svg>
                                </li>
                                <li><Link className="p-1 rounded hover:bg-neutral-100" to={`/`}>Home</Link></li>
                                <li className="text-neutral-400">|</li>
                                <li>
                                    <Link className="p-1 rounded hover:bg-neutral-100" to={`/category/${Lowercase(data?.category?.name)}`}>
                                        {Capitalize(data?.category?.name)}
                                    </Link>
                                </li>
                                <li className="hidden lg:block text-neutral-400">|</li>
                                <li className="hidden lg:block text-neutral-600">{data?.title}</li>
                            </ul>
                        </nav>
                        <Link to={`/`} className={`hidden lg:flex items-center justify-between w-auto hover:text-neutral-600 `}>
                            <span> Back to home</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right-short" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8" />
                            </svg>
                        </Link>
                    </div>
                    <div className={`w-full flex justify-center items-center rounded-2xl p-2 lg:p-6 from-slate-200 ${viaColor} to-slate-200 from-10% via-35% to-100%  xl:from-20% xl:via-50% xl:to-80% bg-gradient-to-bl`}>
                        <div className="p-4 border-2 bg-white rounded-3xl w-full flex flex-col md:flex-row gap-4 justify-start">
                            <div key={`post${data?.id}`} className="flex md:min-w-72 flex-col gap-4 items-center justify-center">
                                <div className="max-h-48 max-w-48 sm:max-h-64 sm:max-w-64 lg:max-h-96 lg:max-w-96 flex justify-center p-0 md:p-4">
                                    <img width={384} height={384} alt={data?.title} src={data?.images?.[0]} className="w-full h-full object-contain bg-center bg-no-repeat rounded-sm" />
                                </div>
                                <div className={`${bgColor} p-2`}>{data?.price}$</div>
                                <div className="flex items-center gap-2">
                                    <button onClick={() => {
                                        addToCart(data)
                                    }} className="p-2 bg-rose-600 hover:bg-blue-400 text-white rounded text-nowrap select-none">Add to cart</button>
                                </div>
                            </div>
                            <div className="flex flex-col items-start gap-2 p-0 lg:p-4 flex-1">
                                <Link to={`/category/${Lowercase(data?.category)}`} className="text-sm text-neutral-500">
                                    {Capitalize(data?.category)}
                                </Link>
                                <h2 className="font-medium text-2xl">
                                    {data?.title}
                                </h2>
                                <h3 className="font-light text-lg text-wrap w-full max-w-full break-words overflow-hidden text-left">
                                    {data?.description}
                                </h3>
                                <h4 className="font-thin flex gap-2 leading-none items-center my-2">
                                    <Rate n={data?.rating?.rate || 3.5} />
                                    <div className="text-sm leading-none">({data?.rating?.count || 1200} Rate)</div>
                                </h4>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}
export default Post;