import React, {useEffect, useState} from 'react'
import { HeaderMessage, FooterMessage } from '../components/Common/WelcomeMessage'
import { Form, Button, Message, Segment, TextArea, Divider } from 'semantic-ui-react';
import { useAuthUser } from '../utils/hooks/useAuthUser';

function Login() {
    
    const [user, setUser] = useState({
        email:"",
        password:""
    });
    
    const [submitDisabled, setSubmitDisabled] = useState(true)
    const [showPassword, setShowPassword] = useState(false)

    const {email, password } = user;

    const { errorMsg,
      setErrorMsg,
      formLoading,
      setFormLoading,
      loginUser } = useAuthUser()
    
    useEffect(() =>{
        const isUser = Object.values({email, password}).every(item => Boolean(item))
        isUser ? setSubmitDisabled(false) : setSubmitDisabled(true)
    },[user])

    async function handleSubmit(e){
        e.preventDefault()
        await loginUser('auth', user)
    }

    function handleChange(e){
        const {name, value} = e.target;

        setUser(prev => ({
            ...prev,
            [name]:value
        }))
    }

    return (
      <div>
        <HeaderMessage />
        <Form
          loading={formLoading}
          error={errorMsg !== null}
          onSubmit={handleSubmit}
        >
          <Message
            error
            header="Oops!"
            content={errorMsg}
            onDismiss={() => setErrorMsg(null)}
          />
          <Segment>
            <Form.Input
              label="Email"
              placeholder="Email"
              name="email"
              value={email}
              onChange={handleChange}
              fluid
              icon="envelope"
              type="email"
              iconPosition="left"
              required
            />
            <Form.Input
              label="Password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={handleChange}
              fluid
              icon={{
                name: "eye",
                circular: true,
                link: true,
                onClick: () => setShowPassword(!showPassword),
              }}
              type={showPassword ? "text" : "password"}
              iconPosition="left"
              required
            />
            <Divider hidden />
            <Button
              content="Signup"
              type="submit"
              color="orange"
              disabled={submitDisabled}
            />
          </Segment>
        </Form>
        <FooterMessage />
      </div>
    );
}

export default Login
