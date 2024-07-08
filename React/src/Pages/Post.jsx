import { useContext, useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loading from "../components/Loading";
import axios from "axios";
import { basketContext } from "../core/Basket";
import { decode } from "html-entities";
import { Helmet } from "react-helmet";
import Rate from "../components/Rate";
import { Capitalize } from "../core/Utils";
import { Colors } from "../core/Colors";
import NotFound from "./NotFound";
import Defined from "../core/Defined";
const Post = (data) => {
    const serverData = data.data.data;
    
    const apiURL = Defined?.apiURL?.products;

    //Use Params
    const params = useParams();
    let category = params?.name;
    category = decode(category);
    let slug = params?.slug;
    slug = decode(slug);

    //Use State
    const [uri, setUri] = useState(category + slug);
    const [bgColor, setBgColor] = useState('bg-neutral-100');
    const [viaColor, setViaColor] = useState('via-neutral-100');
    const [loading, isLoading] = useState(false);
    const [postData, setPostData] = useState(serverData?.['post' + '_' + category + '_' + slug] || []);

    //Use context
    const { setBasket, basket } = useContext(basketContext);
    const { prices, setPrices } = useContext(basketContext);

    data = {}

    //Internal arrow functions (Add to basket Cart, Set background colors, Get data from Api):
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
    const setColor = (category) => {
        switch (category) {
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
    }
    const getData = async (slug, category) => {
        //If load or change url by react router dom
        await axios.get(apiURL + slug, {
            headers: {
                "Content-Type": "application/json"
            },
            timeout: 60000,
        }).then(async (res) => {
            const result = await res.data;
            setPostData(result);
            isLoading(false);
            setUri(category + slug);
        }).catch(() => {
            isLoading(false);
        });
    }

    //If CHANGE url by react router dom:
    const initialize = useRef(true);
    const changeRoute = (uri !== (category + slug)) ? true : false;
    if (changeRoute && initialize.current) {
        isLoading(true);
        (async () => {
            setColor(category);
            getData(slug, category);
        })();
        initialize.current = false;
    }
    else initialize.current = true;

    //Use Effect
    useEffect(() => {
        setUri(category + slug);
        setColor(category);
        if (typeof window !== 'undefined')
            window.scrollTo(0, 0);

        //If LOAD by react router dom:
        if (typeof serverData?.['post' + '_' + category + '_' + slug] === 'undefined')
            (async () => {
                isLoading(true);
                getData(slug, category);
            })();
    }, [bgColor, viaColor]);

    if (!loading && (serverData?.['post' + '_' + category + '_' + slug]?.length === 0))
        return <NotFound />;
    return (
        <>
            <Helmet>
                <title>Title</title>
            </Helmet>
            {loading && <Loading n={0} />}
            {!loading && (postData?.length !== 0) &&
                <div className="flex flex-col justify-start items-start py-0 min-h-screen">
                    <div className="flex w-full justify-between items-center">
                        <div></div>
                        <Link to={`/`} className={`text-lg py-5 flex items-center justify-between w-auto hover:text-neutral-600 `}>
                            <span> Back to home</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-arrow-right-short" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8" />
                            </svg>
                        </Link>
                    </div>
                    <div className={`w-full flex justify-center items-center rounded-2xl p-6 from-slate-200 ${viaColor} to-slate-200 from-10% via-35% to-100%  xl:from-20% xl:via-50% xl:to-80% bg-gradient-to-bl`}>

                        <div className="p-4 border-2 bg-white rounded-3xl w-full flex flex-col md:flex-row gap-4 justify-center">
                            <div key={`post${postData.id}`} className="flex md:min-w-72 flex-col gap-4 items-center justify-center">
                                <img src={postData.image} className="object-contain w-40 h-40 object-center" />
                                <div className={`${bgColor} p-2`}>{postData.price}$</div>
                                <div className="flex items-center gap-2">
                                    <button onClick={() => {
                                        addToCart(postData)
                                    }} className="p-2 bg-rose-500 hover:bg-blue-400 text-white rounded text-nowrap select-none">Add to basket</button>
                                </div>
                            </div>
                            <div className="flex flex-col items-start gap-2 p-4">
                                <Link to={`/category/${postData?.category}`} className="text-sm text-neutral-500">
                                    {Capitalize(postData?.category)}
                                </Link>
                                <h2 className="font-medium text-2xl">
                                    {postData?.title}
                                </h2>
                                <h3 className="font-light text-xl">
                                    {postData?.description}
                                </h3>
                                <h4 className="font-thin flex gap-2 leading-none items-center my-2">
                                    <Rate n={postData?.rating?.rate} />
                                    <div className="text-sm leading-none">({postData?.rating?.count} rate)</div>
                                </h4>
                            </div>
                        </div>

                    </div>
                </div >
            }

        </>
    )
}
export default Post;