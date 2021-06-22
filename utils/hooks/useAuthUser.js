import React, {  useEffect, useState } from 'react';
import axios from 'axios';
import baseUrl from '../baseUrl'
import  catchErrors from '../catchErrors';
import Router from "next/router"
import cookie from "js-cookie"

let cancel;

function useAuthUser(){
    const [errorMsg, setErrorMsg] = useState(null);
    const [formLoading, setFormLoading] = useState(false);

    async function registerUser(api, user, profilePicUrl){
        setFormLoading(true)
        setErrorMsg(null)
        try {
            const response =   await axios.post(`${baseUrl}/api/${api}`,{
                user,
                profilePicUrl
            })

            setToken(response.data)
        } catch (error) {
            setErrorMsg(catchErrors(error))
        }
        setFormLoading(false)
    }

    return{
        errorMsg,
        setErrorMsg,
        formLoading,
        setFormLoading,
        registerUser
    }

}


function useCheckUsername(errorMsg, setErrorMsg, setUser){
    const [username, setUsername] = useState("")
    const [usernameLoading, setUsernameLoading] = useState(false)
    const [usernameAvailable, setUsernameAvailable] = useState(null)


    async function checkUsername(){
        setUsernameLoading(true);
        try {

          cancel && cancel();
          const CancelToken = axios.CancelToken;

            const res = await axios.get(`${baseUrl}/api/signup/${username}`,{
              cancelToken: new CancelToken(canceler => {
                cancel = canceler;
              })
            })

            if(errorMsg!==null) setErrorMsg(null)
            if(res.data === "Available") setUsernameAvailable(true); setUser(prev => ({...prev, username }));
        } catch (error) {
            setErrorMsg("Username Not Available");
            setUsernameAvailable(false);
        }
        setUsernameLoading(false);
    }

    useEffect(()=>{
        username === "" ? setUsernameAvailable(false):checkUsername()
    },[username])

    return{
        username,
        usernameAvailable,
        usernameLoading,
        setUsernameLoading,
        setUsernameAvailable,
        setUsername
    }
}


function setToken(token){
    cookie.set('token', token);
    Router.push("/")
}

export {
    useAuthUser,
    useCheckUsername
}