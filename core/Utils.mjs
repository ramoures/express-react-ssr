import dotenv from "dotenv";
import dotenvExpand from "dotenv-expand";
import process from 'process';
export const getEnv = (key, type = 'string') => {
    try {
        // This function for get defined keys in .env file and return values.
        const env = dotenv.config();
        dotenvExpand.expand(env);
        if (type == 'number')
            return Number(process.env[key]);
        else if (type == 'boolean')
            return (process.env[key] === 'true') ? true : false;
        else if (type == 'array')
            return process.env[key].split(',');
        else
            return process.env[key]
    } catch (err) {
        logger(err)
    }
}
export const logger = (err, res) => {
    try {
        // this function for return error message.
        if (getEnv('DEVELOP_MODE', 'boolean'))
            if (res)
                return res.status(500).send(err?.stack || err.toString());
            else return console.log(err);
        else
            if (res)
                return res.status(500).send('500 Internal Server Error!');
            else console.log('500 Internal Server Error!');
    } catch (err) {
        console.log('500 Internal Server Error!')
    }
}
export const addRemoveSlash = (value, before = false, after = false) => {
    // It doesn't matter if the user puts a line before or after anything. This function returns your request.

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