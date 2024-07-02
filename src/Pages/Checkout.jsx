import { useContext } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { basketContext } from "../core/Basket";

const Checkout = (data) => {
    const { sum } = useContext(basketContext)
    const summary = sum.reduce((a, b) => a + b, 0).toFixed(3)
    return (
        <>
            <Helmet>
                <title>Checkout</title>
            </Helmet>
            <div key="main" className="flex flex-col gap-5 w-full h-full">
                <div className="font-[sans-serif] lg:flex lg:items-center lg:justify-center my-8">
                    <div className="bg-slate-100 p-8 w-full mx-auto rounded-md">
                        <h2 className="text-3xl font-extrabold text-gray-800 text-center">Checkout</h2>
                        <div className="grid lg:grid-cols-3 gap-6 max-lg:gap-8 mt-16">
                            <div className="lg:col-span-2">
                                <h3 className="text-lg font-bold text-gray-800">Choose your payment method</h3>

                                <div className="grid gap-4 sm:grid-cols-2 mt-4">
                                    <div className="flex items-center">
                                        <input name="paymentmethod" type="radio" className="w-5 h-5 cursor-pointer" id="card" />
                                        <label htmlFor="card" className="ml-4 flex gap-2 cursor-pointer">
                                            <img src="assets/img/visa.webp" className="w-12" alt="card1" />
                                            <img src="assets/img/american-express.webp" className="w-12" alt="card2" />
                                            <img src="assets/img/master.webp" className="w-12" alt="card3" />
                                        </label>
                                    </div>

                                    <div className="flex items-center">
                                        <input name="paymentmethod" type="radio" className="w-5 h-5 cursor-pointer" id="paypal" />
                                        <label htmlFor="paypal" className="ml-4 flex gap-2 cursor-pointer">
                                            <img src="assets/img/paypal.webp" className="w-20" alt="paypalCard" />
                                        </label>
                                    </div>
                                </div>

                                <form className="mt-8">
                                    <div className="grid sm:col-span-2 sm:grid-cols-2 gap-4">
                                        <div>
                                            <input type="text" placeholder="Name of card holder"
                                                className="px-4 py-3.5 bg-white text-gray-800 w-full text-sm border rounded-md focus:border-[#007bff] outline-none" />
                                        </div>
                                        <div>
                                            <input type="number" placeholder="Postal code"
                                                className="px-4 py-3.5 bg-white text-gray-800 w-full text-sm border rounded-md focus:border-[#007bff] outline-none" />
                                        </div>
                                        <div>
                                            <input type="number" placeholder="Card number"
                                                className="col-span-full px-4 py-3.5 bg-white text-gray-800 w-full text-sm border rounded-md focus:border-[#007bff] outline-none" />
                                        </div>
                                        <div>
                                            <input type="number" placeholder="EXP."
                                                className="px-4 py-3.5 bg-white text-gray-800 w-full text-sm border rounded-md focus:border-[#007bff] outline-none" />
                                        </div>
                                        <div>
                                            <input type="number" placeholder="CVV"
                                                className="px-4 py-3.5 bg-white text-gray-800 w-full text-sm border rounded-md focus:border-[#007bff] outline-none" />
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap items-center gap-4 mt-8">
                                        <button type="button"
                                            className="px-7 py-3.5 text-sm tracking-wide bg-white cursor-default opacity-35 text-gray-800 rounded-md">Pay later</button>
                                        <button type="button"
                                            className="px-7 py-3.5 text-sm tracking-wide bg-blue-600 text-white rounded-md  cursor-default opacity-35">Submit</button>
                                        This is a demo!
                                    </div>
                                </form>
                            </div>

                            <div className="bg-white p-6 rounded-md max-lg:-order-1 flex flex-col justify-between items-center">
                                <div className=" w-full">
                                    <h3 className="text-lg font-bold text-gray-800">Summary</h3>
                                    <ul className="text-gray-800 mt-6 space-y-3">
                                        <li className="flex flex-wrap gap-4 text-sm">Sub total <span className="ml-auto font-bold">${summary}</span></li>
                                        <li className="flex flex-wrap gap-4 text-sm">Discount (20%) <span className="ml-auto font-bold">$4.00</span></li>
                                        <li className="flex flex-wrap gap-4 text-sm">Tax <span className="ml-auto font-bold">$4.00</span></li>
                                        <hr />
                                        <li className="flex flex-wrap gap-4 text-base font-bold">Total <span className="ml-auto">${summary}</span></li>
                                    </ul>
                                </div>
                                <Link className="p-2 bg-amber-600 hover:bg-opacity-90 text-white rounded-md" to={`/basket`}>Basket details</Link>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>)
}
export default Checkout;