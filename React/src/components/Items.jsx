import Box from "./Box";
const Items = ({ data, loading, error }) => {
    const category1 = (data?.length > 0) ? data?.filter((itm, idx) => itm.category === "jewelery").filter((itm, idx) => idx < 4) : [];
    const category2 = (data?.length > 0) ? data?.filter((itm, idx) => itm.category === "men's clothing").filter((itm, idx) => idx < 4) : [];
    const category3 = (data?.length > 0) ? data?.filter((itm, idx) => itm.category === "women's clothing").filter((itm, idx) => idx < 4) : [];
    const category4 = (data?.length > 0) ? data?.filter((itm, idx) => itm.category === "electronics").filter((itm, idx) => idx < 4) : [];
    return (
        <>
            <div key="main" className="flex flex-col gap-5 w-full justify-between py-3">
                {!loading && error && <div className="w-full text-center text-orange-500">An error has occurred! Please try agian later.</div>}
                <Box color={`neutral`} name={`men's clothing`} data={category2} loading={loading} error={error} />
                <Box color={`sky`} name={`electronics`} data={category4} loading={loading} error={error} />
                <Box color={`gold`} name={`jewelery`} data={category1} loading={loading} error={error} />
                <Box color={`fuchsia`} name={`women's clothing`} data={category3} loading={loading} error={error} />
            </div>
        </>

    )
}
export default Items