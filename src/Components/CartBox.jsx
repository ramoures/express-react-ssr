import { useContext, useEffect } from "react";
import { projectContext } from "../Core/Context";
import { Link } from "react-router-dom";
import { encode } from "html-entities";
const CartBox = () => {
    let { cart, setCart } = useContext(projectContext)
    const { prices, setPrices } = useContext(projectContext)
    let summary = [];
    let reduce;
    function removeFunc(e) {
        const id = e.target.getAttribute('data-id')
        delete cart[id];
        delete cart[id];
        let newArr = cart.filter(n => n)
        let newPrices = prices.filter(n => n)
        setCart([...newArr]);
        setPrices([...newPrices]);
        localStorage.setItem('erSSR-shop-cart', JSON.stringify({ items: [...newArr], prices: [...newPrices] }));
    }
    useEffect(() => {
        const storage = localStorage.getItem('erSSR-shop-cart');
        const parsStorage = JSON.parse(storage)
        if (!cart.length && parsStorage) {
            const items = parsStorage?.items || []
            const itemPrices = parsStorage?.prices || []
            if (items.length)
                setCart([...items])
            if (itemPrices.length)
                setPrices([...itemPrices])
        }
    }, [])
    const showCartBox = () => {
        document.getElementById('cartBox').classList.remove('hidden');
        document.getElementById('cartBox').classList.add('flex');
        document.getElementById('toggleCart').classList.remove('rounded-lg');
        document.getElementById('toggleCart').classList.add('rounded-t-xl');
    }
    const hideCartBox = (e) => {
        document.getElementById('cartBox').classList.remove('flex');
        document.getElementById('cartBox').classList.add('hidden');
        document.getElementById('toggleCart').classList.remove('rounded-t-xl');
        document.getElementById('toggleCart').classList.add('rounded-lg');
    }
    return (
        <div id="toggleCart" className="flex select-none p-2 items-center gap-1 bg-white relative rounded-lg" onMouseOver={showCartBox} onMouseLeave={hideCartBox}>
            <div className="hidden lg:block">
                <Link to={`/cart`} className="flex gap-1 items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-cart4" viewBox="0 0 16 16">
                        <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5M3.14 5l.5 2H5V5zM6 5v2h2V5zm3 0v2h2V5zm3 0v2h1.36l.5-2zm1.11 3H12v2h.61zM11 8H9v2h2zM8 8H6v2h2zM5 8H3.89l.5 2H5zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0m9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0" />
                    </svg>
                    {cart?.length > 0 && <div className="text-xs bg-red-600 rounded-full text-white py-0 px-1">{cart?.length}</div>}
                </Link>
            </div>
            <div className="flex gap-1 lg:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-cart4" viewBox="0 0 16 16">
                    <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5M3.14 5l.5 2H5V5zM6 5v2h2V5zm3 0v2h2V5zm3 0v2h1.36l.5-2zm1.11 3H12v2h.61zM11 8H9v2h2zM8 8H6v2h2zM5 8H3.89l.5 2H5zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0m9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0" />
                </svg>
                <div>Cart({cart?.length})</div>
            </div>
            <div id="cartBox" className="absolute hidden flex-col gap-2 items-center top-0 right-0 mt-10 bg-white h-auto w-screen mr-[-16px] lg:w-96 lg:mr-0 shadow-xl rounded-xl lg:rounded-tr-none">
                {!cart?.length && <div className=" p-4">Item not found!</div>}
                {cart?.length > 0 &&
                    <div className="overflow-y-auto w-full flex flex-col gap-4 p-4  h-96">
                        {cart.length && cart.map((_v, _i) => {
                            summary.push(Number(_v?.price))
                            reduce = summary.reduce((a, b) => a + b, 0).toFixed(3)
                            return (
                                <div key={_i} className="flex items-center justify-between gap-2 w-full select-none ">
                                    <Link onClick={hideCartBox} to={`/category/${_v?.category?.split("'")[0]}/products/${_v?.id}`} className="min-w-14 max-w-14 min-h-14 max-h-14 h-auto flex flex-col justify-center items-center border-2 ">
                                        <div className="h-12 w-12 flex justify-center">
                                            <img width={48} height={48} alt={_v?.title} src={_v?.image} className="w-full h-full object-contain bg-center bg-no-repeat" />
                                        </div>
                                    </Link>
                                    <div className="flex flex-col gap-1 flex-1">
                                        <Link onClick={hideCartBox} to={`/category/${_v?.category?.split("'")[0]}/products/${_v?.id}`}>{_v?.title}</Link>
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

                    </div>
                }
                {reduce &&
                    <div className="py-3 flex gap-2 items-center justify-center bg-neutral-100 w-full rounded-b-xl">
                        <div>
                            <span className="text-blue-600">{reduce || 0}$</span>
                        </div>
                        <Link to={`/checkout`} onClick={hideCartBox} className="bg-blue-600 p-2 text-white rounded-sm hover:bg-green-600">Checkout</Link>
                    </div>
                }

            </div>

        </div>
    )
}
export default CartBox;