import React, { useState } from 'react'


const useToken = () => {
    try {
        const getToken = () => {
            const tokenString = sessionStorage?.getItem('token')
            const userToken = JSON.parse(tokenString)
            return userToken
        }

        const [token, setToken] = useState(getToken())
        const saveToken = userToken => {
            sessionStorage?.setItem('token', JSON.stringify(userToken))
            setToken(userToken.token)
        }
        return {
            setToken: saveToken,
            token
        }
    } catch (err) {
        return {
            setToken: {},
            token: ''
        }
    }
}

export default useToken