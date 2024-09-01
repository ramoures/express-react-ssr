import { useEffect } from "react";
import Defined from "../Core/Defined";
import Item from "../Components/Item";
import MetaTags from "../MetaTags";
import { addRemoveSlash, checkData } from "../Core/Utils";

const Home = ({ dataFromServer }) => {

    const data = checkData(dataFromServer['firstData']) ? dataFromServer['firstData'] : [];

    // Constants
    const website = Defined?.website;
    const directory = Defined?.directory;
    const websiteFullUrl = website + addRemoveSlash(directory, true);
    const baseTitle = Defined?.title;
    const twitterAccount = Defined?.twitter;

    const category1 = (data?.length > 0) ? data?.filter((itm) => itm.category === 'electronics') : [];
    const category2 = (data?.length > 0) ? data?.filter((itm) => itm.category === 'jewelery') : [];
    const category3 = (data?.length > 0) ? data?.filter((itm) => itm.category === "men's clothing") : [];
    const category4 = (data?.length > 0) ? data?.filter((itm) => itm.category === "women's clothing") : [];

    useEffect(() => {
        if (typeof window !== 'undefined') {
            /*
              Place your javascript DOM code here.
            */
            //ex: document.getElementById('sample')?.classList?.add('hidden');
            if (document.getElementById('headerSingIn')?.classList.contains('hidden'))
                document.getElementById('headerSingIn')?.classList.remove('hidden');
            window.scrollTo(0, 0);
        }
        //Clear First API data (dataFromServer)
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
                <Item color={`sky`} name={`electronics`} dataFromServer={category1} />
                <Item color={`gold`} name={`jewelery`} dataFromServer={category2} />
                <Item color={`green`} name={`men`} dataFromServer={category3} />
                <Item color={`purple`} name={`women`} dataFromServer={category4} />
            </div>
        </>
    );
};
export default Home;
