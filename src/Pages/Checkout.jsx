import { useContext, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { projectContext } from "../Core/Context";
import Defined from "../Core/Defined";
import SignInModal from "../Components/SigninModal";

const Checkout = () => {
    const baseTitle = Defined?.title;
    let { sign, setSign } = useContext(projectContext);

    const { prices } = useContext(projectContext)
    const summary = prices.reduce((a, b) => a + b, 0).toFixed(3);
    useEffect(() => {
        if (typeof window !== 'undefined') {
            /*
              Place your javascript DOM code here.
            */
            //ex: document.getElementById('sample')?.classList?.add('hidden');
            window.scrollTo(0, 0);
        }
    }, [])
    return (
        <>
            <Helmet>
                <title>Checkout - {baseTitle}</title>
                <meta name="robots" content="noindex,nofollow" />
            </Helmet>
            {!sign && <SignInModal />}
            <div key="main" className="flex flex-col gap-5 w-full">
                <div className="font-[sans-serif] lg:flex lg:items-center lg:justify-center my-8">
                    <div className="bg-slate-100 p-8 w-full mx-auto rounded-md">
                        <h2 className="text-3xl font-extrabold text-gray-800 text-center">Checkout</h2>
                        <div className="grid lg:grid-cols-3 gap-6 max-lg:gap-8 mt-16">
                            <form className="lg:col-span-2">
                                <h3 className="text-lg font-bold text-gray-800">Choose your payment method</h3>

                                <div className="grid gap-4 sm:grid-cols-2 mt-4">
                                    <div className="flex items-center">
                                        <input name="paymentMethod" type="radio" className="w-5 h-5 cursor-pointer" id="card" />
                                        <label htmlFor="card" className="ml-4 flex gap-2 cursor-pointer">
                                            <img src="images/visa.webp" className="w-12" alt="card1" />
                                            <img src="images/american-express.webp" className="w-12" alt="card2" />
                                            <img src="images/master.webp" className="w-12" alt="card3" />
                                        </label>
                                    </div>

                                    <div className="flex items-center">
                                        <input name="paymentMethod" type="radio" className="w-5 h-5 cursor-pointer" id="paypal" />
                                        <label htmlFor="paypal" className="ml-4 flex gap-2 cursor-pointer">
                                            <img src="images/paypal.webp" className="w-20" alt="paypalCard" />
                                        </label>
                                    </div>
                                </div>

                                <div className="mt-8">
                                    <div className="grid sm:col-span-2 sm:grid-cols-2 gap-4">
                                        <div>
                                            <input name="cardHolder" type="text" placeholder="Name of card holder"
                                                className="px-4 py-3.5 bg-white text-gray-800 w-full text-sm border rounded-md focus:border-[#007bff] outline-none" />
                                        </div>
                                        <div>
                                            <input name="postalCode" type="number" placeholder="Postal code"
                                                className="px-4 py-3.5 bg-white text-gray-800 w-full text-sm border rounded-md focus:border-[#007bff] outline-none" />
                                        </div>
                                        <div>
                                            <input name="cardNumber" type="number" placeholder="Card number"
                                                className="col-span-full px-4 py-3.5 bg-white text-gray-800 w-full text-sm border rounded-md focus:border-[#007bff] outline-none" />
                                        </div>
                                        <div>
                                            <input name="exp" type="number" placeholder="EXP."
                                                className="px-4 py-3.5 bg-white text-gray-800 w-full text-sm border rounded-md focus:border-[#007bff] outline-none" />
                                        </div>
                                        <div>
                                            <input name="cvv" type="number" placeholder="CVV"
                                                className="px-4 py-3.5 bg-white text-gray-800 w-full text-sm border rounded-md focus:border-[#007bff] outline-none" />
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap items-center gap-4 mt-8">
                                        <Link to={`/`}
                                            className="px-7 py-3.5 text-sm tracking-wide bg-white text-gray-800 rounded-md cursor-pointer">Pay later</Link>
                                        <button type="button" disabled
                                            className="px-7 py-3.5 text-sm tracking-wide bg-blue-600 text-white rounded-md  ">Submit</button>
                                        <div className="text-red-500 text-sm italic">
                                            This is a demo!
                                        </div>
                                    </div>
                                </div>
                            </form>

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
                                <Link className="p-2 bg-amber-600 hover:bg-opacity-90 text-white rounded-md" to={`/cart`}>Cart details</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>)
}
export default Checkout;