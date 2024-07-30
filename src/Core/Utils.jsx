export const Capitalize = (str) => {
    try {
        return str[0].toUpperCase() + str.substring(1)
    } catch (err) {
        return "";
    }

}
export const addRemoveSlash = (value, before = false, after = false) => {
    // It doesn't matter if you slash before or after anything. This function returns your new request.
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
