import React, { useState } from 'react'
import { HeaderMessage, FooterMessage } from '../components/common/WelcomeMessage'
import { Form, Button, Message, Segment, TextArea, Divider } from 'semantic-ui-react';

function Signup() {
    const [user, setUser] = useState({
        name:"",
        email:"",
        password:"",
        bio:"",
        facebook:""
    });
    const [showSocialLinks, setShowSocialLinks] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [errorMsg, setErrorMsg] = useState(null)

    
    const [errorMsg, setErrorMsg] = useState(null)



    const {name, email, password, bio } = user



    return (
        <>
            <HeaderMessage />
                
            <FooterMessage />
        </>
    )
}

export default Signup
