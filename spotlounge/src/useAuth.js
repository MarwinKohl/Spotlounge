import React, { useEffect, useState } from "react";
import axios from 'axios'

export default function useAuth(code) {
    const [access_token, setAccessToken] = useState()
    const [refresh_token, setRefreshToken] = useState()
    const [expires_in, setExpiresIn] = useState()


    useEffect(()=>{
        axios.post('http://localhost:3000/login', {
            code,
        })
        .then((res)=>{
            console.log(res.data)
        })
        .catch(() => {
            window.location = '/'
        })
    }, [code])
}