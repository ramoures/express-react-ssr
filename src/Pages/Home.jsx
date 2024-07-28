import { useEffect } from "react";
import Defined from "../Core/Defined";
import Item from "../Components/Item";
import MetaTags from "../MetaTags";

const Home = ({ dataFromServer }) => {

    const data = dataFromServer?.firstData || [];

    const website = Defined?.website;
    const baseTitle = Defined?.title;
    const twitterAccount = Defined?.twitter;

    const category1 = (data?.length > 0) ? data?.filter((itm, idx) => itm.category === "jewelery") : [];
    const category2 = (data?.length > 0) ? data?.filter((itm, idx) => itm.category === "men's clothing") : [];
    const category3 = (data?.length > 0) ? data?.filter((itm, idx) => itm.category === "women's clothing") : [];
    const category4 = (data?.length > 0) ? data?.filter((itm, idx) => itm.category === "electronics") : [];

    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.scrollTo(0, 0);

        }
        delete dataFromServer?.firstData;
    }, []);

    return (
        <>
            <MetaTags
                url={`${website}`}
                title={`Home - ${baseTitle}`}
                description={data?.description || 'This is home page of my shopping website'}
                keywords={data?.keywords || 'Shop, E-Commerce, Store'}
                image={data?.image || `${website}/assets/img/icon.svg`}
                twitterAccount={data?.twitter || twitterAccount}
            />
            <div key="main" className="flex flex-col gap-5 w-full justify-between py-3">
                <Item color={`neutral`} name={`men's clothing`} dataFromServer={category2} />
                <Item color={`sky`} name={`electronics`} dataFromServer={category4} />
                <Item color={`gold`} name={`jewelery`} dataFromServer={category1} />
                <Item color={`fuchsia`} name={`women's clothing`} dataFromServer={category3} />
            </div>
        </>
    );
};
export default Home;
