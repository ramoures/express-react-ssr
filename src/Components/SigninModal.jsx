import { useContext, useEffect } from "react";
import FetchData from "../../core/FetchData.mjs";
import { projectContext } from "../Core/Context";

const SignInModal = () => {
    let { setSign } = useContext(projectContext);
    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = await FetchData('post', 'https://fakestoreapi.com/auth/login', { username: "johnd", password: "m38rmF$" });
        if (data?.token) {
            sessionStorage?.setItem('token', JSON.stringify(data?.token));
            setSign(true);
        }
    }
    const signInLoad = () => {
        document.getElementById('loading')?.classList.remove('hidden');
        document.getElementById('loading')?.classList.add('animate-spin');
        document.getElementById('signInText').innerHTML = 'Wait...';
    }
    const showPassword = () => {
        if (document.getElementById('hide')?.classList.contains('hidden')) {
            document.getElementById('password')?.setAttribute('type', 'text');
            document.getElementById('show')?.classList.add('hidden');
            document.getElementById('hide')?.classList.remove('hidden');
        }
        else {
            document.getElementById('password')?.setAttribute('type', 'password');
            document.getElementById('show')?.classList.remove('hidden');
            document.getElementById('hide')?.classList.add('hidden');
        }
    };


    useEffect(() => {
        if (typeof window !== 'undefined') {
            // document.getElementById('signinForm')?.addEventListener('submit', function (e) {
            //     e.preventDefault();
            //     const formData = new FormData(this);
            //     const username = formData.get('username');
            //     const password = formData.get('password');
            //     if (username === 'admin' && password === '123') {
            //         document.getElementById('signinBox').classList.remove('flex');
            //         document.getElementById('signinBox').classList.add('hidden');
            //     }
            //     document.getElementById('signinDemoNotice').classList.add('animate-ping');
            //     setTimeout(() => {
            //         document.getElementById('signinDemoNotice').classList.remove('animate-ping');
            //     }, 300);
            // });
            // document.getElementById('register')?.addEventListener('click', function () {
            //     document.getElementById('signinBox').classList.remove('flex');
            //     document.getElementById('signinBox').classList.add('hidden');
            //     document.getElementById('registerBox').classList.remove('hidden');
            //     document.getElementById('registerBox').classList.add('flex');
            // });
        }
    }, []);

    return (
        <div id="signinBox" className="fixed w-full h-full bg-black/30 top-0 left-0 z-50 flex justify-center items-center">
            <div className="bg-white rounded-xl border-[1px] border-neutral-400 w-10/12 sm:w-6/12 md:w-5/12 lg:w-4/12 xl:w-3/12 2xl:w-1/5 shadow-2xl flex flex-col justify-between">
                <div className="border-b-[1px] border-neutral-300 p-2 text-xl font-bold">Sign in</div>
                <form id="signinForm" onSubmit={handleSubmit} autoComplete="off" className="p-4 flex flex-col gap-2">
                    <div className="flex flex-col">
                        <label htmlFor="username">Username</label>
                        <input id="username" name="username" type="text" className="p-2 border-[1px] outline-0" defaultValue={`johnd`} autoComplete="off" />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="password">Password</label>
                        <div className="relative flex items-center w-full">
                            <input id="password" name="password" type="password" className="p-2 border-[1px] outline-0 w-full" defaultValue={`m38rmF$`} autoComplete="off" />
                            <button onClick={showPassword} className="absolute right-0 mr-2 text-slate-600" type="button">
                                <svg id="show" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-eye" viewBox="0 0 16 16">
                                    <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
                                    <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
                                </svg>
                                <svg id="hide" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-eye-slash hidden" viewBox="0 0 16 16">
                                    <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7 7 0 0 0-2.79.588l.77.771A6 6 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755q-.247.248-.517.486z" />
                                    <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829" />
                                    <path d="M3.35 5.47q-.27.24-.518.487A13 13 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7 7 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div className="flex mt-3 gap-2 items-center justify-between">
                        <div className="flex gap-2">
                            <button type="submit" onClick={signInLoad} className="bg-teal-600 bg-opacity-80 hover:bg-opacity-100 p-2 text-white rounded select-none flex items-center gap-1">
                                <span id="signInText">Continue</span>
                                <svg id="loading" xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" className="bi bi-arrow-clockwise leading-none hidden" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z" />
                                    <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466" />
                                </svg>
                            </button>
                            <button type="button" className="p-2 text-teal-600 opacity-80 hover:opacity-100 rounded select-none">Sign up</button>
                        </div>
                        <button type="button" className="text-sm">
                            Forgot password?
                        </button>

                    </div>
                </form>

            </div>
        </div>
    )
}
export default SignInModal;