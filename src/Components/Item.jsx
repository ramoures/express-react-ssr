import API from "../../core/API.js";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FetchData } from "../../core/FetchData.js";
import { Colors } from "../Core/Colors.jsx";
import { projectContext } from "../Core/Context.jsx";
import Loading from "./Loading.jsx";
import { encode } from "html-entities/lib/index.js";
import { Capitalize } from "../Core/Utils.jsx";
/** 
 * @param {object} dataFromServer - The First Data Fetching from API.
 * @returns {import("react").ReactHTMLElement} 
*/
const Item = ({ color, name, dataFromServer }) => {

    const [data, setData] = useState(dataFromServer || []);

    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(dataFromServer?.length ? false : true);


    const apiInfo = API('category/' + encodeURI(encode(name)));

    let response;

    useEffect(() => {

        if (typeof window !== "undefined") {
            /*
                Place your javascript DOM code here.
            */
            //ex: document.getElementById('sample')?.classList?.add('hidden')
        }

        if (!dataFromServer?.length)
            (async () => {
                response = await FetchData(apiInfo?.method, apiInfo?.url, apiInfo?.dfs);
                if (typeof response === 'object')
                    if (Object.keys(response)?.length)
                        setData(response);
                    else
                        setError(`Error! '${name}' data not found!`);
                else
                    setError(response);
                setLoading(false);
            })()
        dataFromServer = [];
    }, []);

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
    const bgColor = Colors(color)?.[0];
    const viaColor = Colors(color)?.[1];

    return (
        <>
            {loading && <Loading n={1} />}
            {error !== false && !loading && <p>{error}</p>}
            {!loading && !error && (data?.length !== 0) &&
                <div className="flex flex-col justify-end items-start">
                    <Link to={`/category/${encodeURI(encode(name))}`} className={`text-xl w-auto hover:text-neutral-600 ${bgColor} p-4 rounded-t-lg`}>{Capitalize(name)}</Link>
                    <div className={`flex flex-col w-full gap-4 rounded-lg rounded-tl-none p-6 from-slate-200 ${viaColor} to-slate-200 from-10% via-35% to-100%  xl:from-20% xl:via-50% xl:to-80% bg-gradient-to-bl`}>
                        <div className={`w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 justify-center items-center `}>
                            {data?.filter((itm, idx) => idx < 4)?.map((_v, _i) => {
                                return (
                                    <div key={`p_${_i}`} className="flex flex-col gap-4 items-center p-4 border-2 bg-white hover:scale-95 transition-all duration-500 rounded-3xl ">
                                        <Link to={`/category/${encodeURI(encode(name))}/products/${_v?.id}`} className="h-40 w-40 flex justify-center">
                                            <img width={160} height={160} alt={_v?.title} src={_v?.image} className="w-full h-full object-contain bg-center bg-no-repeat" />
                                        </Link>
                                        <div className={`${bgColor} p-2`}>{_v?.price}$</div>
                                        <div className="flex items-center gap-2">
                                            <Link to={`/category/${encodeURI(encode(name))}/products/${_v?.id}`} className="p-2 bg-slate-200 text-slate-600 hover:bg-opacity-80 rounded">Details</Link>
                                            <button onClick={() => {
                                                addToCart(_v)
                                            }} className="p-2 bg-rose-600 hover:bg-blue-400 text-white rounded active:animate-ping select-none">Add to basket</button>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        {data?.length > 4 &&
                            <div className="w-full flex justify-end">
                                <Link to={`/category/${encodeURI(encode(name))}`} className="bg-white/40 p-1 rounded">More...</Link>
                            </div>
                        }
                    </div>
                </div>
            }
        </>
    )

}
export default Item;