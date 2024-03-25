import { Button, Label, TextInput } from 'flowbite-react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signIn } from './context/AuthService'; // Adjust the path as necessary
import { useAuth } from './context/authContext/index.js'; // Adjust the import path as necessary
import axios from 'axios';

const Login = () => {
    const navigate = useNavigate();

    const { setCurrentDBUser } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [currentUserId, setCurrentUserId] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault(); // Prevent the form from refreshing the page
        try {

            const data = new URLSearchParams();
            data.append("email", "nevil@gmail.com");
            data.append("password", "admin@123");

            const config = {
                method: 'post',
                url: 'http://192.168.2.18:8000/login/',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Cookie': 'csrftoken=Q10eo92VTUqH3eLEtYyYOD5bKGAkL9ix'
                },
                data: data
            };

            axios(config)
                .then(response => {
                    console.log(response.data);
                    if (response.status === 200) {
                        const userData = response.data; // Assuming the server returns user data
                        setCurrentUserId(userData.user_id);

                        const response2 = axios.get('http://192.168.2.18:8000/api/extendedusers', {
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        });

                        if (response2.status === 200) {
                            const userData2 = response2.data;
                            const foundUser = userData2.find(user => user.user === userData.user_id);

                            if (foundUser) {
                                console.log('Found user:', foundUser);
                                setCurrentDBUser(foundUser);
                            } else {
                                console.log('User not found.');
                            }
                            navigate('/'); // Redirect to the home page
                        }
                    } else {
                        // Handle authentication failure
                        console.error("Failed to log in: ", response.statusText);
                        // Handle errors (e.g., show an error message)
                    }
                })
                .catch(error => {
                    console.log('error', error);
                });

            // const response = await axios.post('http://192.168.2.18:8000/login/', {
            //     email: email,
            //     password: password
            // }, {
            //     headers: {
            //         'Content-Type': 'application/x-www-form-urlencoded'
            //     }
            // });


        } catch (error) {
            console.error("Failed to log in: ", error.message);
            // Handle errors (e.g., show an error message)
        }
    };

    return (
        <>
            <div className="flex">
                <div className="2xl:w-[60%] xl:w-[50%] lg:w-[50%] md:w-[50%] sm:w-[50%] w-0">
                    <img src="/img/hero.jpg" className="h-[100vh]" />
                </div>
                <div className="2xl:w-[40%] xl:w-[50%] lg:w-[50%] md:w-[50%] sm:w-[50%] w-full">
                    <div className="my-[109px] mx-[70px] login-style shadow-style">
                        <div className="flex justify-center items-center">
                            <div className="text-2xl font-bold mb-5">Login</div>
                        </div>

                        <div className="">
                            <div className="text-lg mb-1 text-gray-500">email</div>
                            <TextInput
                                className="input-style bg-gray-100 hover:bg-slate-100"
                                type="email"
                                name="email"
                                placeholder="Email"
                                required onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="mb-4">
                            <div className="text-lg mb-1 text-gray-500">Password</div>
                            <TextInput
                                className="input-style bg-gray-100 hover:bg-slate-100"
                                type="password"
                                name="password"
                                placeholder="Password"
                                required onChange={(e) => setPassword(e.target.value)}
                            />
                            <div className="flex justify-end text-sm mb-1 text-gray-500 hover:text-gray-800 underline underline-offset-1 cursor-pointer">Forgot Password</div>

                        </div>

                        <div className="mb-8">
                            <div className="flex items-center">
                                <TextInput
                                    className="h-[20px] w-[18px] mr-4"
                                    type="checkbox"
                                    name="checkbox"
                                    value="1"
                                    placeholder="Password"

                                />
                                <div>Remember Me!</div>
                            </div>
                        </div>

                        <button className="button-style bg-gray-700 hover:bg-black" onClick={handleLogin}>Submit</button>

                        <div className="flex justify-end text-sm mb-1 text-gray-500 hover:text-gray-800 underline underline-offset-1 cursor-pointer" onClick={() => { Navigate("/register") }}>Create Account</div>
                    </div>
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <button className="button-style bg-gray-700 hover:bg-black" onClick={() => { Navigate("/") }}>Go to home</button>
                    </div>
                </div>
            </div>

        </>
    );
};

export default Login;