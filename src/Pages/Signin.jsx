import { useContext, useEffect, useState } from "react";
import { projectContext } from "../Core/Context";
import { Link, useNavigate } from "react-router-dom";
import { checkData } from "../Core/Utils";
import API from "../../core/API.mjs";
import FetchData from "../../core/FetchData.mjs";
const SignIn = ({ dataFromServer }) => {
    const navigate = useNavigate()
    let { sign, setSign } = useContext(projectContext);
    const [signErr, setSignErr] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = await FetchData('post', 'https://fakestoreapi.com/auth/login', { username: "johnd", password: "m38rmF$" });
        if (data?.token) {
            sessionStorage?.setItem('token', JSON.stringify(data?.token));
            setSign(true);
            navigate('/');
        }
        setSignErr(true)
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

    const [data, setData] = useState(checkData(dataFromServer['firstData']) ? dataFromServer['firstData'] : []);
    const apiInfo = API('signin');
    let response;

    useEffect(() => {
        if (typeof window !== 'undefined')
            document.getElementById('headerSingIn')?.classList.add('hidden');
        if (!checkData(dataFromServer['firstData']))
            (async () => {
                response = await FetchData(apiInfo?.method, apiInfo?.url, apiInfo?.dfs);
                if ((response instanceof Error) === false)
                    if (checkData(response))
                        setData(response);
                    else
                        setData([])

            })()
        dataFromServer['firstData'] = {}
    }, [])
    if (sign) {
        setTimeout(() => {
            navigate('/')
        }, 1);
    }
    else
        return (
            <div className="flex flex-col lg:flex-row gap-6 border lg:gap-2 my-8 w-full lg:w-3/4 self-center rounded-xl shadow-md shadow-slate-100">
                <form onSubmit={handleSubmit} className="flex-1 p-4 flex flex-col gap-4 place-items-center justify-start" autoComplete="off">
                    <div className="p-4 text-3xl font-medium">Please Sign in!</div>
                    <div className="flex flex-col w-full md:w-2/3 xl:w-1/2">
                        <label htmlFor="username">Username</label>
                        <input autoComplete="off" id="username" defaultValue={'johnd'} className="border border-neutral-600 rounded-sm text-xl p-2 outline-slate-500" />
                    </div>
                    <div className="flex flex-col w-full md:w-2/3 xl:w-1/2">
                        <label htmlFor="password">Password</label>
                        <div className="relative flex items-center w-full">
                            <input autoComplete="off" id="password" defaultValue={'m38rmF$'} type="password" className="border border-neutral-600 rounded-sm text-xl p-2 outline-slate-500 w-full" />
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
                    {signErr &&
                        <div className="leading-none border-[1px] border-red-100 text-sm bg-red-50 w-full md:w-2/3 xl:w-1/2 p-2 rounded font-medium">Sing in failure!</div>}
                    <div className={`flex justify-between items-center w-full md:w-2/3 xl:w-1/2 ${!signErr ? 'mt-4' : ''}`}>
                        <span className="text-sm cursor-pointer">Forgot password?</span>
                        <div className="flex gap-2 items-center">
                            <button type="button" className="bg-neutral-100 text-sm text-neutral-600 rounded-sm p-2">Sign up</button>
                            <button type="submit" onClick={signInLoad} className="bg-orange-600 text-white rounded-sm p-2 flex items-center gap-1 hover:bg-opacity-90">
                                <span id="signInText">Sign in</span>
                                <svg id="loading" xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" className="bi bi-arrow-clockwise leading-none hidden" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z" />
                                    <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </form>
                <div className="w-full lg:w-1/3 bg-gradient-to-b lg:bg-gradient-to-r pt-8 px-8 from-transparent from-0% via-20% to-60% via-slate-50 to-slate-100 rounded-lg min-h-96 flex justify-center items-center ">
                    <div className="grid place-items-center gap-3">
                        <img width={160} height={160} className="rotate-12 skew-x-6 w-40 h-40 mix-blend-multiply duration-1000" src={data[13]?.image} />
                        <img width={128} height={128} className="rotate-6 -skew-y-12 w-32 h-32 mix-blend-multiply duration-1000" src={data[5]?.image} />
                    </div>
                    <img width={112} height={112} className="-rotate-12 -skew-x-6 w-28 h-28 mix-blend-multiply duration-1000" src={data[2]?.image} />
                </div>
            </div>
        )
}
export default SignIn;