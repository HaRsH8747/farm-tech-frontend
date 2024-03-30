import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { googleSignUp, signUp } from "./context/AuthService";
import PopUp from "./components/PopUp";
import axios from 'axios';


const SignUp = () => {

    const [email, setemail] = useState("");
    const [username, setusername] = useState("");
    const [password, setpassword] = useState("");
    const [userType, setUserType] = useState('farmer');
    const [popUp, setPopUp] = useState({ isVisible: false, message: '' });

    const navigate = useNavigate();

    const showPopUp = (message) => {
        setPopUp({ isVisible: true, message });
        setTimeout(() => {
            setPopUp({ isVisible: false, message: '' }); // Automatically close the pop-up after some time
        }, 5000); // Adjust time as needed
    };

    const handleSignUp = async () => {
        try {
            const user = await signUp(email, password, username);
            showPopUp("Please check your email to verify your account.");

            // Setting cookies in the headers
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Cookie': 'tabstyle=raw-tab; csrftoken=TRab5aRRMwIX05NUtqw1imZryuMe0qyt; sessionid=1miniz06s3tydwnjq00z3hot6vxcilgd'
                }
            };

            // First API Call with axios
            const response = await axios.post("http://192.168.2.18:8000/register/", {
                username: username,
                email: email,
                password: password,
            }, config);

            console.log("Response:", response);
            console.log("Response:", response.data);
            const userId = response.data.id;
            const designation = userType === 'farmer' ? 'F' : 'L';

            // Second API Call after the first one
            const extendedUserResponse = await axios.post("http://192.168.2.18:8000/api/extendedusers", {
                user: userId,
                user_name: username,
                designation: designation,
                about_me: username // Adjust as necessary
            });

            console.log("Extended user details created", extendedUserResponse.data);
            navigate("/login");
        } catch (error) {
            console.error("Error during sign up or API calls:", error.message);
        }
    };

    const handleGoogleSignUp = async () => {
        try {
            const user = await googleSignUp();
            console.log("Signed in with Google:", user);
            // Handle the successful sign-in here
            // For example, redirect to a dashboard
            navigate('/dashboard');
        } catch (error) {
            // Handle errors here, such as displaying a notification to the user
            console.error("Error during Google sign-up:", error.message);
        }
    };

    return (
        <div className="flex m-7" style={{ height: '92vh' }}>
            <div className="flex-1" style={{ backgroundImage: 'url("img/farm1.jpg")', backgroundSize: 'cover' }}></div>
            <div className="flex-1 shadow-style py-1">
                <div className="title-style font-bold text-lg text-slate-50 mt-3 mb-7 text-center">Sign Up</div>
                <div className="px-12">
                    <input
                        className="input-style bg-gray-100 hover:bg-slate-100 w-full mb-4"
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => {
                            setusername(e.target.value);
                        }}
                    />
                    <input
                        className="input-style bg-gray-100 hover:bg-slate-100 w-full mb-4"
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => {
                            setemail(e.target.value);
                        }}
                    />
                    <input
                        className="input-style bg-gray-100 hover:bg-slate-100 w-full mb-4"
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => {
                            setpassword(e.target.value);
                        }}
                    />
                    <div className="flex justify-start items-center mb-4">
                        <label className="mr-4">
                            <input
                                type="radio"
                                name="userType"
                                value="farmer"
                                checked={userType === 'farmer'}
                                onChange={(e) => setUserType(e.target.value)}
                                className="mr-2"
                            />
                            Farmer
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="userType"
                                value="landowner"
                                checked={userType === 'landowner'}
                                onChange={(e) => setUserType(e.target.value)}
                                className="mr-2"
                            />
                            Landowner
                        </label>
                    </div>
                    <button className="button-style bg-gray-700 hover:bg-black font-bold mb-2 w-full" onClick={handleSignUp}>Submit</button>

                    {/* Google Sign-in Button */}
                    {/* <div class="max-w-full">
                        <button type="button" class="text-white w-full bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-center mb-2"
                            onClick={handleGoogleSignUp}>
                            <svg class="mr-2 -ml-1 w-4 h-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                                <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
                            </svg>
                            Sign up with Google
                        </button>
                    </div> */}


                    <div
                        className="text-center text-sm text-gray-500 hover:text-gray-800 underline underline-offset-1 cursor-pointer"
                        onClick={() => navigate('/login')}
                    >
                        Already Have An Account?
                    </div>
                </div>
            </div>
            <PopUp isVisible={popUp.isVisible} message={popUp.message} onClose={() => setPopUp({ isVisible: false, message: '' })} />
        </div>
    );
};


export default SignUp