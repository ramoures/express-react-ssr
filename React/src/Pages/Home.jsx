import { Helmet } from "react-helmet";
import { useEffect, useState } from "react";
import axios from "axios";
import Defined from "../core/Defined";
import Item from "../components/Item";

const Home = (data) => {
    let serverData = data.data.data;

    const website = Defined?.website;
    const baseTitle = Defined?.title;
    const apiURL = Defined?.apiURL?.home;

    const [loading, isLoading] = useState(false);
    const [error, isError] = useState(false);
    const [homeData, setHomeData] = useState(serverData?.main);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.scrollTo(0, 0);
        }
        (async () => {
            if (typeof serverData?.main === 'undefined') {
                isLoading(true)
                await axios.get(apiURL, {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    timeout: 60000,
                })
                    .then(async (res) => {
                        const result = await res.data;
                        setHomeData(result);
                        isLoading(false)

                    }).catch(() => {
                        isLoading(false);
                        isError(true);
                    })
            }
            else
                isLoading(false)

        })();
    }, [error]);
    const category1 = (homeData?.length > 0) ? homeData?.filter((itm, idx) => itm.category === "jewelery").filter((itm, idx) => idx < 4) : [];
    const category2 = (homeData?.length > 0) ? homeData?.filter((itm, idx) => itm.category === "men's clothing").filter((itm, idx) => idx < 4) : [];
    const category3 = (homeData?.length > 0) ? homeData?.filter((itm, idx) => itm.category === "women's clothing").filter((itm, idx) => idx < 4) : [];
    const category4 = (homeData?.length > 0) ? homeData?.filter((itm, idx) => itm.category === "electronics").filter((itm, idx) => idx < 4) : [];
    return (
        <>
            <Helmet>
                <title>Home - {baseTitle}</title>
                <link rel="canonical" href={`${website}/`} />
                <meta name="robots" content="index, follow" />
            </Helmet>
            <div key="main" className="flex flex-col gap-5 w-full justify-between py-3">
                {!loading && error && <div className="w-full text-center text-orange-500">An error has occurred! Please try agian later.</div>}
                <Item color={`neutral`} name={`men's clothing`} data={category2} loading={loading} error={error} />
                <Item color={`sky`} name={`electronics`} data={category4} loading={loading} error={error} />
                <Item color={`gold`} name={`jewelery`} data={category1} loading={loading} error={error} />
                <Item color={`fuchsia`} name={`women's clothing`} data={category3} loading={loading} error={error} />
            </div>
        </>
    );
};
export default Home;
