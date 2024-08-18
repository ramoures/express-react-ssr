import { useContext, useEffect } from "react";
import Defined from "../Core/Defined";
import Item from "../Components/Item";
import MetaTags from "../MetaTags";
import { projectContext } from "../Core/Context";
import { addRemoveSlash } from "../Core/Utils";

const Home = ({ dataFromServer }) => {

    const data = dataFromServer?.firstData || [];

    // Constants
    const website = Defined?.website;
    const directory = Defined?.directory;
    const websiteFullUrl = website + addRemoveSlash(directory, true);
    const baseTitle = Defined?.title;
    const twitterAccount = Defined?.twitter;

    const category1 = (data?.length > 0) ? data?.filter((itm, idx) => itm.category === "jewelery") : [];
    const category2 = (data?.length > 0) ? data?.filter((itm, idx) => itm.category === "men's clothing") : [];
    const category3 = (data?.length > 0) ? data?.filter((itm, idx) => itm.category === "women's clothing") : [];
    const category4 = (data?.length > 0) ? data?.filter((itm, idx) => itm.category === "electronics") : [];

    useEffect(() => {
        if (typeof window !== 'undefined') {
            /*
              Place your javascript DOM code here.
            */
            //ex: document.getElementById('sample')?.classList?.add('hidden');
            window.scrollTo(0, 0);
        }
        dataFromServer['firstData'] = {}
    }, []);

    return (
        <>
            <MetaTags
                url={`${websiteFullUrl}`}
                title={`Home - ${baseTitle}`}
                description={data?.description || 'This is home page of my shopping website'}
                keywords={data?.keywords || 'Shop, E-Commerce, Store'}
                image={data?.image || `${websiteFullUrl}/assets/img/icon.svg`}
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
