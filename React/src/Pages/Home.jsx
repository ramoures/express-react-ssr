import { useEffect, useState } from "react";
import axios from "axios";
import Defined from "../core/Defined";
import Item from "../components/Item";
import Metatags from "../components/Metatags";

const Home = (data) => {
    let serverData = data.data.data;

    const website = Defined?.website;
    const developMode = Defined?.developMode;
    const baseTitle = Defined?.title;
    const apiURL = Defined?.apiURL?.home;
    const twitterAccount = Defined?.twitter

    const [loading, isLoading] = useState(false);
    const [error, isError] = useState(false);
    const [errMsg, setErrMsg] = useState();
    const [homeData, setHomeData] = useState(serverData?.main);

    useEffect(() => {
        if (typeof window !== 'undefined')
            window.scrollTo(0, 0);

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
                        if (!result) {
                            isError(true);
                            setErrMsg('Data Not Found!');
                        }
                        else
                            setHomeData(result);
                        isLoading(false)

                    }).catch((err) => {
                        isError(true);
                        if (developMode)
                            setErrMsg(JSON.stringify(err));
                        else
                            setErrMsg('An error has occurred! Please try agian later.');
                        isLoading(false);
                    })
            }
            else
                isLoading(false)

        })();
    }, [error, errMsg]);
    const category1 = (homeData?.length > 0) ? homeData?.filter((itm, idx) => itm.category === "jewelery") : [];
    const category2 = (homeData?.length > 0) ? homeData?.filter((itm, idx) => itm.category === "men's clothing") : [];
    const category3 = (homeData?.length > 0) ? homeData?.filter((itm, idx) => itm.category === "women's clothing") : [];
    const category4 = (homeData?.length > 0) ? homeData?.filter((itm, idx) => itm.category === "electronics") : [];
    return (
        <>
            <Metatags
                url={`${website}`}
                title={`Home - ${baseTitle}`}
                description={homeData?.description || 'This is home page of my shopping website'}
                keywords={homeData?.keywords || 'Shop, E-Commerce, Store'}
                image={homeData?.image || `${website}/assets/img/icon.svg`}
                twitterAccount={homeData?.twitter || twitterAccount}
            />
            <div key="main" className="flex flex-col gap-5 w-full justify-between py-3">
                {!loading && error && <div className="w-full text-center text-orange-500">{errMsg}</div>}
                <Item color={`neutral`} name={`men's clothing`} data={category2} loading={loading} error={error} />
                <Item color={`sky`} name={`electronics`} data={category4} loading={loading} error={error} />
                <Item color={`gold`} name={`jewelery`} data={category1} loading={loading} error={error} />
                <Item color={`fuchsia`} name={`women's clothing`} data={category3} loading={loading} error={error} />
            </div>
        </>
    );
};
export default Home;
