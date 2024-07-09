import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loading from "../components/Loading";
import axios from "axios";
import { basketContext } from "../core/Context";
import { decode } from "html-entities";
import { Helmet } from "react-helmet";
import { Capitalize } from "../core/Utils";
import { Colors } from "../core/Colors";
import NotFound from "./NotFound";
import Defined from "../core/Defined";

const Category = (data) => {
    let serverData = data.data.data;

    const website = Defined?.website;
    const baseTitle = Defined?.title;
    const apiURL = Defined?.apiURL?.category;

    const params = useParams();
    let name = params?.name || 'Category';
    name = decode(name);
    const [bgColor, setBgColor] = useState('bg-neutral-100');
    const [viaColor, setViaColor] = useState('via-neutral-100');
    const [loading, isLoading] = useState(false);
    const [error, isError] = useState(false);
    const [categoryData, setCategoryData] = useState(serverData?.['category' + '_' + decode(name)] || []);
    data = {}
    const { setBasket, basket } = useContext(basketContext);
    const { prices, setPrices } = useContext(basketContext);
    const addToCart = (_v) => {
        setBasket([...basket, { id: _v?.id, title: _v?.title, price: _v?.price, image: _v?.image, category: _v?.category }]);
        setPrices([...prices, _v?.price]);
        localStorage.setItem('myshop-basket', JSON.stringify({ items: [...basket, { id: _v?.id, title: _v?.title, price: _v?.price, image: _v?.image, category: _v?.category }], prices: [...prices, _v?.price] }));
        document.getElementById('togglebasket').classList.add('animate-ping');
        document.getElementById('togglebasket').classList.remove('bg-white');
        document.getElementById('togglebasket').classList.add('bg-yellow-200');
        setTimeout(() => {
            document.getElementById('togglebasket').classList.remove('animate-ping');
            document.getElementById('togglebasket').classList.remove('bg-yellow-200');
            document.getElementById('togglebasket').classList.add('bg-white');

        }, 100);
    }
    useEffect(() => {
        if (typeof window !== 'undefined')
            window.scrollTo(0, 0);

        switch (name) {
            case 'jewelery':
                setBgColor(Colors('gold')?.[0]);
                setViaColor(Colors('gold')?.[1]);
                break;
            case "men's clothing":
                setBgColor(Colors('neutral')?.[0]);
                setViaColor(Colors('neutral')?.[1]);
                break;
            case "women's clothing":
                setBgColor(Colors('fuchsia')?.[0]);
                setViaColor(Colors('fuchsia')?.[1]);
                break;
            case "electronics":
                setBgColor(Colors('sky')?.[0]);
                setViaColor(Colors('sky')?.[1]);
                break;
        }
        (async () => {
            if (typeof serverData?.['category' + '_' + name] === 'undefined') {
                isLoading(true);
                await axios.get(apiURL + name, {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    timeout: 60000,
                })
                    .then(async (res) => {
                        const result = await res.data;
                        setCategoryData(result);
                        isLoading(false)

                    }).catch(() => {
                        isLoading(false);
                        isError(true);
                    })
            }
            else
                isLoading(false)

        })();
    }, [bgColor, viaColor]);
    if (!loading && (serverData?.['category' + '_' + name]?.length === 0))
        return <NotFound />;
    return (
        <>
            <Helmet>
                <title>{Capitalize(name)} - {baseTitle}</title>
                <link rel="canonical" href={`${website}/category/${name}`} />
                <meta name="robots" content="index, follow" />
            </Helmet>
            {loading && <Loading n={4} />}
            {!loading && error && <div className="w-full text-center text-orange-500">An error has occurred! Please try agian later.</div>}
            {!loading && !error && (categoryData?.length !== 0) &&
                <div className="flex flex-col justify-start items-start py-3 min-h-screen">
                    <div className="flex w-full justify-between items-center">
                        <Link to={`/category/${name}`} className={`text-2xl w-auto hover:text-neutral-600 ${bgColor} p-4 rounded-t-lg`}>{Capitalize(name)}</Link>
                        <Link to={`/`} className={`text-lg  flex items-center justify-between w-auto hover:text-neutral-600 `}>
                            <span> Back to home</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-arrow-right-short" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8" />
                            </svg>
                        </Link>
                    </div>
                    <div className={`w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 justify-center items-center rounded-lg rounded-tl-none p-6 from-slate-200 ${viaColor} to-slate-200 from-10% via-35% to-100%  xl:from-20% xl:via-50% xl:to-80% bg-gradient-to-bl`}>
                        {(categoryData?.length !== 0) && categoryData?.map((_v, _i) => {
                            return (
                                <div to={`/products/${_v.id}`} key={`p_${_i}`} className="flex flex-col gap-4 items-center p-4 border-2 bg-white hover:scale-95 transition-all duration-500 rounded-3xl">
                                    <img alt={_v?.title} src={_v?.image} className="object-contain w-40 h-40 object-center" />
                                    <div className={`${bgColor} p-2`}>{_v?.price}$</div>
                                    <div className="flex items-center gap-2">
                                        <Link to={`/category/${name}/products/${_v?.id}`} className="p-2 bg-slate-200 text-slate-600 hover:bg-opacity-80 rounded">Details</Link>
                                        <button onClick={() => {
                                            addToCart(_v)
                                        }} className="p-2 bg-rose-500 hover:bg-blue-400 text-white rounded select-none">Add to basket</button>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div >
            }
        </>
    )
}
export default Category;