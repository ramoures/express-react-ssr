import { Helmet } from "react-helmet"

const MetaTags = ({ url = '', title = '', robots = 'index, follow', description = '', keywords = '', image = '', twitter = { site: '', creator: '' } }) => {
    return (
        <Helmet>
            <title>{title || ''}</title>
            {url && <link rel="canonical" href={url} />}
            <meta name="robots" content={robots} />
            <meta
                name="description"
                content={description || ''}
            />
            <meta
                name="keywords"
                content={keywords || ''}
            />
            <meta name="twitter:card" content="summary" />
            <meta
                name="twitter:site"
                content={twitter?.site || ''}
            />
            <meta
                name="twitter:creator"
                content={twitter?.creator || ''}
            />
            <meta
                name="twitter:title"
                content={title || ''}
            />
            <meta
                name="twitter:image"
                content={image || ''}
            />
            <meta
                name="twitter:description"
                content={description || ''}
            />
            <meta property="og:type" content="website" />
            <meta
                property="og:url"
                content={url || ''}
            />
            <meta
                property="og:title"
                content={title || ''}
            />
            <meta
                property="og:description"
                content={description || ''}
            />
            <meta
                property="og:image"
                content={image || ''}
            />
        </Helmet>
    )
}
export default MetaTags;