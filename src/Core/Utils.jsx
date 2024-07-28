export const Capitalize = (str) => {
    try {
        return str[0].toUpperCase() + str.substring(1)
    } catch (err) {
        return "";
    }

}