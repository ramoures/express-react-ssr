const Home = (data) => {
    let serverData = data.data.data;
    data = {}
    return (
        <>
            <div key="main" className="flex flex-col gap-5">
                {serverData?.length && serverData?.map((_v, _i) => {
                    return (
                        <a key={`p_${_i}`} className="flex gap-2 items-center">
                            <img src={_v.image} height={45} width={45} />
                            <h2>
                                <span className="text-bold bg-slate-200 p-2"> {_v.category}:</span>
                                {_v.title}
                            </h2>
                        </a>
                    )
                })}
            </div>
        </>
    );
};
export default Home;
