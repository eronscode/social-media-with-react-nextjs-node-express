import { Icon, Message, Divider } from 'semantic-ui-react';
import { useRouter } from 'next/router';
import Link from "next/link"

function HeaderMessage(){
    const router = useRouter();
    const signupRoute = router.pathname === "/signup";

    return (
        <Message
            color="teal"
            attached
            header={ signupRoute ? "Get Started" : "Welcome Back"}
            icon={ signupRoute ? "Settings" : "Privacy"}
            content={ signupRoute ? "Create New Account" : "Login with email and Password"}
        />
    )
}


function FooterMessage(){
    const router = useRouter();
    const signupRoute = router.pathname === "/signup"

    return(
        <>
            {signupRoute ? (
                <>
                    <Message attached="bottom" warning>
                        <Icon name="help" />
                            Exiting User ? <Link href="/login">Login Here Instead</Link>
                       
                    </Message>
                    <Divider hidden />
                </>
            ):(
                <>
                    <Message attached="bottom" warning>
                        <Icon name="help" />
                        Exiting User ? <Link href="/reset">Forgot Passowrd?</Link>
                    </Message>

                    <Message attached="bottom" warning>
                        <Icon name="help" />
                        New User ? <Link href="/login">Signup Here</Link>
                    </Message>
                </>
            )}
        </>
    )

}

export {
    HeaderMessage,
    FooterMessage
}