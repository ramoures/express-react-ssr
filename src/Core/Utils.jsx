// Checks whether an object is empty or not.
export const checkData = (obj) => {
    try {
        if (Array.isArray(obj) && obj.length)
            return true;
        else if (typeof obj === 'object' && Object.keys(obj).length)
            return true;
        return false;
    } catch (error) {
        return false
    }
}

// Returns error messages
export const logger = (err) => {
    try {
        const projectDevelopMode = process.env.DEVELOPMENT_MODE === 'true' ? true : false;
        if (err instanceof Error) {
            //In development mode:
            if (projectDevelopMode) {
                const errorMsg = JSON.parse(JSON.stringify(err.toJSON()));
                console.log(errorMsg);
                return (<>
                    <span className="text-lg font-bold block my-5">Error details: <a>(in developer mode)</a></span>
                    <span className="text-wrap"> <b className="text-sky-800">Code:</b> {errorMsg?.code}</span><br />
                    <span className="text-wrap"> <b className="text-sky-800">Message:</b> {errorMsg?.message}</span><br />
                    <span className="text-wrap"> <b className="text-sky-800">Name:</b> {errorMsg?.name}</span><br />
                    <span className="text-wrap"> <b className="text-sky-800">Status:</b> {errorMsg?.status}</span><br />
                    <span className="text-wrap break-words inline-block max-w-full"> <b className="text-sky-800">Stack:</b> {errorMsg?.stack}</span>
                    <span className="text-wrap break-words inline-block max-w-full"> <b className="text-sky-800">Config:</b> {JSON.stringify(errorMsg?.config)}</span>
                </>)
            }
            //In production mode:
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
            return '500 Internal Server Error!';
    } catch (error) {
        return '500 Internal Server Error!';
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

// Convert the first letter of a string to uppercase
export const Capitalize = (str) => {
    try {
        return str[0].toUpperCase() + str.substring(1)
    } catch (err) {
        return "";
    }
}

// Convert string to lowercase
export const Lowercase = (str) => {
    try {
        return str.toLowerCase()
    } catch (err) {
        return "";
    }
}
