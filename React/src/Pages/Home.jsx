import { Helmet } from "react-helmet";
import Items from "../components/Items";
import { useEffect, useState } from "react";
import axios from "axios";
import Defined from "../core/Defined";

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
    }, [error])
    return (
        <>
            <Helmet>
                <title>{baseTitle}</title>
                <link rel="canonical" href={`${website}/`} />
                <meta name="robots" content="index, follow" />
            </Helmet>
            <Items data={homeData} loading={loading} error={error} />

        </>
    );
};
export default Home;
