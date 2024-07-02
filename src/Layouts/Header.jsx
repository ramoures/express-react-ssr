import { useContext, useEffect } from "react";
import { basketContext } from "../core/Basket";
import { Link } from "react-router-dom";

const Header = () => {
    let { basket, setBasket } = useContext(basketContext)
    const { sum, setSum } = useContext(basketContext)
    let summary = [];
    let reduce;
    function removeFunc(e) {
        const id = e.target.getAttribute('data-id')
        delete basket[id];
        delete sum[id];
        let newArr = basket.filter(n => n)
        let newSum = sum.filter(n => n)
        setBasket([...newArr]);
        setSum([...newSum])
    }

    const showbasket = () => {
        document.getElementById('basketBox').classList.remove('hidden')
        document.getElementById('basketBox').classList.add('flex')
        document.getElementById('togglebasket').classList.remove('rounded-lg')
        document.getElementById('togglebasket').classList.add('rounded-t-xl')
    }
    const hidebasket = (e) => {
        document.getElementById('basketBox').classList.remove('flex')
        document.getElementById('basketBox').classList.add('hidden')
        document.getElementById('togglebasket').classList.remove('rounded-t-xl')
        document.getElementById('togglebasket').classList.add('rounded-lg')

    }
    return (
        <header id="navbar" className="w-full bg-gradient-to-r from-slate-400/50 from-0% via-20% to-60% via-teal-200/50 to-slate-400/50 p-4 flex items-center justify-center border-b-[6px] border-neutral-200  sticky top-0 z-50 backdrop-blur-md">
            <div className="w-11/12 lg:w-8/12 flex justify-between ">
                <Link to={`/`} className="flex items-center gap-2 ">
                    <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" className="bi bi-shop" viewBox="0 0 16 16">
                        <path d="M2.97 1.35A1 1 0 0 1 3.73 1h8.54a1 1 0 0 1 .76.35l2.609 3.044A1.5 1.5 0 0 1 16 5.37v.255a2.375 2.375 0 0 1-4.25 1.458A2.37 2.37 0 0 1 9.875 8 2.37 2.37 0 0 1 8 7.083 2.37 2.37 0 0 1 6.125 8a2.37 2.37 0 0 1-1.875-.917A2.375 2.375 0 0 1 0 5.625V5.37a1.5 1.5 0 0 1 .361-.976zm1.78 4.275a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 1 0 2.75 0V5.37a.5.5 0 0 0-.12-.325L12.27 2H3.73L1.12 5.045A.5.5 0 0 0 1 5.37v.255a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0M1.5 8.5A.5.5 0 0 1 2 9v6h1v-5a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v5h6V9a.5.5 0 0 1 1 0v6h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1V9a.5.5 0 0 1 .5-.5M4 15h3v-5H4zm5-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1zm3 0h-2v3h2z" />
                    </svg>
                    <h1 className="font-medium text-3xl ">My Shop</h1 >
                </Link>
                <div id="togglebasket" className="flex p-2 items-center gap-1 bg-white relative rounded-lg" onMouseOver={showbasket} onMouseLeave={hidebasket}>
                    <Link to={`/basket`} className="flex gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-cart4" viewBox="0 0 16 16">
                            <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5M3.14 5l.5 2H5V5zM6 5v2h2V5zm3 0v2h2V5zm3 0v2h1.36l.5-2zm1.11 3H12v2h.61zM11 8H9v2h2zM8 8H6v2h2zM5 8H3.89l.5 2H5zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0m9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0" />
                        </svg>
                        <div>Basket({basket?.length})</div>
                    </Link>
                    <div id="basketBox" className="absolute hidden flex-col gap-2 items-center top-0 right-0 mt-10 bg-white h-auto w-96 shadow-xl rounded-xl rounded-tr-none">
                        {!basket?.length && <div className=" p-4">Item not found!</div>}
                        {basket?.length > 0 &&
                            <div className="overflow-y-auto w-full flex flex-col gap-4 p-4  h-96">
                                {basket.length && basket.map((_v, _i) => {
                                    summary.push(Number(_v?.price))
                                    reduce = summary.reduce((a, b) => a + b, 0).toFixed(3)
                                    return (
                                        <div key={_i} className="flex items-center justify-between gap-2 w-full select-none ">
                                            <div className="min-w-14 max-w-14 min-h-14 max-h-14 h-auto flex flex-col justify-center items-center border-2 ">
                                                <img src={_v?.image} className="object-contain min-w-12 max-w-12 min-h-12 max-h-12 object-center" />
                                            </div>
                                            <div className="flex flex-col gap-1 flex-1">
                                                {_v?.title}
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
                                <Link to={`/checkout`} onClick={hidebasket} className="bg-blue-600 p-2 text-white rounded-sm hover:bg-green-600">Checkout</Link>
                            </div>
                        }

                    </div>

                </div>

            </div>
        </header >
    );
};
export default Header;
