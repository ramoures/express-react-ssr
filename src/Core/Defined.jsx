const serverUrl = process.env.WEBSITE_BASE_URL ?? "";
const appDir = process.env.WEBSITE_DIRECTORY_NAME ?? "";
const webStaticTitle = process.env.WEBSITE_STATIC_TITLE ?? "";
const twitterAccount = process.env.TWITTER_ACCOUNT_NAME ?? "";
const Defined = {
  website: appDir
    ? serverUrl + appDir
    : serverUrl,
  title: webStaticTitle,
  twitter: twitterAccount,
};

export default Defined;
