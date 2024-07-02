import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { basketContext } from "../core/Basket";
import Loading from "./Loading";

const Box = ({ color, name, data, loading }) => {

    const { setBasket, basket } = useContext(basketContext);
    const { sum, setSum } = useContext(basketContext);
    const addToCard = (_v) => {
        setBasket([...basket, { id: _v?.id, title: _v?.title, price: _v?.price, image: _v?.image }]);
        setSum([...sum, _v?.price]);
    }
    let bgColor;
    let viaColor;
    switch (color) {
        case 'neutral':
            bgColor = 'bg-neutral-100';
            viaColor = 'via-neutral-100';
            break;
        case 'sky':
            bgColor = 'bg-sky-100';
            viaColor = 'via-sky-100';
            break;
        case 'green':
            bgColor = 'bg-green-100';
            viaColor = 'via-green-100';
            break;
        case 'pink':
            bgColor = 'bg-pink-100';
            viaColor = 'via-pink-100';
            break;
        case 'fuchsia':
            bgColor = 'bg-fuchsia-100';
            viaColor = 'via-fuchsia-100';
            break;
    }

    return (
        <>
            {loading && <Loading />}
            {!loading &&
                <div className="flex flex-col justify-end items-start">
                    <Link to={`/category/${name}`} className={`text-2xl w-auto hover:text-neutral-600 ${bgColor} p-4 rounded-t-lg`}>{name}</Link>
                    <div className={`w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 justify-center items-center rounded-lg rounded-tl-none p-6 from-slate-200 ${viaColor} to-slate-200 from-10% via-35% to-100%  xl:from-20% xl:via-50% xl:to-80% bg-gradient-to-bl`}>
                        {(data?.length === 0) && <div>Data not found!</div>}
                        {(data?.length !== 0) && data?.map((_v, _i) => {
                            return (
                                <div to={`/products/${_v.id}`} key={`p_${_i}`} className="flex flex-col gap-4 items-center p-4 border-2 bg-white hover:scale-95 transition-all duration-500 rounded-3xl">
                                    <img src={_v.image} className="object-contain w-40 h-40 object-center" />
                                    <div className={`${bgColor} p-2`}>{_v.price}$</div>
                                    <div className="flex items-center gap-2">
                                        <Link to={`/products/${_v.id}`} className="p-2 bg-slate-200 text-slate-600 hover:bg-opacity-80 rounded">Details</Link>
                                        <button onClick={() => {
                                            addToCard(_v)
                                        }} className="p-2 bg-rose-500 hover:bg-blue-400 text-white rounded">Add to basket</button>
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
export default Box;