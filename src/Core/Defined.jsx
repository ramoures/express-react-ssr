import { addRemoveSlash } from "./Utils";

const websiteUrl = process.env.WEBSITE_BASE_URL ?? "";
const websiteDir = process.env.WEBSITE_DIRECTORY_NAME ?? "";
const webStaticTitle = process.env.WEBSITE_STATIC_TITLE ?? "";
const twitterAccount = process.env.TWITTER_ACCOUNT_NAME ?? "";

const Defined = {
  website: addRemoveSlash(websiteUrl),
  directory: addRemoveSlash(websiteDir),
  title: webStaticTitle,
  twitter: twitterAccount,
};

export default Defined;
