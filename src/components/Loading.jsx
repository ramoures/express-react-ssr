const Loading = () => {
    return (
        <div className="w-full h-72 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 justify-center items-center px-8">
            <div className="w-full h-full bg-neutral-200 animate-pulse duration-75 ease-linear block rounded-3xl "></div>
            <div className="w-full h-full bg-neutral-200 animate-pulse duration-75 ease-linear block rounded-3xl "></div>
            <div className="w-full h-full bg-neutral-200 animate-pulse duration-75 ease-linear block rounded-3xl "></div>
            <div className="w-full h-full bg-neutral-200 animate-pulse duration-75 ease-linear block rounded-3xl "></div>
        </div>
    )
}
export default Loading;