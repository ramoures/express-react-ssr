import { useEffect } from "react";

const Login = () => {
    useEffect(() => {
        if (typeof window !== 'undefined') {
            document.getElementById('loginForm')?.addEventListener('submit', function (e) {
                e.preventDefault();
                const formData = new FormData(this);
                const username = formData.get('username');
                const password = formData.get('password');
                if (username === 'admin' && password === '123') {
                    document.getElementById('loginBox').classList.remove('flex');
                    document.getElementById('loginBox').classList.add('hidden');
                }
                document.getElementById('loginDemoNotice').classList.add('animate-ping');
                setTimeout(() => {
                    document.getElementById('loginDemoNotice').classList.remove('animate-ping');
                }, 300);
            });
            document.getElementById('register')?.addEventListener('click', function () {
                document.getElementById('loginBox').classList.remove('flex');
                document.getElementById('loginBox').classList.add('hidden');
                document.getElementById('registerBox').classList.remove('hidden');
                document.getElementById('registerBox').classList.add('flex');
            });
        }
    }, []);

    return (
        <div id="loginBox" className="fixed w-full h-full bg-black/20 top-0 left-0 z-50 flex justify-center items-center">
            <div className="bg-white rounded-xl border-[1px] border-neutral-400 w-10/12 sm:w-6/12 md:w-5/12 lg:w-4/12 xl:w-3/12 2xl:w-1/5 shadow-2xl flex flex-col justify-between">
                <div className="border-b-[1px] border-neutral-300 p-2 text-xl font-bold">Login</div>
                <form id="loginForm" method="POST" autoComplete="off" className="p-4 flex flex-col gap-2">
                    <div className="flex flex-col">
                        <label htmlFor="login_username">Username</label>
                        <input id="login_username" name="username" type="text" className="p-2 border-[1px] outline-0" defaultValue={`admin`} />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="login_password">Password</label>
                        <input id="login_password" name="password" type="password" className="p-2 border-[1px] outline-0" defaultValue={`123`} />
                    </div>
                    <div className="flex mt-3 gap-2 items-center justify-between">
                        <div className="flex gap-2">
                            <button type="submit" className="bg-teal-600 bg-opacity-80 hover:bg-opacity-100 p-2 text-white rounded select-none">Continue</button>
                            <button id="register" type="button" className="p-2 text-teal-600 opacity-80 hover:opacity-100 rounded select-none">Register</button>
                        </div>
                        <div id="loginDemoNotice" className="text-slate-500 text-xs">
                            This is a demo!
                        </div>
                    </div>
                </form>

            </div>
        </div>
    )
}
export default Login;