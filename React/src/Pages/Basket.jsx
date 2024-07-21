import { useContext, useEffect } from "react";
import { Helmet } from "react-helmet";
import { basketContext } from "../core/Context";
import { Link } from "react-router-dom";
import Defined from "../core/Defined";
const Basket = () => {
    const baseTitle = Defined?.title;

    let { basket, setBasket } = useContext(basketContext)
    const { prices, setPrices } = useContext(basketContext)
    let summary = [];
    let reduce;
    function removeFunc(e) {
        const id = e.target.getAttribute('data-id')
        delete basket[id];
        delete prices[id];
        let newArr = basket.filter(n => n)
        let newPrices = prices.filter(n => n)
        setBasket([...newArr]);
        setPrices([...newPrices]);
        localStorage.setItem('myshop-basket', JSON.stringify({ items: [...newArr], prices: [...newPrices] }));
    }

    useEffect(() => {
        if (typeof window !== 'undefined')
            window.scrollTo(0, 0);
        const storage = localStorage.getItem('myshop-basket');
        const parsSotrage = JSON.parse(storage)
        if (!basket.length && parsSotrage) {
            const items = parsSotrage?.items
            const itemPrices = parsSotrage?.prices
            setBasket([...items])
            setPrices([...itemPrices])
        }
    }, [])
    return (
        <>
            <Helmet>
                <title>Basket - {baseTitle}</title>
                <meta name="robots" content="noindex,nofollow" />
            </Helmet>
            <div key="main" className="flex flex-col gap-5 w-full min-h-screen ">
                <div className="font-[sans-serif] lg:flex lg:items-center lg:justify-center my-4">
                    <div className="bg-slate-100 p-8 w-full mx-auto rounded-md">
                        <h2 className="text-3xl font-extrabold text-gray-800 text-center">Basket</h2>
                        <div className="flex flex-col gap-4 mt-10">
                            {!basket?.length && <div className=" p-4 w-full text-center">Item not found!</div>}
                            {basket && basket.map((_v, _i) => {
                                summary.push(Number(_v?.price))
                                reduce = summary.reduce((a, b) => a + b, 0).toFixed(3)
                                return (
                                    <div key={_i} className="flex bg-white p-2 items-center justify-between gap-2 w-full select-none ">
                                        <Link to={`/category/${_v?.category}/products/${_v?.id}`} className="min-w-14 max-w-14 min-h-14 max-h-14 h-auto flex flex-col justify-center items-center border-2 ">
                                            <div className="h-12 w-12">
                                                <img width={48} height={48} alt={_v?.title} src={_v?.image} className="w-full h-full object-contain bg-center bg-no-repeat" />
                                            </div>
                                        </Link>
                                        <div className="flex flex-col justify-start items-start gap-1 flex-1">
                                            <Link to={`/category/${_v?.category}/products/${_v?.id}`}>{_v?.title}</Link>
                                            <div className="text-blue-600">{_v?.price}$</div>
                                        </div>
                                        <button data-id={_i} onClick={removeFunc} className="flex text-slate-600 hover:text-red-500">
                                            <svg data-id={_i} xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                                                <path data-id={_i} d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
                                            </svg>
                                        </button>
                                    </div>
                                )
                            })}
                            {reduce &&
                                <div className="py-3 flex gap-2 items-center justify-center bg-slate-50 w-full rounded-b-xl">
                                    <div>
                                        <span className="text-blue-600">{reduce || 0}$</span>
                                    </div>
                                    <Link to={`/checkout`} className="bg-blue-600 p-2 text-white rounded-sm hover:bg-green-600">Checkout</Link>
                                </div>
                            }
                        </div>
                    </div>
                </div>

            </div>
        </>)
}
export default Basket;