import { Helmet } from "react-helmet";
import Items from "../components/Items";
import { useEffect, useState } from "react";
import axios from "axios";

const Home = (data) => {
    let serverData = data.data.data;
    const [loading, isLoading] = useState(false);
    const [homeData, setHomeData] = useState(serverData?.main);
    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.scrollTo(0, 0);
        }
        (async () => {
            if (typeof serverData?.main === 'undefined') {
                isLoading(true)
                await axios.get('https://fakestoreapi.com/products', {
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
                        isLoading(false)
                    })
            }
            else
                isLoading(false)

        })();
    }, [])
    return (
        <>
            <Helmet>
                <title>Title</title>
            </Helmet>
            <Items data={homeData} loading={loading} />

        </>
    );
};
export default Home;
