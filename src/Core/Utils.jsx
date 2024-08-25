export const checkData = (data) => {
    try {
        if (Array.isArray(data) && data.length)
            return true;
        else if (typeof data === 'object' && Object.keys(data).length)
            return true;
        return false;
    } catch (error) {
        return false
    }
}
// error handling
export const logger = (err) => {
    try {
        const projectDevelopMode = process.env.DEVELOPMENT_MODE === 'true' ? true : false;
        if (err instanceof Error) {
            if (projectDevelopMode) {
                const errorMsg = JSON.parse(JSON.stringify(err.toJSON()));
                console.log(errorMsg);
                return (<>
                    <span> <b>Code:</b> {errorMsg?.code}</span><br />
                    <span> <b>Message:</b> {errorMsg?.message}</span><br />
                    <span> <b>Name:</b> {errorMsg?.name}</span><br />
                    <span> <b>Stack:</b> {errorMsg?.stack}</span><br />
                    <span> <b>Status:</b> {errorMsg?.status}</span><br />
                    <span> <b>Config:</b> {JSON.stringify(errorMsg?.config)}</span><br /><br />
                    <i>Look at the console</i>

                </>)

            }
            else {
                if (err.response)
                    if (err.response.status === 404)
                        return '404 API Data Not Found!';
                    else return 'Response Error!';
                else if (err.request)
                    if (err.request.status === 0)
                        return 'Request Error! Please check your internet connection!';
                    else return 'Request Error!';
                return 'Unknown Error!';
            }
        }
        else
            return '500 Internal Server Error!'
    } catch (error) {
        return '500 Internal Server Error!'
    }
}

// Strings capitalize
export const Capitalize = (str) => {
    try {
        return str[0].toUpperCase() + str.substring(1)
    } catch (err) {
        return "";
    }
}
// Strings to lowercase
export const Lowercase = (str) => {
    try {
        return str.toLowerCase()
    } catch (err) {
        return "";
    }
}
// Slash adds or/and removes before or/and after strings
export const addRemoveSlash = (value, before = false, after = false) => {
    value = value + ''; // cast to string
    let result;
    if (before) {
        if (value.slice(0, 1) === '/')
            result = value;
        else result = '/' + value;
    }
    else {
        if (value.slice(0, 1) === '/')
            result = value.slice(1);
        else result = value;
    }
    if (after) {
        if (result.slice(-1) === '/')
            result = result + '';
        else result = result + '/';
    }
    else {
        if (result.slice(-1) === '/')
            result = result.slice(0, -1);
        else result = result + '';
    }
    return result;
}
