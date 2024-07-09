import { useContext } from "react";
import { Link } from "react-router-dom";
import { basketContext } from "../core/Context";
import Loading from "./Loading";
import { Capitalize } from "../core/Utils";
import { Colors } from "../core/Colors";
const Item = ({ color, name, data, loading, error }) => {
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
    const bgColor = Colors(color)?.[0];
    const viaColor = Colors(color)?.[1];
    return (
        <>
            {loading && <Loading n={1} />}
            {!loading && !error && (data?.length !== 0) &&
                <div className="flex flex-col justify-end items-start">
                    <Link to={`/category/${name}`} className={`text-2xl w-auto hover:text-neutral-600 ${bgColor} p-4 rounded-t-lg`}>{Capitalize(name)}</Link>
                    <div className={`flex flex-col w-full gap-4 rounded-lg rounded-tl-none p-6 from-slate-200 ${viaColor} to-slate-200 from-10% via-35% to-100%  xl:from-20% xl:via-50% xl:to-80% bg-gradient-to-bl`}>
                        <div className={`w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 justify-center items-center `}>
                            {data?.filter((itm, idx) => idx < 4)?.map((_v, _i) => {
                                return (
                                    <div key={`p_${_i}`} className="flex flex-col gap-4 items-center p-4 border-2 bg-white hover:scale-95 transition-all duration-500 rounded-3xl ">
                                        <div className="h-40 w-40 flex justify-center">
                                            <img width={160} height={160} alt={_v?.title} src={_v?.image} className="w-full h-full object-contain bg-center bg-no-repeat" />
                                        </div>
                                        <div className={`${bgColor} p-2`}>{_v?.price}$</div>
                                        <div className="flex items-center gap-2">
                                            <Link to={`/category/${name}/products/${_v?.id}`} className="p-2 bg-slate-200 text-slate-600 hover:bg-opacity-80 rounded">Details</Link>
                                            <button onClick={() => {
                                                addToCart(_v)
                                            }} className="p-2 bg-rose-500 hover:bg-blue-400 text-white rounded active:animate-ping select-none">Add to basket</button>
                                        </div>
                                    </div>
                                )
                            })}

                        </div>
                        {data?.length > 4 &&
                            <div className="w-full flex justify-end">
                                <Link to={`/category/${name}`} className="bg-white/40 p-1 rounded">More...</Link>
                            </div>
                        }
                    </div>

                </div>
            }
        </>
    )
}
export default Item;