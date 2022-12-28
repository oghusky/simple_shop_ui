import { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import decode from 'jwt-decode'
import Forms from '../../../components/Forms'
import TextInputs from '../../../components/TextInputs'
import Buttons from "../../../components/Buttons";

import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { UserAPI } from "../../../API/UserAPI";
export default function SignUp() {
    const history = useHistory();
    const [signup, setSignup] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirm: "",
        signUpGoogle: false,
        tokenSub: '',
    })
    const handleChange = (event) => {
        const { name, value } = event.target;
        setSignup({
            ...signup,
            [name]: value
        })
    }
    const handleSubmit = async () => {
        try {
            const res = await UserAPI.signup(signup);
            if (res.status === 201) {
                localStorage.setItem("ShopEZUser", JSON.stringify(res.data.user))
                localStorage.setItem("ShopEZToken", JSON.stringify(res.data.token))
            }
            console.log(res)
        } catch (err) {
            console.log(err);
         }
    }
    const handleGoogleSubmit = async (token) => {
        try {
            const res = await UserAPI.signup({
                firstName: token.given_name,
                lastName: token.family_name,
                email: token.email,
                password: "",
                signUpGoogle: true,
                tokenSub: token.sub,
            });
            if (res.status === 201) {
                localStorage.setItem("ShopEZUser", JSON.stringify(res.data.user))
                localStorage.setItem("ShopEZToken", JSON.stringify(res.data.token))
            }
            console.log(res)
        } catch (err) { 
            console.log(err);
        }
    }
    const handleGoogleFail = async (result) => {
        console.log(result);
    }
    return (
        <div>
            <Forms formTitle={"Sign up to shop or sell"}>
            <div className="d-flex justify-content-center">
                <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
                    <GoogleLogin
                        size="large"
                        theme="filled_blue"
                        text="signup_with"
                        onSuccess={gToken => {
                            handleGoogleSubmit(decode(gToken.credential));
                        }}
                        onError={() => {
                            handleGoogleFail('Login Failed');
                        }}
                    />
                </GoogleOAuthProvider>
            </div>
                <TextInputs
                    name={"email"}
                    label={"Email *"}
                    value={signup.email}
                    placeholder={"Enter Email"}
                    onChange={handleChange}
                    type={"email"}
                    required
                />
                <TextInputs
                    name={"firstName"}
                    label={"First Name *"}
                    value={signup.firstName}
                    placeholder={"Enter First Name"}
                    onChange={handleChange}
                    type={"text"}
                    required
                />
                <TextInputs
                    name={"lastName"}
                    label={"Last Name *"}
                    value={signup.lastName}
                    placeholder={"Enter Last Name"}
                    onChange={handleChange}
                    type={"text"}
                    required
                />
                <TextInputs
                    name={"password"}
                    label={"Password *"}
                    value={signup.password}
                    placeholder={"Enter Password"}
                    type={"password"}
                    onChange={handleChange}
                    required
                />
                <TextInputs
                    name={"confirm"}
                    label={"Confirm Password *"}
                    value={signup.confirm}
                    placeholder={"Re-Enter Password"}
                    type={"password"}
                    onChange={handleChange}
                    required
                />
                <Buttons onClick={handleSubmit} text={"Sign Up"} cssClass={"btn btn-primary btn-sm"}/>
            </Forms>
            <p>Already have an account? <Link to="/login">Login</Link></p>
        </div>
    );
}