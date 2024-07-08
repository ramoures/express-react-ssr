import { useEffect } from "react";

const Register = () => {
    useEffect(() => {
        if (typeof window !== 'undefined') {
            document.getElementById('registerForm')?.addEventListener('submit', (e) => {
                e.preventDefault();
                document.getElementById('registerDemoNotice').classList.add('animate-ping');
                setTimeout(() => {
                    document.getElementById('registerDemoNotice').classList.remove('animate-ping');
                }, 300);
            });
            document.getElementById('login')?.addEventListener('click', function () {
                document.getElementById('registerBox').classList.remove('flex');
                document.getElementById('registerBox').classList.add('hidden');
                document.getElementById('loginBox').classList.remove('hidden');
                document.getElementById('loginBox').classList.add('flex');
            });
        }
    }, []);
    return (
        <div id="registerBox" className="hidden fixed w-full h-full bg-black/30 top-0 left-0 z-50 justify-center items-center">
            <div className="bg-white rounded-xl border-[1px] border-neutral-400 w-10/12 sm:w-6/12 md:w-5/12 lg:w-4/12 xl:w-3/12 2xl:w-1/5 shadow-2xl flex flex-col justify-between">
                <div className="border-b-[1px] border-neutral-300 p-2 text-xl font-bold">Register</div>
                <form id="registerForm" method="POST" autoComplete="off" className="p-4 flex flex-col gap-2">
                    <div className="flex flex-col">
                        <label htmlFor="email">Email</label>
                        <input id='email' name="email" type="email" className="p-2 border-[1px] outline-0" />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="username">Username</label>
                        <input id="username" name="username" type="text" className="p-2 border-[1px] outline-0" />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="password">Password</label>
                        <input id="password" name="password" type="password" className="p-2 border-[1px] outline-0" />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="fname">First Name</label>
                        <input id="fname" name="fname" type="text" className="p-2 border-[1px] outline-0" />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="lname">Last Name</label>
                        <input id="lname" name="lname" type="text" className="p-2 border-[1px] outline-0" />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="address">Address</label>
                        <textarea id="address" name="address" className="p-2 border-[1px] outline-0" rows={3}></textarea>
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="phone">Phone Number</label>
                        <input id="phone" name="phone" type="text" className="p-2 border-[1px] outline-0" />
                    </div>
                    <div className="flex mt-3 gap-2 items-center justify-between">
                        <div className="flex gap-2">
                            <button type="submit" className="bg-teal-600 bg-opacity-80 hover:bg-opacity-100 p-2 text-white rounded select-none">Register</button>
                            <button id="login" type="button" className="p-2 text-teal-600 opacity-80 hover:opacity-100 rounded select-none">Login</button>
                        </div>
                        <div id="registerDemoNotice" className="text-slate-500 text-xs">
                            This is a demo!
                        </div>
                    </div>
                </form>

            </div>
        </div>
    )
}
export default Register;