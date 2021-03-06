import React, { useEffect, useRef, useState } from 'react'
import { HeaderMessage, FooterMessage } from '../components/Common/WelcomeMessage'
import { Form, Button, Message, Segment, TextArea, Divider } from 'semantic-ui-react';
import CommonInputs from '../components/Common/CommonInputs';
import ImageDropDiv from '../components/Common/ImageDropDiv';
import axios from 'axios';
import baseUrl from '../utils/baseUrl'
import { useAuthUser, useCheckUsername } from '../utils/hooks/api/useAuthService';
import { uploadPic } from '../utils/uploadPicToCloudinary';

const regexUserName = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/;


function Signup() {
    const [user, setUser] = useState({
        name:"",
        email:"",
        password:"",
        bio:"",
        facebook:"",
        youtube:"",
        twitter:"",
        instagram:""
    });
    const [showSocialLinks, setShowSocialLinks] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [submitDisabled, setSubmitDisabled] = useState(true)
    
    const [media, setMedia] = useState(null)
    const [mediaPreview, setMediaPreview] = useState(null)
    const [highlighted, setHighlighted] = useState(false)
    const inputRef = useRef();

    const { errorMsg, setErrorMsg, formLoading, setFormLoading, registerUser } = useAuthUser();
      const { username, usernameAvailable, usernameLoading, setUsername, setUsernameLoading, setUsernameAvailable } = useCheckUsername(
        errorMsg,
        setErrorMsg,
        setUser
      );



    const {name, email, password, bio } = user;

    useEffect(() =>{
        const isUser = Object.values({name, email, password, bio}).every(item => Boolean(item))
        isUser ? setSubmitDisabled(false) : setSubmitDisabled(true)
    },[user])

    


    

    async function handleSubmit(e){
        e.preventDefault();
        setFormLoading(true)
        let profilePicUrl;
        if(media!==null){
          profilePicUrl = await uploadPic(media)
        }

        if(media!==null && !profilePicUrl){
          setFormLoading(false);
          return setErrorMsg('Error uploading image')
        }

        await registerUser('signup', user, profilePicUrl)
    }

    function handleChange(e){
        const {name, value, files} = e.target;
        if(name==="media"){
            setMedia(files[0]);
            setMediaPreview(URL.createObjectURL(files[0]))
        }
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
        >
        <Message
          error
          header="Oops!"
          content={errorMsg}
          onDismiss={() => setErrorMsg(null)}
        />
        <Segment>
        <ImageDropDiv 
            mediaPreview={mediaPreview}
            highlighted={highlighted}
            setHighlighted={setHighlighted}
            inputRef={inputRef}
            handleChange={handleChange}
            setMedia={setMedia}
            setMediaPreview={setMediaPreview}
        />
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
              name: "eye",
              circular: true,
              link: true,
              onClick: () => setShowPassword(!showPassword),
            }}
            type={showPassword ? "text" : "password"}
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
            onChange={(e) => {
              if (regexUserName.test(e.target.value)) {
                setUsernameAvailable(true);
                setUsername(e.target.value)
              } else {
                setUsernameAvailable(false);
              }
            }}
            fluid
            icon={usernameAvailable ? "check" : "close"}
            iconPosition="left"
            required
          />

          <CommonInputs 
            user={user} 
            showSocialLinks={showSocialLinks} 
            setShowSocialLinks={setShowSocialLinks} 
            handleChange={handleChange} />
            <Divider hidden />
            <Button content="Signup" type="submit" color="orange" disabled={submitDisabled || !usernameAvailable} />
        </Segment>
        </Form>
        <FooterMessage />
      </>
    );
}

export default Signup
