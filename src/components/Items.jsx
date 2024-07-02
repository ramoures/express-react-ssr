import { Suspense, lazy, useContext, useState } from "react"
import Loading from "./Loading";
import Box from "./Box";

const Items = ({ data, loading }) => {
    const category1 = (data.length > 0) ? data?.filter((itm, idx) => itm.category === "jewelery").filter((itm, idx) => idx < 4) : [];
    const category2 = (data.length > 0) ? data?.filter((itm, idx) => itm.category === "men's clothing").filter((itm, idx) => idx < 4) : [];
    const category3 = (data.length > 0) ? data?.filter((itm, idx) => itm.category === "women's clothing").filter((itm, idx) => idx < 4) : [];
    const category4 = (data.length > 0) ? data?.filter((itm, idx) => itm.category === "electronics").filter((itm, idx) => idx < 4) : [];
    return (
        <>
            <div key="main" className="flex flex-col gap-5 w-full justify-between py-8">
                <Box color={`neutral`} name={`jewelery`} data={category1} loading={loading} />
                <Box color={`sky`} name={`men's clothing`} data={category2} loading={loading} />
                <Box color={`fuchsia`} name={`women's clothing`} data={category3} loading={loading} />
                <Box color={`green`} name={`electronics`} data={category4} loading={loading} />
            </div>
        </>

    )
}
export default Items