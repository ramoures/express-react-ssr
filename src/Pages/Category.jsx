import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loading from "../Components/Loading";
import { projectContext } from "../Core/Context";
import { Colors } from "../Core/Colors";
import FetchData from "../../core/FetchData.mjs";
import { decode } from "html-entities/lib";
import { addRemoveSlash, Capitalize } from "../Core/Utils";
import NotFound from "./NotFound";
import Defined from "../Core/Defined";
import MetaTags from "../MetaTags";
import API from "../../core/API.mjs";

const Category = ({ dataFromServer }) => {
    const [data, setData] = useState(dataFromServer?.['firstData'] || []);

    const [error, setError] = useState(false);
    const [loading, setLoading] = useState((Object.keys(dataFromServer?.['firstData'])?.length !== 0) ? false : true);

    const [bgColor, setBgColor] = useState('bg-neutral-100');
    const [viaColor, setViaColor] = useState('via-neutral-100');

    const params = useParams();
    let name = params?.name;

    const apiInfo = API(`category/${encodeURI(name)}`);

    let response;

    useEffect(() => {

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

        if (Object.keys(dataFromServer?.['firstData'])?.length === 0)
            (async () => {
                response = await FetchData(apiInfo?.method, apiInfo?.url);
                if (typeof response === 'object')
                    if (Object.keys(response)?.length)
                        setData(response);
                    else
                        setError(`Error! '${name}' data not found!`);
                else
                    setError(response);
                setLoading(false);

            })()
        dataFromServer['firstData'] = {}
    }, []);

    // Constants
    const website = Defined?.website;
    const directory = Defined?.directory;
    const { thisPort } = useContext(projectContext)
    const websiteFullUrl = website + (thisPort ? ':' + thisPort : '') + addRemoveSlash(directory, true);
    const baseTitle = Defined?.title;
    const twitterAccount = Defined?.twitter


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

    if (!loading && (!data))
        return <NotFound />;
    return (
        <>
            <MetaTags
                url={`${websiteFullUrl}/category/${name}`}
                title={`${Capitalize(decode(name))} - Category - ${baseTitle}`}
                description={data?.description || `This is home page of ${Capitalize(decode(name))}`}
                keywords={data?.keywords || 'Shop, E-Commerce, Store'}
                image={data[0]?.image || `${websiteFullUrl}/images/icon.svg`}
                twitterAccount={data?.twitter || twitterAccount}
            />
            {loading && <div className="block py-3"><Loading n={4} /></div>}
            {error !== false && !loading && <p>{error}</p>}
            {!loading && !error && (data?.length !== 0) &&
                <div className="flex flex-col justify-start items-start py-3">
                    <div className="flex w-full justify-between items-center">
                        <Link to={`/category/${name}`} className={`text-xl w-auto hover:text-neutral-600 ${bgColor} p-4 rounded-t-lg`}>{Capitalize(decode(name))}</Link>
                        <Link to={`/`} className={`text-lg  flex items-center justify-between w-auto hover:text-neutral-600 `}>
                            <span> Back to home</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-arrow-right-short" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8" />
                            </svg>
                        </Link>
                    </div>
                    <div className={`w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 justify-center items-center rounded-lg rounded-tl-none p-6 from-slate-200 ${viaColor} to-slate-200 from-10% via-35% to-100%  xl:from-20% xl:via-50% xl:to-80% bg-gradient-to-bl`}>
                        {(data?.length !== 0) && data?.map((_v, _i) => {
                            return (
                                <div to={`/products/${_v.id}`} key={`p_${_i}`} className="flex flex-col gap-4 items-center p-4 border-2 bg-white hover:scale-95 transition-all duration-500 rounded-3xl">
                                    <Link to={`/category/${name}/products/${_v?.id}`} className="h-40 w-40 flex justify-center">
                                        <img width={160} height={160} alt={_v?.title} src={_v?.image} className="w-full h-full object-contain bg-center bg-no-repeat" />
                                    </Link>
                                    <div className={`${bgColor} p-2`}>{_v?.price}$</div>
                                    <div className="flex items-center gap-2">
                                        <Link to={`/category/${name}/products/${_v?.id}`} className="p-2 bg-slate-200 text-slate-600 hover:bg-opacity-80 rounded">Details</Link>
                                        <button onClick={() => {
                                            addToCart(_v)
                                        }} className="p-2 bg-rose-600 hover:bg-blue-400 text-white rounded select-none">Add to basket</button>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            }
        </>
    )
}
export default Category;