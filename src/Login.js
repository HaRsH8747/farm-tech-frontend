import { Button, Label, TextInput } from 'flowbite-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signIn } from './context/AuthService'; // Adjust the path as necessary

const Login = () => {
    const navigate = useNavigate(); 

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault(); // Prevent the form from refreshing the page
        try {
            await signIn(email, password);
            console.log("Logged in successfully!");
            navigate('/'); // Redirect to the home page

            // Redirect to the home page or wherever you want
        } catch (error) {
            console.error("Failed to log in: ", error.message);
            // Handle errors (e.g., show an error message)
        }
    };

    return (
        <form className="flex max-w-md flex-col gap-4" onSubmit={handleLogin}>
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="email" value="Your email" />
                </div>
                <TextInput id="email" type="email" placeholder="name@flowbite.com" required onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="password" value="Your password" />
                </div>
                <TextInput id="password" type="password" required onChange={(e) => setPassword(e.target.value)} />
            </div>
            <Button type="submit">Submit</Button>
        </form>
    );
};

export default Login;