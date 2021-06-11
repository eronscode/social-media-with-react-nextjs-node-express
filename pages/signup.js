import React, { useState } from 'react'
import { HeaderMessage, FooterMessage } from '../components/common/WelcomeMessage'
import { Form, Button, Message, Segment, TextArea, Divider } from 'semantic-ui-react';

const regexUserName = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/;

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
    const [formLoading, setFormLoading] = useState(false)


    const [username, setUsername] = useState("")
    const [usernameLoading, setUsernameLoading] = useState(false)
    const [usernameAvailable, setUsernameAvailable] = useState(null)



    const {name, email, password, bio } = user;

    function handleSubmit(e){
        e.preventDefault();
    }

    function handleChange(e){
        const {name, value} = e.target;
        setUser(prev => ({
            ...prev,
            [name]:value
        }))
    }



    return (
      <>
        <HeaderMessage />
        <Form
          loading={formLoading}
          error={errorMsg !== null}
          onSubmit={handleSubmit}
        ></Form>
        <Message
          error
          header="Oops!"
          content={errorMsg}
          onDismiss={() => setErrorMsg(null)}
        />
        <Segment>
          <Form.Input
            label="Name"
            placeholder="Name"
            name="name"
            value={name}
            onChange={handleChange}
            fluid
            icon="user"
            iconPosition="left"
            required
          />
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
                name:"eye",
                circular: true,
                link:true,
                onClick: () => setShowPassword(!showPassword)
            }}
            type={showPassword ?'text':'password'}
            iconPosition="left"
            required
          />

            <Form.Input
                loading={usernameLoading}
                error={!usernameAvailable}
                label="username"
                placeholder="username"
                name="username"
                value={username}
                onChange={(e) =>{
                    if(regexUserName.test(e.target.value)){
                        setUsernameAvailable(true)
                    }else{
                        setUsernameAvailable(false)
                    }
                }}
                fluid
                icon={usernameAvailable ? 'check' : 'close'}
                iconPosition="left"
                required
            />
        </Segment>
        <FooterMessage />
      </>
    );
}

export default Signup
