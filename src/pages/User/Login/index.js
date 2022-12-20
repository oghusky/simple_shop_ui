import { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import Forms from '../../../components/Forms'
import TextInputs from '../../../components/TextInputs'
import Buttons from "../../../components/Buttons";
import { UserAPI } from "../../../API/UserAPI";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import decode from 'jwt-decode'
export default function Login() {
    const history = useHistory();
    const [login, setLogin] = useState({
        email: "",
        password: ""
    });
    const handleChange = (event) => {
        const { name, value } = event.target;
        setLogin({
            ...login,
            [name]: value
        })
    }
    const handleSubmit = async () => {
        try {
            const res = await UserAPI.login(login);
            if (res.status === 200) {
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
            const res = await UserAPI.login({
                firstName: token.given_name,
                lastName: token.family_name,
                email: token.email,
                password: "",
                signUpGoogle: true,
                tokenSub: token.sub,
            });
            if (res.status === 200) {
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
            <Forms formTitle={"Login"}>
                <TextInputs
                    name={"email"}
                    label={"Email *"}
                    value={login.email}
                    placeholder={"Enter Email"}
                    onChange={handleChange}
                    type={"email"}
                    required
                />
                <TextInputs
                    name={"password"}
                    label={"Password"}
                    value={login.password}
                    placeholder={"Enter Password"}
                    type={"password"}
                    onChange={handleChange}
                    required
                />
                <Buttons onClick={handleSubmit} text={"Login"} cssClass={"btn btn-primary btn-sm"} />
            </Forms>
                    <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
    </div>
  )
}
