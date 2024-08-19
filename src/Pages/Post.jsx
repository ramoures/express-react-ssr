import { useContext, useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loading from "../Components/Loading";
import { projectContext } from "../Core/Context";
import Rate from "../Components/Rate";
import { Colors } from "../Core/Colors";
import NotFound from "./NotFound";
import Defined from "../Core/Defined";
import MetaTags from "../MetaTags";
import API from "../../core/API.mjs";
import FetchData from "../../core/FetchData.mjs";
import { decode, encode } from "html-entities";
import { addRemoveSlash, Capitalize } from "../Core/Utils";

const Post = ({ dataFromServer }) => {

    const params = useParams();
    let name = params?.name;
    let slug = params?.slug;
    const apiInfo = API('single_products', slug);
    const [pageId, setPageId] = useState(name + slug);

    const [data, setData] = useState(dataFromServer?.['firstData'] || []);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState((Object.keys(dataFromServer?.['firstData'])?.length !== 0) ? false : true);
    const [bgColor, setBgColor] = useState('bg-neutral-100');
    const [viaColor, setViaColor] = useState('via-neutral-100');

    /**
     * Get data from the API and Set to the data state.
     * @param {string} method 
     * @param {string} url
     * @returns {Promise<void>} 1.set data or error state. 2.set pageId state. 3.set loading to false.
     */
    const pageData = async (method = 'get', url) => {
        let response;
        response = await FetchData(method, url);
        if (typeof response === 'object')
            if (Object.keys(response)?.length)
                setData(response);
            else
                setError(`Error! '${name}' data not found!`);
        else
            setError(response);
        setPageId(name + slug);
        setLoading(false);
    }
    //---

    // If the Post route changes to another Post route (When selecting basket items):
    const initialize = useRef(true);
    const routeChanged = (pageId !== (name + slug)) ? true : false;
    if (routeChanged && initialize.current) {
        setLoading(true);
        pageData(apiInfo?.method, apiInfo?.url);
        initialize.current = false;
    }
    else initialize.current = true;
    //---

    useEffect(() => {

        if (Object.keys(dataFromServer?.['firstData'])?.length === 0)
            pageData(apiInfo?.method, apiInfo?.url);
        dataFromServer['firstData'] = {};

        if (typeof window !== "undefined") {
            /*
                Place your javascript DOM code here.
            */
            //ex: document.getElementById('sample')?.classList?.add('hidden');
            window.scrollTo(0, 0);
            switch (name) {
                case 'jewelery':
                    setBgColor(Colors('gold')?.[0]);
                    setViaColor(Colors('gold')?.[1]);
                    break;
                case "men&apos;s clothing":
                    setBgColor(Colors('neutral')?.[0]);
                    setViaColor(Colors('neutral')?.[1]);
                    break;
                case "women&apos;s clothing":
                    setBgColor(Colors('fuchsia')?.[0]);
                    setViaColor(Colors('fuchsia')?.[1]);
                    break;
                case "electronics":
                    setBgColor(Colors('sky')?.[0]);
                    setViaColor(Colors('sky')?.[1]);
                    break;
            }
        }
    }, []);

    // Constants
    const website = Defined?.website;
    const directory = Defined?.directory;
    const websiteFullUrl = website + addRemoveSlash(directory, true);
    const baseTitle = Defined?.title;
    const twitterAccount = Defined?.twitter;

    const { setBasket, basket } = useContext(projectContext);
    const { prices, setPrices } = useContext(projectContext);

    const addToCart = (_v) => {
        setBasket([...basket, { id: _v?.id, title: _v?.title, price: _v?.price, image: _v?.image, category: _v?.category }]);
        setPrices([...prices, _v?.price]);
        localStorage.setItem('miniShop-basket', JSON.stringify({ items: [...basket, { id: _v?.id, title: _v?.title, price: _v?.price, image: _v?.image, category: _v?.category }], prices: [...prices, _v?.price] }));
        if (typeof window !== 'undefined') {
            document.getElementById('toggleBasket').classList.add('animate-ping');
            document.getElementById('toggleBasket').classList.remove('bg-white');
            document.getElementById('toggleBasket').classList.add('bg-yellow-200');
            setTimeout(() => {
                document.getElementById('toggleBasket').classList.remove('animate-ping');
                document.getElementById('toggleBasket').classList.remove('bg-yellow-200');
                document.getElementById('toggleBasket').classList.add('bg-white');
            }, 100);
        }
    }

    if (!loading && (data?.length === 0))
        return <NotFound />;
    return (
        <>
            <MetaTags
                url={`${websiteFullUrl}/category/${encodeURI(encode(name))}/products/${data?.id}`}
                title={`${data.title ? data?.title + ' - ' : ''}${name ? Capitalize(decode(decode(name))) + ' - ' : ''}Category - ${baseTitle}`}
                description={data?.description || 'This is home page of my shopping website'}
                keywords={data?.keywords || 'Shop, E-Commerce, Store'}
                image={data?.image || `${websiteFullUrl}/assets/img/icon.svg`}
                twitterAccount={data?.twitter || twitterAccount}
            />
            {loading && <Loading n={0} />}
            {error !== false && !loading && <p>{error}</p>}
            {!loading && !error && (data?.length !== 0) &&
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
                                <li><Link className="p-1 rounded hover:bg-neutral-100" to={`/category/${encodeURI(encode(data?.category))}`}>{Capitalize(data?.category)}</Link></li>
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
                                <div className="h-40 w-40 flex justify-center">
                                    <img width={160} height={160} alt={data?.title} src={data?.image} className="w-full h-full object-contain bg-center bg-no-repeat" />
                                </div>
                                <div className={`${bgColor} p-2`}>{data?.price}$</div>
                                <div className="flex items-center gap-2">
                                    <button onClick={() => {
                                        addToCart(data)
                                    }} className="p-2 bg-rose-600 hover:bg-blue-400 text-white rounded text-nowrap select-none">Add to basket</button>
                                </div>
                            </div>
                            <div className="flex flex-col items-start gap-2 p-0 lg:p-4 flex-1">
                                <Link to={`/category/${encodeURI(encode(data?.category))}`} className="text-sm text-neutral-500">
                                    {Capitalize(data?.category)}
                                </Link>
                                <h2 className="font-medium text-2xl">
                                    {data?.title}
                                </h2>
                                <h3 className="font-light text-lg text-wrap w-full max-w-full break-words overflow-hidden text-left">
                                    {data?.description}
                                </h3>
                                <h4 className="font-thin flex gap-2 leading-none items-center my-2">
                                    <Rate n={data?.rating?.rate} />
                                    <div className="text-sm leading-none">({data?.rating?.count} rate)</div>
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