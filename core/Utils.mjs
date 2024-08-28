import dotenv from "dotenv";
import dotenvExpand from "dotenv-expand";
import { isbot } from "isbot";
import process from 'process';

//User agent detection
export const botDetector = (userAgent) => {
    try {
        const bot = isbot(userAgent);
        if (bot)
            return true;
        return false;
    } catch (error) {
        return false;
    }
}

// Returns env values
export const getEnv = (key, type = 'string') => {
    try {
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

// Returns error messages
export const logger = (err, res) => {
    try {
        //In development mode:
        if (getEnv('DEVELOPMENT_MODE', 'boolean'))
            if (res) {
                console.log(err);
                return res.status(500).send(err?.stack || err.toString());
            }
            else return console.log(err);
        //In production mode:
        else
            if (res) {
                console.log('500 Internal Server Error!');
                return res.status(500).send('500 Internal Server Error!');
            }
            else console.log('500 Internal Server Error!');
    } catch (err) {
        console.log('500 Internal Server Error!')
    }
}

// Slash adds or/and removes before or/and after strings
export const addRemoveSlash = (value, before = false, after = false) => {
    value = value + ''; //cast to string
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

// Convert string to lowercase
export const Lowercase = (str) => {
    try {
        return str.toLowerCase()
    } catch (err) {
        return "";
    }
}
