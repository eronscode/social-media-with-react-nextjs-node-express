import React from 'react'
import { HeaderMessage } from '../components/common/WelcomeMessage'
import { HeaderMessage, FooterMessage } from '../components/common/WelcomeMessage'
import { Form, Button, Message, Segment, TextArea, Divider } from 'semantic-ui-react';

function Login() {
    
    const [user, setUser] = useState({
        email:"",
        password:""
    });
    const [errorMsg, setErrorMsg] = useState(null)
    const [formLoading, setFormLoading] = useState(false)
    const [submitDisabled, setSubmitDisabled] = useState(true)


    const {email, password } = user;
    
    useEffect(() =>{
        const isUser = Object.values({email, password}).every(item => Boolean(item))
        isUser ? setSubmitDisabled(false) : setSubmitDisabled(true)
    },[user])

    return (
        <div>
            <HeaderMessage>

            </HeaderMessage>
        </div>
    )
}

export default Login
