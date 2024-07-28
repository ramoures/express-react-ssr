const Loading = ({ n = 4 }) => {
    return (
        <>
            {n > 0 &&
                <div className="flex flex-col justify-start items-start gap-4">
                    {[...Array(n)].map((x, i) => {
                        return (
                            <div key={`ld_${i}`} className="w-full h-72 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 justify-center items-center">
                                <div key={`ld_${i}_1`} className="w-full min-h-72 bg-neutral-200 animate-pulse duration-75 ease-linear block rounded-3xl "></div>
                                <div key={`ld_${i}_2`} className="w-full min-h-72 bg-neutral-200 animate-pulse duration-75 ease-linear block rounded-3xl "></div>
                                <div key={`ld_${i}_3`} className="w-full min-h-72 bg-neutral-200 animate-pulse duration-75 ease-linear block rounded-3xl "></div>
                                <div key={`ld_${i}_4`} className="w-full min-h-72 bg-neutral-200 animate-pulse duration-75 ease-linear block rounded-3xl "></div>
                            </div>
                        );
                    })}
                </div>
            }
            {n <= 0 &&
                <div className="flex flex-col justify-start items-start gap-4 h-screen py-6">

                    <div key={`ld_0`} className="w-full h-auto grid grid-cols-1 gap-3 justify-center items-center">
                        <div key={`ld_0_1`} className="w-full min-h-[400px] bg-neutral-200 animate-pulse duration-75 ease-linear block rounded-3xl"></div>

                    </div>

                </div>
            }
        </>
    )
}
export default Loading;